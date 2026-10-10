"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, MessageSquare, Mail } from "lucide-react";

export default function InquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "Tender Konstruksi Gedung / Komersial",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [mailtoUrl, setMailtoUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    setTimeout(() => {
      const waText = encodeURIComponent(
        `Halo PT Artha Konstruksi Indonesia,\n\nSaya ingin berkonsultasi mengenai proyek:\n*Kategori:* ${formData.subject}\n*Nama:* ${formData.name}\n*Perusahaan:* ${formData.company || "-"}\n*Email:* ${formData.email}\n*No. Telepon/WA:* ${formData.phone}\n\n*Rincian Kebutuhan:* \n${formData.message}`
      );
      const emailSubj = encodeURIComponent(`[Inquiry Proyek] ${formData.subject} - ${formData.name}`);
      const emailBody = encodeURIComponent(
        `Nama: ${formData.name}\nPerusahaan: ${formData.company || "-"}\nNo Telp: ${formData.phone}\nEmail: ${formData.email}\nKategori: ${formData.subject}\n\nPesan:\n${formData.message}`
      );

      setWhatsappUrl(`https://wa.me/628118900770?text=${waText}`);
      setMailtoUrl(`mailto:info@arthakonstruksi.co.id?subject=${emailSubj}&body=${emailBody}`);
      setStatus("success");
    }, 400);
  };

  const handleReset = () => {
    setStatus("idle");
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      subject: "Tender Konstruksi Gedung / Komersial",
      message: "",
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xl">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
          Formulir Kebutuhan Proyek
        </span>
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
          Konsultasi & Undangan Tender
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Kirimkan informasi awal proyek Anda. Tim komersial dan rekayasa teknik kami akan
          mempelajari spesifikasi serta merespons dalam waktu 1x24 jam kerja.
        </p>
      </div>

      {status === "success" ? (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-base font-bold block">Inquiry Anda Telah Siap!</span>
                <p className="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed">
                  Terima kasih, <strong>{formData.name}</strong>. Rincian permohonan konsultasi mengenai{" "}
                  <strong>{formData.subject}</strong> telah dirangkum. Untuk respon instan, teruskan pesan ini langsung ke saluran komunikasi resmi kami berikut:
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center space-x-2.5 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all text-center"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Kirim via WhatsApp (+62 811 8900 770)</span>
            </a>

            <a
              href={mailtoUrl}
              className="flex items-center justify-center space-x-2.5 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all text-center"
            >
              <Mail className="w-4 h-4" />
              <span>Kirim via Email Resmi</span>
            </a>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline underline-offset-4"
            >
              Isi formulir baru
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nama Lengkap <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Ir. Budi Santoso"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Perusahaan / Instansi
              </label>
              <input
                type="text"
                placeholder="Contoh: PT Mega Properti Nusantara"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Kantor / Bisnis <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="nama@perusahaan.co.id"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Nomor Telepon / WhatsApp <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="+62 812 xxxx xxxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Kategori Kebutuhan Proyek <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
            >
              <option value="Tender Konstruksi Gedung / Komersial">Tender Konstruksi Gedung / Komersial</option>
              <option value="Pembangunan Fasilitas Industri & Pabrik">Pembangunan Fasilitas Industri & Pabrik</option>
              <option value="Infrastruktur, Jembatan & Heavy Civil">Infrastruktur, Jembatan & Heavy Civil</option>
              <option value="Rekayasa Struktur, Geoteknik & Mekanikal">Rekayasa Struktur, Geoteknik & Mekanikal</option>
              <option value="Project Management & BIM Supervision">Project Management & BIM Supervision</option>
              <option value="Kemitraan Vendor / Subkontraktor">Kemitraan Vendor / Subkontraktor</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Rincian Kebutuhan & Lokasi Proyek <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              placeholder="Jelaskan ringkasan proyek (misal: luas bangunan, lokasi, estimasi waktu mulai, atau nomor dokumen RKS/Tender jika ada)..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3 px-6 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memproses Data...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Kirim Permintaan Konsultasi</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
