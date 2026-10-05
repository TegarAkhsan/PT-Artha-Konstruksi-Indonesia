import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import {
  Building2,
  ShieldCheck,
  Target,
  Eye,
  Award,
  Users,
  CheckCircle2,
  Check,
  Briefcase,
  GraduationCap,
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Tentang Kami | Profil Perusahaan & Manajemen",
  description:
    "Mengenal lebih dekat PT Artha Konstruksi Indonesia, sejarah perjalanan, visi & misi, nilai-nilai inti korporat, serta profil dewan direksi dan manajemen eksekutif.",
};

export const revalidate = 60;

export default async function AboutPage() {
  const profile = await prisma.companyProfile.findUnique({
    where: { id: "default" },
  });

  const directors = [
    {
      name: "Ir. Bambang Sudiro, M.T., IPU",
      position: "Direktur Utama (President Director)",
      bio: "Lebih dari 25 tahun memimpin proyek mega struktur sipil dan gedung bertingkat di Indonesia. Lulusan Teknik Sipil ITB dan Magister Manajemen Proyek Konstruksi, bersertifikasi Insinyur Profesional Utama (IPU) PII.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      credentials: ["IPU Persatuan Insinyur Indonesia", "SKA Ahli Utama Manajemen Konstruksi", "Alumni ITB"],
    },
    {
      name: "Dr. Hendra Gunawan, S.T., M.Sc.",
      position: "Direktur Operasional & Rekayasa Teknik",
      bio: "Spesialis analisis struktur tahan gempa dan Building Information Modeling (BIM). Memiliki pengalaman 20 tahun dalam perancangan struktur pabrik industri dan jembatan bentang panjang.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
      credentials: ["Doktor Rekayasa Struktur", "Autodesk BIM Certified Professional", "Pengurus HAKI"],
    },
    {
      name: "Ratna Kartikasari, S.E., M.B.A., Ak., CA",
      position: "Direktur Keuangan & Kepatuhan Korporat",
      bio: "Berpengalaman mengelola akuntansi manajemen, pembiayaan sindikasi bank untuk proyek infrastruktur, dan tata kelola perusahaan yang baik (GCG) selama lebih dari 18 tahun.",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
      credentials: ["Chartered Accountant (CA)", "Certified Financial Risk Manager", "Alumni FEB UI"],
    },
    {
      name: "Ir. Dedi Sulaeman, M.K.K.K.",
      position: "Direktur QHSE & Keselamatan Kerja",
      bio: "Pakar K3 konstruksi nasional yang memimpin penerapan zero accident di seluruh proyek Artha Konstruksi. Anggota dewan pembina Dewan Keselamatan dan Kesehatan Kerja Nasional (DK3N).",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop",
      credentials: ["Ahli K3 Konstruksi Utama", "Lead Auditor ISO 45001 & 14001", "Magister KKK FKM UI"],
    },
  ];

  const milestones = [
    {
      year: "2009",
      title: "Pendirian Perusahaan",
      desc: "Didirikan di Jakarta sebagai kontraktor spesialis pekerjaan struktur beton bertulang dan pekerjaan tanah.",
    },
    {
      year: "2014",
      title: "Ekspansi Fasilitas Industri & Pabrik",
      desc: "Memperluas portofolio ke kawasan industri Cikarang, Karawang, dan Cilegon dengan konstruksi pabrik skala menengah-besar.",
    },
    {
      year: "2018",
      title: "Sertifikasi ISO & Kualifikasi B2 LPJK",
      desc: "Meraih akreditasi ISO 9001, 14001, dan 45001 secara simultan, serta kualifikasi Badan Usaha Besar (B2) dari LPJK PUPR.",
    },
    {
      year: "2021",
      title: "Adopsi Penuh Teknologi BIM 5D",
      desc: "Mentransformasikan seluruh alur kerja proyek dengan digital twin, koordinasi 3D terpadu, dan otomatisasi estimasi biaya.",
    },
    {
      year: "2024",
      title: "Pembangunan IKN & Zero Accident Award",
      desc: "Dipercaya membangun fasilitas pergudangan logistik cerdas di IKN Nusantara dan meraih Penghargaan Zero Accident 4,8 Juta Jam dari Kemenaker.",
    },
    {
      year: "2026",
      title: "Menuju Green Infrastructure Leader",
      desc: "Menargetkan kepemimpinan industri dalam konstruksi berkelanjutan rendah emisi karbon dan smart industrial parks.",
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Page Header Banner */}
      <div className="bg-[#07101E] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Tentang PT Artha Konstruksi Indonesia
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Mengenal komitmen, visi besar, rekam jejak historis, dan jajaran pimpinan
            profesional di balik setiap karya konstruksi kami.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        {/* Company Overview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
              Sekilas Perusahaan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              Kontraktor Umum & Rekayasa Teknik Berstandar Mutu Tinggi
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {profile?.description}
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Dengan dukungan ratusan tenaga terampil, armada alat berat berteknologi
              modern, serta kemitraan rantai pasok material terpercaya di seluruh
              Indonesia, kami memastikan setiap tahap pengerjaan terukur dengan presisi,
              efisien secara biaya, dan selesai tepat waktu.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <span className="text-2xl font-black text-slate-900 block">100%</span>
                <span className="text-xs text-slate-500 font-semibold">
                  Komitmen Kepatuhan Regulasi PUPR
                </span>
              </div>
              <div>
                <span className="text-2xl font-black text-amber-600 block">0 Kasus</span>
                <span className="text-xs text-slate-500 font-semibold">
                  Fatalitas K3 (Zero Fatal Accident)
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-slate-900">
              <img
                src="/images/hero-girder.jpg"
                alt="Artha Konstruksi Engineering and Construction"
                className="w-full h-[450px] object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Vision & Mission Section */}
        <div id="vision" className="my-24 py-16 bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200">
          <SectionTitle
            title="Visi, Misi & Nilai-Nilai Inti (Core Values)"
            subtitle="Landasan fundamental yang memandu setiap keputusan rekayasa teknik dan operasional lapangan kami."
          />

          {/* Vision & Mission Unified Section with Divider */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {/* Vision */}
              <div className="p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-6">
                    <Eye className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-2">
                    Visi Perusahaan
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Menjadi Perusahaan Konstruksi & Rekayasa Teknik Terkemuka di Asia Tenggara
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Diakui secara luas atas keunggulan kualitas rekayasa struktur, ketepatan waktu,
                    keselamatan kerja tanpa cela, dan kepeloporan penerapan teknologi konstruksi
                    berkelanjutan yang ramah lingkungan.
                  </p>
                </div>
              </div>

              {/* Mission */}
              <div className="p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-6">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-2">
                    Misi Perusahaan
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Memberikan Nilai Tambah Tertinggi bagi Klien & Bangsa
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Menghadirkan hasil konstruksi berkualitas unggul sesuai spesifikasi teknis dan standar SNI/internasional.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Menerapkan standar K3L (Keselamatan, Kesehatan Kerja dan Lingkungan) tertinggi tanpa kompromi.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Mengoptimalkan integrasi teknologi digital (BIM 5D) untuk efisiensi jadwal dan transparansi biaya.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Membangun SDM insinyur dan tenaga kerja konstruksi lokal yang berdaya saing global.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Core Values */}
          <div className="pt-8 border-t border-slate-200">
            <h4 className="text-center text-sm font-bold uppercase tracking-wider text-slate-500 mb-8">
              Nilai-Nilai Utama Korporat (ARTHA Values)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold inline-flex items-center justify-center text-xs mb-3">
                  A
                </span>
                <h5 className="font-bold text-slate-900 text-sm">Accountability</h5>
                <p className="text-xs text-slate-500 mt-2">
                  Tanggung jawab penuh atas kualitas mutu, keselamatan, dan komitmen jadwal yang disepakati.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold inline-flex items-center justify-center text-xs mb-3">
                  R
                </span>
                <h5 className="font-bold text-slate-900 text-sm">Reliability</h5>
                <p className="text-xs text-slate-500 mt-2">
                  Keandalan rekayasa struktur dan ketahanan bangunan jangka panjang terhadap risiko gempa dan cuaca ekstrem.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold inline-flex items-center justify-center text-xs mb-3">
                  T
                </span>
                <h5 className="font-bold text-slate-900 text-sm">Transparency</h5>
                <p className="text-xs text-slate-500 mt-2">
                  Keterbukaan progres fisik dan laporan anggaran melalui sistem manajemen digital terintegrasi.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold inline-flex items-center justify-center text-xs mb-3">
                  H
                </span>
                <h5 className="font-bold text-slate-900 text-sm">Harmony & Safety</h5>
                <p className="text-xs text-slate-500 mt-2">
                  Mengutamakan keselamatan jiwa setiap pekerja dan keselarasan dampak terhadap lingkungan hidup sekitar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Board of Directors / Management Profiles */}
        <div id="directors" className="my-24">
          <SectionTitle
            title="Dewan Direksi & Manajemen Eksekutif"
            subtitle="Dipimpin oleh para profesional dan insinyur senior yang memiliki rekam jejak puluhan tahun dalam memimpin proyek strategis di Indonesia."
          />

          {/* Unified Board of Directors with Dividers */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {directors.map((director, idx) => (
                <div
                  key={idx}
                  className={`p-6 sm:p-8 flex flex-col sm:flex-row gap-6 ${
                    idx >= 2 ? "md:border-t md:border-slate-200" : ""
                  }`}
                >
                  <div className="w-full sm:w-40 h-48 sm:h-auto rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                    <img
                      src={director.photo}
                      alt={director.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block mb-1">
                        {director.position}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">
                        {director.name}
                      </h3>
                      <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {director.bio}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                        Kualifikasi & Sertifikasi:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {director.credentials.map((cred, cIdx) => (
                          <span
                            key={cIdx}
                            className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-700"
                          >
                            {cred}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Milestones (History) */}
        <div className="my-24">
          <SectionTitle
            title="Sejarah Perjalanan & Perkembangan Perusahaan"
            subtitle="Pertumbuhan konsisten dari kontraktor spesialis hingga menjadi mitra konstruksi umum skala nasional."
          />

          <div className="relative border-l-2 border-amber-400/40 ml-4 sm:ml-32 pl-6 sm:pl-10 space-y-10">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative group">
                {/* Year Marker */}
                <div className="sm:absolute sm:-left-36 top-0 text-amber-600 font-extrabold text-lg sm:text-xl sm:text-right sm:w-24">
                  {m.year}
                </div>

                {/* Dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-amber-500 group-hover:scale-125 transition-transform" />

                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80">
                  <h4 className="text-base font-bold text-slate-900">{m.title}</h4>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
