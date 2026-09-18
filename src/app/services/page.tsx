import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ServiceCard from "@/components/ServiceCard";
import SectionTitle from "@/components/SectionTitle";
import Link from "next/link";
import { ArrowRight, HardHat, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "Layanan Konstruksi, Engineering & Manajemen Proyek",
  description:
    "Solusi layanan terintegrasi PT Artha Konstruksi Indonesia meliputi konstruksi gedung, kawasan industri, infrastruktur, civil engineering, mekanikal elektrikal, dan manajemen konstruksi.",
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  // Group by category
  const constructionServices = services.filter((s) => s.category === "Construction");
  const engineeringServices = services.filter((s) => s.category === "Engineering");
  const managementServices = services.filter((s) => s.category === "Project Management");

  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Banner */}
      <div className="bg-[#07101E] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
            Portofolio Kapabilitas
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Layanan Rekayasa Teknik & Konstruksi
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Dari konsepsi awal hingga serah terima kunci, kami menghadirkan layanan
            rekayasa dan konstruksi berkualitas tinggi dengan kepatuhan standar SNI & ISO.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20 space-y-20">
        {/* Construction Division */}
        <div>
          <div className="border-b border-slate-200 pb-4 mb-8 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Divisi 01
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                General Construction & Sipil
              </h2>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
              Pelaksanaan Lapangan & Struktur
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {constructionServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>

        {/* Engineering Division */}
        <div>
          <div className="border-b border-slate-200 pb-4 mb-8 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Divisi 02
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Engineering Design & Technical Analysis
              </h2>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
              Struktur Tahan Gempa & MEP
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {engineeringServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>

        {/* Project Management Division */}
        <div>
          <div className="border-b border-slate-200 pb-4 mb-8 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Divisi 03
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Project Management, BIM & Supervisi
              </h2>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
              Pengendalian Mutu & Jadwal
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {managementServices.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>

        {/* Technical Consultation Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Butuh Konsultasi Teknis atau Evaluasi Desain Struktur?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Tim engineering kami dapat membantu melakukan preliminary review terhadap
              dokumen teknis, geoteknik, maupun analisis kesesuaian anggaran proyek Anda.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex-shrink-0 flex items-center"
          >
            <span>Hubungi Tim Teknis Kami</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
