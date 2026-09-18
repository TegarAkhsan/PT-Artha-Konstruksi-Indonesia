import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Trash2, ExternalLink, Calendar, User } from "lucide-react";

export default async function AdminArticlesPage() {
  const user = await getCurrentUser();
  if (!user || (user.role !== "SUPER_ADMIN" && user.role !== "CONTENT_ADMIN")) {
    redirect("/admin");
  }

  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
            Media & Publikasi
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            Manajemen Berita & Siaran Pers
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Kelola publikasi berita korporat, pembaruan proyek, dan kegiatan CSR perusahaan.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
            <tr>
              <th className="py-3.5 px-4">Judul Artikel</th>
              <th className="py-3.5 px-4">Kategori</th>
              <th className="py-3.5 px-4">Penulis</th>
              <th className="py-3.5 px-4">Tanggal Publikasi</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {articles.map((article) => (
              <tr key={article.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3.5 px-4 max-w-sm">
                  <span className="font-bold text-slate-900 block line-clamp-1">
                    {article.title}
                  </span>
                  <span className="text-[11px] text-slate-500 line-clamp-1">
                    {article.excerpt}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                    {article.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600">{article.author}</td>
                <td className="py-3.5 px-4 text-slate-400">
                  {new Intl.DateTimeFormat("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }).format(new Date(article.publishedAt))}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Terbit (Live)
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/news/${article.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 inline-block"
                    title="Lihat Artikel"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
