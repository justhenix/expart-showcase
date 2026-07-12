import { NextResponse } from "next/server";
import { authUrl, SESSION_COOKIE } from "@/lib/auth";

export function GET() {
  const response = NextResponse.redirect(authUrl("/"));
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
