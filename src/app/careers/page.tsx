import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  Users,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
import CareerApplyModal from "@/components/CareerApplyModal";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Karir & Rekrutmen Tenaga Profesional",
  description:
    "Bergabunglah bersama PT Artha Konstruksi Indonesia. Temukan peluang karir untuk posisi Project Manager, Site Engineer, Ahli K3, Estimator, dan BIM Modeler.",
};

export const revalidate = 60;

export default async function CareersPage() {
  const careers = await prisma.career.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Banner */}
      <div className="bg-[#07101E] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
            Peluang Karir
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Berkembang Bersama Insan Konstruksi Unggul
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Kami membuka kesempatan bagi para insinyur, profesional rekayasa teknik,
            dan talenta muda berdedikasi tinggi untuk berkontribusi pada proyek infrastruktur
            strategis nasional.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">


        {/* Vacancies Section */}
        <div>
          <SectionTitle
            badge="Posisi Terbuka"
            title="Lowongan Pekerjaan Saat Ini"
            subtitle="Pilihlah posisi yang sesuai dengan kompetensi dan pengalaman Anda, lalu kirimkan resume serta dokumen pendukung."
          />

          {careers.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
              <Briefcase className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h4 className="text-base font-bold text-slate-700">
                Belum Ada Lowongan Aktif
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Silakan periksa kembali secara berkala atau kirimkan CV terbuka Anda ke{" "}
                <span className="font-semibold text-slate-900">hr@arthakonstruksi.co.id</span>
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {careers.map((career) => {
                const reqs = career.requirements
                  .split("\n")
                  .filter((r) => r.trim().length > 0);

                return (
                  <div
                    key={career.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b border-slate-100">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                            {career.department}
                          </span>
                          <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                            {career.type}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900">
                          {career.title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                          <span className="flex items-center">
                            <MapPin className="w-3.5 h-3.5 text-amber-500 mr-1" />
                            <span>{career.location}</span>
                          </span>
                          {career.deadline && (
                            <span className="flex items-center">
                              <Calendar className="w-3.5 h-3.5 text-amber-500 mr-1" />
                              <span>
                                Batas Akhir:{" "}
                                {new Intl.DateTimeFormat("id-ID", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }).format(new Date(career.deadline))}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="w-full lg:w-auto">
                        <CareerApplyModal career={career} />
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                      <div>
                        <h4 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-wider text-slate-500">
                          Deskripsi Tanggung Jawab:
                        </h4>
                        <p className="text-slate-600 leading-relaxed">
                          {career.description}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-wider text-slate-500">
                          Kualifikasi & Persyaratan:
                        </h4>
                        <ul className="space-y-1.5 text-slate-600">
                          {reqs.map((req, rIdx) => (
                            <li key={rIdx} className="flex items-start">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
