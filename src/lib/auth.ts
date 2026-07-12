export const SESSION_COOKIE = "expart_session";
export const OAUTH_STATE_COOKIE = "expart_oauth_state";

export type AuthUser = {
  sub: string;
  email: string;
  name: string;
  picture?: string;
  exp: number;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBase64Url(bytes: Uint8Array) {
  return btoa(String.fromCharCode(...bytes))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function fromBase64Url(value: string) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(
    Math.ceil(value.length / 4) * 4,
    "=",
  );
  return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
}

async function signingKey() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not configured");
  if (encoder.encode(secret).length < 32) {
    throw new Error("AUTH_SECRET must contain at least 32 bytes");
  }
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

// ponytail: Stateless showcase sessions; add DB-backed users when persistent accounts ship.
export async function createSessionToken(user: Omit<AuthUser, "exp">) {
  const payload = toBase64Url(
    encoder.encode(
      JSON.stringify({
        ...user,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      }),
    ),
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    await signingKey(),
    encoder.encode(payload),
  );
  return `${payload}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function readSessionToken(token?: string) {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  try {
    const valid = await crypto.subtle.verify(
      "HMAC",
      await signingKey(),
      fromBase64Url(signature),
      encoder.encode(payload),
    );
    if (!valid) return null;

    const user = JSON.parse(decoder.decode(fromBase64Url(payload))) as AuthUser;
    return user.exp > Math.floor(Date.now() / 1000) ? user : null;
  } catch {
    return null;
  }
}

export function authUrl(path = "") {
  const origin = process.env.AUTH_URL?.replace(/\/$/, "");
  if (!origin) throw new Error("AUTH_URL is not configured");
  return `${origin}${path}`;
}
