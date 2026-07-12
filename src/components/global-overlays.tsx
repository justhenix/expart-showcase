"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function GlobalOverlays() {
  const pathname = usePathname();
  const [showBlocker, setShowBlocker] = useState(true);

  return (
    <>
      {showBlocker ? (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm lg:hidden">
          <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
            <div className="mb-6">
              <img
                src="/assets/exa/optimized/notfound.webp"
                alt="Exa Mascot"
                width="320"
                height="320"
                decoding="async"
                className="w-40 h-40 object-contain mx-auto"
              />
            </div>
            <div className="mb-6">
              <img
                src="/expart-logo.svg"
                alt="ExPart"
                className="h-10 w-auto mx-auto"
              />
            </div>
            <div className="max-w-sm space-y-4">
              <h2 className="text-xl font-bold text-white">
                Akses via Desktop untuk Demo Maksimal
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Untuk pengalaman terbaik Demo ExPart, silakan akses melalui{" "}
                <span className="text-emerald-400 font-semibold">
                  Desktop/Laptop
                </span>
                . Versi Mobile sedang dalam pengembangan.
              </p>
            </div>
            <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4 max-w-sm">
              <div className="flex items-start gap-3 text-left">
                <i className="ri-lightbulb-fill text-amber-400 mt-0.5" />
                <p className="text-xs text-gray-400">
                  <span className="text-white font-medium">Tip:</span> Di Chrome
                  Mobile, ketuk menu lalu pilih &quot;Desktop site&quot; untuk
                  tampilan lebih baik.
                </p>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={() => setShowBlocker(false)}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all duration-200"
              >
                Lanjutkan
              </button>
              <p className="text-xs text-gray-500">
                Beberapa fitur mungkin tidak berfungsi optimal
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="floating-actions fixed bottom-6 z-50 flex flex-col gap-3 items-end">
        <Link
          href="/exa-ai"
          className="floating-action floating-action--exa group flex items-center gap-2 px-2 py-2.5 rounded-full shadow-lg border hover:scale-105 transition-all duration-300 relative overflow-hidden"
        >
          <div className="relative flex items-center gap-2">
            <div className="relative w-8 h-8">
              <img
                src="/assets/exa/optimized/flat.webp"
                alt="Exa AI"
                width="64"
                height="64"
                decoding="async"
                className="w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0 absolute inset-0"
              />
              <img
                src="/assets/exa/optimized/happy.webp"
                alt="Exa AI Happy"
                width="64"
                height="64"
                decoding="async"
                className="w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute inset-0"
              />
            </div>
            <span className="font-bold text-primary hidden sm:block">
              Tanya Exa AI
            </span>
          </div>
        </Link>
        {pathname !== "/community" ? (
          <Link
            href="/community"
            className="floating-action flex items-center gap-2 px-3 py-3 rounded-full shadow-lg text-heading hover:bg-page dark:hover:bg-slate-900 hover:scale-105 transition-all duration-300 border border-mist dark:border-slate-700 group"
          >
            <i className="ri-team-fill text-xl group-hover:rotate-6 transition-transform" />
            <span className="font-semibold hidden sm:block">Komunitas</span>
          </Link>
        ) : null}
      </div>
    </>
  );
}
