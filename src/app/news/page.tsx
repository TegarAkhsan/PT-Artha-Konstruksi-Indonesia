import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, User, ArrowRight, Newspaper } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Berita & Update Proyek Terkini",
  description:
    "Informasi resmi seputar pencapaian perusahaan, pembaruan progres proyek konstruksi, inovasi teknologi rekayasa teknik, dan program CSR PT Artha Konstruksi Indonesia.",
};

export const revalidate = 60;

export default async function NewsPage() {
  const articles = await prisma.article.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Banner */}
      <div className="bg-[#07101E] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Berita & Kabar Korporat
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Ikuti perkembangan terbaru kegiatan rekayasa konstruksi, implementasi inovasi
            teknik, dan kiprah sosial kemasyarakatan PT Artha Konstruksi Indonesia.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-amber-400 border border-white/10">
                    {article.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-xs text-slate-400 space-x-3 mb-3">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 text-amber-500 mr-1" />
                      <span>
                        {new Intl.DateTimeFormat("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }).format(new Date(article.publishedAt))}
                      </span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <User className="w-3.5 h-3.5 text-slate-400 mr-1" />
                      <span className="line-clamp-1">{article.author}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 hover:text-amber-600 transition-colors line-clamp-2">
                    <Link href={`/news/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  Waktu Baca: ~3 Menit
                </span>
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
      </div>
    </div>
  );
}
