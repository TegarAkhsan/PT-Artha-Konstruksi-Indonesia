"use client";

import { useState } from "react";
import { X, Upload, CheckCircle2, AlertCircle, Loader2, FileText, Send } from "lucide-react";

interface CareerApplyModalProps {
  career: {
    id: string;
    title: string;
    department: string;
    location: string;
  };
}

export default function CareerApplyModal({ career }: CareerApplyModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cvFileUrl: "",
    portfolioUrl: "",
    notes: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    setTimeout(() => {
      setStatus("success");
    }, 400);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 transition-all text-sm"
      >
        <Send className="w-4 h-4 mr-2" />
        Lamar Posisi Ini
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="bg-[#0A192F] text-white p-6 flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  Kirim Lamaran Karir
                </span>
                <h3 className="text-lg font-bold">{career.title}</h3>
                <span className="text-xs text-slate-300">
                  {career.department} • {career.location}
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {status === "success" ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">
                    Lamaran Berhasil Diterima!
                  </h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    Terima kasih telah melamar di PT Artha Konstruksi Indonesia. Tim HR kami akan
                    mereview profil Anda dan menghubungi kandidat terpilih.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setIsOpen(false);
                    }}
                    className="mt-4 px-5 py-2 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg"
                  >
                    Tutup
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === "error" && (
                    <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Nama Lengkap <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama lengkap sesuai KTP / Ijazah"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="email@domain.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        No. WhatsApp <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0812xxxxxxxx"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Tautan File CV / Resume (Google Drive / Dropbox / PDF Link){" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://drive.google.com/... (Pastikan akses diset Publik)"
                      value={formData.cvFileUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, cvFileUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Tautan Portofolio Proyek (Opsional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://behance.net/... atau link portofolio"
                      value={formData.portfolioUrl}
                      onChange={(e) =>
                        setFormData({ ...formData, portfolioUrl: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Catatan Singkat / Ringkasan Kualifikasi
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Sebutkan ringkasan pengalaman atau sertifikat keahlian utama Anda..."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg flex items-center space-x-1.5 disabled:opacity-50"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Mengirim...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Kirimkan Lamaran</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
