"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  ExternalLink,
  Star,
  MapPin,
  Calendar,
  Building,
  Loader2,
  X,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  location: string;
  year: number;
  value?: string | null;
  category: string;
  description: string;
  scopeOfWork: string;
  status: string;
  featured: boolean;
  thumbnail: string;
}

export default function ProjectAdminClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    client: "",
    location: "",
    year: new Date().getFullYear(),
    value: "Rp 50 Miliar",
    category: "Building Construction",
    description: "",
    scopeOfWork: "Pekerjaan Struktur Bawah & Superstruktur\nPekerjaan Arsitektural & MEP",
    status: "Completed",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?q=80&w=1200&auto=format&fit=crop",
  });

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Yakin ingin menghapus proyek: "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
      }
    } catch (e) {
      alert("Gagal menghapus proyek.");
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menambah proyek");

      setProjects([data.project, ...projects]);
      setIsModalOpen(false);
      setForm({
        title: "",
        client: "",
        location: "",
        year: new Date().getFullYear(),
        value: "Rp 50 Miliar",
        category: "Building Construction",
        description: "",
        scopeOfWork: "Pekerjaan Struktur & Arsitektural",
        status: "Completed",
        featured: false,
        thumbnail: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?q=80&w=1200&auto=format&fit=crop",
      });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <input
          type="text"
          placeholder="Cari proyek, klien, atau lokasi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-500/20 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Tambah Proyek Baru</span>
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Proyek & Klien</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4">Lokasi & Tahun</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-12 h-10 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                      />
                      <div>
                        <span className="font-bold text-slate-900 block line-clamp-1">
                          {project.title}
                        </span>
                        <span className="text-[11px] text-slate-500 line-clamp-1">
                          Klien: {project.client}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {project.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    <div>{project.location}</div>
                    <span className="text-[10px] text-slate-400">Tahun {project.year}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        project.status === "Completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    {project.featured ? (
                      <span className="text-amber-500 font-bold flex items-center text-[11px]">
                        <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                        Ya
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">-</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right space-x-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-slate-100 inline-block"
                      title="Lihat Halaman Publik"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id, project.title)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 inline-block"
                      title="Hapus Proyek"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Tambah Portofolio Proyek Baru
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Nama Proyek <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Gedung Laboratorium Terpadu UI"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Nama Klien <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="PT Ciputra / Kementerian PUPR"
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Lokasi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Depok, Jawa Barat"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Tahun
                  </label>
                  <input
                    type="number"
                    required
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: parseInt(e.target.value, 10) })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Nilai Proyek (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Rp 75 Miliar"
                    value={form.value}
                    onChange={(e) => setForm({ ...form, value: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">
                    Kategori
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="Building Construction">Building Construction</option>
                    <option value="Industrial Construction">Industrial Construction</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                  </select>
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.featured}
                      onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                      className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                    />
                    <span className="font-bold text-slate-700">Tampilkan di Halaman Depan (Featured)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  URL Thumbnail Foto <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  value={form.thumbnail}
                  onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Deskripsi Proyek <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">
                  Ruang Lingkup Pekerjaan (Pisahkan dengan baris baru)
                </label>
                <textarea
                  rows={2}
                  value={form.scopeOfWork}
                  onChange={(e) => setForm({ ...form, scopeOfWork: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 font-bold text-slate-950 flex items-center space-x-1.5"
                >
                  {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Simpan Proyek</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
