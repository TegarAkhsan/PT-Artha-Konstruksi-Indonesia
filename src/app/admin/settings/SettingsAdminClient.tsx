"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function SettingsAdminClient({
  initialProfile,
}: {
  initialProfile: any;
}) {
  const [form, setForm] = useState({
    companyName: initialProfile?.companyName || "PT Artha Konstruksi Indonesia",
    slogan: initialProfile?.slogan || "",
    description: initialProfile?.description || "",
    address: initialProfile?.address || "",
    phone: initialProfile?.phone || "",
    whatsapp: initialProfile?.whatsapp || "",
    email: initialProfile?.email || "",
    experienceYears: initialProfile?.experienceYears || 16,
    completedProjects: initialProfile?.completedProjects || 140,
    professionalStaff: initialProfile?.professionalStaff || 75,
    corporateClients: initialProfile?.corporateClients || 35,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
      }
    } catch (e) {
      alert("Gagal menyimpan data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6 max-w-3xl">
      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center space-x-2 text-emerald-800 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Pengaturan profil perusahaan berhasil disimpan!</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
          Nama Resmi Perusahaan
        </label>
        <input
          type="text"
          required
          value={form.companyName}
          onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          className="w-full px-3.5 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
          Slogan / Tagline Korporat
        </label>
        <input
          type="text"
          value={form.slogan}
          onChange={(e) => setForm({ ...form, slogan: e.target.value })}
          className="w-full px-3.5 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
          Deskripsi Singkat Profil Perusahaan
        </label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-3.5 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
            Telepon Kantor
          </label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-3.5 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
            WhatsApp Hotline
          </label>
          <input
            type="text"
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            className="w-full px-3.5 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
            Email Resmi
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3.5 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
          Alamat Lengkap Kantor Pusat
        </label>
        <textarea
          rows={2}
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full px-3.5 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* Statistics */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Angka Statistik Homepage (Counter):
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Tahun Pengalaman
            </label>
            <input
              type="number"
              value={form.experienceYears}
              onChange={(e) =>
                setForm({ ...form, experienceYears: parseInt(e.target.value, 10) })
              }
              className="w-full px-3 py-1.5 text-xs border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Proyek Selesai
            </label>
            <input
              type="number"
              value={form.completedProjects}
              onChange={(e) =>
                setForm({ ...form, completedProjects: parseInt(e.target.value, 10) })
              }
              className="w-full px-3 py-1.5 text-xs border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Tenaga Ahli
            </label>
            <input
              type="number"
              value={form.professionalStaff}
              onChange={(e) =>
                setForm({ ...form, professionalStaff: parseInt(e.target.value, 10) })
              }
              className="w-full px-3 py-1.5 text-xs border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Klien Korporat
            </label>
            <input
              type="number"
              value={form.corporateClients}
              onChange={(e) =>
                setForm({ ...form, corporateClients: parseInt(e.target.value, 10) })
              }
              className="w-full px-3 py-1.5 text-xs border rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center space-x-1.5"
        >
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          <span>Simpan Perubahan</span>
        </button>
      </div>
    </form>
  );
}
