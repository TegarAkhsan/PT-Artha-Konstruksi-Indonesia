import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Building2,
  ShieldCheck,
  Award,
  HardHat,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Users,
  Compass,
  FileCheck2,
  PhoneCall,
  Calendar,
  ExternalLink,
} from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import ServiceCard from "@/components/ServiceCard";
import CertModal from "@/components/CertModal";
import SectionTitle from "@/components/SectionTitle";
import HeroSlider from "@/components/HeroSlider";

export const revalidate = 60; // ISR 60 seconds

export default async function HomePage() {
  const [profile, services, featuredProjects, certs, clients, articles] =
    await Promise.all([
      prisma.companyProfile.findUnique({ where: { id: "default" } }),
      prisma.service.findMany({ orderBy: { order: "asc" } }),
      prisma.project.findMany({
        where: { featured: true },
        take: 6,
        orderBy: { year: "desc" },
      }),
      prisma.certification.findMany({ take: 4, orderBy: { order: "asc" } }),
      prisma.clientPartner.findMany({ orderBy: { order: "asc" } }),
      prisma.article.findMany({
        take: 3,
        where: { isPublished: true },
        orderBy: { publishedAt: "desc" },
      }),
    ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* =========================================================================
          HERO SECTION (Wilmer Architectural Theme with Heavy Machinery & Watermark)
      ========================================================================= */}
      <HeroSlider />

      {/* =========================================================================
          STATISTICS COUNTER SECTION
      ========================================================================= */}
      <section className="relative z-20 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-none shadow-2xl border-t-4 border-t-[#FF5E14] border-x border-b border-slate-200 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="flex flex-col items-center text-center px-4 py-2">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              {profile?.experienceYears ?? 16}
              <span className="text-amber-500">+</span>
            </span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 mt-2">
              Tahun Pengalaman
            </span>
            <span className="text-xs text-slate-600 mt-1">
              Rekam jejak teruji sejak 2009
            </span>
          </div>

          <div className="flex flex-col items-center text-center px-4 py-2">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              {profile?.completedProjects ?? 140}
              <span className="text-amber-500">+</span>
            </span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 mt-2">
              Proyek Nasional
            </span>
            <span className="text-xs text-slate-600 mt-1">
              Gedung, pabrik, & infrastruktur
            </span>
          </div>

          <div className="flex flex-col items-center text-center px-4 py-2">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              {profile?.professionalStaff ?? 75}
              <span className="text-amber-500">+</span>
            </span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 mt-2">
              Insinyur & Tenaga Ahli
            </span>
            <span className="text-xs text-slate-600 mt-1">
              Sertifikasi SKA LPJK & K3
            </span>
          </div>

          <div className="flex flex-col items-center text-center px-4 py-2">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              {profile?.corporateClients ?? 35}
              <span className="text-amber-500">+</span>
            </span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 mt-2">
              Klien Korporat & BUMN
            </span>
            <span className="text-xs text-slate-600 mt-1">
              Kepercayaan jangka panjang
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ABOUT BRIEF SECTION
      ========================================================================= */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Visual Column */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop"
                  alt="Artha Konstruksi Engineering Team"
                  className="w-full h-[450px] object-cover"
                />
              </div>

              {/* Floating Stat Card */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-[#0A192F] text-white p-6 rounded-2xl shadow-xl border border-slate-700 max-w-xs">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-400 block">
                      ZERO ACCIDENT
                    </span>
                    <span className="text-sm font-extrabold text-white">
                      4,8 Juta Jam Kerja Aman
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Penghargaan resmi Kementerian Ketenagakerjaan RI atas komitmen mutlak
                  pada keselamatan seluruh personil lapangan.
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF5E14] block">
                Tentang PT Artha Konstruksi Indonesia
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Integritas Tanpa Kompromi, Presisi Rekayasa Kelas Dunia
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Didirikan dengan visi menjadi pilar kemajuan infrastruktur nasional,
                PT Artha Konstruksi Indonesia memadukan keahlian teknik sipil
                berpengalaman dengan adopsi teknologi digital konstruksi termutakhir.
                Kami mengawal proyek dari fase studi kelayakan, desain struktural,
                hingga pelaksanaan serah terima kunci (turnkey).
              </p>

              {/* 4 Core Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2 font-bold">
                    1
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Standar K3 Internasional
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Sertifikasi ISO 45001 dan SMK3 PP 50/2012 untuk proteksi tanpa kompromi.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2 font-bold">
                    2
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Teknologi BIM 5D
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Clash detection dini dan simulasi jadwal untuk efisiensi biaya nyata.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2 font-bold">
                    3
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Ketepatan Jadwal (On-Time)
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Manajemen CPM terukur dan pengadaan material rantai pasok terintegrasi.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/90 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2 font-bold">
                    4
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Green Construction
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Praktik konstruksi ramah lingkungan dan hemat energi masa depan.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center text-sm font-bold text-amber-600 hover:text-amber-700"
                >
                  <span>Pelajari Sejarah & Struktur Manajemen Kami</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CORE SERVICES SECTION
      ========================================================================= */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            watermark="SERVICES"
            title="Layanan Terintegrasi Sektor Konstruksi & Engineering"
            subtitle="Kami menyediakan portofolio layanan komprehensif mulai dari pelaksanaan konstruksi sipil, rekayasa mekanikal-elektrikal, hingga supervisi proyek skala besar."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <span>Lihat Rincian Spesifikasi Seluruh Layanan</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED PROJECTS SHOWCASE
      ========================================================================= */}
      <section className="py-20 lg:py-28 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            watermark="PROJECTS"
            title="Karya Konstruksi Landmark & Proyek Strategis"
            subtitle="Bukti nyata komitmen kualitas dan ketepatan pelaksanaan pekerjaan yang dipercayakan oleh klien korporat dan instansi nasional."
            theme="dark"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 transition-all"
            >
              <span>Lihat Seluruh Portofolio Proyek (140+)</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CERTIFICATIONS & QUALITY HIGHLIGHTS
      ========================================================================= */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Standar & Kepatuhan Legal"
            title="Sertifikasi Mutu, K3, dan Legalitas Usaha"
            subtitle="Seluruh operasional PT Artha Konstruksi Indonesia diawasi secara ketat oleh badan audit internasional dan mematuhi regulasi konstruksi Kementerian PUPR."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certs.map((cert) => (
              <CertModal key={cert.id} cert={cert} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/certifications"
              className="inline-flex items-center text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700"
            >
              <span>Lihat Sertifikat ISO & Dokumen Legalitas Lengkap</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLIENT & PARTNER LOGOS (Continuous Infinite Marquee: Right to Left)
      ========================================================================= */}
      <section className="py-12 bg-slate-50/60 border-y border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400">
            Dipercaya Oleh Pengembang Terkemuka, Perusahaan Multinasional, & BUMN
          </p>
        </div>

        {/* Marquee Track with Smooth Left & Right Gradient Fades */}
        <div className="relative w-full overflow-hidden mask-fade-edges">
          {/* Left Fade Overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          {/* Right Fade Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex items-center gap-6 py-2">
            {/* First Set of Logos */}
            {clients.map((client) => (
              <div
                key={`client-a-${client.id}`}
                className="flex-shrink-0 w-52 h-20 px-5 bg-white rounded-xl border border-slate-200/90 shadow-xs flex items-center space-x-3 hover:border-amber-400 hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-50 group-hover:bg-[#FF5E14] text-[#FF5E14] group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                  <Building2 className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#FF5E14] leading-snug line-clamp-2 transition-colors">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}

            {/* Second Set of Logos (Duplicate for seamless loop) */}
            {clients.map((client) => (
              <div
                key={`client-b-${client.id}`}
                className="flex-shrink-0 w-52 h-20 px-5 bg-white rounded-xl border border-slate-200/90 shadow-xs flex items-center space-x-3 hover:border-amber-400 hover:shadow-md transition-all duration-300 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-50 group-hover:bg-[#FF5E14] text-[#FF5E14] group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                  <Building2 className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#FF5E14] leading-snug line-clamp-2 transition-colors">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          LATEST NEWS & ARTICLES
      ========================================================================= */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Informasi Terkini"
            title="Berita Korporat & Update Perkembangan Proyek"
            subtitle="Ikuti liputan terkini seputar pencapaian perusahaan, implementasi inovasi teknik di lapangan, dan kegiatan tanggung jawab sosial (CSR)."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-amber-400">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-xs text-slate-400 space-x-2 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span>
                        {new Intl.DateTimeFormat("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }).format(new Date(article.publishedAt))}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 hover:text-amber-600 transition-colors line-clamp-2">
                      <Link href={`/news/${article.slug}`}>{article.title}</Link>
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                  <Link
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/news"
              className="inline-flex items-center text-xs sm:text-sm font-bold text-slate-700 hover:text-slate-900"
            >
              <span>Buka Seluruh Arsip Berita & Artikel</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CALL TO ACTION (CTA) BANNER
      ========================================================================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#07101E] via-[#0A192F] to-[#07101E] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Kemitraan & Tender Konstruksi
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Siap Mewujudkan Proyek Infrastruktur & Bangunan Komersial Anda?
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-300">
              Tim estimator, rekayasa sipil, dan spesialis K3 kami siap berdiskusi
              mengenai estimasi anggaran, jadwal waktu, serta metode kerja optimal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/25 transition-all text-center"
            >
              <span>Ajukan Permintaan Penawaran</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <a
              href="https://wa.me/628118900770"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-6 py-4 rounded-xl text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 text-center"
            >
              <span>Hubungi via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
