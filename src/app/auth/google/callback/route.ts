import { NextRequest, NextResponse } from "next/server";
import {
  authUrl,
  createSessionToken,
  OAUTH_STATE_COOKIE,
  SESSION_COOKIE,
} from "@/lib/auth";

type GoogleUser = {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
};

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get(OAUTH_STATE_COOKIE)?.value;

  if (!code || !state || state !== expectedState) {
    return NextResponse.redirect(authUrl("/login?error=oauth_state"));
  }

  const clientId = process.env.AUTH_GOOGLE_ID;
  const clientSecret = process.env.AUTH_GOOGLE_SECRET;
  if (!clientId || !clientSecret) {
    return NextResponse.redirect(authUrl("/login?error=oauth_config"));
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: authUrl("/auth/google/callback"),
      }),
    });
    if (!tokenResponse.ok) throw new Error("Google token exchange failed");

    const { access_token: accessToken } = (await tokenResponse.json()) as {
      access_token?: string;
    };
    if (!accessToken) throw new Error("Google access token missing");

    const userResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      { headers: { authorization: `Bearer ${accessToken}` } },
    );
    if (!userResponse.ok) throw new Error("Google user lookup failed");

    const googleUser = (await userResponse.json()) as GoogleUser;
    if (!googleUser.email_verified) throw new Error("Google email not verified");

    const session = await createSessionToken({
      sub: googleUser.sub,
      email: googleUser.email,
      name: googleUser.name || googleUser.email,
      picture: googleUser.picture,
    });
    const response = NextResponse.redirect(authUrl("/account"));
    response.cookies.delete(OAUTH_STATE_COOKIE);
    response.cookies.set(SESSION_COOKIE, session, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
      secure: authUrl().startsWith("https://"),
    });
    return response;
  } catch {
    return NextResponse.redirect(authUrl("/login?error=oauth_failed"));
  }
}
