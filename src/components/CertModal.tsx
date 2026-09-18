"use client";

import { useState } from "react";
import { ShieldCheck, FileText, X, ExternalLink, Calendar, Award } from "lucide-react";

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  certificateNumber?: string | null;
  category: string;
  year: number;
  validUntil?: Date | string | null;
  fileUrl?: string | null;
  thumbnail?: string | null;
}

export default function CertModal({ cert }: { cert: CertificationItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="group cursor-pointer bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          {/* Category badge */}
          <div className="flex justify-between items-start mb-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
              <Award className="w-3.5 h-3.5 mr-1" />
              {cert.category}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              Tahun {cert.year}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">
            {cert.title}
          </h3>

          <p className="mt-2 text-xs text-slate-500 font-medium">
            Badan Penerbit: <span className="text-slate-700">{cert.issuer}</span>
          </p>

          {cert.certificateNumber && (
            <p className="mt-1 text-[11px] font-mono text-slate-400">
              No. Reg: {cert.certificateNumber}
            </p>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600 group-hover:text-amber-700">
          <span className="flex items-center">
            <FileText className="w-3.5 h-3.5 mr-1" />
            Buka Dokumen Legalitas
          </span>
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="bg-[#0A192F] text-white p-6 flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    Dokumen Legalitas & Standar Mutu
                  </span>
                  <h3 className="text-lg font-bold leading-snug">{cert.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-500 block mb-0.5 font-medium">Badan Akreditasi:</span>
                  <span className="text-slate-900 font-bold">{cert.issuer}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5 font-medium">Kategori Sertifikat:</span>
                  <span className="text-slate-900 font-bold">{cert.category}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5 font-medium">Nomor Registrasi:</span>
                  <span className="text-slate-900 font-mono font-bold">
                    {cert.certificateNumber || "Tervalidasi Resmi"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5 font-medium">Status Masa Berlaku:</span>
                  <span className="text-emerald-700 font-bold flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                    Aktif & Terakreditasi
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed">
                Dokumen ini merupakan sertifikasi resmi kepatuhan standar mutu, sistem manajemen
                lingkungan, keselamatan kerja, serta kualifikasi badan usaha (SBU) yang dimiliki oleh
                PT Artha Konstruksi Indonesia untuk beroperasi dalam proyek konstruksi berskala besar
                dan strategis nasional.
              </div>

              {cert.thumbnail && (
                <div className="rounded-lg overflow-hidden border border-slate-200">
                  <img
                    src={cert.thumbnail}
                    alt={cert.title}
                    className="w-full h-48 object-cover object-center"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 rounded-lg transition-colors"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Dokumen verifikasi resmi dapat diminta melalui proposal tender atau menghubungi tim corporate legal kami di legal@arthakonstruksi.co.id");
                }}
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition-colors flex items-center space-x-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Unduh Salinan Dokumen</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
