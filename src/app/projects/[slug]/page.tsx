import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProjects,
  getProjectBySlug,
} from "@/data/companyData";
import {
  MapPin,
  Calendar,
  Building,
  DollarSign,
  ArrowLeft,
  CheckCircle2,
  PhoneCall,
  Images,
  ShieldCheck,
} from "lucide-react";

export function generateStaticParams() {
  const projects = getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Proyek Tidak Ditemukan" };
  }

  return {
    title: `${project.title} | Portofolio Proyek`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const scopes = project.scopeOfWork
    .split("\n")
    .filter((l) => l.trim().length > 0);

  const isOngoing = project.status.toLowerCase() === "ongoing";

  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Banner */}
      <div className="bg-[#07101E] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-4">
            <Link
              href="/projects"
              className="inline-flex items-center text-xs font-semibold text-amber-400 hover:text-amber-300"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Kembali ke Portofolio Proyek</span>
            </Link>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-4xl">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content (2 cols) */}
          <div className="lg:col-span-2 space-y-12">
            {/* Primary Featured Image */}
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-[380px] sm:h-[480px] object-cover"
              />
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 border-b border-slate-200 pb-3 mb-4">
                Gambaran & Latar Belakang Proyek
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Scope of Work */}
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 border-b border-slate-200 pb-3 mb-6">
                Ruang Lingkup Pekerjaan (Scope of Work)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {scopes.map((scope, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex items-start space-x-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800">
                      {scope}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div>
                <div className="flex items-center space-x-2 border-b border-slate-200 pb-3 mb-6">
                  <Images className="w-5 h-5 text-amber-500" />
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    Galeri Dokumentasi Lapangan
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.gallery.map((img) => (
                    <div
                      key={img.id}
                      className="group rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                        <img
                          src={img.url}
                          alt={img.caption || project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      {img.caption && (
                        <div className="p-3 bg-slate-50 text-xs font-semibold text-slate-600 border-t border-slate-100">
                          {img.caption}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Project Factsheet Sidebar (1 col) */}
          <div className="space-y-6">
            {/* Factsheet Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-3">
                Spesifikasi & Data Proyek
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block text-[11px] uppercase font-bold">
                    Pemilik Proyek (Client):
                  </span>
                  <span className="font-bold text-slate-900">{project.client}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] uppercase font-bold">
                    Lokasi Pekerjaan:
                  </span>
                  <span className="font-bold text-slate-900">{project.location}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] uppercase font-bold">
                    Tahun Penyelesaian:
                  </span>
                  <span className="font-bold text-slate-900">{project.year}</span>
                </div>

                {project.value && (
                  <div>
                    <span className="text-slate-500 block text-[11px] uppercase font-bold">
                      Nilai Kontrak Proyek:
                    </span>
                    <span className="font-bold text-amber-700 text-base">
                      {project.value}
                    </span>
                  </div>
                )}

                <div>
                  <span className="text-slate-500 block text-[11px] uppercase font-bold">
                    Klasifikasi Bidang:
                  </span>
                  <span className="font-bold text-slate-900">{project.category}</span>
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] uppercase font-bold">
                    Status Proyek:
                  </span>
                  <span className="font-bold text-emerald-700">
                    {project.status === "Completed"
                      ? "100% Selesai & Serah Terima"
                      : "Dalam Tahap Pelaksanaan Fisik"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quality Commitment Box */}
            <div className="bg-[#0A192F] text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-800 space-y-4">
              <span className="text-xs font-bold uppercase text-amber-400 block tracking-wider">
                Tender & Kemitraan
              </span>
              <h4 className="text-lg font-bold">
                Mencari Kontraktor untuk Proyek Sejenis?
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                PT Artha Konstruksi Indonesia siap memberikan penawaran kompetitif dengan
                rekayasa teknik presisi untuk proyek masa depan Anda.
              </p>

              <div className="pt-3">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors text-center"
                >
                  <PhoneCall className="w-4 h-4 mr-2" />
                  <span>Kirimkan Undangan Tender</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
