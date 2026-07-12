"use client";

import Link from "next/link";
import { useState } from "react";
import { productThumbnail, type Product } from "@/data/catalog";
import { formatCondition } from "@/lib/format";

function conditionClass(condition: Product["condition"]) {
  const status = condition.toLowerCase();
  if (status === "new")
    return "bg-gradient-to-r from-cyan-400 to-emerald-500 shadow-cyan-400/30 border-none";
  if (status === "like new") return "bg-primary";
  if (status === "good") return "bg-primary-hover";
  if (status === "fair" || status === "minus") return "bg-warning";
  if (status === "kanibalan") return "bg-danger";
  return "bg-hint";
}

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const [wishlisted, setWishlisted] = useState(false);
  const thumbnail = productThumbnail(product.image);

  return (
    <div className="group w-full h-full bg-card rounded-xl overflow-hidden relative cursor-pointer shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
        <Link
          href={`/product/${product.slug}`}
          aria-label={`Lihat ${product.name}`}
          className="absolute inset-0 z-10 rounded-xl"
        />
        <div className="relative w-full aspect-square bg-page flex items-center justify-center overflow-hidden shrink-0">
          <img
            src={thumbnail}
            alt={product.name}
            width="400"
            height="400"
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className={`absolute top-3 left-3 z-10 px-2.5 py-1.5 rounded-lg text-white text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm ${conditionClass(product.condition)}`}>
            {formatCondition(product.condition)}
          </span>
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setWishlisted((value) => !value);
            }}
            className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 bg-white/95 dark:bg-gray-800/95 rounded-full flex items-center justify-center shadow transition-all duration-200 hover:scale-110 border-none cursor-pointer opacity-0 group-hover:opacity-100 ${
              wishlisted ? "text-danger" : "text-hint hover:text-danger"
            }`}
            aria-label={
              wishlisted ? "Hapus dari wishlist" : "Tambahkan ke wishlist"
            }
            aria-pressed={wishlisted}
          >
            <i className={`${wishlisted ? "ri-heart-fill" : "ri-heart-line"} text-xl transition-colors duration-200`} />
          </button>
        </div>

        <div className="p-3 flex flex-col flex-1">
          <h3 className="text-sm font-medium text-heading line-clamp-2 leading-snug mb-1 min-h-10">
            {product.name}
          </h3>
          {product.rating || product.sold ? (
            <div className="flex items-center gap-1.5 mb-2 text-[11px]">
              {product.rating ? (
                <div className="flex items-center gap-1 text-warning font-semibold">
                  <i className="ri-star-fill text-xs" />
                  <span>{product.rating}</span>
                </div>
              ) : null}
              {product.rating && product.sold ? <span className="text-mist">•</span> : null}
              {product.sold ? <span className="text-body">{product.sold} terjual</span> : null}
            </div>
          ) : (
            <div className="h-5 mb-2" />
          )}
          <div className="mb-2">
            <div className="text-base font-bold text-primary">
              Rp {product.price.toLocaleString("id-ID")}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="text-[10px] text-hint line-through">
                Rp {product.originalPrice.toLocaleString("id-ID")}
              </div>
            </div>
          </div>
          <div className="h-9 border-t border-mist mt-auto flex items-center justify-between relative overflow-hidden group/footer pt-0">
            <div className="relative w-full h-full flex items-center overflow-hidden flex-1 mr-2">
              <div className="absolute inset-0 flex items-center gap-1.5 transition-opacity duration-300 opacity-100 group-hover:opacity-0 text-body text-[11px]">
                <i className="ri-store-2-line text-xs text-hint shrink-0" />
                <span className="truncate">{product.seller}</span>
              </div>
              <div className="absolute inset-0 flex items-center gap-1.5 transition-opacity duration-300 opacity-0 group-hover:opacity-100 text-body text-[11px]">
                <i className="ri-map-pin-line text-xs text-hint shrink-0" />
                <span className="truncate">{product.location}</span>
              </div>
            </div>
            <div className="shrink-0 flex items-center">
              <div className="flex items-center gap-1 bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded ml-auto">
                <i className="ri-verified-badge-fill text-[10px]" />
                <span>Terverifikasi</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-mist transition-colors duration-300 group-hover:ring-primary pointer-events-none z-50" />
    </div>
  );
}
