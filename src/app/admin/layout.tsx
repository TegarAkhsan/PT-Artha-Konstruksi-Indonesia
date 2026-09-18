import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  LayoutDashboard,
  HardHat,
  Briefcase,
  FileText,
  ShieldCheck,
  Users,
  Inbox,
  Settings,
  LogOut,
  ChevronRight,
  UserCheck,
} from "lucide-react";
import AdminHeader from "@/components/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // If not logged in, we let client pages like /admin/login render, but wrap other routes
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {user ? (
        <div className="flex-1 flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-[#0A192F] text-slate-300 flex-shrink-0 flex flex-col justify-between border-r border-slate-800">
            <div>
              {/* Brand */}
              <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-white text-base tracking-tight block leading-tight">
                    ARTHA <span className="text-amber-500">CMS</span>
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    Portal Manajemen
                  </span>
                </div>
              </div>

              {/* Navigation Links by Role */}
              <nav className="p-4 space-y-1.5 text-xs font-semibold">
                <Link
                  href="/admin"
                  className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-amber-500" />
                  <span>Dashboard Overview</span>
                </Link>

                {/* Content Admin & Super Admin items */}
                {(user.role === "SUPER_ADMIN" || user.role === "CONTENT_ADMIN") && (
                  <>
                    <div className="pt-4 pb-1 px-3 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      Manajemen Konten
                    </div>

                    <Link
                      href="/admin/projects"
                      className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                    >
                      <HardHat className="w-4 h-4 text-amber-500" />
                      <span>Portofolio Proyek</span>
                    </Link>

                    <Link
                      href="/admin/services"
                      className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                    >
                      <Briefcase className="w-4 h-4 text-amber-500" />
                      <span>Layanan & Scope</span>
                    </Link>

                    <Link
                      href="/admin/certifications"
                      className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-500" />
                      <span>Sertifikat & ISO</span>
                    </Link>

                    <Link
                      href="/admin/articles"
                      className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-amber-500" />
                      <span>Berita & Publikasi</span>
                    </Link>

                    <Link
                      href="/admin/inquiries"
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Inbox className="w-4 h-4 text-amber-500" />
                        <span>Pesan Masuk (Inquiries)</span>
                      </div>
                    </Link>
                  </>
                )}

                {/* HR & Super Admin items */}
                {(user.role === "SUPER_ADMIN" || user.role === "HR") && (
                  <>
                    <div className="pt-4 pb-1 px-3 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      Human Resources
                    </div>

                    <Link
                      href="/admin/careers"
                      className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                    >
                      <Users className="w-4 h-4 text-amber-500" />
                      <span>Lowongan Karir & Pelamar</span>
                    </Link>
                  </>
                )}

                {/* Super Admin only items */}
                {user.role === "SUPER_ADMIN" && (
                  <>
                    <div className="pt-4 pb-1 px-3 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                      Sistem & Pengaturan
                    </div>

                    <Link
                      href="/admin/settings"
                      className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-amber-500" />
                      <span>Profil Perusahaan</span>
                    </Link>
                  </>
                )}
              </nav>
            </div>

            {/* User Footnote */}
            <div className="p-4 border-t border-slate-800">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div className="text-xs font-bold text-white line-clamp-1">
                  {user.name}
                </div>
                <div className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider mt-0.5">
                  {user.role.replace("_", " ")}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Area */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <AdminHeader user={user} />
            <main className="flex-1 p-6 sm:p-8">{children}</main>
          </div>
        </div>
      ) : (
        <div className="flex-1">{children}</div>
      )}
    </div>
  );
}
