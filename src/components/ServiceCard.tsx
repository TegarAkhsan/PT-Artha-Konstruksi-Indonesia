import Link from "next/link";
import {
  Building2,
  Factory,
  Truck,
  DraftingCompass,
  Cpu,
  ClipboardCheck,
  ArrowRight,
  CheckCircle2,
  HardHat,
} from "lucide-react";

interface ServiceCardProps {
  service: {
    title: string;
    slug: string;
    category: string;
    description: string;
    icon?: string | null;
    scopeOfWork: string;
    thumbnail?: string | null;
  };
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Map icon name string to Lucide component
  const getIcon = (iconName?: string | null) => {
    switch (iconName) {
      case "Building2":
        return <Building2 className="w-6 h-6 text-amber-500" />;
      case "Factory":
        return <Factory className="w-6 h-6 text-amber-500" />;
      case "Truck":
        return <Truck className="w-6 h-6 text-amber-500" />;
      case "DraftingCompass":
        return <DraftingCompass className="w-6 h-6 text-amber-500" />;
      case "Cpu":
        return <Cpu className="w-6 h-6 text-amber-500" />;
      case "ClipboardCheck":
        return <ClipboardCheck className="w-6 h-6 text-amber-500" />;
      default:
        return <HardHat className="w-6 h-6 text-amber-500" />;
    }
  };

  const scopes = service.scopeOfWork
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .slice(0, 3); // show top 3 highlights

  return (
    <div className="group relative bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 group-hover:h-2 transition-all duration-300" />

      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        {/* Category badge & Icon */}
        <div className="flex justify-between items-start mb-5">
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 transition-colors duration-300">
            <span className="group-hover:text-slate-950 transition-colors">
              {getIcon(service.icon)}
            </span>
          </div>
          <span className="inline-block px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
            {service.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
          <Link href={`/services/${service.slug}`} className="focus:outline-none">
            {service.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
          {service.description}
        </p>

        {/* Scope highlights */}
        {scopes.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-100 flex-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
              Ruang Lingkup Pekerjaan:
            </span>
            <ul className="space-y-2">
              {scopes.map((scope, idx) => (
                <li
                  key={idx}
                  className="flex items-start text-xs text-slate-700 font-medium"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="line-clamp-1">{scope}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer link */}
      <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500">
          Spesifikasi Teknis
        </span>
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors group-hover:translate-x-0.5"
        >
          <span>Detail Layanan</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    </div>
  );
}
