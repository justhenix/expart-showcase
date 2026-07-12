import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductActions } from "@/components/product-actions";
import { ProductTabs } from "@/components/product-tabs";
import {
  ProductMediaActions,
  SellerFollowButton,
  ShippingOptionsButton,
} from "@/components/product-utilities";
import { findProduct, products } from "@/data/catalog";
import { discountOf, formatCondition, formatIDR } from "@/lib/format";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = findProduct((await params).slug);
  return product
    ? { title: product.name, description: product.description }
    : {};
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = findProduct((await params).slug);
  if (!product) notFound();

  const discount = discountOf(product.price, product.originalPrice);
  const initial = product.seller.charAt(0).toUpperCase();
  const condition = product.condition.toLowerCase();
  const conditionConfig = {
    "new": {
      badge: "bg-gradient-to-r from-cyan-400 to-emerald-500 text-white border-none shadow-md shadow-cyan-400/30",
      card: "bg-gradient-to-br from-cyan-50 to-emerald-50 dark:from-cyan-950/30 dark:to-emerald-950/30 border-cyan-300/60 dark:border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]",
      header: "bg-gradient-to-r from-cyan-500 to-emerald-500",
      pill: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:border-slate-600",
      image: "/assets/exa/happy.webp",
      message: "Wah, barang baru! Masih tersegel dan kondisinya sempurna.",
      score: 75,
      verdict: "Wajar",
    },
    "like new": {
      badge: "bg-primary",
      card: "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border-emerald-300/60 dark:border-emerald-500/30",
      header: "bg-gradient-to-r from-emerald-500 to-green-500",
      pill: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700/50",
      image: "/assets/exa/happy.webp",
      message: "Barang ini nyaris baru. Kondisinya sangat prima dan layak direkomendasikan.",
      score: 98,
      verdict: "Sangat Wajar",
    },
    good: {
      badge: "bg-primary-hover",
      card: "bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 border-green-300/60 dark:border-green-500/30",
      header: "bg-gradient-to-r from-green-500 to-teal-500",
      pill: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-700/50",
      image: "/assets/exa/munyu.webp",
      message: "Kondisinya bagus dengan bekas pemakaian wajar. Masih nyaman digunakan.",
      score: 85,
      verdict: "Wajar",
    },
    fair: {
      badge: "bg-warning",
      card: "bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 border-yellow-300/60 dark:border-yellow-500/30",
      header: "bg-gradient-to-r from-yellow-500 to-amber-500",
      pill: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-700/50",
      image: "/assets/exa/flat.webp",
      message: "Ada bekas pemakaian yang terlihat, tetapi fungsi utamanya masih baik. Periksa sebelum membeli.",
      score: 70,
      verdict: "Cukup Wajar",
    },
    minus: {
      badge: "bg-orange-600",
      card: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-300/60 dark:border-amber-500/30",
      header: "bg-gradient-to-r from-amber-500 to-orange-500",
      pill: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700/50",
      image: "/assets/exa/curious.webp",
      message: "Ada fungsi yang bermasalah. Produk ini cocok untuk pembeli yang siap melakukan perbaikan.",
      score: 55,
      verdict: "Perlu Pertimbangan",
    },
    kanibalan: {
      badge: "bg-danger",
      card: "bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border-red-300/60 dark:border-red-500/30",
      header: "bg-gradient-to-r from-red-500 to-rose-500",
      pill: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700/50",
      image: "/assets/exa/silly.webp",
      message: "Produk ini dijual untuk diambil komponennya. Jangan mengharapkan perangkat dapat menyala.",
      score: 40,
      verdict: "Harga Tinggi untuk Kondisi Ini",
    },
  }[condition] ?? {
    badge: "bg-hint",
    card: "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300/60",
    header: "bg-gradient-to-r from-yellow-500 to-amber-500",
    pill: "bg-gray-100 text-gray-700 border-gray-200",
    image: "/assets/exa/flat.webp",
    message: "Periksa kondisi barang dengan teliti sebelum membeli.",
    score: 75,
    verdict: "Wajar",
  };
  const scoreColor =
    conditionConfig.score >= 90
      ? "#01C950"
      : conditionConfig.score >= 75
        ? "#22C55E"
        : conditionConfig.score >= 60
          ? "#EAB308"
          : conditionConfig.score >= 45
            ? "#F97316"
            : "#EF4444";
  const safetyChecks =
    product.category === "Smartphone" || product.category === "Tablet"
      ? ["Layar Orisinal", "Kesehatan Baterai >80%", "Kamera Jernih", "Tanpa Penyok atau Goresan Besar"]
      : product.category === "Laptop"
        ? ["Layar Tanpa Piksel Mati", "Kesehatan Baterai >70%", "Keyboard Normal", "Engsel Kokoh"]
        : ["Kondisi Fisik Sesuai", "Fungsi Utama Normal", "Foto Produk Jelas", "Harga Sesuai Pasar"];

  return (
    <div className="bg-page min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-body">
          <Link href="/" className="hover:text-primary transition">
            Beranda
          </Link>
          <i className="ri-arrow-right-s-line text-hint" />
          <Link
            href={`/browse?category=${product.categorySlug}`}
            className="text-hint hover:text-primary transition"
          >
            {product.category}
          </Link>
          <i className="ri-arrow-right-s-line text-hint" />
          <span className="text-heading font-medium truncate max-w-xs">
            {product.name}
          </span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-20 space-y-3">
              <div className="aspect-square bg-card rounded-xl overflow-hidden shadow-sm border border-mist">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-5 gap-2">
                <div className="aspect-square bg-card rounded-lg overflow-hidden ring-2 ring-primary">
                  <img
                    src={product.image}
                    alt={`Pratinjau ${product.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <ProductMediaActions productName={product.name} />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div className="bg-card rounded-xl p-5 border border-mist shadow-sm">
              <div className="flex items-center gap-2 mb-3 relative">
                <span
                  className={`inline-flex px-2 py-1 rounded-md text-white text-[10px] font-bold uppercase tracking-wider shadow-sm ${conditionConfig.badge}`}
                >
                  {formatCondition(product.condition)}
                </span>
                <i className="ri-information-line text-hint" />
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                  Barang Bekas
                </span>
              </div>

              <h1 className="text-xl font-bold text-heading leading-tight mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-heading">
                    {product.sold > 0
                      ? `${product.sold}+ terjual`
                      : "Belum terjual"}
                  </span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center gap-1">
                  {product.rating > 0 ? (
                    <>
                      <i className="ri-star-fill text-amber-400" />
                      <span className="font-semibold text-heading">
                        {product.rating}
                      </span>
                    </>
                  ) : (
                    <span className="text-body">Belum ada ulasan</span>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-mist">
                <p className="text-3xl font-bold text-heading">
                  {formatIDR(product.price)}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-400 line-through">
                    {formatIDR(product.originalPrice)}
                  </span>
                  <span className="bg-danger-surface text-danger text-xs font-bold px-1.5 py-0.5 rounded">
                    {discount}%
                  </span>
                </div>
              </div>
            </div>

            <div className={`${conditionConfig.card} border rounded-xl overflow-hidden shadow-sm`}>
              <div className={`${conditionConfig.header} px-4 py-3 flex items-center gap-3`}>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white shrink-0">
                  <i className="ri-shield-check-fill" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white truncate">
                    Analisis Kondisi & Harga
                  </h3>
                  <p className="text-[11px] text-white/80">Didukung Exa AI</p>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/20 rounded-full text-[10px] font-semibold text-white backdrop-blur-sm shrink-0">
                  <i className="ri-sparkling-fill" />
                  Terverifikasi AI
                </span>
              </div>
              <div className="p-3">
                <div className="flex flex-row gap-3">
                  <div className="shrink-0 flex items-start">
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white/50 dark:bg-slate-800/50 border border-mist shadow-sm flex items-center justify-center">
                      <img
                        src="/assets/exa/curious.webp"
                        alt="Exa-chan"
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="relative bg-white dark:bg-slate-800 rounded-lg p-2.5 border border-mist shadow-sm">
                      <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                        {conditionConfig.message}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${conditionConfig.pill}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                      Kondisi: {formatCondition(product.condition)}
                    </span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-white/50 space-y-2">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                        Skor Kepercayaan
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {conditionConfig.score}
                        <span className="text-sm text-gray-400 font-normal">
                          /100
                        </span>
                      </span>
                    </div>
                    <div className="h-2.5 bg-mist rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${conditionConfig.score}%`,
                          background: `linear-gradient(90deg, ${scoreColor}, ${scoreColor}dd)`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="bg-white/60 dark:bg-slate-800/60 rounded-lg p-3 border border-mist shadow-sm">
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      Harga tergolong{" "}
                      <span className="font-bold" style={{ color: scoreColor }}>
                        {conditionConfig.verdict}
                      </span>{" "}
                      untuk
                      kondisi{" "}
                      <span className="font-bold text-heading">
                        {formatCondition(product.condition)}
                      </span>
                      .
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {safetyChecks.map((label) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 bg-white/60 dark:bg-slate-800/60 rounded-lg px-3 py-2 border border-mist"
                      >
                        <i className="ri-checkbox-circle-fill text-emerald-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <ProductTabs product={product} />

            <div className="bg-card rounded-xl p-4 border border-mist shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-primary to-primary-hover rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {initial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-heading truncate">
                      {product.seller}
                    </h3>
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded">
                      <i className="ri-checkbox-circle-fill" />
                      Terverifikasi
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-body flex items-center gap-1">
                      <i className="ri-star-fill text-amber-400" /> 4.9
                    </span>
                    <span className="text-mist">•</span>
                    <span className="text-xs text-body flex items-center gap-1">
                      <i className="ri-map-pin-line" />
                      {product.location}
                    </span>
                  </div>
                </div>
                <SellerFollowButton />
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-mist">
              <h3 className="text-lg font-bold text-heading mb-3">Pengiriman</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <i className="ri-map-pin-line text-body text-xl" />
                  <div className="text-sm text-body">
                    Dikirim dari{" "}
                    <span className="font-bold text-heading">
                      {product.location}
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="ri-truck-line text-body text-xl" />
                  <div className="flex-1">
                    <div className="text-sm text-body">
                      Ongkir mulai{" "}
                      <span className="font-bold text-heading">Rp22.000</span>
                    </div>
                    <div className="text-xs text-hint mt-0.5">
                      Reguler • Estimasi tiba 2 - 4 hari
                    </div>
                  </div>
                  <ShippingOptionsButton />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ProductActions price={product.price} />
          </div>
        </div>
      </div>
    </div>
  );
}
