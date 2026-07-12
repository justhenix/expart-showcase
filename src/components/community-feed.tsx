"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { UserAvatar } from "@/components/user-avatar";
import { threads } from "@/data/community";

const filters = [
  ["new", "Terbaru", "ri-time-line"],
  ["hot", "Hot", "ri-fire-line"],
  ["best", "Terbaik", "ri-trophy-line"],
  ["top", "Terpopuler", "ri-bar-chart-line"],
  ["rising", "Sedang Naik", "ri-line-chart-line"],
  ["solved", "Sudah Terjawab", "ri-checkbox-circle-line"],
  ["unanswered", "Belum Dijawab", "ri-question-line"],
] as const;

const channels = [
  ["Reparasi", "ri-tools-line"],
  ["Jual Beli", "ri-shopping-cart-line"],
  ["Diskusi Umum", "ri-chat-3-line"],
  ["Cek Harga", "ri-price-tag-3-line"],
  ["Ulasan Penjual", "ri-star-line"],
  ["Perangkat PC", "ri-cpu-line"],
  ["Android Stuff", "ri-android-line"],
  ["Apple Stuff", "ri-apple-line"],
] as const;

export function CommunityFeed() {
  const [filter, setFilter] = useState("new");
  const [channel, setChannel] = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [votes, setVotes] = useState<Record<string, -1 | 0 | 1>>({});

  const result = useMemo(() => {
    const selected = threads.filter(
      (thread) =>
        (channel === "" || thread.channel === channel) &&
        (filter !== "solved" || thread.solved) &&
        (filter !== "unanswered" || !thread.solved),
    );
    return selected.toSorted((a, b) => {
      const aScore = a.score + (votes[a.slug] ?? 0);
      const bScore = b.score + (votes[b.slug] ?? 0);
      if (filter === "top") return bScore - aScore;
      if (filter === "hot" || filter === "best")
        return b.replies + bScore - a.replies - aScore;
      if (filter === "rising") return b.replies - a.replies;
      return 0;
    });
  }, [channel, filter, votes]);

  const currentFilter =
    filters.find(([value]) => value === filter) ?? filters[0];

  return (
    <div className="min-h-screen bg-page py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-heading">
              Komunitas ExPart
            </h1>
            <p className="text-body mt-1">
              Diskusi gadget, reparasi, dan jual beli dengan komunitas
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 sm:mt-0">
            <Link
              href="/"
              className="inline-flex items-center px-5 py-3 bg-card border border-mist text-heading font-semibold rounded-xl shadow-sm hover:bg-page transition-all duration-200"
            >
              <i className="ri-store-2-line mr-2 text-lg" />
              Ke Marketplace
            </Link>
            <Link
              href="/community/new"
              className="inline-flex items-center px-5 py-3 bg-linear-to-r from-primary to-primary-hover text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <i className="ri-add-line mr-2 text-lg" />
              Diskusi Baru
            </Link>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-card rounded-xl shadow-sm border border-mist p-5 sticky top-24">
              <div className="mb-6">
                <h3 className="px-2 text-xs font-semibold text-hint uppercase tracking-wider mb-3">
                  Urutkan
                </h3>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setSortOpen((open) => !open)}
                    aria-label="Pilih urutan diskusi"
                    aria-expanded={sortOpen}
                    className="w-full flex items-center justify-between px-3 py-2.5 bg-page rounded-lg border border-mist text-sm text-heading hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <i className={`${currentFilter[2]} text-primary`} />
                      <span className="font-medium">{currentFilter[1]}</span>
                    </div>
                    <i
                      className={`ri-arrow-down-s-line text-hint transition-transform duration-200 ${
                        sortOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {sortOpen ? (
                    <div className="absolute z-50 w-full mt-1 bg-card border border-mist rounded-lg shadow-xl overflow-hidden">
                      {filters.map(([value, label, icon]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            setFilter(value);
                            setSortOpen(false);
                          }}
                          className={`w-full text-left flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                            filter === value
                              ? "text-primary bg-primary-surface font-medium"
                              : "text-body hover:bg-page hover:text-heading"
                          }`}
                        >
                          <i
                            className={`${icon} ${
                              filter === value ? "text-primary" : "text-hint"
                            }`}
                          />
                          {label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                <h3 className="px-2 text-xs font-semibold text-hint uppercase tracking-wider mb-3">
                  Kategori
                </h3>
                <div className="space-y-1">
                  {channels.map(([name, icon]) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() =>
                        setChannel((current) => (current === name ? "" : name))
                      }
                      className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                        channel === name
                          ? "bg-primary-surface text-primary font-semibold"
                          : "text-body hover:bg-page hover:text-heading"
                      }`}
                    >
                      <i className={`${icon} text-lg`} />
                      {name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="space-y-4">
              {result.map((thread) => (
                <div
                  key={thread.slug}
                  className="group relative flex bg-card rounded-xl shadow-sm border border-mist transition-all hover:bg-surface/50 hover:border-primary/30 cursor-pointer overflow-hidden"
                >
                  <Link
                    href={`/community/${thread.slug}`}
                    aria-label={`Buka diskusi: ${thread.title}`}
                    className="absolute inset-0 z-10"
                  />
                  <div className="relative z-20 flex flex-col items-center p-3 sm:p-4 bg-page/30 border-r border-mist/50 min-w-12.5 sm:min-w-15">
                    <button
                      type="button"
                      onClick={() =>
                        setVotes((current) => ({
                          ...current,
                          [thread.slug]:
                            current[thread.slug] === 1 ? 0 : 1,
                        }))
                      }
                      className="p-1 rounded hover:bg-mist/50 transition-colors text-hint hover:text-primary"
                      aria-label={`Upvote ${thread.title}`}
                      aria-pressed={votes[thread.slug] === 1}
                    >
                      <i className="ri-arrow-up-circle-line text-2xl" />
                    </button>
                    <span className="text-sm font-bold py-1 text-heading">
                      {thread.score + (votes[thread.slug] ?? 0)}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setVotes((current) => ({
                          ...current,
                          [thread.slug]:
                            current[thread.slug] === -1 ? 0 : -1,
                        }))
                      }
                      className="p-1 rounded hover:bg-mist/50 transition-colors text-hint hover:text-danger"
                      aria-label={`Downvote ${thread.title}`}
                      aria-pressed={votes[thread.slug] === -1}
                    >
                      <i className="ri-arrow-down-circle-line text-2xl" />
                    </button>
                  </div>

                  <div className="flex-1 p-3 sm:p-4 min-w-0">
                    <div className="flex items-center flex-wrap gap-2 text-xs mb-2">
                      <div className="flex items-center gap-2">
                        <UserAvatar
                          name={thread.author}
                          className="w-6 h-6 rounded-full text-[9px] ring-1 ring-mist"
                        />
                        <span className="font-bold text-heading">
                          {thread.author}
                        </span>
                      </div>
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border bg-mist/50 text-body border-mist">
                        Anggota
                      </span>
                      <span className="text-mist">•</span>
                      <span className="text-hint">{thread.age} lalu</span>
                      <span className="text-mist">•</span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">
                        {thread.channel}
                      </span>
                      {thread.solved ? (
                        <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-success/10 text-success border border-success/20">
                          <i className="ri-check-double-line" />
                          TERJAWAB
                        </span>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-heading leading-tight mb-2 group-hover:text-primary transition-colors">
                        {thread.title}
                      </h3>
                      <p className="text-sm text-body line-clamp-3 leading-relaxed">
                        {thread.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-mist/30">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-hint px-2 py-1">
                        <i className="ri-chat-3-line text-base" />
                        <span>{thread.replies} Balasan</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-hint px-2 py-1">
                        <i className="ri-bar-chart-line text-base" />
                        <span>{thread.score * 17} Tayangan</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {!result.length ? (
                <div className="bg-card rounded-xl border border-mist py-14 px-6 text-center">
                  <i className="ri-chat-off-line text-4xl text-hint" />
                  <h3 className="mt-3 font-bold text-heading">
                    Belum ada diskusi
                  </h3>
                  <p className="mt-1 text-sm text-body">
                    Coba kategori lain atau tampilkan semua diskusi.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setChannel("");
                      setFilter("new");
                    }}
                    className="mt-4 text-sm font-semibold text-primary hover:underline"
                  >
                    Tampilkan Semua
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          <aside className="hidden lg:block w-80 shrink-0 space-y-6">
            <CommunityRules />
            <CommunityTips />
          </aside>
        </div>
      </div>
    </div>
  );
}

function CommunityRules() {
  const rules = [
    ["Bersikap Sopan", "Hargai sesama anggota. Dilarang menyerang atau merundung."],
    ["Dilarang NSFW/SARA", "Konten sensitif atau bermuatan SARA akan langsung dihapus."],
    ["Topik Relevan", "Diskusi harus seputar gadget & teknologi."],
    ["Gunakan Penanda Spoiler", "Wajib untuk gambar berukuran besar atau informasi bocoran."],
  ];
  return (
    <div className="bg-card rounded-xl shadow-sm border border-mist overflow-hidden">
      <div className="px-5 py-4 border-b border-mist bg-card flex items-center justify-between">
        <h3 className="font-semibold text-heading flex items-center gap-2 text-sm">
          <i className="ri-shield-check-line text-primary" />
          Peraturan ExPart
        </h3>
        <i className="ri-arrow-down-s-line text-hint" />
      </div>
      <ol className="p-5 space-y-4 text-sm">
        {rules.map(([title, text], index) => (
          <li key={title} className="flex gap-3">
            <span className="shrink-0 w-6 h-6 rounded-lg bg-page text-heading border border-mist text-xs font-bold flex items-center justify-center">
              {index + 1}
            </span>
            <div>
              <p className="text-heading font-medium">{title}</p>
              <p className="text-hint text-xs mt-0.5 leading-relaxed">{text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function CommunityTips() {
  return (
    <div className="bg-linear-to-br from-card to-page rounded-xl shadow-sm border border-mist p-5 relative overflow-hidden group">
      <img
        src="/assets/exa/munyu-full.webp"
        alt=""
        className="absolute -right-4 -top-4 opacity-[0.15] pointer-events-none transition-transform duration-500 group-hover:scale-110 rotate-12 w-32"
      />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <i className="ri-lightbulb-line text-lg text-info" />
          <h3 className="font-semibold text-heading">Tips</h3>
        </div>
        <ul className="space-y-3 text-sm">
          {[
            ["Jadilah anggota yang ", "aktif dan membantu", " sesama."],
            ["Laporkan konten ", "spam", " atau yang melanggar aturan."],
            ["Gunakan fitur ", "Beli Langsung", " untuk transaksi aman."],
            ["", "Verifikasi identitasmu", " untuk meningkatkan kepercayaan."],
          ].map(([before, strong, after], index) => (
            <li key={strong} className="flex gap-3 items-start">
              <span className="shrink-0 w-6 h-6 rounded-lg bg-page text-heading border border-mist text-xs font-bold flex items-center justify-center">
                {index + 1}
              </span>
              <span className="text-body leading-snug mt-0.5">
                {before}
                <span className="text-heading font-medium">{strong}</span>
                {after}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
