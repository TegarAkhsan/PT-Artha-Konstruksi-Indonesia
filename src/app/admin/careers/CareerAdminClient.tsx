"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  ExternalLink,
  Users,
  Briefcase,
  FileText,
  Calendar,
  MapPin,
  X,
  Loader2,
  CheckCircle2,
} from "lucide-react";

interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  deadline?: Date | string | null;
  isActive: boolean;
  _count?: { applicants: number };
}

interface Applicant {
  id: string;
  careerId: string;
  career: { title: string };
  fullName: string;
  email: string;
  phone: string;
  cvFileUrl: string;
  portfolioUrl?: string | null;
  notes?: string | null;
  status: string;
  createdAt: Date | string;
}

export default function CareerAdminClient({
  initialCareers,
  initialApplicants,
}: {
  initialCareers: Career[];
  initialApplicants: Applicant[];
}) {
  const [tab, setTab] = useState<"applicants" | "vacancies">("applicants");
  const [careers, setCareers] = useState<Career[]>(initialCareers);
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [careerForm, setCareerForm] = useState({
    title: "",
    department: "Engineering",
    location: "Jakarta",
    type: "Full-time",
    description: "",
    requirements: "Pendidikan S1 Teknik Sipil / Terkait\nPengalaman min 3 tahun\nMenguasai software terkait",
    deadline: "",
  });

  const handleCreateCareer = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(careerForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal membuat lowongan");

      setCareers([{ ...data.career, _count: { applicants: 0 } }, ...careers]);
      setIsModalOpen(false);
      setCareerForm({
        title: "",
        department: "Engineering",
        location: "Jakarta",
        type: "Full-time",
        description: "",
        requirements: "Pendidikan S1 Teknik Sipil / Terkait\nPengalaman min 3 tahun",
        deadline: "",
      });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCareer = async (id: string, title: string) => {
    if (!confirm(`Hapus lowongan: "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/careers?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCareers(careers.filter((c) => c.id !== id));
      }
    } catch (e) {
      alert("Gagal menghapus lowongan.");
    }
  };

  const handleUpdateApplicantStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/applicants", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setApplicants(
          applicants.map((a) => (a.id === id ? { ...a, status } : a))
        );
      }
    } catch (e) {
      alert("Gagal mengupdate status pelamar.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Selector & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex space-x-2">
          <button
            onClick={() => setTab("applicants")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2 ${
              tab === "applicants"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Daftar Pelamar Kerja ({applicants.length})</span>
          </button>

          <button
            onClick={() => setTab("vacancies")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center space-x-2 ${
              tab === "vacancies"
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Daftar Lowongan ({careers.length})</span>
          </button>
        </div>

        {tab === "vacancies" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span>Buka Lowongan Baru</span>
          </button>
        )}
      </div>

      {/* Tab Content: Applicants */}
      {tab === "applicants" && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Nama Pelamar</th>
                  <th className="py-3.5 px-4">Posisi Dilamar</th>
                  <th className="py-3.5 px-4">Kontak (Email / WA)</th>
                  <th className="py-3.5 px-4">Dokumen CV</th>
                  <th className="py-3.5 px-4">Tahapan Seleksi</th>
                  <th className="py-3.5 px-4">Tanggal Masuk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applicants.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      Belum ada kandidat pelamar yang masuk.
                    </td>
                  </tr>
                ) : (
                  applicants.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">
                          {app.fullName}
                        </span>
                        {app.notes && (
                          <span className="text-[10px] text-slate-500 line-clamp-1">
                            Catatan: {app.notes}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-amber-600">
                        {app.career.title}
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">
                        <div>{app.email}</div>
                        <a
                          href={`https://wa.me/${app.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-600 font-semibold hover:underline"
                        >
                          {app.phone}
                        </a>
                      </td>

                      <td className="py-3.5 px-4">
                        <a
                          href={app.cvFileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center px-2.5 py-1 rounded bg-slate-100 hover:bg-amber-100 text-slate-800 font-semibold text-[11px] border border-slate-200"
                        >
                          <FileText className="w-3.5 h-3.5 mr-1 text-amber-600" />
                          <span>Buka CV</span>
                          <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
                        </a>
                      </td>

                      <td className="py-3.5 px-4">
                        <select
                          value={app.status}
                          onChange={(e) =>
                            handleUpdateApplicantStatus(app.id, e.target.value)
                          }
                          className="px-2.5 py-1 rounded-lg border border-slate-300 font-bold text-[11px] bg-slate-50 focus:ring-2 focus:ring-amber-500"
                        >
                          <option value="Applied">Applied (Terkirim)</option>
                          <option value="Screening">Screening (Berkas Valid)</option>
                          <option value="Interview">Interview (Wawancara)</option>
                          <option value="Offered">Offered (Penawaran)</option>
                          <option value="Rejected">Rejected (Gugur)</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                        {new Intl.DateTimeFormat("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(app.createdAt))}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Vacancies */}
      {tab === "vacancies" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careers.map((career) => (
            <div
              key={career.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200">
                    {career.department}
                  </span>
                  <span className="text-xs font-bold text-emerald-600">
                    {career._count?.applicants ?? 0} Pelamar
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {career.title}
                </h3>

                <div className="flex items-center space-x-3 text-xs text-slate-500 mb-3">
                  <span className="flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    <span>{career.location}</span>
                  </span>
                  <span>•</span>
                  <span>{career.type}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {career.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[11px] text-slate-400">
                  {career.deadline ? `Deadline: ${career.deadline}` : "Terbuka"}
                </span>

                <button
                  onClick={() => handleDeleteCareer(career.id, career.title)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Hapus Lowongan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Add Vacancy */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Buat Lowongan Karir Baru
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCareer} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Nama Posisi Jabatan <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Senior Quantity Surveyor"
                  value={careerForm.title}
                  onChange={(e) =>
                    setCareerForm({ ...careerForm, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Departemen
                  </label>
                  <input
                    type="text"
                    required
                    value={careerForm.department}
                    onChange={(e) =>
                      setCareerForm({ ...careerForm, department: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Lokasi Penempatan
                  </label>
                  <input
                    type="text"
                    required
                    value={careerForm.location}
                    onChange={(e) =>
                      setCareerForm({ ...careerForm, location: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Deskripsi Tanggung Jawab
                </label>
                <textarea
                  rows={3}
                  required
                  value={careerForm.description}
                  onChange={(e) =>
                    setCareerForm({ ...careerForm, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Persyaratan (Pisahkan baris baru)
                </label>
                <textarea
                  rows={3}
                  required
                  value={careerForm.requirements}
                  onChange={(e) =>
                    setCareerForm({ ...careerForm, requirements: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 font-bold text-slate-950 flex items-center space-x-1"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Terbitkan Lowongan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
