"use client";

import { usePathname } from "next/navigation";
import { GlobalOverlays } from "@/components/global-overlays";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const guestRoutes = new Set([
  "/login",
  "/login/forgot",
  "/register",
  "/register/activate",
]);
const standaloneRoutes = new Set(["/coming-soon"]);

function toggleTheme() {
  const dark = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
}

export function RouteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (standaloneRoutes.has(pathname)) return <main>{children}</main>;

  if (guestRoutes.has(pathname)) {
    return (
      <>
        <div className="absolute top-4 right-4 z-50">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full text-hint hover:text-heading hover:bg-mist transition duration-200 cursor-pointer bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm shadow-sm"
            aria-label="Toggle Dark Mode"
          >
            <i className="ri-sun-line text-xl dark:text-yellow-400 hidden dark:block" />
            <i className="ri-moon-line text-xl dark:hidden" />
          </button>
        </div>
        <main>{children}</main>
      </>
    );
  }

  return (
    <>
      <GlobalOverlays />
      <SiteHeader />
      <main className="w-full relative grow bg-page text-body">{children}</main>
      <SiteFooter />
    </>
  );
}
