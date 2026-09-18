"use client";

import { useState } from "react";
import {
  Inbox,
  Mail,
  Phone,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  MessageSquare,
  Search,
  Filter,
} from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  company?: string | null;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  internalNotes?: string | null;
  createdAt: Date | string;
}

export default function InquiryAdminClient({
  initialInquiries,
}: {
  initialInquiries: Inquiry[];
}) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(
    inquiries[0] || null
  );
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [saving, setSaving] = useState(false);

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus =
      filterStatus === "all" ? true : inq.status === filterStatus;
    const matchesSearch =
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.subject.toLowerCase().includes(search.toLowerCase()) ||
      (inq.company && inq.company.toLowerCase().includes(search.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedInquiry) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedInquiry.id, status: newStatus }),
      });
      if (res.ok) {
        const updated = { ...selectedInquiry, status: newStatus };
        setSelectedInquiry(updated);
        setInquiries(
          inquiries.map((item) => (item.id === selectedInquiry.id ? updated : item))
        );
      }
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNote = async () => {
    if (!selectedInquiry) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedInquiry.id,
          internalNotes: noteInput,
        }),
      });
      if (res.ok) {
        const updated = { ...selectedInquiry, internalNotes: noteInput };
        setSelectedInquiry(updated);
        setInquiries(
          inquiries.map((item) => (item.id === selectedInquiry.id ? updated : item))
        );
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* List Column (5 cols) */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-4 space-y-4 shadow-sm">
        {/* Search & Filter */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari nama, PT, atau subjek..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold">
            {["all", "New", "In_Progress", "Contacted", "Closed"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                  filterStatus === s
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {s === "all" ? "Semua" : s.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* List of items */}
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {filteredInquiries.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-10">
              Tidak ada pesan inquiry yang cocok.
            </p>
          ) : (
            filteredInquiries.map((inq) => {
              const isSelected = selectedInquiry?.id === inq.id;
              return (
                <div
                  key={inq.id}
                  onClick={() => {
                    setSelectedInquiry(inq);
                    setNoteInput(inq.internalNotes || "");
                  }}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? "bg-amber-50/70 border-amber-400 shadow-sm"
                      : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-slate-900 line-clamp-1">
                      {inq.name}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        inq.status === "New"
                          ? "bg-rose-100 text-rose-700"
                          : inq.status === "In_Progress"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>

                  {inq.company && (
                    <span className="text-[11px] text-slate-500 block line-clamp-1 mb-1">
                      {inq.company}
                    </span>
                  )}

                  <p className="font-medium text-slate-700 line-clamp-1">
                    {inq.subject}
                  </p>

                  <span className="text-[10px] text-slate-400 mt-2 block">
                    {new Intl.DateTimeFormat("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(inq.createdAt))}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Details Column (7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {selectedInquiry ? (
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block mb-1">
                  Rincian Pesan Klien
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedInquiry.subject}
                </h3>
                <span className="text-xs text-slate-400 mt-1 block">
                  Diterima:{" "}
                  {new Intl.DateTimeFormat("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(selectedInquiry.createdAt))}
                </span>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Status Follow-Up:
                </label>
                <select
                  disabled={saving}
                  value={selectedInquiry.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 bg-slate-50 focus:ring-2 focus:ring-amber-500"
                >
                  <option value="New">New (Baru)</option>
                  <option value="In_Progress">In Progress (Sedang Diproses)</option>
                  <option value="Contacted">Contacted (Sudah Dihubungi)</option>
                  <option value="Closed">Closed (Selesai/Deal)</option>
                </select>
              </div>
            </div>

            {/* Sender Info Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Nama Pengirim:</span>
                <span className="font-bold text-slate-900">
                  {selectedInquiry.name}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Perusahaan / Instansi:</span>
                <span className="font-bold text-slate-900">
                  {selectedInquiry.company || "-"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Email:</span>
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="font-bold text-amber-600 hover:underline"
                >
                  {selectedInquiry.email}
                </a>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">WhatsApp / Telepon:</span>
                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-emerald-600 hover:underline"
                >
                  {selectedInquiry.phone}
                </a>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Pesan / Keterangan Kebutuhan Proyek:
              </h4>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Internal Notes */}
            <div className="border-t border-slate-100 pt-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Catatan Internal Tim Sales & Estimator:
              </h4>
              <textarea
                rows={3}
                placeholder="Tambahkan catatan internal (contoh: sudah dikontak via WA, dokumen RKS sudah diterima, jadwalkan Zoom Jumat)..."
                value={noteInput}
                onChange={(e) => setNoteInput(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  disabled={saving}
                  onClick={handleSaveNote}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : "Simpan Catatan Internal"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400 text-xs">
            Pilih pesan di sebelah kiri untuk melihat rincian lengkap.
          </div>
        )}
      </div>
    </div>
  );
}
