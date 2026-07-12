import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogBrowser } from "@/components/catalog-browser";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Jelajahi elektronik bekas terverifikasi di ExPart.",
};

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="shell min-h-screen py-10">Memuat…</div>}>
      <CatalogBrowser />
    </Suspense>
  );
}
