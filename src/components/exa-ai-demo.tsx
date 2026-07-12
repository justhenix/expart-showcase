"use client";

import Link from "next/link";
import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  EXA_CATEGORIES,
  type ExaAnalysis,
  type ExaMode,
  type ExaQuota,
} from "@/lib/exa-ai";

type UploadImage = {
  id: string;
  name: string;
  mimeType: string;
  data: string;
  preview: string;
};

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

const compactRupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  notation: "compact",
  maximumFractionDigits: 1,
});

async function prepareImage(file: File): Promise<UploadImage> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
    throw new Error(`${file.name}: gunakan JPG, PNG, atau WebP.`);
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error(`${file.name}: ukuran maksimal 10 MB.`);
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error("Browser gagal memproses gambar.");
  }
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const preview = canvas.toDataURL("image/jpeg", 0.82);
  return {
    id: crypto.randomUUID(),
    name: file.name,
    mimeType: "image/jpeg",
    data: preview.slice(preview.indexOf(",") + 1),
    preview,
  };
}

export function ExaAiDemo() {
  const [images, setImages] = useState<UploadImage[]>([]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [mode, setMode] = useState<ExaMode>("quick");
  const [preparing, setPreparing] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ExaAnalysis | null>(null);
  const [quota, setQuota] = useState<ExaQuota | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/exa-ai/analyze")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { quota?: ExaQuota } | null) => {
        if (payload?.quota) setQuota(payload.quota);
      })
      .catch(() => undefined);
  }, []);

  async function addFiles(files: File[]) {
    const available = 5 - images.length;
    if (available < 1) {
      setError("Maksimal 5 foto.");
      return;
    }

    setPreparing(true);
    setError("");
    try {
      const prepared = await Promise.all(files.slice(0, available).map(prepareImage));
      setImages((current) => [...current, ...prepared].slice(0, 5));
      setResult(null);
      if (files.length > available) setError("Maksimal 5 foto. Foto lainnya diabaikan.");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Gagal memproses gambar.");
    } finally {
      setPreparing(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function selectFiles(event: ChangeEvent<HTMLInputElement>) {
    void addFiles(Array.from(event.target.files ?? []));
  }

  function dropFiles(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    void addFiles(Array.from(event.dataTransfer.files));
  }

  function removeImage(id: string) {
    setImages((current) => current.filter((image) => image.id !== id));
    setResult(null);
  }

  async function analyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);

    if (quota?.[mode].remaining === 0) {
      setError("Batas analisis mode ini hari ini tercapai.");
      return;
    }

    if (
      images.length < 1 ||
      productName.trim().length < 2 ||
      !category ||
      !/^\d+$/.test(price) ||
      description.trim().length < 10
    ) {
      setError("Lengkapi foto, nama, kategori, harga, dan deskripsi minimal 10 karakter.");
      return;
    }

    setAnalyzing(true);
    try {
      const response = await fetch("/api/exa-ai/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          mode,
          productName,
          category,
          price: Number(price),
          description,
          images: images.map(({ mimeType, data }) => ({ mimeType, data })),
        }),
      });
      const payload = (await response.json()) as {
        error?: string;
        result?: ExaAnalysis;
        quota?: ExaQuota;
      };
      if (payload.quota) setQuota(payload.quota);
      if (!response.ok || !payload.result) {
        throw new Error(payload.error || "Exa AI gagal menganalisis produk.");
      }
      setResult(payload.result);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Exa AI tidak dapat dihubungi.");
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <div className="exa-page bg-page w-full min-h-[calc(100vh-4rem)] font-sans text-heading px-4">
      <div className="w-full max-w-7xl mx-auto">
        <div
          className={
            analyzing || result
              ? "exa-workspace-result-only"
              : "exa-workspace-form-only"
          }
        >
          {!analyzing && !result ? (
            <section className="exa-workspace-card bg-card rounded-2xl border border-mist shadow-lg p-5 lg:p-6">
            <div className="mb-5">
              <h1 className="text-2xl font-bold text-heading">Exa AI Verifier</h1>
              <p className="text-body mt-1 text-sm">
                Unggah hingga 5 foto jelas dari sisi berbeda.
              </p>
            </div>

            <form onSubmit={analyze} className="exa-form">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-heading">Foto Produk</label>
                  <span className="text-xs text-hint">{images.length}/5 foto</span>
                </div>

                {images.length ? (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {images.map((image) => (
                      <div
                        key={image.id}
                        className="relative aspect-square overflow-hidden rounded-xl border border-mist bg-page group"
                      >
                        <img
                          src={image.preview}
                          alt={image.name}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute right-1.5 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-danger text-white shadow opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"
                          aria-label={`Hapus ${image.name}`}
                        >
                          <i className="ri-close-line" />
                        </button>
                      </div>
                    ))}
                    {images.length < 5 ? (
                      <label className="relative aspect-square rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 hover:border-primary hover:bg-primary/10 cursor-pointer flex items-center justify-center transition">
                        <i className="ri-add-line text-2xl text-primary" />
                        <span className="sr-only">Tambah foto</span>
                        <input
                          ref={inputRef}
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          multiple
                          onChange={selectFiles}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </label>
                    ) : null}
                  </div>
                ) : (
                  <label
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={dropFiles}
                    className="exa-upload-empty relative flex w-full cursor-pointer flex-col items-center justify-center overflow-hidden border-2 border-dashed border-primary/30 bg-primary/5 transition hover:border-primary hover:bg-primary/10"
                  >
                    {preparing ? (
                      <div className="flex flex-col items-center gap-3" role="status">
                        <i className="ri-loader-4-line text-3xl text-primary animate-spin" />
                        <span className="text-sm font-semibold text-heading">
                          Mengoptimalkan gambar...
                        </span>
                      </div>
                    ) : (
                      <>
                        <span className="exa-upload-icon flex items-center justify-center bg-card text-primary shadow">
                          <i className="ri-image-add-line text-2xl" />
                        </span>
                        <h3 className="text-base font-bold text-heading">
                          Klik atau drop gambar gadget
                        </h3>
                        <p className="text-sm text-body mt-1 text-center">
                          JPG, PNG, WebP. Maksimal 10 MB per foto.
                        </p>
                      </>
                    )}
                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      onChange={selectFiles}
                      disabled={preparing}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </label>
                )}
              </div>

              <div className="exa-fields grid grid-cols-1 sm:grid-cols-2">
                <Field label="Nama Produk">
                  <input
                    value={productName}
                    onChange={(event) => setProductName(event.target.value)}
                    maxLength={120}
                    className="exa-input"
                    placeholder="Contoh: iPhone 13 Pro 256GB"
                  />
                </Field>
                <div>
                  <span className="block text-sm font-bold text-heading mb-1.5">
                    Kategori
                  </span>
                  <CategorySelect
                    value={category}
                    onChange={setCategory}
                  />
                </div>
                <Field label="Estimasi Harga (Rp)">
                  <input
                    value={price}
                    onChange={(event) => setPrice(event.target.value.replace(/\D/g, ""))}
                    inputMode="numeric"
                    className="exa-input"
                    placeholder="0"
                  />
                </Field>
                <Field label="Deskripsi dan Kekurangan">
                  <input
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    maxLength={1_000}
                    className="exa-input"
                    placeholder="Contoh: lecet tipis, baterai 88%"
                  />
                </Field>
              </div>

              {error ? (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-xl border border-danger/30 bg-danger-surface p-4 text-sm text-danger"
                >
                  <i className="ri-error-warning-line text-lg" />
                  <span>{error}</span>
                </div>
              ) : null}

              <div className="exa-action-row relative flex shadow-lg shadow-primary/20">
                <button
                  type="submit"
                  disabled={analyzing || preparing || quota?.[mode].remaining === 0}
                  className={`exa-action-main flex-1 px-5 text-white font-bold flex items-center justify-center gap-3 transition disabled:opacity-50 ${
                    mode === "deep"
                      ? "exa-action-deep"
                      : "exa-action-quick"
                  }`}
                >
                  <i
                    className={
                      analyzing
                        ? "ri-loader-4-line animate-spin"
                        : mode === "deep"
                          ? "ri-brain-fill"
                          : "ri-flashlight-fill"
                    }
                  />
                  {quota?.[mode].remaining === 0
                    ? "Batas Harian Tercapai"
                    : analyzing
                    ? "Sedang Menganalisis..."
                    : mode === "deep"
                      ? "Mulai Analisis Mendalam"
                      : "Mulai Analisis Cepat"}
                </button>
                <ModeMenu mode={mode} quota={quota} onChange={setMode} />
              </div>
              <div className="flex items-center justify-center gap-3 text-[11px] leading-relaxed text-hint">
                <span>
                  {quota
                    ? `Sisa hari ini: ${quota[mode].remaining}/${quota[mode].limit}`
                    : "Memuat batas harian..."}
                </span>
                <span aria-hidden="true">|</span>
                <span>Hasil AI adalah estimasi visual, bukan pemeriksaan teknisi.</span>
              </div>
            </form>
            </section>
          ) : null}

          {analyzing || result ? (
            <section
              className="exa-workspace-card exa-result-card rounded-2xl border border-mist bg-card shadow-lg"
              aria-live="polite"
            >
              {analyzing ? (
                <AnalyzingState mode={mode} />
              ) : result?.status === "rejected" ? (
                <RejectedState message={result.message} onReset={() => setResult(null)} />
              ) : result ? (
                <ResultState
                  result={result}
                  mode={mode}
                  onReset={() => setResult(null)}
                />
              ) : null}
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-bold text-heading mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function CategorySelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function closeOnOutsideClick(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="exa-category-select relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="exa-input exa-category-trigger cursor-pointer"
      >
        <span className={value ? "text-heading" : "text-hint"}>
          {value || "Pilih kategori"}
        </span>
        <span className="exa-category-chevron flex items-center justify-center">
          <i
            className="ri-arrow-down-s-line transition-transform"
            style={{ transform: open ? "rotate(180deg)" : undefined }}
          />
        </span>
      </button>
      {open ? (
        <div
          role="listbox"
          aria-label="Kategori produk"
          className="exa-category-menu absolute left-0 top-full mt-2 w-full overflow-y-auto rounded-xl"
        >
          {EXA_CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              role="option"
              aria-selected={value === item}
              onClick={() => {
                onChange(item);
                setOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm transition ${
                value === item
                  ? "bg-primary-surface font-bold text-primary"
                  : "text-heading hover:bg-page"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ModeOption({
  active,
  icon,
  title,
  text,
  quota,
  onClick,
}: {
  active: boolean;
  icon: string;
  title: string;
  text: string;
  quota: ExaQuota[ExaMode] | null;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-start gap-3 px-4 py-3 text-left transition ${
        active ? "bg-primary-surface" : "hover:bg-page"
      }`}
    >
      <i className={`${icon} text-lg mt-0.5 text-primary`} />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-heading">{title}</span>
        <span className="block text-xs text-body mt-0.5">{text}</span>
      </span>
      {quota ? (
        <span
          className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-bold ${
            quota.remaining > 0
              ? "border-primary/20 bg-primary-surface text-primary"
              : "border-danger/20 bg-danger-surface text-danger"
          }`}
        >
          {quota.remaining}/{quota.limit}
        </span>
      ) : null}
    </button>
  );
}

function ModeMenu({
  mode,
  quota,
  onChange,
}: {
  mode: ExaMode;
  quota: ExaQuota | null;
  onChange: (mode: ExaMode) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function closeOnOutsideClick(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`exa-mode-menu relative shrink-0 ${open ? "exa-mode-menu-open" : ""}`}
    >
      <button
        type="button"
        aria-label="Pilih mode analisis"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={`exa-action-trigger flex h-full items-center border-l border-white/25 px-4 text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
          mode === "deep" ? "exa-action-deep" : "exa-action-quick"
        }`}
      >
        <i
          className="ri-arrow-down-s-line transition-transform"
          style={{ transform: open ? "rotate(180deg)" : undefined }}
        />
      </button>
      {open ? (
        <div
          role="menu"
          className="exa-mode-dropdown absolute bottom-full right-0 mb-2 w-64 overflow-hidden rounded-xl"
        >
          <ModeOption
            active={mode === "quick"}
            icon="ri-flashlight-fill"
            title="Analisis Cepat"
            text="Identifikasi, skor, estimasi harga"
            quota={quota?.quick ?? null}
            onClick={() => {
              onChange("quick");
              setOpen(false);
            }}
          />
          <ModeOption
            active={mode === "deep"}
            icon="ri-brain-fill"
            title="Analisis Mendalam"
            text="Detail kondisi dan estimasi pasar"
            quota={quota?.deep ?? null}
            onClick={() => {
              onChange("deep");
              setOpen(false);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

function AnalyzingState({ mode }: { mode: ExaMode }) {
  return (
    <div className="exa-state-panel flex flex-col items-center justify-center p-6 text-center">
      <img
        src="/assets/exa/working.webp"
        alt="Exa AI sedang bekerja"
        className="exa-process-image object-contain animate-float-deep"
      />
      <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary-surface border border-primary/20 px-4 py-2 text-xs font-bold text-primary">
        <i className="ri-loader-4-line animate-spin" />
        {mode === "deep" ? "Deep analysis berjalan" : "Quick scan berjalan"}
      </div>
      <h2 className="text-2xl font-bold text-heading mt-5">Exa AI sedang memeriksa</h2>
      <p className="text-sm text-body mt-2 max-w-sm">
        Mengidentifikasi produk, membaca kondisi visual, lalu menyusun estimasi
        yang konsisten.
      </p>
      <div className="w-full max-w-sm h-2 rounded-full bg-mist overflow-hidden mt-7">
        <span className="block h-full w-2/3 rounded-full bg-primary animate-pulse" />
      </div>
    </div>
  );
}

function RejectedState({
  message,
  onReset,
}: {
  message: string;
  onReset: () => void;
}) {
  return (
    <div className="exa-state-panel flex flex-col items-center justify-center p-6 text-center">
      <img
        src="/assets/exa/notfound.webp"
        alt="Exa tidak menemukan gadget"
        className="exa-process-image object-contain"
      />
      <h2 className="text-2xl font-bold text-heading mt-4">Bukan Gadget Terdeteksi</h2>
      <p className="text-body text-sm mt-2 max-w-md">
        {message || "Exa hanya dapat memeriksa perangkat elektronik fisik."}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-hover"
      >
        <i className="ri-refresh-line" />
        Coba Foto Lain
      </button>
    </div>
  );
}

function ResultState({
  result,
  mode,
  onReset,
}: {
  result: ExaAnalysis;
  mode: ExaMode;
  onReset: () => void;
}) {
  const score = result.condition_score;
  const maxTrend = Math.max(...result.price_trend.map((item) => item.price), 1);
  const minTrend = Math.min(...result.price_trend.map((item) => item.price), maxTrend);
  const trendRange = Math.max(maxTrend - minTrend, 1);

  return (
    <div className="p-6 lg:p-8 animate-fade-in-up">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/assets/exa/happy.webp"
            alt="Exa AI"
            className="exa-result-avatar object-contain"
          />
          <div>
            <p className="text-xs font-bold text-primary">Exa AI</p>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-heading">
              <span className="h-2 w-2 rounded-full bg-primary" />
              ANALISIS SELESAI
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-start justify-between gap-5 border-b border-mist pb-5">
        <div className="min-w-0">
          <p className="text-xs font-bold text-primary uppercase">{result.category}</p>
          <h2 className="text-2xl font-black text-heading mt-1 break-words">
            {result.product_name}
          </h2>
          <p className="text-sm text-body mt-2">{result.short_comment}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-4xl font-black text-primary">{score}</p>
          <p className="text-[10px] uppercase text-hint">Condition score</p>
        </div>
      </div>

      <div className="py-6 text-center">
        <p className="text-[10px] font-bold uppercase tracking-wider text-hint">
          Estimasi Harga Pasar
        </p>
        <p className="text-4xl font-black text-primary mt-1">
          {rupiah.format(result.market_price)}
        </p>
      </div>

      <div className="rounded-xl border border-mist bg-page p-4">
        <div className="flex justify-between text-xs font-bold text-body">
          <span>Kondisi Visual</span>
          <span>{score}/100</span>
        </div>
        <div className="h-2.5 rounded-full bg-mist mt-3 overflow-hidden">
          <span
            className="block h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {result.condition_details.length ? (
        <div className="grid grid-cols-2 gap-2 mt-4">
          {result.condition_details.map((detail) => (
            <div
              key={`${detail.label}-${detail.note}`}
              className="rounded-lg border border-mist bg-card p-3 flex items-start gap-2"
            >
              <i
                className={`mt-0.5 ${
                  detail.status === "safe"
                    ? "ri-checkbox-circle-fill text-primary"
                    : detail.status === "warning"
                      ? "ri-alert-fill text-warning"
                      : "ri-close-circle-fill text-danger"
                }`}
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-heading">{detail.label}</p>
                <p className="text-[11px] text-body mt-0.5 break-words">{detail.note}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div className="mt-5 rounded-xl border border-primary/20 bg-primary-surface p-5">
        <p className="text-xs font-bold uppercase text-primary">Saran Exa</p>
        <p className="text-sm text-body mt-2 leading-relaxed">
          {result.deep_analysis || result.saran_exa}
        </p>
      </div>

      {mode === "deep" && result.market_listings.length ? (
        <div className="mt-5">
          <h3 className="text-sm font-bold text-heading">Estimasi Pembanding</h3>
          <p className="text-[11px] text-hint mt-0.5">
            Simulasi kisaran, bukan listing marketplace real-time.
          </p>
          <div className="mt-3 divide-y divide-mist rounded-xl border border-mist overflow-hidden">
            {result.market_listings.map((listing, index) => (
              <div
                key={`${listing.source}-${index}`}
                className="flex items-center justify-between gap-4 bg-card px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-xs font-bold text-heading">{listing.source}</p>
                  <p className="text-[11px] text-body truncate">{listing.seller}</p>
                </div>
                <p className="text-sm font-bold text-primary shrink-0">
                  {rupiah.format(listing.price)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {mode === "deep" && result.price_trend.length ? (
        <div className="exa-trend-panel mt-5 rounded-xl border border-mist p-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-heading">Estimasi Tren 6 Bulan</h3>
              <p className="text-[11px] text-hint mt-0.5">Proyeksi, bukan data pasar real-time.</p>
            </div>
            <span className="text-xs font-bold text-primary">
              {compactRupiah.format(result.price_trend.at(-1)?.price ?? 0)}
            </span>
          </div>
          <div className="exa-trend-chart mt-4">
            {result.price_trend.map((point) => (
              <div
                key={point.month}
                className="exa-trend-column"
                title={`${point.month}: ${rupiah.format(point.price)}`}
              >
                <span className="exa-trend-price">{compactRupiah.format(point.price)}</span>
                <span className="exa-trend-track">
                  <span
                    className="exa-trend-bar"
                    style={{
                      height: `${35 + ((point.price - minTrend) / trendRange) * 65}%`,
                    }}
                  />
                </span>
                <span className="exa-trend-month">{point.month}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-3 mt-6">
        <Link
          href={`/browse?search=${encodeURIComponent(result.product_name)}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-mist px-4 py-3 text-sm font-bold text-heading hover:bg-page"
        >
          <i className="ri-search-line" />
          Cari Produk
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary-hover"
        >
          <i className="ri-refresh-line" />
          Scan Lagi
        </button>
      </div>
    </div>
  );
}
