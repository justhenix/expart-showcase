import Link from "next/link";
import type { AuthUser } from "@/lib/auth";

export function AccountPage({ user }: { user: AuthUser }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="lg:flex lg:space-x-8">
        <aside className="lg:w-1/4 mb-8 lg:mb-0">
          <div className="bg-card rounded-lg shadow-sm border border-mist overflow-hidden">
            <div className="p-4 border-b border-mist flex items-center gap-3">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover border border-mist"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="w-12 h-12 rounded-full bg-primary-surface text-primary flex items-center justify-center text-lg font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
              <div className="min-w-0">
                <h2 className="font-bold text-heading truncate">{user.name}</h2>
                <p className="text-xs text-body truncate">{user.email}</p>
              </div>
            </div>
            <nav className="flex flex-col">
              <span className="flex items-center px-4 py-3 text-sm font-medium text-primary border-l-4 border-primary bg-primary-surface">
                <i className="ri-user-line text-lg mr-3" />
                Profil Saya
              </span>
              <Link
                href="/membership"
                className="flex items-center px-4 py-3 text-sm font-medium text-body hover:bg-primary-surface hover:text-heading border-l-4 border-transparent transition-colors"
              >
                <i className="ri-vip-crown-line text-lg mr-3" />
                Langganan
              </Link>
            </nav>
          </div>
        </aside>

        <section className="lg:w-3/4 bg-card rounded-lg shadow-sm border border-mist min-h-125">
          <div className="px-6 py-4 border-b border-mist">
            <h1 className="text-lg font-bold text-heading">Pengaturan Akun</h1>
            <p className="text-sm text-body mt-1">
              Profil ini terhubung ke akun Google Anda.
            </p>
          </div>

          <div className="p-6">
            <div className="flex flex-col-reverse md:flex-row gap-8">
              <dl className="flex-1 divide-y divide-mist">
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-body">Nama lengkap</dt>
                  <dd className="mt-1 text-sm text-heading sm:col-span-2 sm:mt-0">
                    {user.name}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-body">Email</dt>
                  <dd className="mt-1 text-sm text-heading sm:col-span-2 sm:mt-0">
                    {user.email}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-body">Metode masuk</dt>
                  <dd className="mt-1 text-sm text-heading sm:col-span-2 sm:mt-0 flex items-center gap-2">
                    <i className="ri-google-fill text-primary" />
                    Google
                  </dd>
                </div>
              </dl>

              <div className="md:w-44 shrink-0">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={`Foto profil ${user.name}`}
                    className="w-36 h-36 rounded-full object-cover border border-mist mx-auto"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="w-36 h-36 rounded-full bg-primary-surface text-primary flex items-center justify-center text-4xl font-bold mx-auto">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <p className="text-xs text-hint text-center mt-3">
                  Dikelola melalui Google
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
