import { NextResponse } from "next/server";
import { authUrl, OAUTH_STATE_COOKIE } from "@/lib/auth";

export function GET() {
  const clientId = process.env.AUTH_GOOGLE_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "AUTH_GOOGLE_ID is not configured" },
      { status: 500 },
    );
  }

  const state = crypto.randomUUID();
  const authorization = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authorization.search = new URLSearchParams({
    client_id: clientId,
    redirect_uri: authUrl("/auth/google/callback"),
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  }).toString();

  const response = NextResponse.redirect(authorization);
  response.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    maxAge: 60 * 10,
    path: "/",
    sameSite: "lax",
    secure: authUrl().startsWith("https://"),
  });
  return response;
}
