import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CareerAdminClient from "./CareerAdminClient";

export default async function AdminCareersPage() {
  const user = await getCurrentUser();
  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "HR")) {
    redirect("/admin");
  }

  const [careers, applicants] = await Promise.all([
    prisma.career.findMany({
      include: { _count: { select: { applicants: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.applicant.findMany({
      include: { career: { select: { title: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
          Human Resources Portal
        </span>
        <h2 className="text-2xl font-black text-slate-900">
          Manajemen Karir & Pelamar Kerja
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Kelola lowongan pekerjaan aktif, review dokumen CV pelamar, dan perbarui tahapan
          seleksi kandidat (Screening, Interview, Hired).
        </p>
      </div>

      <CareerAdminClient initialCareers={careers} initialApplicants={applicants} />
    </div>
  );
}
