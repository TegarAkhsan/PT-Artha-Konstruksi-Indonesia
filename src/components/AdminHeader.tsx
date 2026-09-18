"use client";

import { useRouter } from "next/navigation";
import { LogOut, ExternalLink, ShieldAlert, UserCheck } from "lucide-react";
import Link from "next/link";
import { SessionUser } from "@/lib/auth";

export default function AdminHeader({ user }: { user: SessionUser }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "HR":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 sm:px-8 py-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
      <div className="flex items-center space-x-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 hidden sm:inline">
          Panel CMS
        </span>
        <span className="text-slate-300 hidden sm:inline">/</span>
        <h1 className="text-base sm:text-lg font-extrabold text-slate-900">
          PT Artha Konstruksi Indonesia
        </h1>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        {/* Link to public site */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <span>Buka Website</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        {/* User Role Tag */}
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getRoleBadgeClass(
            user.role
          )}`}
        >
          {user.role.replace("_", " ")}
        </span>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Keluar</span>
        </button>
      </div>
    </header>
  );
}
