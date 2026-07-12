"use client";

import { useState } from "react";

export function ProductMediaActions({ productName }: { productName: string }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [shareLabel, setShareLabel] = useState("Bagikan");

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: productName,
          text: `Lihat ${productName} di ExPart`,
          url: window.location.href,
        });
        setShareLabel("Dibagikan");
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShareLabel("Tautan disalin");
      }
    } catch {
      setShareLabel("Bagikan");
    }
  }

  return (
    <div className="hidden lg:flex items-center justify-between pt-2 border-t border-mist">
      <button
        type="button"
        onClick={share}
        className="flex items-center gap-1.5 text-sm text-body hover:text-primary transition cursor-pointer"
      >
        <i className="ri-share-line text-xl" />
        {shareLabel}
      </button>
      <button
        type="button"
        onClick={() => setWishlisted((value) => !value)}
        aria-pressed={wishlisted}
        className={`flex items-center gap-1.5 text-sm transition cursor-pointer ${
          wishlisted ? "text-danger" : "text-hint hover:text-danger"
        }`}
      >
        <i
          className={`${wishlisted ? "ri-heart-fill" : "ri-heart-line"} text-xl`}
        />
        {wishlisted ? "Tersimpan" : "Wishlist"}
      </button>
    </div>
  );
}

export function SellerFollowButton() {
  const [following, setFollowing] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFollowing((value) => !value)}
      aria-pressed={following}
      className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary-surface transition cursor-pointer"
    >
      {following ? "Mengikuti" : "Ikuti"}
    </button>
  );
}

export function ShippingOptionsButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="self-center text-right">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="text-xs font-bold text-primary hover:underline whitespace-nowrap"
      >
        {open ? "Tutup Pilihan" : "Lihat Kurir Lainnya"}
      </button>
      {open ? (
        <p className="mt-1 text-xs text-body whitespace-nowrap">
          JNE, J&T, SiCepat
        </p>
      ) : null}
    </div>
  );
}
