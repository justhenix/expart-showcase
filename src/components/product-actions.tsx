"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatIDR } from "@/lib/format";

export function ProductActions({ price }: { price: number }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState("");

  return (
    <div className="lg:sticky lg:top-20 space-y-4">
      <div className="bg-card border border-mist rounded-xl p-5 shadow-sm space-y-4">
        <h3 className="font-semibold text-heading text-sm">
          Atur jumlah dan catatan
        </h3>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.max(1, value - 1))}
            disabled={quantity <= 1}
            className="w-8 h-8 rounded-lg border border-mist flex items-center justify-center text-body hover:border-primary hover:text-primary transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Kurangi jumlah"
          >
            <i className="ri-subtract-line" />
          </button>
          <input
            value={quantity}
            readOnly
            aria-label="Jumlah"
            className="w-12 text-center font-semibold text-heading border-0 focus:ring-0 p-0 bg-transparent"
          />
          <button
            type="button"
            onClick={() => setQuantity((value) => Math.min(5, value + 1))}
            disabled={quantity >= 5}
            className="w-8 h-8 rounded-lg border border-mist flex items-center justify-center text-body hover:border-primary hover:text-primary transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            aria-label="Tambah jumlah"
          >
            <i className="ri-add-line" />
          </button>
          <span className="text-sm text-body ml-auto">
            Stok: <span className="text-heading font-medium">5</span>
          </span>
        </div>

        <div className="space-y-2">
          {!noteOpen ? (
            <button
              type="button"
              onClick={() => setNoteOpen(true)}
              className="w-full text-left text-sm text-primary hover:underline flex items-center gap-1 font-medium transition cursor-pointer"
            >
              <i className="ri-edit-line" />
              Tambah Catatan
            </button>
          ) : (
            <div>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value.slice(0, 100))}
                rows={3}
                placeholder="Contoh: Warna hitam, ukuran L, packing kayu..."
                className="w-full p-2.5 text-sm border border-mist bg-page text-heading rounded-lg focus:ring-1 focus:ring-primary focus:border-primary resize-none"
              />
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] text-hint">{note.length}/100</span>
                <button
                  type="button"
                  onClick={() => setNoteOpen(false)}
                  className="text-xs font-semibold text-primary bg-primary-surface hover:bg-primary hover:text-white px-3 py-1.5 rounded-md transition cursor-pointer"
                >
                  Simpan
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-mist">
          <div className="flex items-center justify-between">
            <span className="text-sm text-body">Subtotal</span>
            <span className="text-xl font-bold text-heading">
              {formatIDR(price * quantity)}
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg shadow-sm transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            Beli Langsung
          </button>
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="w-full py-3 px-4 border-2 border-primary text-primary hover:bg-primary-surface font-semibold rounded-lg transition active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            + Keranjang
          </button>
        </div>

        <button
          type="button"
          onClick={() => router.push("/login")}
          className="w-full py-2.5 px-4 border border-mist text-body hover:border-primary hover:text-primary hover:bg-page font-medium rounded-lg transition flex items-center justify-center gap-2 text-sm cursor-pointer dark:text-gray-300 dark:hover:text-primary"
        >
          <i className="ri-chat-3-line text-xl" />
          Chat Penjual
        </button>
      </div>

      <div className="bg-card border border-mist rounded-xl p-4 shadow-sm">
        <div className="space-y-3">
          {[
            ["ri-shield-check-fill", "Transaksi Aman 100%", "Uang kembali jika tidak sesuai"],
            ["ri-truck-fill", "Gratis Ongkir", "Min. belanja Rp 50.000"],
            ["ri-time-fill", "Garansi 7 Hari", "Tukar/kembalikan produk"],
          ].map(([icon, title, text]) => (
            <div key={title} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-surface dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <i className={`${icon} text-primary`} />
              </div>
              <div>
                <p className="text-sm font-medium text-heading">{title}</p>
                <p className="text-xs text-body">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
