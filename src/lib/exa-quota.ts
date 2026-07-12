import "server-only";
import type { ExaMode, ExaQuota } from "@/lib/exa-ai";

export const EXA_QUOTA_COOKIE = "expart_exa_quota";

type QuotaToken = {
  sub: string;
  date: string;
  quick: number;
  deep: number;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function limit(mode: ExaMode) {
  const fallback = mode === "quick" ? 10 : 3;
  const configured = Number(
    mode === "quick"
      ? process.env.EXPART_LIMIT_FREE_QUICK
      : process.env.EXPART_LIMIT_FREE_DEEP,
  );
  return Number.isSafeInteger(configured) && configured > 0 ? configured : fallback;
}

function today() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

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
  if (!secret || encoder.encode(secret).length < 32) {
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

function emptyToken(sub: string): QuotaToken {
  return { sub, date: today(), quick: 0, deep: 0 };
}

// ponytail: Signed cookies cover the serverless showcase; move counters to Turso
// transactions when quotas must survive cookie clearing and parallel requests.
export async function readQuotaToken(value: string | undefined, sub: string) {
  if (!value) return emptyToken(sub);
  const [payload, signature] = value.split(".");
  if (!payload || !signature) return emptyToken(sub);

  try {
    const valid = await crypto.subtle.verify(
      "HMAC",
      await signingKey(),
      fromBase64Url(signature),
      encoder.encode(payload),
    );
    if (!valid) return emptyToken(sub);

    const token = JSON.parse(decoder.decode(fromBase64Url(payload))) as QuotaToken;
    if (
      token.sub !== sub ||
      token.date !== today() ||
      !Number.isSafeInteger(token.quick) ||
      !Number.isSafeInteger(token.deep)
    ) {
      return emptyToken(sub);
    }
    return token;
  } catch {
    return emptyToken(sub);
  }
}

export async function createQuotaToken(token: QuotaToken) {
  const payload = toBase64Url(encoder.encode(JSON.stringify(token)));
  const signature = await crypto.subtle.sign(
    "HMAC",
    await signingKey(),
    encoder.encode(payload),
  );
  return `${payload}.${toBase64Url(new Uint8Array(signature))}`;
}

export function quotaDetails(token: QuotaToken): ExaQuota {
  const quickLimit = limit("quick");
  const deepLimit = limit("deep");
  return {
    quick: {
      used: token.quick,
      limit: quickLimit,
      remaining: Math.max(0, quickLimit - token.quick),
    },
    deep: {
      used: token.deep,
      limit: deepLimit,
      remaining: Math.max(0, deepLimit - token.deep),
    },
  };
}

export function consumeQuota(token: QuotaToken, mode: ExaMode) {
  return { ...token, [mode]: token[mode] + 1 };
}
