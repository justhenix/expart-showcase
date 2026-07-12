"use client";

import Link from "next/link";
import { useState } from "react";

type Feature = {
  text: string;
  icon: string;
  included?: boolean;
};

type Plan = {
  key: "free" | "plus" | "expartism";
  name: string;
  subtitle: string;
  price: string;
  period: string;
  badge?: string;
  ai: Feature[];
  marketplace: Feature[];
  buyer: Feature[];
  cta: string;
};

const plans: Plan[] = [
  {
    key: "free",
    name: "Gratis",
    subtitle: "Pemula",
    price: "Gratis",
    period: "",
    ai: [
      { text: "Exa Lite (Pemeriksaan Dasar)", icon: "ri-brain-line" },
      { text: "5 pemindaian per hari", icon: "ri-scan-line" },
      { text: "Estimasi Harga Cepat", icon: "ri-flashlight-line" },
      { text: "Analisis Mendalam Terbatas", icon: "ri-line-chart-line" },
    ],
    marketplace: [
      { text: "Biaya Admin 5%", icon: "ri-percent-line" },
      { text: "Visibilitas Standar", icon: "ri-eye-line" },
      { text: "Akses Marketplace", icon: "ri-store-2-line" },
      { text: "Lencana Penjual Terverifikasi", icon: "ri-verified-badge-line", included: false },
    ],
    buyer: [],
    cta: "Paket Aktif",
  },
  {
    key: "plus",
    name: "ExPart Plus",
    subtitle: "Nilai Terbaik",
    price: "Rp 25.000",
    period: "/bulan",
    badge: "Paling Populer",
    ai: [
      { text: "Exa Pro (Analisis Mendalam)", icon: "ri-brain-line" },
      { text: "50 pemindaian per hari", icon: "ri-scan-line" },
      { text: "Analisis Pasar Mendalam", icon: "ri-line-chart-line" },
      { text: "Tren dan Perbandingan Harga", icon: "ri-funds-line" },
    ],
    marketplace: [
      { text: "Biaya Admin hanya 2%", icon: "ri-percent-line" },
      { text: "Visibilitas 5x Lebih Tinggi", icon: "ri-rocket-line" },
      { text: "Lencana Penjual Terverifikasi", icon: "ri-verified-badge-line" },
      { text: "Dukungan Prioritas", icon: "ri-customer-service-2-line" },
    ],
    buyer: [
      { text: "Gratis Ongkir s/d 20rb (5x/bulan)", icon: "ri-truck-line" },
      { text: "Garansi Retur Ekstra 7 Hari", icon: "ri-shield-check-line" },
    ],
    cta: "Upgrade Sekarang",
  },
  {
    key: "expartism",
    name: "ExPartism",
    subtitle: "Sultan",
    price: "Rp 100.000",
    period: "/bulan",
    badge: "Sultan",
    ai: [
      { text: "Exa Pro (Analisis Mendalam)", icon: "ri-brain-line" },
      { text: "Pemindaian Tanpa Batas", icon: "ri-infinity-line" },
      { text: "Analisis Pasar Mendalam", icon: "ri-line-chart-line" },
      { text: "Akses Fitur Lebih Awal", icon: "ri-flask-line" },
    ],
    marketplace: [
      { text: "Biaya Admin 0%", icon: "ri-gift-line" },
      { text: "Tampil di Banner Beranda", icon: "ri-advertisement-line" },
      { text: "Sultan Golden Badge", icon: "ri-vip-diamond-line" },
      { text: "Dukungan Prioritas WhatsApp", icon: "ri-whatsapp-line" },
    ],
    buyer: [
      { text: "Termasuk semua di Plus", icon: "ri-add-circle-line" },
      { text: "Gratis Ongkir 50x (Puas!)", icon: "ri-truck-line" },
      { text: "Akses Flash Sale 30 Menit Awal", icon: "ri-flashlight-line" },
      { text: "Voucher Spesial Bulanan", icon: "ri-coupon-line" },
    ],
    cta: "Jadi Sultan",
  },
];

const faqs = [
  [
    "Apa perbedaan Exa Lite dan Exa Pro?",
    <>
      <strong className="text-emerald-400">Exa Lite</strong> adalah mode cepat
      untuk estimasi harga pasar instan. Cocok untuk pengecekan standar.{" "}
      <strong className="text-emerald-400">Exa Pro</strong> menggunakan deep
      penalaran mendalam dengan akurasi lebih tinggi. Mode ini dapat mendeteksi
      kerusakan ringan, membandingkan harga dari berbagai platform, dan
      memberikan saran penjualan yang lebih praktis.
    </>,
  ],
  [
    'Apa keuntungan "Biaya Admin 0%" di ExPartism?',
    <>
      Biasanya setiap transaksi di ExPart dipotong biaya admin 5% (Free) atau 2%
      (Plus). Dengan{" "}
      <strong className="text-amber-500 dark:text-amber-400">ExPartism</strong>,
      kamu <strong className="text-gray-900 dark:text-white">tidak dipotong sama sekali</strong>.
      Kalau kamu jualan 10 juta/bulan, itu berarti hemat Rp 500.000!
    </>,
  ],
  [
    "Bagaimana cara meningkatkan paket langganan?",
    <>
      Klik tombol &quot;Upgrade Sekarang&quot; pada paket yang kamu inginkan.
      Kamu akan diarahkan ke halaman pembayaran yang aman. Setelah pembayaran
      berhasil, paket langganan langsung aktif.
    </>,
  ],
  [
    "Apakah paket bisa diturunkan atau dibatalkan?",
    <>
      Ya, kamu bisa membatalkan kapan saja. Paket tetap aktif sampai periode
      berlangganan habis, lalu akun otomatis kembali ke paket Gratis.
    </>,
  ],
  [
    'Apa itu fitur "Tampil di Banner Beranda"?',
    <>
      Khusus member{" "}
      <strong className="text-amber-500 dark:text-amber-400">ExPartism</strong>,
      produk terbaik kamu bisa tampil di banner homepage ExPart untuk exposure
      maksimal.
    </>,
  ],
] as const;

function FeatureList({
  features,
  color,
}: {
  features: Feature[];
  color: "emerald" | "amber" | "cyan";
}) {
  const active = {
    emerald: "text-emerald-400",
    amber: "text-amber-400",
    cyan: "text-cyan-400",
  }[color];

  return (
    <ul className="space-y-2">
      {features.map((feature) => {
        const included = feature.included !== false;
        return (
          <li key={feature.text} className="flex items-center gap-3">
            <i className={`${feature.icon} ${included ? active : "text-gray-600"} text-sm w-4`} />
            <span className={included ? "text-gray-700 dark:text-gray-300 text-sm leading-snug" : "text-gray-400 dark:text-gray-600 text-sm line-through"}>
              {feature.text}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function MembershipPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4 backdrop-blur-sm">
            <i className="ri-vip-crown-line" /> Paket Langganan
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Pilih Paket yang Cocok Buatmu
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Buka fitur AI premium dan keuntungan marketplace eksklusif untuk
            bisnis gadgetmu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan) => {
            const featured = plan.key === "plus";
            const current = plan.key === "free";
            return (
              <div key={plan.key} className="relative group h-full">
                {featured ? (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-2xl blur-sm opacity-50 group-hover:opacity-70 transition duration-500" />
                ) : null}
                <div className={`relative h-full flex flex-col rounded-2xl border ${featured ? "border-emerald-500/50" : "border-gray-200 dark:border-gray-700/50"} bg-white dark:bg-gray-800/50 backdrop-blur-xl p-6 lg:p-8 transition-all duration-300 hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10`}>
                  {plan.badge ? (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shadow-lg ${featured ? "bg-emerald-500 text-white" : "bg-gradient-to-r from-amber-500 to-orange-500 text-white"}`}>
                        <i className={plan.badge === "Sultan" ? "ri-vip-diamond-fill" : "ri-fire-fill"} />
                        {plan.badge}
                      </span>
                    </div>
                  ) : null}
                  <div className="text-center mb-6 pt-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                    <p className="text-sm text-gray-500">{plan.subtitle}</p>
                  </div>
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-4xl font-bold ${featured ? "text-emerald-500 dark:text-emerald-400" : "text-gray-900 dark:text-white"}`}>{plan.price}</span>
                      {plan.period ? <span className="text-gray-500 text-sm">{plan.period}</span> : null}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <i className="ri-robot-line text-emerald-400 text-sm" />
                      </div>
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Fitur AI</span>
                    </div>
                    <FeatureList features={plan.ai} color="emerald" />
                  </div>

                  <div className="mb-4 grow">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <i className="ri-store-2-line text-amber-400 text-sm" />
                      </div>
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">Marketplace</span>
                    </div>
                    <FeatureList features={plan.marketplace} color="amber" />
                  </div>

                  {plan.buyer.length ? (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                          <i className="ri-shopping-bag-line text-cyan-400 text-sm" />
                        </div>
                        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wide">Keuntungan Pembeli</span>
                      </div>
                      <FeatureList features={plan.buyer} color="cyan" />
                    </div>
                  ) : null}

                  {current ? (
                    <button
                      type="button"
                      disabled
                      className="mt-auto w-full py-3 px-6 rounded-xl font-bold text-sm bg-gray-100 dark:bg-gray-700/50 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700 opacity-50 cursor-not-allowed"
                    >
                      <i className="ri-check-line mr-1" /> {plan.cta}
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      className={`mt-auto w-full py-3 px-6 rounded-xl font-bold text-sm text-center transition-all duration-300 cursor-pointer ${featured ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50" : "bg-gray-100 dark:bg-gray-700/50 border border-emerald-500/50 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500"}`}
                    >
                      {plan.cta}
                      {featured ? <i className="ri-arrow-right-line ml-1" /> : null}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">Pertanyaan Umum</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map(([question, answer], index) => {
              const open = openFaq === index;
              return (
                <div key={question} className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 rounded-xl overflow-hidden backdrop-blur-sm">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left cursor-pointer hover:bg-gray-700/30 transition-colors"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">{question}</span>
                    <i className={`ri-arrow-down-s-line text-xl text-emerald-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open ? <div className="px-4 pb-4"><p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{answer}</p></div> : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-gray-500 dark:text-gray-400 text-sm">
            <div className="flex items-center gap-2"><i className="ri-shield-check-line text-emerald-400" /><span>Pembayaran aman & terenkripsi</span></div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2"><i className="ri-refund-line text-emerald-400" /><span>30 hari garansi uang kembali</span></div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-2"><i className="ri-customer-service-2-line text-emerald-400" /><span>Support 24/7</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
