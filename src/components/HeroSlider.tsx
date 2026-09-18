"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, PhoneCall } from "lucide-react";

interface SlideData {
  id: number;
  watermark: string;
  subtitle: string;
  title: string;
  titleHighlight?: string;
  description: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText: string;
  secondaryBtnLink: string;
  image: string;
  imageAlt: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    watermark: "SCHEDULE",
    subtitle: "WELCOME TO ARTHA KONSTRUKSI",
    title: "BUILD A BETTER",
    titleHighlight: "TOMORROW",
    description:
      "Menghadirkan solusi rekayasa konstruksi, rancang bangun sipil, dan infrastruktur modern berstandar internasional dengan komitmen mutu ISO dan keselamatan K3 tanpa kompromi.",
    primaryBtnText: "Read More",
    primaryBtnLink: "/projects",
    secondaryBtnText: "Contact Us",
    secondaryBtnLink: "/contact",
    image: "/images/hero-launcher.jpg",
    imageAlt: "Bridge Girder Launcher and Heavy Machinery",
  },
  {
    id: 2,
    watermark: "STRUCTURE",
    subtitle: "ENGINEERING EXCELLENCE",
    title: "PRECISION AT",
    titleHighlight: "EVERY SCALE",
    description:
      "Penerapan teknologi digital BIM 5D dan rekayasa struktural tingkat tinggi untuk menjamin akurasi pembangunan gedung pencakar langit, fasilitas industri, dan infrastruktur vital.",
    primaryBtnText: "Our Projects",
    primaryBtnLink: "/projects",
    secondaryBtnText: "Our Services",
    secondaryBtnLink: "/services",
    image: "/images/hero-tower-crane.jpg",
    imageAlt: "Modern High-Rise Construction and Tower Cranes",
  },
  {
    id: 3,
    watermark: "PROJECTS",
    subtitle: "INFRASTRUCTURE & CIVIL",
    title: "INNOVATIVE CIVIL",
    titleHighlight: "SOLUTIONS",
    description:
      "Rekam jejak lebih dari 15 tahun menyelesaikan mega proyek jalan layang, jembatan bentang panjang, dan pabrik manufaktur di berbagai penjuru Indonesia.",
    primaryBtnText: "Explore More",
    primaryBtnLink: "/about",
    secondaryBtnText: "Tender Inquiry",
    secondaryBtnLink: "/contact",
    image: "/images/hero-girder.jpg",
    imageAlt: "Heavy Precast Viaduct and Bridge Engineering",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section
      className="relative min-h-[90vh] lg:min-h-screen bg-white text-slate-900 pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex flex-col justify-between border-b border-slate-200/60"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Architectural Patterns */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle diagonal pinstripe hatching on the right half, matching Wilmer theme */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-2/3 bg-diagonal-hatch opacity-70" />
        
        {/* Soft subtle dot grid on top left */}
        <div className="absolute left-0 top-0 w-96 h-96 bg-dot-matrix opacity-40" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 xl:col-span-6 relative pt-4 pb-8 lg:py-6">
            
            {/* Giant Outlined Watermark Text behind headline */}
            <div
              key={`watermark-${slide.id}`}
              className="absolute -top-10 sm:-top-16 lg:-top-20 left-0 text-7xl sm:text-9xl lg:text-[10rem] font-black uppercase tracking-wider leading-none select-none pointer-events-none stroke-watermark opacity-70 animate-in fade-in duration-700 -z-10"
            >
              {slide.watermark}
            </div>

            {/* Subtitle / Kicker */}
            <div
              key={`subtitle-${slide.id}`}
              className="flex items-center space-x-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              <div className="w-8 h-[2px] bg-[#FF5E14]" />
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-slate-500">
                {slide.subtitle}
              </span>
            </div>

            {/* Headline */}
            <h1
              key={`title-${slide.id}`}
              className="text-4xl sm:text-6xl lg:text-[4.25rem] font-black tracking-tight text-[#0B1528] leading-[1.08] uppercase animate-in fade-in slide-in-from-bottom-3 duration-600"
            >
              {slide.title}{" "}
              <span className="text-[#0B1528] block sm:inline">
                {slide.titleHighlight}
              </span>
            </h1>

            {/* Description */}
            <p
              key={`desc-${slide.id}`}
              className="mt-6 text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              {slide.description}
            </p>

            {/* Twin Action Buttons matching reference */}
            <div
              key={`btn-${slide.id}`}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-700"
            >
              {/* Primary Button: Construction Orange */}
              <Link
                href={slide.primaryBtnLink}
                className="inline-flex items-center justify-center px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#FF5E14] hover:bg-[#E24E09] transition-all duration-200 shadow-md shadow-orange-500/20 active:scale-95"
              >
                <span>{slide.primaryBtnText}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              {/* Secondary Button: Deep Navy Blue */}
              <Link
                href={slide.secondaryBtnLink}
                className="inline-flex items-center justify-center px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-[#0B1528] hover:bg-[#162A45] transition-all duration-200 active:scale-95"
              >
                <span>{slide.secondaryBtnText}</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Prominent Machinery / Crane / Viaduct Visual */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Decorative Subtle Frame / Outline Backdrop */}
              <div className="absolute -inset-4 lg:-inset-6 border border-slate-200/50 -z-10 hidden sm:block pointer-events-none" />
              
              {/* Main Machine Image with Soft Edge Blend */}
              <div
                key={`image-${slide.id}`}
                className="relative overflow-hidden rounded-sm shadow-2xl shadow-slate-900/10 animate-in fade-in zoom-in-95 duration-700 aspect-[4/3] sm:aspect-[1/1] lg:aspect-[5/4] bg-slate-100"
              >
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                {/* Soft gradient blend on left & bottom for seamless look */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Machinery Tech Specs Badge */}
              <div className="absolute -bottom-4 -left-4 sm:bottom-6 sm:-left-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-sm border border-slate-200/90 shadow-xl max-w-[210px] hidden sm:block">
                <div className="flex items-center space-x-2 text-[#FF5E14] text-xs font-black uppercase tracking-wider mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#FF5E14] animate-ping" />
                  <span>Civil Engineering</span>
                </div>
                <div className="text-xs font-bold text-slate-800 leading-tight">
                  High-Precision Girder & Truss Launching System
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Controls Bar: Left Arrows & Center Dots */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8 flex items-center justify-between">
        
        {/* Bottom-Left Navigation Arrows matching screenshot */}
        <div className="flex items-center space-x-1">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="w-11 h-11 sm:w-12 sm:h-12 bg-[#FF5E14] hover:bg-[#E24E09] text-white flex items-center justify-center transition-colors shadow-sm active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="w-11 h-11 sm:w-12 sm:h-12 bg-[#FF5E14] hover:bg-[#E24E09] text-white flex items-center justify-center transition-colors shadow-sm active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Bottom Center Dots */}
        <div className="flex items-center space-x-2">
          {slides.map((s, index) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                index === currentSlide
                  ? "w-8 h-2.5 bg-[#FF5E14]"
                  : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        {/* Slide Counter / Status */}
        <div className="text-xs font-extrabold tracking-widest text-slate-400 uppercase hidden sm:block">
          0{currentSlide + 1} / 0{slides.length}
        </div>
      </div>
    </section>
  );
}
