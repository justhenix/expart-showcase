export type Thread = {
  slug: string;
  title: string;
  excerpt: string;
  channel: string;
  author: string;
  score: number;
  replies: number;
  age: string;
  solved?: boolean;
};

export const threads: Thread[] = [
  {
    slug: "cek-kondisi-iphone-13-pro",
    title: "iPhone 13 Pro dengan kesehatan baterai 86% masih layak di harga 10 juta?",
    excerpt:
      "Unit resmi, Face ID aman, dan ada baret tipis di bingkai. Mohon pendapat sebelum saya membelinya.",
    channel: "Cek Harga",
    author: "raditbuilds",
    score: 42,
    replies: 18,
    age: "12 menit",
    solved: true,
  },
  {
    slug: "rtx-4060-bekas-mining",
    title: "Cara cepat membedakan GPU bekas penambangan dan gaming",
    excerpt:
      "Daftar pemeriksaan mulai dari kondisi baut, BIOS, suhu hotspot, hingga hasil benchmark.",
    channel: "Perangkat PC",
    author: "naufalpc",
    score: 86,
    replies: 31,
    age: "1 jam",
  },
  {
    slug: "repair-mx-master-scroll",
    title: "Roda gulir MX Master 3S seret, servis atau ganti?",
    excerpt:
      "Sudah dibersihkan dari luar, tetapi MagSpeed masih kadang tersendat saat berputar bebas.",
    channel: "Reparasi",
    author: "salma.io",
    score: 23,
    replies: 9,
    age: "3 jam",
  },
  {
    slug: "setup-hemat-mahasiswa",
    title: "Rekomendasi perangkat kerja bekas di bawah 7 juta",
    excerpt:
      "Butuh laptop, monitor, dan keyboard untuk pemrograman serta desain ringan. Prioritasnya mudah ditingkatkan.",
    channel: "Diskusi Umum",
    author: "arifsemester5",
    score: 57,
    replies: 24,
    age: "5 jam",
    solved: true,
  },
];
