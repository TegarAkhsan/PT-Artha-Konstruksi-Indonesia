import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectAdminClient from "./ProjectAdminClient";

export default async function AdminProjectsPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/admin/login");
  }

  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
            Manajemen Portofolio
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            Daftar Proyek Konstruksi
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tambah proyek baru, atur status pelaksanaan, dan tentukan proyek unggulan (Featured).
          </p>
        </div>
      </div>

      <ProjectAdminClient initialProjects={projects} />
    </div>
  );
}
