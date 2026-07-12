import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-card border-t border-mist pt-12 pb-40 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-4">ExPart</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-body hover:text-primary transition">Tentang ExPart</Link></li>
              <li><Link href="/mission" className="text-sm text-body hover:text-primary transition">Misi Ekonomi Sirkular</Link></li>
              <li><Link href="/blog" className="text-sm text-body hover:text-primary transition">ExPart Blog</Link></li>
              <li><Link href="/team" className="text-sm text-body hover:text-primary transition">Tim Nebula (Pengembang)</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-4">Layanan</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-body hover:text-primary transition">Beli Gadget Bekas</Link></li>
              <li><Link href="/exa-ai" className="text-sm text-body hover:text-primary transition">Jual E-Waste</Link></li>
              <li><Link href="/exa-ai" className="text-sm hover:text-primary-hover transition font-medium text-primary">Exa AI Checker</Link></li>
              <li><Link href="/trade-in" className="text-sm text-body hover:text-primary transition">Program Trade-In</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-4">Bantuan</h3>
            <ul className="space-y-3">
              <li><Link href="/coming-soon" className="text-sm text-body hover:text-primary transition">ExPart Care</Link></li>
              <li><Link href="/guide" className="text-sm text-body hover:text-primary transition">Panduan Kondisi Barang</Link></li>
              <li><Link href="/terms" className="text-sm text-body hover:text-primary transition">Syarat & Ketentuan</Link></li>
              <li><Link href="/privacy" className="text-sm text-body hover:text-primary transition">Kebijakan Privasi</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-4">Ikuti Kami</h3>
            <div className="flex space-x-4 mb-6">
              <Link href="/coming-soon" className="text-hint hover:text-primary transition duration-200">
                <span className="sr-only">Instagram</span>
                <i className="ri-instagram-fill text-2xl" />
              </Link>
              <Link href="/coming-soon" className="text-hint hover:text-primary transition duration-200">
                <span className="sr-only">X (Twitter)</span>
                <i className="ri-twitter-x-fill text-2xl" />
              </Link>
            </div>
            <h3 className="text-sm font-bold text-heading uppercase tracking-wider mb-3">Keamanan</h3>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-mist border border-mist rounded text-xs text-body font-semibold">SSL Aman</span>
              <span className="px-2 py-1 bg-mist border border-mist rounded text-xs text-body font-semibold">Terverifikasi AI</span>
            </div>
          </div>
        </div>
        <div className="border-t border-mist pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-body">© 2026 ExPart (Tim Nebula). Hak Cipta Dilindungi.</p>
          <div className="flex space-x-6">
            <Link href="/coming-soon" className="text-sm text-body hover:text-heading">Peta Situs</Link>
            <Link href="/coming-soon" className="text-sm text-body hover:text-heading">Kredit Aset</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
