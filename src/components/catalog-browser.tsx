"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/data/catalog";
import { formatCondition } from "@/lib/format";

const categoryIcons = [
  "ri-apps-line",
  "ri-macbook-line",
  "ri-smartphone-line",
  "ri-cpu-line",
  "ri-tablet-line",
  "ri-mouse-line",
  "ri-camera-line",
  "ri-headphone-line",
  "ri-computer-line",
  "ri-gamepad-line",
  "ri-router-line",
] as const;

const conditions = ["new", "like new", "good", "fair", "minus", "kanibalan"];
const hasRatings = products.some((product) => product.rating > 0);

export function CatalogBrowser() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "";
  const initialQuery =
    searchParams.get("search") ?? searchParams.get("q") ?? "";

  return (
    <CatalogBrowserContent
      key={`${initialCategory}:${initialQuery}`}
      initialCategory={initialCategory}
      initialQuery={initialQuery}
    />
  );
}

function CatalogBrowserContent({
  initialCategory,
  initialQuery,
}: {
  initialCategory: string;
  initialQuery: string;
}) {
  const [query, setQuery] = useState(
    initialQuery,
  );
  const [category, setCategory] = useState(
    products.some((product) => product.categorySlug === initialCategory)
      ? initialCategory
      : "",
  );
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [sort, setSort] = useState("relevance");

  const result = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const min = Number(minPrice) || 0;
    const max = Number(maxPrice) || Number.POSITIVE_INFINITY;
    const filtered = products.filter((product) => {
      const condition = product.condition.toLowerCase();
      return (
        (!normalized ||
          `${product.name} ${product.category} ${product.seller}`
            .toLowerCase()
            .includes(normalized)) &&
        (!category || product.categorySlug === category) &&
        (!selectedConditions.length ||
          selectedConditions.includes(condition)) &&
        product.price >= min &&
        product.price <= max &&
        (!rating || product.rating >= Number(rating))
      );
    });

    return filtered.toSorted((a, b) => {
      if (sort === "newest") return b.id - a.id;
      if (sort === "lowest_price") return a.price - b.price;
      if (sort === "highest_price") return b.price - a.price;
      return b.trustScore - a.trustScore;
    });
  }, [category, maxPrice, minPrice, query, rating, selectedConditions, sort]);

  function reset() {
    setQuery("");
    setCategory("");
    setSelectedConditions([]);
    setMinPrice("");
    setMaxPrice("");
    setRating("");
    setSort("relevance");
  }

  function toggleCondition(condition: string) {
    setSelectedConditions((current) =>
      current.includes(condition)
        ? current.filter((value) => value !== condition)
        : [...current, condition],
    );
  }

  return (
    <div className="min-h-screen bg-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-heading">Kategori</h2>
          <div className="flex overflow-x-auto pb-4 gap-4 md:grid md:grid-cols-5 lg:grid-cols-11 md:gap-6 no-scrollbar pt-2">
            {categories.map((item, index) => {
              const slug =
                item === "Semua"
                  ? ""
                  : products.find((product) => product.category === item)
                      ?.categorySlug ?? item.toLowerCase();
              const active = category === slug;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(slug)}
                  className="flex flex-col items-center gap-2 min-w-20 group cursor-pointer"
                >
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl border flex items-center justify-center transition-all duration-300 shadow-sm ${
                      active
                        ? "bg-primary border-primary text-white"
                        : "bg-card border-mist text-hint group-hover:border-primary group-hover:bg-primary-surface group-hover:text-primary group-hover:shadow-md group-hover:-translate-y-1"
                    }`}
                  >
                    <i
                      className={`${categoryIcons[index]} text-2xl md:text-3xl transition-colors`}
                    />
                  </div>
                  <span
                    className={`text-xs md:text-sm font-medium text-center whitespace-nowrap transition-colors ${
                      active
                        ? "text-primary"
                        : "text-body group-hover:text-primary"
                    }`}
                  >
                    {item}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-8 items-start">
          <aside className="w-64 shrink-0 hidden lg:block space-y-6 sticky top-24">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-heading text-lg">Filter</h3>
              <button
                type="button"
                onClick={reset}
                className="text-primary text-sm font-medium hover:underline"
              >
                Reset
              </button>
            </div>

            <div className="bg-card rounded-xl shadow-sm border border-mist p-4">
              <h4 className="font-bold text-heading mb-3 text-sm">Harga</h4>
              <div className="flex flex-col gap-3">
                {[
                  [minPrice, setMinPrice, "Minimum"],
                  [maxPrice, setMaxPrice, "Maksimum"],
                ].map(([value, setter, placeholder]) => (
                  <div key={placeholder as string} className="relative">
                    <span className="absolute left-3 top-2.5 text-hint text-sm">
                      Rp
                    </span>
                    <input
                      type="number"
                      value={value as string}
                      onChange={(event) =>
                        (setter as React.Dispatch<React.SetStateAction<string>>)(
                          event.target.value,
                        )
                      }
                      placeholder={placeholder as string}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-mist bg-page text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-hint dark:text-white"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl shadow-sm border border-mist p-4">
              <h4 className="font-bold text-heading mb-3 text-sm">Kondisi</h4>
              <div className="space-y-2">
                {conditions.map((condition) => (
                  <label
                    key={condition}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedConditions.includes(condition)}
                      onChange={() => toggleCondition(condition)}
                      className="rounded text-primary border-mist focus:ring-primary h-4 w-4 bg-card"
                    />
                    <span className="text-sm text-body group-hover:text-heading">
                      {formatCondition(
                        products.find(
                          (product) =>
                            product.condition.toLowerCase() === condition,
                        )?.condition ?? condition,
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {hasRatings ? (
              <div className="bg-card rounded-xl shadow-sm border border-mist p-4">
                <h4 className="font-bold text-heading mb-3 text-sm">Rating</h4>
                <div className="space-y-2">
                  {[5, 4, 3].map((stars) => (
                    <label
                      key={stars}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="rating"
                        value={stars}
                        checked={rating === String(stars)}
                        onChange={(event) => setRating(event.target.value)}
                        className="text-primary border-mist focus:ring-primary h-4 w-4 bg-card"
                      />
                      <span className="flex items-center text-warning">
                        {Array.from({ length: 5 }, (_, index) => (
                          <i
                            key={index}
                            className={
                              index < stars
                                ? "ri-star-fill"
                                : "ri-star-line text-mist"
                            }
                          />
                        ))}
                      </span>
                      <span className="text-sm text-body">ke atas</span>
                    </label>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>

          <div className="flex-1 w-full min-w-0">
            <div className="bg-card rounded-xl p-4 shadow-sm border border-mist mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full sm:max-w-md">
                <i className="ri-search-2-line absolute left-3 top-1/2 -translate-y-1/2 text-hint text-lg" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  type="text"
                  placeholder="Cari Produk di ExPart..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-mist bg-page text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder-hint dark:text-white"
                />
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-sm text-body whitespace-nowrap">
                  Urutkan:
                </span>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="flex-1 sm:flex-none py-2.5 pl-3 pr-8 rounded-lg border border-mist bg-page text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer text-heading font-medium dark:text-white"
                >
                  <option value="relevance">Paling Sesuai</option>
                  <option value="newest">Terbaru</option>
                  <option value="lowest_price">Harga Terendah</option>
                  <option value="highest_price">Harga Tertinggi</option>
                </select>
              </div>
            </div>

            {query ? (
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-surface text-primary text-xs font-medium border border-primary/20">
                  Search: {query}
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Hapus pencarian"
                  >
                    <i className="ri-close-line" />
                  </button>
                </span>
              </div>
            ) : null}

            {result.length ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {result.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="col-span-full py-16 text-center">
                <img
                  src="/assets/exa/empty.webp"
                  alt="Produk tidak ditemukan"
                  loading="eager"
                  className="w-64 h-auto mx-auto mb-6"
                />
                <h3 className="text-lg font-bold text-heading mb-1">
                  Produk tidak ditemukan
                </h3>
                <p className="text-body text-sm mb-6">
                  Coba kurangi filter atau gunakan kata kunci lain.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="text-primary font-medium hover:underline"
                >
                  Hapus Semua Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
