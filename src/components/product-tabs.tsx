"use client";

import { useState } from "react";
import type { Product } from "@/data/catalog";
import { formatCondition } from "@/lib/format";

export function ProductTabs({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<"detail" | "specs" | "info">(
    "detail",
  );

  return (
    <div className="bg-card rounded-xl border border-mist shadow-sm overflow-hidden">
      <div className="flex border-b border-mist">
        {[
          ["detail", "Detail"],
          ["specs", "Spesifikasi"],
          ["info", "Info Penting"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setActiveTab(value as typeof activeTab)}
            className={`flex-1 py-3 px-4 text-sm font-semibold transition cursor-pointer ${
              activeTab === value
                ? "text-primary border-b-2 border-primary"
                : "text-body hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="p-5 min-h-75">
        {activeTab === "detail" ? (
          <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
            <p>
              {product.name} dalam kondisi{" "}
              {formatCondition(product.condition).toLowerCase()}.
              Produk ini telah melalui proses verifikasi Exa AI untuk memastikan
              kualitas dan kewajaran harga.
            </p>
            <p className="mt-3">
              Semua produk di ExPart telah diverifikasi oleh tim kami dan
              didukung oleh garansi pengembalian 7 hari jika barang tidak sesuai
              deskripsi.
            </p>
          </div>
        ) : null}

        {activeTab === "specs" ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-4">
            <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100 dark:border-slate-800">
              <span className="text-sm text-gray-500 dark:text-gray-400 min-w-30">
                Kondisi
              </span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {formatCondition(product.condition)}
              </span>
            </div>
            {product.specs.map((spec, index) => (
              <div
                key={spec}
                className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-gray-100 dark:border-slate-800"
              >
                <span className="text-sm text-gray-500 dark:text-gray-400 min-w-30">
                  Spesifikasi {index + 1}
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {spec}
                </span>
              </div>
            ))}
          </div>
        ) : null}

        {activeTab === "info" ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-50 dark:bg-slate-800 rounded-full mb-3">
              <i className="ri-file-info-line text-2xl text-gray-300" />
            </div>
            <p className="text-gray-400 text-sm">
              Belum ada informasi kebijakan toko.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
