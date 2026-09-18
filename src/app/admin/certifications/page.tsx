import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ShieldCheck, Award, ExternalLink } from "lucide-react";

export default async function AdminCertificationsPage() {
  const user = await getCurrentUser();
  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "CONTENT_ADMIN")) {
    redirect("/admin");
  }

  const certs = await prisma.certification.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
          Legalitas & Kredibilitas
        </span>
        <h2 className="text-2xl font-black text-slate-900">
          Sertifikasi Mutu & K3
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Daftar dokumen ISO, SBU LPJK, dan penghargaan resmi keselamatan kerja.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Nama Sertifikasi / Lisensi</th>
              <th className="py-3.5 px-4">Badan Penerbit</th>
              <th className="py-3.5 px-4">No. Registrasi</th>
              <th className="py-3.5 px-4">Kategori</th>
              <th className="py-3.5 px-4">Tahun</th>
              <th className="py-3.5 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {certs.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">{c.title}</td>
                <td className="py-3.5 px-4 text-slate-600">{c.issuer}</td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                  {c.certificateNumber || "-"}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200">
                    {c.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-700">{c.year}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Aktif
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
