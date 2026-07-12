"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/catalog";

const iconCategories = [
  ["Laptop", "ri-macbook-line", "laptop"],
  ["Smartphone", "ri-smartphone-line", "smartphone"],
  ["Komponen PC", "ri-cpu-line", "komponen-pc"],
  ["Tablet", "ri-tablet-line", "tablet"],
  ["Aksesoris", "ri-mouse-line", "aksesoris"],
  ["Kamera", "ri-camera-line", "kamera"],
  ["Audio", "ri-headphone-line", "audio"],
  ["Monitor", "ri-computer-line", "monitor"],
  ["Gaming", "ri-gamepad-line", "gaming"],
  ["Networking", "ri-router-line", "networking"],
] as const;

export function LegacyHome() {
  const [slide, setSlide] = useState(0);
  const [shown, setShown] = useState(18);

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((value) => (value + 1) % 2), 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg md:h-80 group">
          <div
            className="flex h-full ease-out transition-transform duration-500"
            style={{ transform: `translateX(-${slide * 100}%)` }}
          >
            <div className="w-full h-full shrink-0 relative bg-linear-to-r from-emerald-900 to-emerald-600">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 py-8 md:px-12 md:py-0 gap-6 md:gap-12">
                <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-800/50 border border-emerald-500/30 text-emerald-100 text-xs font-medium backdrop-blur-sm">
                    Solusi Gadget Hemat & Berkelanjutan
                  </span>
                  <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                    Upgrade Gadget Impian, <br className="hidden md:block" />{" "}
                    <span className="text-emerald-200">Harga Anak Kosan.</span>
                  </h1>
                  <p className="text-sm md:text-base text-emerald-50/90 leading-relaxed max-w-xl mx-auto md:mx-0 hidden sm:block">
                    Marketplace barang bekas pertama dengan validasi Exa AI. <br />
                    Anti-scam, transparan.
                  </p>
                  <div className="pt-2">
                    <Link href="/browse" className="inline-block bg-white text-emerald-700 hover:bg-emerald-50 font-bold text-sm md:text-base px-6 py-2.5 rounded-xl shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95 cursor-pointer">
                      Cari Gadget Murah
                    </Link>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center md:justify-end h-40 md:h-full items-center">
                  <div className="relative w-full h-full max-h-64 md:max-h-full flex items-center justify-center md:justify-end animate-float">
                    <div className="absolute bg-emerald-400 blur-3xl opacity-20 rounded-full w-48 h-48" />
                    <img
                      src="/assets/exa/optimized/hero.webp"
                      alt="Exa Mascot"
                      width="500"
                      height="600"
                      fetchPriority="high"
                      decoding="async"
                      className="relative z-10 h-full w-auto object-contain drop-shadow-2xl py-4 md:py-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-full shrink-0 relative bg-linear-to-r from-gray-900 via-emerald-900 to-emerald-800">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-10 right-20 w-40 h-40 bg-emerald-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
              </div>
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 py-8 md:px-12 md:py-0 gap-6 md:gap-12">
                <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-medium backdrop-blur-sm">
                    <i className="ri-vip-crown-fill text-amber-400" />
                    Langganan ExPart Plus
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                    Buka <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 to-emerald-400">ExPart Plus</span>{" "}
                    <br className="hidden md:block" /> untuk Analisis Lebih Cerdas!
                  </h2>
                  <p className="text-sm md:text-base text-emerald-100/80 leading-relaxed max-w-xl mx-auto md:mx-0 hidden sm:block">
                    Analisis AI mendalam dengan akurasi tinggi. Deteksi kerusakan ringan, estimasi harga presisi, dan keuntungan marketplace eksklusif.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <Link href="/membership" className="inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 font-bold text-sm md:text-base px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-900/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-1 active:scale-95 cursor-pointer ring-2 ring-white/50">
                      <i className="ri-rocket-line" />
                      Lihat Paket Langganan
                    </Link>
                    <span className="text-emerald-200/70 text-sm hidden sm:block">Mulai dari Rp 25.000/bulan</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center">
                  <div className="grid grid-cols-2 gap-3 max-w-sm">
                    {[
                      ["ri-brain-line text-pink-400", "Exa Pro", "Analisis Mendalam"],
                      ["ri-money-dollar-circle-line text-amber-400", "Hemat 3% Fee", "Biaya Admin"],
                      ["ri-rocket-2-line text-orange-400", "5x Visibilitas", "Produk Diprioritaskan"],
                      ["ri-verified-badge-fill text-cyan-400", "Terverifikasi", "Lencana Penjual"],
                    ].map(([icon, title, text]) => (
                      <div key={title} className="bg-emerald-500/10 backdrop-blur-sm border border-emerald-400/20 rounded-xl p-4 text-center group transition-colors hover:bg-emerald-500/20">
                        <div className="text-3xl mb-1"><i className={icon} /></div>
                        <div className="text-white font-bold text-sm">{title}</div>
                        <div className="text-emerald-200/60 text-xs">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="button" onClick={() => setSlide((slide + 1) % 2)} aria-label="Slide sebelumnya" className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/50 transition-all cursor-pointer z-20 opacity-0 group-hover:opacity-100 duration-300">
            <i className="ri-arrow-left-s-line text-xl" />
          </button>
          <button type="button" onClick={() => setSlide((slide + 1) % 2)} aria-label="Slide berikutnya" className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center hover:bg-black/50 transition-all cursor-pointer z-20 opacity-0 group-hover:opacity-100 duration-300">
            <i className="ri-arrow-right-s-line text-xl" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {[0, 1].map((index) => (
              <button key={index} type="button" onClick={() => setSlide(index)} className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${slide === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/70"}`} aria-label={`Slide ${index + 1}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto pb-4 gap-4 md:grid md:grid-cols-5 lg:grid-cols-10 md:gap-6 no-scrollbar pt-2">
          {iconCategories.map(([name, icon, slug]) => (
            <Link key={slug} href={`/browse?category=${slug}`} className="flex flex-col items-center gap-2 min-w-20 group cursor-pointer">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-card border border-mist flex items-center justify-center text-hint transition-all duration-300 group-hover:border-primary group-hover:bg-primary-surface group-hover:text-primary shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                <i className={`${icon} text-2xl md:text-3xl transition-colors`} />
              </div>
              <span className="text-xs md:text-sm font-medium text-body group-hover:text-primary transition-colors text-center whitespace-nowrap">{name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary-surface border border-primary rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 shrink-0">
              <img
                src="/assets/exa/optimized/curious-full.webp"
                alt="Exa AI"
                width="112"
                height="112"
                decoding="async"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-heading">Cek Harga Wajar dengan Exa AI</h3>
              <p className="text-sm text-body">Hindari scam dan dapatkan rekomendasi harga terbaik sebelum membeli.</p>
            </div>
          </div>
          <Link href="/exa-ai" className="bg-primary hover:bg-primary-hover text-white font-medium px-6 py-2.5 rounded-lg shadow-sm transition active:scale-95 cursor-pointer">
            Coba Sekarang
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-heading">Rekomendasi Pilihan</h2>
          <Link href="/browse" className="text-primary font-medium text-sm hover:underline cursor-pointer">Lihat Semua</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {products.slice(0, shown).map((product, index) => (
            <div key={product.id} className="col-span-1">
              <ProductCard product={product} priority={index < 6} />
            </div>
          ))}
        </div>
        {shown < products.length ? (
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => setShown(products.length)} className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-primary text-primary font-bold hover:bg-primary-surface transition-colors duration-300 cursor-pointer">
              Lihat lebih banyak <i className="ri-arrow-down-s-line text-lg" />
            </button>
          </div>
        ) : null}
      </section>
    </div>
  );
}
