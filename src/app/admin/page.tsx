import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  HardHat,
  Inbox,
  Users,
  FileText,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  const [
    totalProjects,
    totalServices,
    totalInquiries,
    newInquiries,
    totalApplicants,
    totalArticles,
    recentInquiries,
    recentApplicants,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: "New" } }),
    prisma.applicant.count(),
    prisma.article.count(),
    prisma.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.applicant.findMany({
      take: 5,
      include: { career: { select: { title: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0A192F] to-[#162A45] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1">
            Panel Kontrol Utama
          </span>
          <h2 className="text-xl sm:text-2xl font-black">
            Selamat Datang, {user.name}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300">
            Anda login sebagai{" "}
            <span className="font-bold text-amber-400">
              {user.role.replace("_", " ")}
            </span>
            . Pantau perkembangan inquiry klien, lowongan, dan portofolio proyek.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/projects"
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center"
          >
            <span>Kelola Proyek</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
          <Link
            href="/admin/inquiries"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center"
          >
            <span>Inbox Pesan</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-slate-400 block">
              Total Portofolio Proyek
            </span>
            <span className="text-3xl font-extrabold text-slate-900 mt-1 block">
              {totalProjects}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Gedung, pabrik, & infrastruktur
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <HardHat className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-slate-400 block">
              Pesan Masuk (Inquiries)
            </span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900">
                {totalInquiries}
              </span>
              {newInquiries > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                  {newInquiries} Baru
                </span>
              )}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              Undangan tender & konsultasi
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-slate-400 block">
              Total Pelamar Karir
            </span>
            <span className="text-3xl font-extrabold text-slate-900 mt-1 block">
              {totalApplicants}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Resume & CV terdaftar
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-slate-400 block">
              Artikel & Berita
            </span>
            <span className="text-3xl font-extrabold text-slate-900 mt-1 block">
              {totalArticles}
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Rilis media publikasi
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 2 Columns: Recent Inquiries & Recent Applicants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Pesan Inquiry Klien Terbaru
              </h3>
              <p className="text-xs text-slate-500">
                Permintaan konsultasi proyek dari calon klien & developer
              </p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center"
            >
              <span>Semua Pesan</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-6">
              Belum ada pesan inquiry masuk.
            </p>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-bold text-xs text-slate-900">
                        {inq.name}
                      </span>
                      {inq.company && (
                        <span className="text-[11px] text-slate-500">
                          • {inq.company}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-medium text-slate-700 line-clamp-1">
                      {inq.subject}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {new Intl.DateTimeFormat("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(inq.createdAt))}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
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
              ))}
            </div>
          )}
        </div>

        {/* Recent Applicants */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Pelamar Karir Terbaru
              </h3>
              <p className="text-xs text-slate-500">
                Kandidat yang melamar lowongan posisi aktif
              </p>
            </div>
            <Link
              href="/admin/careers"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center"
            >
              <span>Semua Pelamar</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          {recentApplicants.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-6">
              Belum ada lamaran masuk.
            </p>
          ) : (
            <div className="space-y-3">
              {recentApplicants.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-4"
                >
                  <div>
                    <span className="font-bold text-xs text-slate-900 block">
                      {app.fullName}
                    </span>
                    <span className="text-xs text-amber-600 font-medium block">
                      Posisi: {app.career.title}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {app.email} • {app.phone}
                    </span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
