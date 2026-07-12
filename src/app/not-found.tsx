import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell grid min-h-[70vh] place-items-center py-12 text-center">
      <div>
        <div className="relative mx-auto aspect-square w-52">
          <Image
            src="/assets/exa/empty.webp"
            alt="Halaman tidak ditemukan"
            fill
            sizes="208px"
            className="object-contain"
          />
        </div>
        <p className="eyebrow">404</p>
        <h1 className="mt-2 text-3xl font-extrabold">Halaman tidak ditemukan</h1>
        <p className="mt-3 text-body">
          Alamat berubah atau konten belum tersedia.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-md bg-brand px-5 py-3 text-sm font-extrabold text-white"
        >
          Kembali ke beranda
        </Link>
      </div>
    </div>
  );
}
