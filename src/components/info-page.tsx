import Link from "next/link";
import { MembershipPage } from "@/components/membership-page";
import { UserAvatar } from "@/components/user-avatar";

type InfoKind = "about" | "mission" | "team" | "membership";

export function InfoPage({ kind }: { kind: InfoKind }) {
  if (kind === "about") return <AboutPage />;
  if (kind === "mission") return <MissionPage />;
  if (kind === "team") return <TeamPage />;
  return <MembershipPage />;
}

function PageShell({
  children,
  tone = "info",
  decorations,
}: {
  children: React.ReactNode;
  tone?: "info" | "success";
  decorations?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-page font-sans text-heading p-4 md:p-8 relative overflow-hidden">
      <div className={`absolute top-0 left-0 w-150 h-150 ${tone === "success" ? "bg-success/30" : "bg-info/30"} rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2`} />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-primary/25 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
      <div className={`absolute top-1/2 right-0 w-75 h-75 ${tone === "success" ? "bg-success/20" : "bg-primary-surface"} rounded-full blur-[80px] translate-x-1/2`} />
      {decorations}
      <div className="relative z-10 w-full max-w-5xl py-8 md:py-16">
        <div className="w-full flex justify-center mb-8">
          <Link href="/">
            <img
              src="/expart-logo.svg"
              alt="ExPart Logo"
              className="h-8 md:h-10"
            />
          </Link>
        </div>
        {children}
        <p className="text-center text-xs text-hint">
          © {new Date().getFullYear()} ExPart. Extend Your Build.
        </p>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <PageShell>
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden p-6 md:p-10 mb-8">
        <div className="text-center mb-12">
          <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            Identitas Merek
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-linear-to-r from-primary via-success to-primary">
            ExPart
          </h1>
          <p className="text-lg md:text-xl text-body font-light max-w-2xl mx-auto leading-relaxed">
            Extend Your Build. <br />
            <span className="text-hint italic text-base">
              Smart Marketplace Gadget dan Komponen Bekas Terintegrasi untuk
              Mendukung Ekonomi Sirkular.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            ["ri-shield-check-line", "bg-primary/15 group-hover:bg-primary/25", "text-primary", "hover:border-primary/40", "Kepercayaan", "Membangun ekosistem jual beli yang aman dan transparan."],
            ["ri-price-tag-3-line", "bg-info/15 group-hover:bg-info/25", "text-info", "hover:border-info/40", "Harga Wajar", "Penetapan harga yang objektif berdasarkan kondisi nyata."],
            ["ri-line-chart-line", "bg-success/15 group-hover:bg-success/25", "text-success", "hover:border-success/40", "Dampak Terukur", "Dampak ekonomi dan lingkungan yang nyata dan terukur."],
          ].map(([icon, background, color, border, title, text]) => (
            <div
              key={title}
              className={`bg-page/80 backdrop-blur-sm border border-mist rounded-2xl p-6 hover:-translate-y-1 transition duration-300 ${border} hover:shadow-lg group`}
            >
              <div
                className={`w-12 h-12 ${background} rounded-xl flex items-center justify-center mb-4 transition`}
              >
                <i className={`${icon} text-2xl ${color}`} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-heading">{title}</h3>
              <p className="text-body text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-heading">
              <span className="text-primary">Apa itu</span> ExPart?
            </h2>
            <p className="text-body leading-relaxed">
              Platform marketplace hybrid yang menggabungkan{" "}
              <strong className="text-heading">teknologi AI</strong> dengan{" "}
              <strong className="text-heading">validasi komunitas</strong> untuk
              menjual barang elektronik bekas dengan aman. Kami tidak hanya
              sekadar marketplace, tetapi sebuah gerakan untuk memperpanjang
              usia pakai gadget.
            </p>
            <div className="bg-warning/5 rounded-xl p-5 border-l-4 border-warning">
              <h4 className="text-warning font-bold mb-2">
                The Problem We Solve
              </h4>
              <ul className="space-y-2 text-body text-sm">
                <li className="flex items-start">
                  <i className="ri-close-circle-line text-danger mr-2 mt-0.5" />
                  <span>
                    <strong className="text-heading">Masalah Kepercayaan:</strong>{" "}
                    Pembeli takut penipuan dan barang tidak sesuai deskripsi.
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="ri-delete-bin-2-line text-danger mr-2 mt-0.5" />
                  <span>
                    <strong className="text-heading">E-Waste:</strong> Limbah
                    elektronik menumpuk karena rotasi ekonomi sirkular yang
                    lambat.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-heading">
              Solusi <span className="text-info">Kami</span>
            </h2>
            {[
              ["bg-linear-to-r from-primary-surface to-exa-light hover:border-primary/30", "ri-robot-2-line text-primary", "ri-sparkling-fill text-warning", "Exa AI", "Sistem AI berbasis Google Gemini yang secara otomatis memvalidasi kondisi produk dan memberikan rekomendasi harga yang wajar."],
              ["bg-linear-to-r from-success/10 to-info/10 hover:border-success/30", "ri-community-line text-success", "ri-discuss-line text-success", "Forum Komunitas", "Wadah validasi sosial dan diskusi antar penggemar teknologi. Tempat bertemunya transparansi dan pengetahuan."],
            ].map(([background, decor, icon, title, text]) => (
              <div
                key={title}
                className={`${background} rounded-2xl p-6 border border-mist relative overflow-hidden group hover:shadow-lg transition-all`}
              >
                <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition">
                  <i className={`${decor} text-7xl`} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-heading mb-2 flex items-center">
                    <i className={`${icon} mr-2`} /> {title}
                  </h3>
                  <p className="text-body text-sm">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function MissionPage() {
  return (
    <PageShell
      tone="success"
      decorations={
        <>
          <img
            src="/assets/exa/full-body.webp"
            alt="Exa Full Body"
            className="hidden lg:block absolute left-0 bottom-1/4 w-40 xl:w-52 opacity-60 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          />
          <img
            src="/assets/exa/hello.webp"
            alt="Exa Hello"
            className="hidden lg:block absolute right-0 top-1/4 w-40 xl:w-52 opacity-60 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          />
        </>
      }
    >
      <div className="bg-card/80 backdrop-blur-xl border border-mist/50 shadow-2xl rounded-3xl overflow-hidden p-6 md:p-10 mb-8">
        <div className="text-center mb-12">
          <span className="inline-block py-1.5 px-4 rounded-full bg-success/10 border border-success/20 text-success text-sm font-medium mb-4">
            Sustainability Goal
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-linear-to-r from-success via-primary to-success">
            Misi Ekonomi Sirkular
          </h1>
          <p className="text-lg text-body font-light max-w-2xl mx-auto leading-relaxed">
            Membangun masa depan teknologi yang berkelanjutan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            ["12", "bg-warning shadow-warning/20", "text-warning", "hover:border-warning/40", "SDG 12", "Responsible Consumption and Production", "Bertanggung jawab dalam konsumsi dan produksi untuk mengurangi limbah."],
            ["9", "bg-info shadow-info/20", "text-info", "hover:border-info/40", "SDG 9", "Industry, Innovation, Infrastructure", "Membangun infrastruktur yang tangguh dan mempromosikan industrialisasi yang berkelanjutan."],
          ].map(([number, background, color, border, title, subtitle, text]) => (
            <div
              key={title}
              className={`bg-page/80 backdrop-blur-sm border border-mist rounded-2xl p-6 hover:-translate-y-1 transition duration-300 ${border} hover:shadow-lg group`}
            >
              <div className="flex items-start space-x-5">
                <div
                  className={`w-14 h-14 ${background} rounded-xl flex items-center justify-center shadow-lg shrink-0`}
                >
                  <span className="text-2xl font-bold text-white">{number}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-heading mb-1">
                    {title}
                  </h3>
                  <p className={`${color} font-medium text-sm mb-2`}>
                    {subtitle}
                  </p>
                  <p className="text-body text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-linear-to-r from-success/10 to-primary/10 rounded-2xl border border-mist overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8">
              <h3 className="text-2xl md:text-3xl font-bold text-heading mb-6">
                <span className="text-success">Fakta Kunci</span> & Dampak
              </h3>
              <div className="space-y-6">
                {[
                  ["62", "Miliar kg", "Total limbah elektronik global pada tahun 2022 (The Global E-waste Monitor 2024)."],
                  ["22,3", "Persen", "Hanya sebagian kecil dari e-waste yang didaur ulang secara formal."],
                ].map(([value, unit, text]) => (
                  <div
                    key={value}
                    className="bg-card/60 backdrop-blur-sm rounded-xl p-5 border border-mist/50"
                  >
                    <div className="flex items-end mb-2">
                      <span className="text-4xl font-extrabold text-heading">
                        {value}
                      </span>
                      <span className="text-xl font-bold text-success ml-2 mb-1">
                        {unit}
                      </span>
                    </div>
                    <p className="text-body text-sm">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-success/10 p-8 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-success/5 to-primary/5" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-5 border border-success/30">
                  <i className="ri-recycle-line text-3xl text-success" />
                </div>
                <h4 className="text-xl font-bold text-heading mb-2">
                  Peran ExPart
                </h4>
                <p className="text-success text-base italic mb-3">
                  &quot;Product Life Extension&quot;
                </p>
                <p className="text-body text-sm max-w-xs mx-auto leading-relaxed">
                  Kami berfokus memperpanjang usia pakai gadget untuk menjaga
                  elektronik tidak berakhir di tempat pembuangan akhir
                  (landfills).
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-success hover:bg-success/90 text-white rounded-full font-bold transition duration-300 shadow-lg hover:shadow-success/30"
          >
            <i className="ri-leaf-line mr-2" />
            Mulai Berkontribusi Sekarang
            <i className="ri-arrow-right-line ml-2" />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

function TeamPage() {
  const members = [
    ["Gamma", "Assyafi Fadhillah Ar Rasyad", "UNS - Informatika", "Lead Developer dan Ideator", "bg-linear-to-br from-info to-primary shadow-info/30", "text-info", "bg-info/10 text-info", "06b6d4"],
    ["Zalfa", "Daffani Fadhillah Al Hanif", "UNTIDAR - Akuntansi", "QA dan Project Manager", "bg-linear-to-br from-purple-500 to-pink-500 shadow-purple-500/30", "text-purple-500", "bg-purple-500/10 text-purple-600", "8b5cf6"],
    ["Naja", "Safira Binnaja Alfariha", "ISI Yogyakarta - DKV", "Ilustrator", "bg-linear-to-br from-pink-500 to-rose-500 shadow-pink-500/30", "text-pink-500", "bg-pink-500/10 text-pink-600", "ec4899"],
  ];
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-page font-sans text-heading p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-150 h-150 bg-info/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-primary/25 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/3 left-1/4 w-100 h-100 bg-pink-400/20 rounded-full blur-[100px]" />
      <div className="relative z-10 w-full max-w-5xl py-16">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Tim di Balik ExPart
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-heading mb-2 tracking-tight">
            TIM{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-500 to-pink-500">
              NEBULA
            </span>
          </h1>
          <p className="text-body mt-4 max-w-xl mx-auto text-base">
            Kolaborasi lintas disiplin untuk menciptakan inovasi teknologi yang
            berdampak.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {members.map(([alias, name, school, role, gradient, color, badge, hex]) => (
            <div key={alias} className="group">
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-xl rounded-2xl p-6 h-full flex flex-col items-center text-center transform group-hover:-translate-y-1 group-hover:shadow-2xl transition-all duration-300">
                <div
                  className={`w-28 h-28 rounded-full ${gradient} p-1 mb-5 shadow-lg`}
                >
                  <UserAvatar
                    name={alias}
                    background={`#${hex}`}
                    className="w-full h-full rounded-full text-2xl border-2 border-white"
                  />
                </div>
                <h3 className={`text-xl font-bold ${color} mb-1`}>
                  {alias}
                </h3>
                <p className="text-sm text-heading font-medium mb-1">{name}</p>
                <p className="text-body text-sm mb-4">{school}</p>
                <div className="mt-auto pt-4 border-t border-mist w-full">
                  <span
                    className={`inline-block px-3 py-1.5 rounded-full ${badge} text-xs font-bold`}
                  >
                    {role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-bold transition duration-300 shadow-lg hover:shadow-primary/30"
          >
            <i className="ri-home-line mr-2" />
            Kembali ke Beranda
            <i className="ri-arrow-right-line ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
