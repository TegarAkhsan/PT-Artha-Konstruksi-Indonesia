import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ProjectCard from "@/components/ProjectCard";
import SectionTitle from "@/components/SectionTitle";
import Link from "next/link";
import { Filter, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Portofolio Proyek Konstruksi & Infrastruktur Nasional",
  description:
    "Eksplorasi portofolio proyek terkemuka PT Artha Konstruksi Indonesia mencakup gedung perkantoran bertingkat tinggi, kawasan industri modern, pabrik kimia, flyover, dan fasilitas logistik IKN.",
};

interface Props {
  searchParams: Promise<{ category?: string; year?: string }>;
}

export default async function ProjectsPage({ searchParams }: Props) {
  const { category, year } = await searchParams;

  const whereClause: any = {};
  if (category && category !== "all") {
    whereClause.category = category;
  }
  if (year && year !== "all") {
    whereClause.year = parseInt(year, 10);
  }

  const [projects, categoriesRaw, yearsRaw] = await Promise.all([
    prisma.project.findMany({
      where: whereClause,
      orderBy: { year: "desc" },
    }),
    prisma.project.findMany({
      select: { category: true },
      distinct: ["category"],
    }),
    prisma.project.findMany({
      select: { year: true },
      distinct: ["year"],
      orderBy: { year: "desc" },
    }),
  ]);

  const categories = categoriesRaw.map((c) => c.category);
  const years = yearsRaw.map((y) => y.year);

  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Banner */}
      <div className="bg-[#07101E] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
            Rekam Jejak Karya
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Portofolio Proyek Terpercaya
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Mewujudkan bangunan gedung modern, fasilitas manufaktur industri, dan
            infrastruktur transportasi vital dengan standar mutu dan ketepatan waktu tinggi.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        {/* Filter Controls Bar */}
        <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200/90 mb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <Filter className="w-4 h-4 text-amber-500" />
            <span>Filter Berdasarkan Kategori:</span>
          </div>

          <div className="flex flex-wrap gap-2 items-center justify-center">
            <Link
              href="/projects"
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                !category || category === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              Semua Kategori
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/projects?category=${encodeURIComponent(cat)}${
                  year ? `&year=${year}` : ""
                }`}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  category === cat
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Year Filter Dropdown */}
          <div className="flex items-center space-x-2 text-xs font-medium">
            <span className="text-slate-500">Tahun:</span>
            <div className="flex gap-1.5">
              <Link
                href={`/projects${category ? `?category=${category}` : ""}`}
                className={`px-2.5 py-1 rounded text-xs font-bold ${
                  !year || year === "all"
                    ? "bg-amber-500 text-slate-950 font-bold"
                    : "bg-white border text-slate-600"
                }`}
              >
                Semua
              </Link>
              {years.map((y) => (
                <Link
                  key={y}
                  href={`/projects?year=${y}${category ? `&category=${category}` : ""}`}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${
                    year === y.toString()
                      ? "bg-amber-500 text-slate-950"
                      : "bg-white border text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {y}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Project Results */}
        {projects.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">
              Tidak Ada Proyek yang Ditemukan
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Tidak ada proyek yang sesuai dengan kriteria filter yang Anda pilih.
              Silakan atur ulang filter.
            </p>
            <Link
              href="/projects"
              className="mt-4 inline-block px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400"
            >
              Reset Filter
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
