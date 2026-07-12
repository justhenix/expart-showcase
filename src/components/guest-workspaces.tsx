import Link from "next/link";

function GuestCard({
  title,
  text,
  path,
}: {
  title: string;
  text: string;
  path: string;
}) {
  return (
    <div className="bg-card rounded-xl shadow-sm border border-mist p-12 text-center transition-colors">
      <div className="w-48 h-48 mx-auto mb-6 bg-page rounded-full flex items-center justify-center">
        <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={path} />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-heading mb-2">{title}</h2>
      <p className="text-body mb-8">{text}</p>
      <Link href="/login" className="inline-flex items-center justify-center px-8 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-lg transition-colors">
        Masuk Sekarang
      </Link>
    </div>
  );
}

export function CartGuestPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-heading mb-6">Keranjang Belanja</h1>
      <GuestCard
        title="Masuk untuk melihat keranjang"
        text="Silakan masuk ke akun ExPart untuk melihat dan mengelola keranjang belanja Anda."
        path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </div>
  );
}

export function NotificationsGuestPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1 -ml-2 text-hint hover:text-heading transition-colors" title="Kembali ke Beranda">
            <i className="ri-arrow-left-s-line text-2xl" />
          </Link>
          <h1 className="text-2xl font-bold text-heading leading-none">Notifikasi</h1>
        </div>
      </div>
      <GuestCard
        title="Masuk untuk melihat notifikasi"
        text="Silakan masuk ke akun ExPart untuk melihat notifikasi Anda."
        path="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </div>
  );
}

export function ChatGuestPage() {
  return (
    <div className="py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <GuestCard
          title="Masuk untuk melihat pesan"
          text="Silakan masuk ke akun ExPart untuk melihat dan mengirim pesan ke penjual."
          path="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </div>
    </div>
  );
}

export function MarketplacePage() {
  return <div />;
}
