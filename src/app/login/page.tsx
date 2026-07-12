import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthCard } from "@/components/auth-card";
import { currentUser } from "@/lib/server-auth";

export const metadata: Metadata = {
  title: "Masuk",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await currentUser()) redirect("/account");
  const error = (await searchParams).error;
  const authError = error
    ? error === "oauth_config"
      ? "Google OAuth belum dikonfigurasi."
      : "Login Google gagal. Silakan coba lagi."
    : "";
  return <AuthCard authError={authError} />;
}
