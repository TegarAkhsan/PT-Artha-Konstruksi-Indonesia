import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getArticles,
  getArticleBySlug,
} from "@/data/companyData";
import { Calendar, User, ArrowLeft, ArrowRight, Tag, Share2 } from "lucide-react";

export function generateStaticParams() {
  const articles = getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Berita Tidak Ditemukan" };
  }

  return {
    title: `${article.title} | Berita & Media`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.thumbnail }],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getArticles()
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  const keywords = article.seoKeywords
    ? article.seoKeywords.split(",").map((k) => k.trim())
    : [];

  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Header */}
      <div className="bg-[#07101E] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-4">
            <Link
              href="/news"
              className="inline-flex items-center text-xs font-semibold text-amber-400 hover:text-amber-300"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Kembali ke Seluruh Berita</span>
            </Link>
          </div>

          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-3">
            {article.category}
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-300 border-t border-white/10 pt-4">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 text-amber-400 mr-2" />
              <span>
                {new Intl.DateTimeFormat("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(article.publishedAt))}
              </span>
            </span>
            <span className="flex items-center">
              <User className="w-4 h-4 text-amber-400 mr-2" />
              <span>Oleh: {article.author}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 mb-12">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-[360px] sm:h-[480px] object-cover"
          />
        </div>

        {/* Lead paragraph */}
        <div className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-8 p-6 rounded-2xl bg-amber-50/50 border-l-4 border-amber-500">
          {article.excerpt}
        </div>

        {/* Body content */}
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-sm sm:text-base">
          {article.content.split("\n\n").map((para, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {para}
            </p>
          ))}
        </div>

        {/* Tags */}
        {keywords.length > 0 && (
          <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 flex items-center mr-2">
              <Tag className="w-3.5 h-3.5 mr-1" />
              Topik Terkait:
            </span>
            {keywords.map((kw, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
              >
                #{kw}
              </span>
            ))}
          </div>
        )}

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Berita & Publikasi Terkait
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 transition-colors"
                >
                  <span className="text-[10px] font-bold uppercase text-amber-600 block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-2">
                    <Link href={`/news/${rel.slug}`}>{rel.title}</Link>
                  </h4>
                  <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
