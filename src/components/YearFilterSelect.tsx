"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "lucide-react";

interface YearFilterSelectProps {
  years: number[];
  currentYear?: string;
  currentCategory?: string;
}

export default function YearFilterSelect({
  years,
  currentYear,
  currentCategory,
}: YearFilterSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (!selectedYear || selectedYear === "all") {
      params.delete("year");
    } else {
      params.set("year", selectedYear);
    }

    const query = params.toString();
    router.push(`/projects${query ? `?${query}` : ""}`);
  };

  return (
    <div className="flex items-center space-x-2 text-xs">
      <div className="relative inline-flex items-center">
        <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
        <select
          value={currentYear || "all"}
          onChange={handleYearChange}
          aria-label="Filter berdasarkan tahun"
          className="appearance-none bg-white border border-slate-200/90 text-slate-800 font-bold text-xs pl-8 pr-8 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF5E14] focus:border-transparent cursor-pointer transition-all hover:border-slate-300"
        >
          <option value="all">Semua Tahun</option>
          {years.map((y) => (
            <option key={y} value={y.toString()}>
              Tahun {y}
            </option>
          ))}
        </select>
        {/* Custom Chevron icon */}
        <div className="absolute right-2.5 pointer-events-none text-slate-400">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
