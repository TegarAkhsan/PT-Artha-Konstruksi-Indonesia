interface SectionTitleProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  watermark?: string;
}

export default function SectionTitle({
  badge,
  title,
  subtitle,
  align = "center",
  theme = "light",
  watermark,
}: SectionTitleProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={`relative max-w-3xl mb-12 sm:mb-16 ${
        isCenter ? "mx-auto text-center" : "text-left"
      }`}
    >
      {watermark && (
        <div
          className={`absolute -top-8 sm:-top-12 lg:-top-14 font-black uppercase tracking-wider text-5xl sm:text-7xl lg:text-8xl select-none pointer-events-none -z-10 ${
            isDark ? "stroke-watermark opacity-30" : "stroke-watermark opacity-80"
          } ${isCenter ? "left-1/2 -translate-x-1/2 text-center w-full" : "left-0 text-left"}`}
        >
          {watermark}
        </div>
      )}
      {badge && (
        <div
          className={`inline-flex items-center px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3 ${
            isDark
              ? "bg-[#FF5E14]/10 text-orange-400 border border-[#FF5E14]/30"
              : "bg-orange-50 text-[#FF5E14] border border-orange-200"
          }`}
        >
          {badge}
        </div>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-sm sm:text-base leading-relaxed ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
      {/* Decorative architectural underline */}
      <div
        className={`mt-4 flex items-center space-x-1.5 ${
          isCenter ? "justify-center" : "justify-start"
        }`}
      >
        <div className="w-12 h-1 bg-[#FF5E14]" />
        <div className="w-3 h-1 bg-orange-400" />
        <div className="w-1.5 h-1 bg-orange-300" />
      </div>
    </div>
  );
}
