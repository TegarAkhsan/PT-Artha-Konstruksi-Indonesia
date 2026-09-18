import Link from "next/link";
import { MapPin, Calendar, Building, ArrowRight, ShieldCheck } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    slug: string;
    client: string;
    location: string;
    year: number;
    value?: string | null;
    category: string;
    description: string;
    status: string;
    thumbnail: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const isOngoing = project.status.toLowerCase() === "ongoing";

  return (
    <div className="group bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Thumbnail container with badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-amber-400 border border-white/10 shadow-sm">
            {project.category}
          </span>
          <span
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase shadow-sm ${
              isOngoing
                ? "bg-amber-500 text-slate-950"
                : "bg-emerald-600/90 text-white backdrop-blur-md"
            }`}
          >
            {project.status === "Completed" ? "Selesai" : "Berjalan"}
          </span>
        </div>

        {/* Bottom overlay info on thumbnail */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center text-xs text-slate-200 space-x-3">
            <span className="flex items-center">
              <MapPin className="w-3.5 h-3.5 text-amber-400 mr-1" />
              <span className="line-clamp-1">{project.location}</span>
            </span>
            <span>•</span>
            <span className="flex items-center">
              <Calendar className="w-3.5 h-3.5 text-amber-400 mr-1" />
              <span>{project.year}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Client name */}
          <div className="flex items-center text-xs font-semibold text-slate-500 mb-1.5">
            <Building className="w-3.5 h-3.5 mr-1 text-slate-400" />
            <span className="line-clamp-1">Klien: {project.client}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">
            <Link href={`/projects/${project.slug}`} className="focus:outline-none">
              {project.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="mt-2.5 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Card Footer: Project Value & CTA */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            {project.value ? (
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Nilai Kontrak
                </span>
                <span className="text-xs font-bold text-slate-900">
                  {project.value}
                </span>
              </div>
            ) : (
              <span className="text-xs font-medium text-slate-400">
                Skala Strategis
              </span>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors group-hover:translate-x-0.5"
          >
            <span>Lihat Spesifikasi</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
