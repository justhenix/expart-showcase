"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import type { AuthUser } from "@/lib/auth";

const categoryData = {
  laptop: {
    name: "Laptop",
    icon: "ri-macbook-line",
    subs: ["Gaming", "Ultrabook", "MacBook", "Laptop Kerja", "Laptop Pelajar", "2-in-1"],
  },
  smartphone: {
    name: "Smartphone",
    icon: "ri-smartphone-line",
    subs: ["iPhone", "Samsung", "Xiaomi", "OPPO", "vivo", "Google Pixel"],
  },
  "komponen-pc": {
    name: "Komponen PC",
    icon: "ri-cpu-line",
    subs: ["Processor", "VGA / GPU", "RAM", "SSD", "Motherboard", "Power Supply"],
  },
  tablet: {
    name: "Tablet",
    icon: "ri-tablet-line",
    subs: ["iPad", "Android Tablet", "Drawing Tablet", "Windows Tablet"],
  },
  aksesoris: {
    name: "Aksesoris",
    icon: "ri-mouse-line",
    subs: ["Keyboard", "Mouse", "Charger", "Cable", "Docking", "Case"],
  },
  kamera: {
    name: "Kamera",
    icon: "ri-camera-line",
    subs: ["Mirrorless", "DSLR", "Action Cam", "Lensa", "Kamera Pocket"],
  },
  audio: {
    name: "Audio",
    icon: "ri-headphone-line",
    subs: ["Headphone", "Earbuds", "Speaker", "DAC", "Microphone"],
  },
  monitor: {
    name: "Monitor",
    icon: "ri-computer-line",
    subs: ["Gaming Monitor", "Ultrawide", "Portable Monitor", "Office Monitor"],
  },
  gaming: {
    name: "Gaming",
    icon: "ri-gamepad-line",
    subs: ["PlayStation", "Xbox", "Nintendo", "Controller", "Console Retro"],
  },
  networking: {
    name: "Networking",
    icon: "ri-router-line",
    subs: ["Router", "Mesh Wi-Fi", "Access Point", "Switch", "Modem"],
  },
} as const;

type CategoryKey = keyof typeof categoryData;

export function SiteHeader() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("laptop");
  const [search, setSearch] = useState("");
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((response) => response.json())
      .then((session: { user: AuthUser | null }) => setUser(session.user))
      .catch(() => setUser(null));
  }, []);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(search.trim() ? `/browse?search=${encodeURIComponent(search.trim())}` : "/browse");
  }

  function toggleTheme() {
    const nextDark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextDark);
    localStorage.setItem("theme", nextDark ? "dark" : "light");
  }

  const active = categoryData[activeCategory];

  return (
    <nav className="w-full bg-card sticky top-0 z-100 shadow-sm border-b border-mist">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center gap-8">
          <div className="shrink-0 flex items-center">
            <Link href="/">
              <img
                src="/expart-logo.svg"
                alt="ExPart"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition duration-150 bg-card cursor-pointer ${
                open
                  ? "border-primary text-primary"
                  : "border-mist text-body hover:border-primary hover:text-primary"
              }`}
            >
              <i className="ri-function-line text-xl" />
              <span>Kategori</span>
              <i className={`ri-arrow-down-s-line transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
            </button>

            {open ? (
              <div className="navbar-dropdown navbar-dropdown-left absolute top-full left-0 mt-2 w-175 bg-card rounded-xl shadow-xl border border-mist z-50 overflow-hidden">
                <div className="flex">
                  <div className="w-48 bg-page border-r border-mist py-2">
                    {(Object.keys(categoryData) as CategoryKey[]).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onMouseEnter={() => setActiveCategory(key)}
                        onClick={() => {
                          setOpen(false);
                          router.push(`/browse?category=${key}`);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors duration-100 cursor-pointer border-l-2 ${
                          activeCategory === key
                            ? "bg-primary-surface text-primary border-primary"
                            : "text-body hover:bg-primary-surface hover:text-primary border-transparent"
                        }`}
                      >
                        {categoryData[key].name}
                      </button>
                    ))}
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-mist">
                      <i className={`${active.icon} text-xl text-primary`} />
                      <h3 className="text-base font-bold text-heading">{active.name}</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-x-6 gap-y-2.5">
                      {active.subs.map((sub) => (
                        <Link
                          key={sub}
                          href={`/browse?category=${activeCategory}&search=${encodeURIComponent(sub)}`}
                          className="text-sm text-body hover:text-primary transition-colors duration-100 truncate cursor-pointer"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-5 pt-3 border-t border-mist">
                      <Link
                        href={`/browse?category=${activeCategory}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline cursor-pointer"
                      >
                        Lihat Semua {active.name}
                        <i className="ri-arrow-right-s-line" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex-1 max-w-2xl">
            <form onSubmit={submitSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-line text-xl text-hint" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                autoComplete="off"
                className="block w-full pl-10 pr-3 py-2 border border-mist rounded-lg leading-5 bg-card dark:text-white placeholder-hint focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-sm transition duration-150 ease-in-out"
                placeholder="Cari gadget atau sparepart..."
              />
            </form>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <details className="relative group">
                <summary
                  aria-label={`Menu akun ${user.name}`}
                  className="flex list-none items-center gap-3 rounded-lg p-1 cursor-pointer transition hover:bg-page focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden"
                >
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt=""
                      className="h-10 w-10 rounded-full object-cover border border-mist"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="h-10 w-10 rounded-full border border-mist bg-primary-surface text-primary flex items-center justify-center font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="hidden md:block max-w-32 truncate text-sm font-medium text-heading">
                    {user.name}
                  </span>
                  <i className="ri-arrow-down-s-line text-hint transition-transform duration-200 group-open:rotate-180" />
                </summary>

                <div className="navbar-dropdown absolute right-0 mt-2 w-56 overflow-hidden rounded-lg border border-mist bg-card shadow-lg z-50">
                  <div className="border-b border-mist bg-primary-surface px-4 py-3">
                    <p className="truncate text-sm font-semibold text-heading">
                      {user.name}
                    </p>
                    <p className="truncate text-xs text-body">{user.email}</p>
                  </div>
                  <Link
                    href="/account"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-body transition hover:bg-page hover:text-primary"
                  >
                    <i className="ri-user-line" />
                    Profil Saya
                  </Link>
                  <div className="border-t border-mist" />
                  <button
                    type="button"
                    onClick={() => window.location.assign("/auth/logout")}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-danger transition hover:bg-danger-surface cursor-pointer"
                  >
                    <i className="ri-logout-box-r-line" />
                    Keluar
                  </button>
                </div>
              </details>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 border border-primary text-primary rounded-lg text-sm font-bold hover:bg-primary-surface transition cursor-pointer"
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-sm font-bold hover:bg-emerald-800 transition shadow-md hover:shadow-lg cursor-pointer"
                >
                  Daftar
                </Link>
              </div>
            )}
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-hint hover:text-heading hover:bg-mist transition duration-200 cursor-pointer"
              aria-label="Ganti tema"
              title="Ganti tema"
            >
              <i className="theme-icon-light ri-moon-line text-xl" />
              <i className="theme-icon-dark ri-sun-line text-xl" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
