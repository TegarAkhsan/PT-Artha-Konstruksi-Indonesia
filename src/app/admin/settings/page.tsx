import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SettingsAdminClient from "./SettingsAdminClient";

export default async function AdminSettingsPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "SUPER_ADMIN") {
    redirect("/admin");
  }

  const profile = await prisma.companyProfile.findUnique({
    where: { id: "default" },
  });

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
          Konfigurasi Sistem
        </span>
        <h2 className="text-2xl font-black text-slate-900">
          Profil & Informasi Perusahaan
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Pengaturan identitas perusahaan, angka statistik pencapaian, dan kontak resmi (Khusus Super Admin).
        </p>
      </div>

      <SettingsAdminClient initialProfile={profile} />
    </div>
  );
}
