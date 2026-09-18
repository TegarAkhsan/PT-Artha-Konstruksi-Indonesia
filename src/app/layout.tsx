import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "PT Artha Konstruksi Indonesia | Kontraktor Umum, Engineering & Infrastruktur",
    template: "%s | PT Artha Konstruksi Indonesia",
  },
  description:
    "PT Artha Konstruksi Indonesia adalah perusahaan kontraktor umum, rekayasa teknik (engineering), dan manajemen konstruksi terkemuka yang melayani pembangunan gedung komersial, kawasan industri, dan infrastruktur strategis nasional.",
  keywords: [
    "kontraktor umum indonesia",
    "jasa konstruksi gedung jakarta",
    "kontraktor pabrik industri",
    "civil engineering indonesia",
    "infrastruktur jembatan pelabuhan",
    "PT Artha Konstruksi Indonesia",
    "BIM construction indonesia",
    "kontraktor bersertifikat ISO",
  ],
  authors: [{ name: "PT Artha Konstruksi Indonesia" }],
  creator: "PT Artha Konstruksi Indonesia",
  metadataBase: new URL("https://arthakonstruksi.co.id"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://arthakonstruksi.co.id",
    title: "PT Artha Konstruksi Indonesia | Kontraktor Umum & Engineering",
    description:
      "Mitra terpercaya untuk proyek konstruksi gedung bertingkat, fasilitas industri manufaktur, dan infrastruktur strategis nasional berstandar mutu ISO dan K3.",
    siteName: "PT Artha Konstruksi Indonesia",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541888946425-d0fbb186156f?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "PT Artha Konstruksi Indonesia Landmark Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PT Artha Konstruksi Indonesia | General Contractor & Engineering",
    description: "Membangun masa depan Indonesia melalui rekayasa konstruksi presisi dan terpercaya.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org JSON-LD for ConstructionBusiness & Organization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ConstructionBusiness",
    name: "PT Artha Konstruksi Indonesia",
    alternateName: "Artha Konstruksi",
    url: "https://arthakonstruksi.co.id",
    logo: "https://arthakonstruksi.co.id/logo.png",
    description:
      "Perusahaan kontraktor umum, rekayasa teknik (engineering), dan manajemen konstruksi untuk proyek gedung komersial, kawasan industri, dan infrastruktur nasional.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Artha Graha Tower Lt. 18, Kawasan SCBD, Jl. Jend. Sudirman Kav. 52-53",
      addressLocality: "Jakarta Selatan",
      postalCode: "12190",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.2297,
      longitude: 106.8081,
    },
    telephone: "+622152897700",
    email: "info@arthakonstruksi.co.id",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    priceRange: "$$$$",
  };

  return (
    <html lang="id" className="h-full scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 antialiased selection:bg-amber-500 selection:text-slate-950">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
