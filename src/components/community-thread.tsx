"use client";

import Link from "next/link";
import { useState } from "react";
import { UserAvatar } from "@/components/user-avatar";
import type { Thread } from "@/data/community";

export function CommunityThread({ thread }: { thread: Thread }) {
  const [vote, setVote] = useState<-1 | 0 | 1>(0);
  const [replyVotes, setReplyVotes] = useState<Record<number, -1 | 0 | 1>>({});
  const replies = [
    ["bima.repair", "Cek fungsi utama dulu, baru kosmetik. Minta video tes tanpa potongan dan cocokkan nomor seri."],
    ["exa_mod", "Rentang harga masih wajar. Sisakan anggaran untuk pengecekan langsung atau jasa inspeksi."],
    ["nadia.tech", "Pastikan akun perangkat sudah logout dan tidak ada activation lock sebelum pembayaran."],
  ];

  return (
    <div className="min-h-screen bg-page py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/community"
          className="inline-flex items-center text-sm text-body hover:text-primary transition-colors mb-6"
        >
          <i className="ri-arrow-left-line mr-2" />
          Kembali ke Forum
        </Link>

        <div className="bg-card rounded-xl shadow-sm border border-mist overflow-hidden mb-4">
          <div className="flex">
            <div className="flex flex-col items-center py-4 px-3 bg-page border-r border-mist">
              <button
                type="button"
                onClick={() => setVote((current) => (current === 1 ? 0 : 1))}
                className="p-1.5 rounded-lg text-hint hover:text-primary hover:bg-primary-surface"
                aria-label="Upvote diskusi"
                aria-pressed={vote === 1}
              >
                <i className="ri-arrow-up-s-line text-xl" />
              </button>
              <span className="font-bold text-sm my-1 text-primary">
                {thread.score + vote}
              </span>
              <button
                type="button"
                onClick={() => setVote((current) => (current === -1 ? 0 : -1))}
                className="p-1.5 rounded-lg text-hint hover:text-danger hover:bg-danger-surface"
                aria-label="Downvote diskusi"
                aria-pressed={vote === -1}
              >
                <i className="ri-arrow-down-s-line text-xl" />
              </button>
            </div>

            <div className="flex-1 p-6 min-w-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                      <i className="ri-chat-3-line" />
                      {thread.channel}
                    </span>
                    {thread.solved ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-success-surface text-success">
                        <i className="ri-checkbox-circle-fill" />
                        Terjawab
                      </span>
                    ) : null}
                  </div>
                  <h1 className="text-2xl font-bold text-heading">
                    {thread.title}
                  </h1>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6 pb-6 border-b border-mist">
                <div className="flex items-center gap-3">
                  <UserAvatar
                    name={thread.author}
                    className="h-12 w-12 rounded-full text-sm ring-2 ring-mist"
                  />
                  <div>
                    <div className="flex items-center flex-wrap gap-2">
                      <span className="font-semibold text-heading">
                        {thread.author}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 bg-mist/50 text-body rounded text-xs font-medium border border-mist">
                        Anggota
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-hint mt-0.5">
                      <span>{thread.age} lalu</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <i className="ri-eye-line" />
                        {thread.score * 17} tayangan
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-body">
                <p>{thread.excerpt}</p>
                <p>
                  Saya sudah membandingkan beberapa listing, tetapi ingin
                  memastikan detail yang sering terlewat sebelum mengambil
                  keputusan.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-sm border border-mist overflow-hidden mb-6">
          <div className="p-4">
            <Link
              href="/login"
              className="flex items-center gap-3 p-3 border border-mist rounded-xl bg-page hover:border-primary transition-colors group"
            >
            <div className="h-8 w-8 rounded-full bg-primary-surface text-primary flex items-center justify-center">
              <i className="ri-user-line" />
            </div>
              <span className="text-hint text-sm group-hover:text-primary transition-colors">
                Login untuk membalas diskusi ini
              </span>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-heading mb-4 flex items-center gap-2">
            <i className="ri-chat-3-line text-primary" />
            {thread.replies} Balasan
          </h3>
          <div className="space-y-3">
            {replies.map(([author, text], index) => (
              <div
                key={author}
                className={`rounded-xl shadow-sm overflow-hidden ${
                  index === 0 && thread.solved
                    ? "bg-success-surface border-2 border-success"
                    : "bg-card border border-mist"
                }`}
              >
                {index === 0 && thread.solved ? (
                  <div className="bg-success text-white px-4 py-2 flex items-center gap-2 text-sm font-medium">
                    <i className="ri-checkbox-circle-fill" />
                    Jawaban Terbaik
                  </div>
                ) : null}
                <div className="flex">
                  <div className="flex flex-col items-center py-3 px-2.5 bg-page/50 border-r border-mist/50">
                    <button
                      type="button"
                      onClick={() =>
                        setReplyVotes((current) => ({
                          ...current,
                          [index]: current[index] === 1 ? 0 : 1,
                        }))
                      }
                      aria-label={`Upvote balasan ${author}`}
                      aria-pressed={replyVotes[index] === 1}
                      className="text-hint hover:text-primary"
                    >
                      <i className="ri-arrow-up-s-line text-lg" />
                    </button>
                    <span className="font-semibold text-xs my-0.5 text-primary">
                      {12 - index * 3 + (replyVotes[index] ?? 0)}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setReplyVotes((current) => ({
                          ...current,
                          [index]: current[index] === -1 ? 0 : -1,
                        }))
                      }
                      aria-label={`Downvote balasan ${author}`}
                      aria-pressed={replyVotes[index] === -1}
                      className="text-hint hover:text-danger"
                    >
                      <i className="ri-arrow-down-s-line text-lg" />
                    </button>
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start gap-3">
                      <UserAvatar
                        name={author}
                        className="h-9 w-9 rounded-full text-[10px] ring-2 ring-mist"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-heading text-sm">
                            {author}
                          </span>
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold border bg-mist/50 text-body border-mist">
                            Anggota
                          </span>
                        </div>
                        <span className="text-xs text-hint">
                          {index + 1} jam lalu
                        </span>
                      </div>
                    </div>
                    <div className="prose prose-sm max-w-none text-body mt-3 pl-12">
                      <p>{text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
