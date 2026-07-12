import type { Metadata } from "next";
import { CommunityFeed } from "@/components/community-feed";

export const metadata: Metadata = {
  title: "Komunitas",
  description: "Diskusi gadget, reparasi, price check, dan jual beli.",
};

export default function CommunityPage() {
  return <CommunityFeed />;
}
