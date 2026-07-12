import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AccountPage } from "@/components/account-page";
import { AuthCard } from "@/components/auth-card";
import { CommunityThread } from "@/components/community-thread";
import {
  CartGuestPage,
  ChatGuestPage,
  NotificationsGuestPage,
} from "@/components/guest-workspaces";
import { InfoPage } from "@/components/info-page";
import { ShopProfile } from "@/components/shop-profile";
import {
  BlogPage,
  ComingSoonPage,
  PlaceholderPage,
} from "@/components/static-pages";
import { threads } from "@/data/community";
import { currentUser } from "@/lib/server-auth";

type CatchAllProps = {
  params: Promise<{ route: string[] }>;
};

const infoRoutes = new Set(["about", "mission", "team", "membership"]);
const placeholderRoutes = new Set(["trade-in", "privacy", "terms", "guide"]);
const protectedRoots = new Set([
  "account",
  "admin",
  "checkout",
  "dashboard",
  "environment-contribution",
  "my-orders",
  "my-products",
  "onboarding",
  "payment",
  "seller",
  "src",
  "transaction",
  "user",
  "wishlist",
]);
const routeTitles: Record<string, string> = {
  about: "Tentang ExPart",
  account: "Pengaturan Akun",
  blog: "Blog",
  cart: "Keranjang",
  chat: "Pesan",
  "coming-soon": "Segera Hadir",
  guide: "Panduan Kondisi Barang",
  "login/forgot": "Lupa Kata Sandi",
  marketplace: "Marketplace",
  membership: "Membership",
  mission: "Misi Ekonomi Sirkular",
  notifications: "Notifikasi",
  privacy: "Kebijakan Privasi",
  register: "Daftar",
  team: "Tim Nebula",
  terms: "Syarat dan Ketentuan",
  "trade-in": "Program Trade-In",
};

export async function generateMetadata({
  params,
}: CatchAllProps): Promise<Metadata> {
  const route = (await params).route;
  const path = route.join("/");
  const title = routeTitles[path] ?? route.at(-1)?.replaceAll("-", " ");
  return { title: title ? title[0].toUpperCase() + title.slice(1) : "ExPart" };
}

export default async function CatchAllPage({ params }: CatchAllProps) {
  const route = (await params).route;
  const path = route.join("/");
  const first = route[0];

  if (route.length === 1 && infoRoutes.has(first)) {
    return <InfoPage kind={first as "about" | "mission" | "team" | "membership"} />;
  }

  if (path === "register") return <AuthCard mode="register" />;
  if (path === "register/activate") redirect("/register");
  if (path === "login/forgot") return <AuthCard mode="forgot" />;
  if (path === "marketplace") redirect("/browse");
  if (path === "auth/google" || path === "auth/google/callback")
    redirect("/login");

  if (first === "community" && route.length === 2 && route[1] !== "new") {
    const thread = threads.find((item) => item.slug === route[1]);
    if (thread) return <CommunityThread thread={thread} />;
  }

  if (first === "shop" && route.length === 2) return <ShopProfile />;

  if (path === "blog") return <BlogPage />;
  if (path === "coming-soon") return <ComingSoonPage />;
  if (route.length === 1 && placeholderRoutes.has(first))
    return <PlaceholderPage />;

  if (path === "cart") return <CartGuestPage />;
  if (path === "notifications") return <NotificationsGuestPage />;
  if (path === "chat") return <ChatGuestPage />;
  if (
    path === "account" ||
    path === "dashboard" ||
    path === "user/dashboard"
  ) {
    const user = await currentUser();
    if (!user) redirect("/login");
    return <AccountPage user={user} />;
  }
  if (path === "community/new" || protectedRoots.has(first)) {
    if (await currentUser()) redirect("/coming-soon");
    redirect("/login");
  }

  notFound();
}
