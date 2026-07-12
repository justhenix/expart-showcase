"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type AuthMode = "login" | "register" | "forgot";

export function AuthCard({
  mode = "login",
  authError = "",
}: {
  mode?: AuthMode;
  authError?: string;
}) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/coming-soon");
  }

  const register = mode === "register";
  const forgot = mode === "forgot";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-page font-sans text-heading p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-150 h-150 bg-info/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-125 h-125 bg-primary/25 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 right-0 w-75 h-75 bg-primary-surface rounded-full blur-[80px] translate-x-1/2" />

      <div className="relative z-10 w-full max-w-4xl">
        <div className={`w-full flex justify-center ${forgot ? "mb-6" : "mb-4"}`}>
          <Link href="/" className="block">
            <img
              src="/expart-logo.svg"
              alt="ExPart Logo"
              className={forgot ? "h-10 md:h-12" : "h-8 md:h-10"}
            />
          </Link>
        </div>

        <div
          className={`${forgot ? "bg-white/80 dark:bg-card/80 dark:border-white/10" : "bg-card/80 dark:border-mist"} backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row`}
        >
          <div
            className={`w-full lg:w-1/2 p-5 md:p-8 ${forgot ? "flex flex-col justify-center" : ""}`}
          >
            <div className={forgot ? "mb-6" : "mb-4"}>
              <h2
                className={`${forgot ? "text-2xl" : "text-xl"} font-bold text-heading`}
              >
                {forgot
                  ? "Lupa Kata Sandi?"
                  : register
                    ? "Buat Akun Baru"
                    : "Masuk"}
              </h2>
              <p className="text-body mt-1 text-sm">
                {forgot
                  ? "Masukkan email atau username untuk memulihkan akun Anda."
                  : register
                    ? "Daftar sekarang untuk mulai berbelanja."
                    : "Selamat datang kembali! Silakan masuk ke akun Anda."}
              </p>
            </div>

            <form
              onSubmit={submit}
              className={forgot ? "space-y-4" : "space-y-3"}
            >
              {authError ? (
                <p
                  role="alert"
                  className="rounded-lg border border-danger/30 bg-danger-surface px-3 py-2 text-sm text-danger"
                >
                  {authError}
                </p>
              ) : null}
              {register ? (
                <AuthInput
                  id="name"
                  label="Nama Lengkap"
                  icon="ri-user-line"
                  placeholder="Nama Lengkap Anda"
                />
              ) : null}

              <AuthInput
                id={forgot ? "account" : "email"}
                label={forgot ? "Username atau Email" : "Email"}
                icon={forgot ? "ri-user-line" : "ri-mail-line"}
                placeholder={
                  forgot ? "Masukkan username atau email" : "contoh@email.com"
                }
                type={forgot ? "text" : "email"}
                large={forgot}
              />

              {!forgot ? (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="password"
                      className="block text-xs font-semibold text-heading"
                    >
                      Kata Sandi
                    </label>
                    {!register ? (
                      <Link
                        href="/login/forgot"
                        className="text-xs font-medium text-primary hover:text-primary-hover transition-colors"
                      >
                        Lupa sandi?
                      </Link>
                    ) : null}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-hint">
                      <span className="ri-lock-2-line text-lg" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      required
                      minLength={register ? 8 : 1}
                      className="block w-full pl-10 pr-10 py-2.5 bg-page border-0 rounded-xl focus:ring-2 focus:ring-primary text-sm placeholder-hint dark:text-white transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-hint hover:text-body transition-colors focus:outline-none"
                      aria-label={
                        showPassword
                          ? "Sembunyikan kata sandi"
                          : "Tampilkan kata sandi"
                      }
                    >
                      <span
                        className={`${showPassword ? "ri-eye-off-line" : "ri-eye-line"} text-lg`}
                      />
                    </button>
                  </div>
                  {register ? (
                    <p className="text-xs text-hint mt-1.5 flex items-center gap-1">
                      <span className="ri-information-line text-info" />
                      Minimal 8 karakter: huruf besar, huruf kecil, angka, dan simbol.
                    </p>
                  ) : null}
                </div>
              ) : null}

              {!register && !forgot ? (
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-primary focus:ring-primary border-mist rounded cursor-pointer"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-body cursor-pointer select-none"
                  >
                    Ingat saya
                  </label>
                </div>
              ) : null}

              <button
                type="submit"
                className={`${forgot ? "py-3" : "py-2.5"} w-full flex items-center justify-center gap-2 px-4 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-hover transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 shadow-lg shadow-primary/25`}
              >
                {forgot
                  ? "Kirim Kode Verifikasi"
                  : register
                    ? "Daftar Sekarang"
                    : "Masuk"}
              </button>

              {!forgot ? (
                <>
                  <div className="relative flex py-2 items-center">
                    <div className="grow border-t border-mist" />
                    <span className="shrink-0 mx-4 text-xs text-hint font-medium">
                      atau
                    </span>
                    <div className="grow border-t border-mist" />
                  </div>
                  <Link
                    href="/auth/google"
                    className="w-full flex items-center justify-center py-2.5 px-4 bg-card border border-mist dark:border-slate-600 rounded-xl shadow-sm hover:bg-page dark:hover:bg-slate-700 text-sm font-medium text-heading transition-all duration-200 group"
                  >
                    <span className="ri-google-fill text-xl mr-2 text-body dark:text-white group-hover:text-heading transition-colors" />
                    {register ? "Daftar dengan Google" : "Masuk dengan Google"}
                  </Link>
                </>
              ) : null}
            </form>

            <div
              className={`${forgot ? "mt-6 border-t border-mist pt-4" : "mt-4"} text-center text-sm text-body`}
            >
              {forgot ? "Kembali ke halaman " : register ? "Sudah punya akun? " : "Belum punya akun? "}
              <Link
                href={register || forgot ? "/login" : "/register"}
                className="font-bold text-primary hover:text-primary-hover transition-colors"
              >
                {forgot
                  ? "Masuk"
                  : register
                    ? "Masuk di sini"
                    : "Daftar sekarang"}
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary-surface to-exa-light dark:from-card dark:to-page relative items-center justify-center p-8 flex-col">
            <span className="absolute top-8 right-12 text-2xl animate-pulse opacity-60">
              ✨
            </span>
            <span className="absolute bottom-24 left-10 text-xl animate-pulse opacity-50">
              🍃
            </span>
            <span className="absolute top-1/3 left-8 text-lg animate-pulse opacity-40">
              ✨
            </span>
            <div className="relative mb-4">
              <img
                src="/assets/exa/hero.webp"
                alt="Exa Mascot"
                className="w-52 h-auto drop-shadow-2xl animate-float-subtle"
              />
            </div>
            <div className="text-center px-6">
              <p className="text-heading font-bold">
                {forgot
                  ? "Jangan Khawatir!"
                  : register
                    ? "Gabung Bersama Kami!"
                    : "Selamat Datang!"}
              </p>
              <p className={`text-body text-sm ${forgot ? "mt-1" : "mt-0.5"}`}>
                {forgot
                  ? "Kami bantu pulihkan akses akun Anda."
                  : register
                    ? "Jual beli dengan mudah dan aman."
                    : "Extend Your Build bersama ExPart."}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-hint">
          {register ? (
            <>
              Dengan mendaftar, Anda menyetujui{" "}
              <Link href="/terms" className="hover:text-primary">
                Syarat dan Ketentuan
              </Link>{" "}
              dan{" "}
              <Link href="/privacy" className="hover:text-primary">
                Privasi
              </Link>
              .
            </>
          ) : (
            `© ${new Date().getFullYear()} ExPart. Extend Your Build.`
          )}
        </p>
      </div>
    </div>
  );
}

function AuthInput({
  id,
  label,
  icon,
  placeholder,
  type = "text",
  large = false,
}: {
  id: string;
  label: string;
  icon: string;
  placeholder: string;
  type?: string;
  large?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-xs font-semibold text-heading ${large ? "mb-1.5" : "mb-1"}`}
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-hint">
          <span className={`${icon} text-lg`} />
        </div>
        <input
          id={id}
          name={id}
          type={type}
          required
          className={`block w-full pl-10 pr-4 ${large ? "py-3" : "py-2.5"} bg-page border-0 rounded-xl focus:ring-2 focus:ring-primary text-sm placeholder-hint dark:text-white transition-all`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
