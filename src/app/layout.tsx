import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { RouteShell } from "@/components/route-shell";

export const metadata: Metadata = {
  metadataBase: new URL("https://expart.store"),
  title: {
    default: "ExPart | Extend Your Build",
    template: "%s | ExPart",
  },
  description:
    "Marketplace elektronik bekas dengan verifikasi kondisi berbasis AI dan komunitas.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="overflow-x-hidden" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/plus-jakarta-sans-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/legacy/app.css" />
        <link rel="stylesheet" href="/legacy/remixicon.css" />
        <link rel="stylesheet" href="/legacy/custom.css" />
        <Script id="theme-init" strategy="beforeInteractive">
          {"try{const t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch{}"}
        </Script>
      </head>
      <body className="w-full bg-page text-body font-sans antialiased overflow-x-hidden">
        <RouteShell>{children}</RouteShell>
      </body>
    </html>
  );
}
