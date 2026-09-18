import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ExternalLink, Briefcase } from "lucide-react";

export default async function AdminServicesPage() {
  const user = await getCurrentUser();
  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "CONTENT_ADMIN")) {
    redirect("/admin");
  }

  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
          Portofolio Layanan
        </span>
        <h2 className="text-2xl font-black text-slate-900">
          Daftar Layanan Konstruksi & Engineering
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Kelola rincian ruang lingkup (scope of work) dan deskripsi teknis untuk tiap bidang spesialisasi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between"
          >
            <div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200 mb-3 inline-block">
                {service.category}
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {service.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                {service.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-400">Slug: /{service.slug}</span>
              <Link
                href={`/services/${service.slug}`}
                target="_blank"
                className="inline-flex items-center text-amber-600 font-bold hover:underline"
              >
                <span>Lihat Publik</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
