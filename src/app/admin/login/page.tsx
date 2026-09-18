"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Loader2,
  UserCheck,
} from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Gagal masuk ke sistem.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Email atau kata sandi tidak valid.");
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (userEmail: string, userPass: string) => {
    setEmail(userEmail);
    setPassword(userPass);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#07101E] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-25" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center px-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-xl shadow-amber-500/20 mb-4">
          <Building2 className="w-8 h-8 text-slate-950 stroke-[2.5]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Portal CMS & Manajemen
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          PT Artha Konstruksi Indonesia • Internal Restricted Access
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-[#0A192F] py-8 px-6 sm:px-10 shadow-2xl rounded-2xl border border-slate-800 text-slate-200">
          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Perusahaan
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="admin@arthakonstruksi.co.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi Akses...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Role Selector */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3 text-center">
              Pilih Akun Demo (Uji Role-Based Access):
            </span>

            <div className="grid grid-cols-1 gap-2 text-xs">
              <button
                type="button"
                onClick={() =>
                  fillCredentials("admin@arthakonstruksi.co.id", "admin123")
                }
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left flex items-center justify-between text-slate-300 hover:text-amber-400 transition-colors"
              >
                <div>
                  <span className="font-bold block">1. Super Admin</span>
                  <span className="text-[10px] text-slate-500">
                    admin@arthakonstruksi.co.id (Full Access)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-400 font-semibold">
                  Akses Penuh
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  fillCredentials("content@arthakonstruksi.co.id", "content123")
                }
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left flex items-center justify-between text-slate-300 hover:text-amber-400 transition-colors"
              >
                <div>
                  <span className="font-bold block">2. Content Admin</span>
                  <span className="text-[10px] text-slate-500">
                    content@arthakonstruksi.co.id (Proyek, Berita, Layanan)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-400 font-semibold">
                  Konten
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  fillCredentials("hr@arthakonstruksi.co.id", "hr123")
                }
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left flex items-center justify-between text-slate-300 hover:text-amber-400 transition-colors"
              >
                <div>
                  <span className="font-bold block">3. HR / Rekrutmen</span>
                  <span className="text-[10px] text-slate-500">
                    hr@arthakonstruksi.co.id (Karir, CV & Lamaran)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold">
                  HR & Pelamar
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-slate-400 hover:text-amber-400 underline underline-offset-4"
          >
            ← Kembali ke Halaman Utama Website Publik
          </a>
        </div>
      </div>
    </div>
  );
}
