import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Building2,
  PhoneCall,
  HardHat,
} from "lucide-react";
import ProjectCard from "@/components/ProjectCard";

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await prisma.service.findMany({ select: { slug: true } });
  return services.map((s) => ({ slug: s.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug },
  });

  if (!service) {
    return { title: "Layanan Tidak Ditemukan" };
  }

  return {
    title: `${service.title} | Layanan Konstruksi & Rekayasa Teknik`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug },
  });

  if (!service) {
    notFound();
  }

  // Find related projects in similar category
  const relatedProjects = await prisma.project.findMany({
    take: 3,
    orderBy: { year: "desc" },
  });

  const scopes = service.scopeOfWork
    .split("\n")
    .filter((l) => l.trim().length > 0);

  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Banner */}
      <div className="bg-[#07101E] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-4">
            <Link
              href="/services"
              className="inline-flex items-center text-xs font-semibold text-amber-400 hover:text-amber-300"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Kembali ke Daftar Seluruh Layanan</span>
            </Link>
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
            Divisi {service.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-4xl">
            {service.title}
          </h1>
          <p className="mt-4 text-slate-300 max-w-3xl text-sm sm:text-base leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content (2 cols) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Image */}
            {service.thumbnail && (
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src={service.thumbnail}
                  alt={service.title}
                  className="w-full h-[380px] sm:h-[450px] object-cover"
                />
              </div>
            )}

            {/* Scope of Work Section */}
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 border-b border-slate-200 pb-3 mb-6">
                Ruang Lingkup & Cakupan Pekerjaan (Scope of Work)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {scopes.map((scope, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800">
                      {scope}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Standards */}
            <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200">
              <div className="flex items-center space-x-2 text-amber-800 font-bold text-sm mb-3">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span>Kepatuhan Standar Teknis & Jaminan Kualitas</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Setiap pekerjaan pada divisi ini dikerjakan dengan menerapkan prinsip Quality
                Assurance & Quality Control (QA/QC) ketat mengacu pada Standar Nasional
                Indonesia (SNI), American Concrete Institute (ACI), dan American Society
                of Civil Engineers (ASCE). Seluruh personil diwajibkan mematuhi prosedur K3
                dan lulus sertifikasi keselamatan kerja.
              </p>
            </div>
          </div>

          {/* Sidebar CTA (1 col) */}
          <div className="space-y-6">
            <div className="bg-[#0A192F] text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
                Inquiry & Tender
              </span>
              <h3 className="text-xl font-bold">
                Konsultasikan Kebutuhan Proyek Anda
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Tim estimator dan engineer kami siap memberikan estimasi anggaran awal,
                metode kerja, dan jadwal pelaksanaan untuk proyek Anda.
              </p>

              <div className="mt-6 pt-6 border-t border-slate-800 space-y-3">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-500/20 transition-all text-center"
                >
                  <PhoneCall className="w-4 h-4 mr-2" />
                  <span>Kirim Undangan Tender</span>
                </Link>

                <a
                  href="https://wa.me/628118900770"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors text-center"
                >
                  Chat WhatsApp Business
                </a>
              </div>
            </div>

            {/* Quality Badges */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                Jaminan Mutu Pelaksanaan
              </h4>
              <div className="space-y-2 text-xs text-slate-700 font-medium">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sertifikat Badan Usaha Kualifikasi Besar (B2)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sistem Manajemen Mutu ISO 9001:2015</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zero Accident Commitment ISO 45001</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Projects */}
        <div className="mt-24 pt-16 border-t border-slate-200">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Studi Kasus & Portofolio Terkait
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Proyek Unggulan yang Telah Kami Selesaikan
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 hidden sm:inline-flex items-center"
            >
              <span>Lihat Semua Proyek</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProjects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
