import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ExaAiDemo } from "@/components/exa-ai-demo";
import { currentUser } from "@/lib/server-auth";

export const metadata: Metadata = {
  title: "Exa AI Verifier",
  description: "Demo analisis kondisi elektronik bekas dengan Exa AI.",
};

export default async function ExaAiPage() {
  if (!(await currentUser())) redirect("/login");
  return <ExaAiDemo />;
}
