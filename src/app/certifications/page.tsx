import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CertModal from "@/components/CertModal";
import SectionTitle from "@/components/SectionTitle";
import { ShieldCheck, Award, FileCheck2, HardHat } from "lucide-react";

export const metadata: Metadata = {
  title: "Sertifikasi & Kepatuhan Standar K3 Nasional",
  description:
    "Legalitas badan usaha jasa pelaksana konstruksi kualifikasi B2, sertifikasi ISO 9001, 14001, 45001, dan penghargaan Zero Accident Kemenaker RI.",
};

export default async function CertificationsPage() {
  const certs = await prisma.certification.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Banner */}
      <div className="bg-[#07101E] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
            Kredibilitas & Tata Kelola
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Sertifikasi, Legalitas & Penghargaan K3
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Komitmen kami pada integritas operasional, keandalan mutu konstruksi, serta
            perlindungan keselamatan kerja telah terakreditasi oleh lembaga audit internasional.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        {/* Compliance Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Integrasi Tiga Standar ISO
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Memadukan ISO 9001 (Mutu), ISO 14001 (Lingkungan), dan ISO 45001 (K3) dalam
              satu Sistem Manajemen Terpadu (IMS) yang diaudit berkala setiap tahun.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Legalitas Badan Usaha Besar (B2)
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Memiliki Sertifikat Badan Usaha (SBU) resmi dari Lembaga Pengembangan Jasa
              Konstruksi (LPJK) Kementerian PUPR untuk menggarap proyek berisiko tinggi.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Zero Accident Culture
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Raihan penghargaan Kecelakaan Nihil dari Menteri Ketenagakerjaan RI atas
              keberhasilan mencapai lebih dari 4,8 juta jam kerja orang tanpa kecelakaan berat.
            </p>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="mb-20">
          <SectionTitle
            badge="Dokumen Resmi"
            title="Daftar Sertifikat Terverifikasi"
            subtitle="Klik pada sertifikat di bawah ini untuk melihat detail badan penerbit, nomor registrasi, dan validasi dokumen."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map((cert) => (
              <CertModal key={cert.id} cert={cert} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
