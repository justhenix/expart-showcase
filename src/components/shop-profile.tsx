"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { productThumbnail, products } from "@/data/catalog";
import { discountOf, formatIDR } from "@/lib/format";

const shopProducts = products;
const categories = [...new Set(shopProducts.map((product) => product.category))];

export function ShopProfile() {
  const [category, setCategory] = useState<string | null>(null);
  const [sort, setSort] = useState("terbaru");
  const [sortOpen, setSortOpen] = useState(false);
  const [following, setFollowing] = useState(false);

  const visibleProducts = useMemo(() => {
    const selected = category
      ? shopProducts.filter((product) => product.category === category)
      : shopProducts;
    return [...selected].sort((a, b) => {
      if (sort === "terlaris") return b.sold - a.sold;
      if (sort === "termurah") return a.price - b.price;
      if (sort === "termahal") return b.price - a.price;
      return b.id - a.id;
    });
  }, [category, sort]);

  const sortLabel =
    {
      terbaru: "Terbaru",
      terlaris: "Terlaris",
      termurah: "Termurah",
      termahal: "Termahal",
    }[sort] ?? "Terbaru";

  return (
    <div className="min-h-screen bg-page">
      <div className="relative">
        <div className="h-48 md:h-64 w-full overflow-hidden">
          <div className="w-full h-full bg-linear-to-br from-primary/30 via-primary/10 to-card" />
        </div>

        <div className="bg-card border-b border-mist">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 py-4">
              <div className="-mt-16 sm:-mt-12 shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-card bg-page overflow-hidden shadow-lg">
                  <img
                    src="/expart-logo.svg"
                    alt="ExPart Demo Store"
                    className="w-full h-full object-contain p-3"
                  />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left pb-2">
                <h1 className="text-2xl font-bold text-heading flex items-center justify-center sm:justify-start gap-2">
                  ExPart Demo Store
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 bg-info rounded-full"
                    title="Penjual Terverifikasi"
                  >
                    <i className="ri-check-line text-white text-xs" />
                  </span>
                </h1>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-sm text-body mt-1">
                  <span className="flex items-center gap-1">
                    <i className="ri-map-pin-line text-hint" />
                    Semarang
                  </span>
                  <span className="text-hint hidden sm:inline">•</span>
                  <span>{shopProducts.length} Produk</span>
                  <span className="text-hint">•</span>
                  <span>
                    0 Terjual
                  </span>
                  <span className="text-hint">•</span>
                  <span className="text-hint">Bergabung Februari 2026</span>
                </div>
              </div>

              <div className="flex gap-3 pb-2">
                <button
                  type="button"
                  onClick={() => setFollowing((value) => !value)}
                  aria-pressed={following}
                  className="px-5 py-2 rounded-full border border-primary text-primary text-sm font-medium hover:bg-primary-surface transition flex items-center gap-2"
                >
                  <i
                    className={
                      following ? "ri-user-follow-line" : "ri-user-add-line"
                    }
                  />
                  {following ? "Mengikuti" : "Ikuti"}
                </button>
                <Link
                  href="/chat"
                  className="px-5 py-2 rounded-full bg-primary text-white text-sm font-bold hover:bg-primary-hover transition flex items-center gap-2 shadow-sm"
                >
                  <i className="ri-chat-1-line" />
                  Chat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="bg-card rounded-xl border border-mist p-4 sticky top-4">
              <h3 className="font-bold text-heading mb-3 flex items-center gap-2">
                <i className="ri-store-2-line text-primary" />
                Etalase Toko
              </h3>

              <ul className="space-y-1">
                <li>
                  <button
                    type="button"
                    onClick={() => setCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                      category === null
                        ? "bg-primary-surface text-primary font-medium"
                        : "text-body hover:bg-page hover:text-heading"
                    }`}
                  >
                    Semua Produk
                  </button>
                </li>
                {categories.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                        category === item
                          ? "bg-primary-surface text-primary font-medium"
                          : "text-body hover:bg-page hover:text-heading"
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 border-t border-mist">
                <h4 className="text-xs font-medium text-hint uppercase mb-2">
                  Deskripsi Toko
                </h4>
                <p className="text-sm text-body">
                  Gadget bekas terverifikasi dengan informasi kondisi
                  transparan.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-lg font-bold text-heading">
                {category ?? "Semua Produk"}{" "}
                <span className="text-sm font-normal text-hint">
                  ({visibleProducts.length})
                </span>
              </h2>

              <div className="flex items-center gap-2">
                <span className="text-sm text-body">Urutkan:</span>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSortOpen((open) => !open)}
                    aria-label="Pilih urutan produk"
                    aria-expanded={sortOpen}
                    className="flex items-center gap-2 px-4 py-2 bg-card border border-mist rounded-lg text-sm text-heading hover:border-primary transition"
                  >
                    <span>{sortLabel}</span>
                    <i
                      className={`ri-arrow-down-s-line text-hint transition ${
                        sortOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {sortOpen ? (
                    <div className="absolute right-0 mt-2 w-40 bg-card border border-mist rounded-lg shadow-xl z-20 py-1">
                      {[
                        ["terbaru", "Terbaru"],
                        ["terlaris", "Terlaris"],
                        ["termurah", "Termurah"],
                        ["termahal", "Termahal"],
                      ].map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            setSort(value);
                            setSortOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-page transition ${
                            sort === value
                              ? "text-primary font-medium"
                              : "text-body"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {visibleProducts.map((product) => {
                const discount = discountOf(
                  product.price,
                  product.originalPrice,
                );
                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="group bg-card rounded-xl border border-mist overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-200"
                  >
                    <div className="aspect-square overflow-hidden bg-page relative">
                      <img
                        src={productThumbnail(product.image)}
                        alt={product.name}
                        width="400"
                        height="400"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {discount > 0 ? (
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-danger text-white text-xs font-bold rounded">
                          {discount}%
                        </span>
                      ) : null}
                      <span
                        className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                        title="Terverifikasi Exa"
                      >
                        <i className="ri-shield-check-fill text-white text-xs" />
                      </span>
                    </div>

                    <div className="p-3">
                      <h3 className="text-sm text-heading font-medium line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-base font-bold text-primary mt-2">
                        {formatIDR(product.price)}
                      </p>
                      {product.originalPrice > product.price ? (
                        <p className="text-xs text-hint line-through">
                          {formatIDR(product.originalPrice)}
                        </p>
                      ) : null}
                      <div className="flex items-center gap-2 mt-2 text-xs text-hint">
                        {product.sold > 0 ? (
                          <span>{product.sold} terjual</span>
                        ) : null}
                        {product.rating > 0 ? (
                          <span className="flex items-center gap-0.5">
                            <i className="ri-star-fill text-warning" />
                            {product.rating.toFixed(1)}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
