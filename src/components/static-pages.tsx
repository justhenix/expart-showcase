import Link from "next/link";

function Logo() {
  return (
    <div className="w-full flex justify-center mb-8">
      <Link href="/" className="block">
        <img src="/expart-logo.svg" alt="ExPart Logo" className="h-8 md:h-10" />
      </Link>
    </div>
  );
}

function InfoBackground() {
  return (
    <>
      <div className="absolute top-0 left-0 w-150 h-150 bg-info/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-primary/25 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 right-0 w-75 h-75 bg-primary-surface rounded-full blur-[80px] translate-x-1/2" />
    </>
  );
}

export function BlogPage() {
  const personas = [
    ["ri-user-search-line", "bg-primary/15 group-hover:bg-primary/25", "text-primary", "hover:border-primary/40", "Untuk Pembeli", 'Profil "Ezra"', "Mahasiswa yang membutuhkan laptop berspesifikasi tinggi dengan harga terjangkau, tetapi khawatir tertipu. Kami membantu memastikan keamanan transaksi."],
    ["ri-store-3-line", "bg-info/15 group-hover:bg-info/25", "text-info", "hover:border-info/40", "Untuk Penjual", 'Profil "Kevin"', "Penggemar teknologi yang ingin menjual cepat tanpa negosiasi rumit. Sistem kami memberikan valuasi instan."],
    ["ri-leaf-line", "bg-success/15 group-hover:bg-success/25", "text-success", "hover:border-success/40", "Peduli Lingkungan", 'Profil "Alya"', "Peduli lingkungan dan ingin mengelola limbah elektronik secara bertanggung jawab atau memperpanjang usia pakai gadget."],
  ];
  const articles = [
    ["bg-primary/10", "/assets/exa/tips.webp", "Tips Exa AI", "bg-primary", "ri-shield-check-line", "Keamanan", "hover:border-primary/40", "group-hover:text-primary", "text-primary", "Cara Exa AI Mendeteksi Penipuan Gadget Bekas", "Pelajari bagaimana teknologi AI kami menganalisis ribuan titik data untuk memastikan keaslian produk."],
    ["bg-info/10", "/assets/exa/curious.webp", "Exa Curious", "bg-info", "ri-lightbulb-line", "Tips & Trik", "hover:border-info/40", "group-hover:text-info", "text-info", "Tips Merawat Laptop Agar Harga Jual Kembali Tetap Tinggi", "Langkah sederhana perawatan harian yang bisa meningkatkan nilai jual laptop Anda hingga 30%."],
    ["bg-success/10", "/assets/exa/happy.webp", "Exa Senang", "bg-success", "ri-earth-line", "Dampak", "hover:border-success/40", "group-hover:text-success", "text-success", "Dampak Nyata Membeli Gadget Bekas bagi Bumi", "Setiap gadget bekas yang Anda beli membantu mengurangi emisi karbon. Simak datanya."],
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-page font-sans text-heading p-4 md:p-8 relative overflow-hidden">
      <InfoBackground />
      <div className="relative z-10 w-full max-w-5xl py-8 md:py-16">
        <Logo />
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/50 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden p-6 md:p-10 mb-8">
          <div className="text-center mb-12">
            <span className="inline-block py-1.5 px-4 rounded-full bg-info/10 border border-info/20 text-info text-sm font-medium mb-4">Blog dan Wawasan</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-linear-to-r from-primary via-info to-success">ExPart Insights</h1>
            <p className="text-lg text-body font-light max-w-2xl mx-auto leading-relaxed">Panduan cerdas untuk pembeli, penjual, dan pahlawan lingkungan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {personas.map(([icon, background, color, border, title, profile, text]) => (
              <div key={title} className={`bg-page/80 backdrop-blur-sm border border-mist rounded-2xl p-6 hover:-translate-y-1 transition duration-300 ${border} hover:shadow-lg group`}>
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 ${background} rounded-xl flex items-center justify-center mr-3 transition`}>
                    <i className={`${icon} text-2xl ${color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-heading">{title}</h3>
                </div>
                <p className={`${color} text-sm font-medium mb-2`}>{profile}</p>
                <p className="text-body text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-heading mb-2"><span className="text-primary">Artikel</span> Terbaru</h2>
            <p className="text-body text-sm">Baca panduan dan tips terkini dari tim ExPart.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map(([background, image, alt, badge, icon, label, border, titleHover, color, title, text]) => (
              <Link href="/coming-soon" key={title} className={`bg-page/80 backdrop-blur-sm border border-mist rounded-2xl overflow-hidden group cursor-pointer hover:-translate-y-1 transition duration-300 ${border} hover:shadow-lg`}>
                <div className={`h-48 ${background} overflow-hidden relative flex items-center justify-center`}>
                  <img src={image} alt={alt} className="h-36 object-contain group-hover:scale-105 transition duration-300" />
                  <div className="absolute bottom-4 left-4">
                    <span className={`inline-flex items-center gap-1.5 ${badge} text-white text-xs font-bold px-2.5 py-1 rounded-lg`}><i className={icon} /> {label}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-lg font-bold text-heading mb-3 ${titleHover} transition`}>{title}</h3>
                  <p className="text-body text-sm mb-4 leading-relaxed">{text}</p>
                  <span className={`inline-flex items-center gap-1 ${color} text-sm font-semibold group-hover:underline`}>Baca Selengkapnya <i className="ri-arrow-right-line" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <p className="text-center text-xs text-hint">© {new Date().getFullYear()} ExPart. Extend Your Build.</p>
      </div>
    </div>
  );
}

export function PlaceholderPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-page font-sans text-heading py-8 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-150 h-150 bg-emerald-500/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-teal-600/15 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>
      <div className="relative z-10 w-full max-w-lg">
        <div className="w-full flex justify-center mb-8">
          <Link href="/" className="block transform hover:scale-105 transition-transform duration-300">
            <img src="/expart-logo.svg" alt="ExPart Logo" className="h-10 md:h-12 drop-shadow-lg" />
          </Link>
        </div>
        <div className="bg-card/80 dark:bg-slate-900/80 backdrop-blur-xl border border-mist/50 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden p-8 md:p-12 text-center ring-1 ring-black/5 dark:ring-white/10 relative">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          <div className="mb-8 flex justify-center relative">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-[60px] animate-pulse" />
            <img src="/assets/exa/working.webp" alt="Exa Working" className="relative w-48 h-48 object-contain animate-float-deep drop-shadow-2xl" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3 text-heading dark:text-white tracking-tight">Fitur Ini Sedang Dirakit! 🔧</h1>
          <p className="text-body dark:text-slate-400 text-sm md:text-base mb-8 max-w-xs mx-auto leading-relaxed">Exa lagi kerja keras buat nyelesain fitur ini. Cek lagi nanti ya, pasti bakal keren banget!</p>
          <Link href="/" className="inline-flex items-center justify-center px-8 py-3.5 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transform hover:-translate-y-1 transition-all duration-300 gap-2">
            <i className="ri-arrow-left-line" /> Kembali ke Beranda
          </Link>
          <div className="mt-8 flex justify-center gap-3">
            <span className="px-3 py-1 bg-mist/50 dark:bg-white/5 border border-mist dark:border-white/10 rounded-lg text-[10px] font-mono text-hint uppercase tracking-widest">Status: Dalam Pengembangan</span>
            <span className="px-3 py-1 bg-mist/50 dark:bg-white/5 border border-mist dark:border-white/10 rounded-lg text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest animate-pulse">Sedang Dikerjakan</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ComingSoonPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-page font-sans">
      <InfoBackground />
      <div className="relative z-10 w-full max-w-md">
        <div className="w-full flex justify-center mb-4">
          <Link href="/" className="block">
            <img src="/expart-logo.svg" alt="ExPart Logo" className="h-8 md:h-10" />
          </Link>
        </div>
        <div className="coming-soon-card backdrop-blur-xl border shadow-2xl rounded-3xl overflow-hidden p-8 text-center">
          <div className="flex justify-center mb-6">
            <img src="/assets/exa/munyu-full.webp" alt="Exa Munyu" className="w-36 h-36 object-contain animate-float-deep" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-heading mb-3">Bagian ini sedang dalam tahap pengembangan</h1>
          <p className="text-base text-body mb-8">
            Fitur ini sedang kami siapkan. Silakan cek kembali nanti.
          </p>
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-hover transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <i className="ri-arrow-left-line text-xl mr-2" /> Kembali ke Beranda
          </Link>
        </div>
        <p className="mt-6 text-center text-sm text-hint"><span className="font-semibold text-primary">ExPart</span> - Extend Your Build</p>
      </div>
    </div>
  );
}
