import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import InquiryForm from "@/components/InquiryForm";
import SectionTitle from "@/components/SectionTitle";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building2,
  ShieldCheck,
  Send,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Hubungi Kami | Konsultasi Proyek & Undangan Tender",
  description:
    "Hubungi kantor pusat PT Artha Konstruksi Indonesia di SCBD Jakarta Selatan untuk konsultasi proyek gedung, fasilitas pabrik industri, infrastruktur, atau kemitraan bisnis.",
};

export const revalidate = 60;

export default async function ContactPage() {
  const profile = await prisma.companyProfile.findUnique({
    where: { id: "default" },
  });

  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Banner */}
      <div className="bg-[#07101E] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Hubungi PT Artha Konstruksi Indonesia
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Konsultasikan rencana proyek konstruksi Anda, kirimkan undangan tender resmi,
            atau diskusikan kemitraan strategis bersama tim engineering kami.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                Informasi Kontak
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Kantor Pusat & Workshop
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Kami siap menerima kunjungan koordinasi teknis, rapat klarifikasi tender,
                dan konsultasi langsung di kantor pusat kami di kawasan SCBD Jakarta.
              </p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-slate-400 block mb-0.5">
                    Alamat Kantor Pusat
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
                    {profile?.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-slate-400 block mb-0.5">
                    Telepon & Hotline Tender
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">
                    {profile?.phone}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    WhatsApp: {profile?.whatsapp}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-slate-400 block mb-0.5">
                    Email Resmi Perusahaan
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">
                    {profile?.email}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tender Desk: tender@arthakonstruksi.co.id
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-slate-400 block mb-0.5">
                    Jam Operasional Kantor
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">
                    Senin - Jumat: 08:00 - 17:00 WIB
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Sabtu, Minggu & Hari Libur Nasional: Tutup
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <iframe
                src={
                  profile?.mapsEmbedUrl ||
                  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.257577546531!2d106.80808827586821!3d-6.229735293758368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f15152865c6b%3A0xe54dbd19b78864ec!2sSudirman%20Central%20Business%20District!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                }
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Kantor PT Artha Konstruksi Indonesia"
              />
            </div>
          </div>

          {/* Interactive Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
