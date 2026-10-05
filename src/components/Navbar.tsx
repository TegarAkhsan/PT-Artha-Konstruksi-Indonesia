"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Lock,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If in admin route, Navbar is hidden
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/about" },
    { name: "Layanan", href: "/services" },
    { name: "Proyek", href: "/projects" },
    { name: "Sertifikasi", href: "/certifications" },
    { name: "Berita", href: "/news" },
    { name: "Karir", href: "/careers" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top corporate bar matching reference */}
      <div className="bg-white text-slate-600 text-xs py-2 px-4 border-b border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-[#FF5E14]" />
              <span className="font-semibold text-slate-700">+62 21 5289 7700</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-[#FF5E14]" />
              <span>info@arthakonstruksi.co.id</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-500">
              <span>Sen - Sab 08:00 - 17:30, Minggu - TUTUP</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-medium">ISO 9001 | 14001 | 45001</span>
            </span>
            <span className="text-slate-300">|</span>
            <Link
              href="/admin/login"
              className="flex items-center space-x-1.5 text-slate-500 hover:text-[#FF5E14] transition-colors font-medium"
            >
              <Lock className="w-3 h-3" />
              <span>Portal Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-0 border-b border-slate-200"
            : "bg-white/90 backdrop-blur-sm py-0 border-b border-slate-200/80"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-stretch">
          
          {/* Brand Logo Container with Orange Accent Box matching reference */}
          <Link href="/" className="flex items-center group">
            <div className="bg-[#FF5E14] group-hover:bg-[#E24E09] text-white px-5 py-3 sm:py-4 flex items-center space-x-2.5 transition-colors duration-200 shadow-sm">
              <Building2 className="w-6 h-6 stroke-[2.5]" />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-black tracking-wider uppercase leading-none">
                  ARTHA
                </span>
                <span className="text-[9px] font-bold tracking-[0.2em] text-orange-100 uppercase mt-0.5">
                  KONSTRUKSI
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex items-center space-x-1 2xl:space-x-2 py-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-2.5 2xl:px-3 py-2 text-xs 2xl:text-sm font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "text-[#FF5E14] border-b-2 border-[#FF5E14]"
                      : "text-slate-800 hover:text-[#FF5E14]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action Button: Konsultasikan Proyek */}
          <div className="hidden sm:flex items-center space-x-3 py-3">
            <Link
              href="/contact"
              className={`inline-flex items-center justify-center px-4 xl:px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white rounded-none shadow-sm transition-all duration-200 active:scale-95 whitespace-nowrap ${
                pathname === "/contact"
                  ? "bg-[#FF5E14] hover:bg-[#E24E09]"
                  : "bg-[#0B1528] hover:bg-[#162A45]"
              }`}
            >
              <span>Konsultasikan Proyek</span>
              <ChevronRight
                className={`w-4 h-4 ml-1 ${
                  pathname === "/contact" ? "text-white" : "text-[#FF5E14]"
                }`}
              />
            </Link>
          </div>

          {/* Mobile & Tablet Menu Button */}
          <div className="xl:hidden flex items-center py-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-none text-slate-700 hover:text-[#FF5E14] hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "text-[#FF5E14] bg-orange-50"
                      : "text-slate-800 hover:text-[#FF5E14] hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center px-4 py-3 text-xs font-black uppercase tracking-wider text-white bg-[#FF5E14] hover:bg-[#E24E09] shadow-md"
              >
                Konsultasikan Proyek
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center px-4 py-2 text-xs text-slate-500 hover:text-[#FF5E14] flex items-center justify-center space-x-1"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Portal Login Admin</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
