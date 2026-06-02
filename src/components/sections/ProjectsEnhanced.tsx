"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaLock,
  FaFire,
  FaCode,
  FaEye,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiPrisma,
  SiPostgresql,
  SiExpress,
  SiVite,
  SiBootstrap,
  SiSocketdotio,
  SiRedis,
} from "react-icons/si";

/* ─── Types ─── */
interface ProjectImage {
  src: string;
  width?: number;
  height?: number;
  alt: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  github: string;
  live: string;
  images: ProjectImage[];
  tech: string[];
}

/* ─── Data ─── */
const projects: Project[] = [
  {
    id: "zfashion_ecommerce",
    title: "ZFashion Ecommerce",
    description: "A premium fashion ecommerce platform",
    github: "https://github.com/Abozaid92/Z_Fashion",
    live: "https://z-fashion-ecru.vercel.app/en",
    images: [
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/1.png",
        width: 800,
        height: 1000,
        alt: "ZFashion Home",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/2.png",
        width: 1200,
        height: 800,
        alt: "ZFashion Products",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/3.png",
        width: 1200,
        height: 600,
        alt: "ZFashion Detail",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/4.png",
        width: 800,
        height: 800,
        alt: "ZFashion Cart",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/5.png",
        width: 1000,
        height: 1200,
        alt: "ZFashion Checkout",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/6.png",
        width: 1400,
        height: 800,
        alt: "ZFashion Mobile",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/7.png",
        width: 800,
        height: 1000,
        alt: "ZFashion Admin",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/8.png",
        width: 1200,
        height: 800,
        alt: "ZFashion Dashboard",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/9.png",
        width: 1200,
        height: 600,
        alt: "ZFashion Editor",
      },
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "NextAuth",
      "Node.js",
      "Express",
      "Socket.IO",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "Firebase",
    ],
  },
  {
    id: "ink_flow",
    title: "Ink Flow",
    description: "A modern creative platform",
    github: "https://github.com/Abozaid92/inkflow",
    live: "https://inkflow-ten.vercel.app/",
    images: [
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/1-ink.png",
        width: 1376,
        height: 768,
        alt: "Ink Flow Home",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/2-ink.png",
        width: 1376,
        height: 768,
        alt: "Ink Flow Editor",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/3-ink.png",
        width: 1376,
        height: 768,
        alt: "Ink Flow Canvas",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/4-ink.png",
        width: 1376,
        height: 768,
        alt: "Ink Flow Gallery",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/5-ink.png",
        width: 1376,
        height: 768,
        alt: "Ink Flow Settings",
      },
    ],
    tech: ["TypeScript", "PostgreSQL", "Prisma", "Next.js", "JWT", "Tailwind"],
  },
  {
    id: "al_minshawi",
    title: "Al-Minshawi",
    description: "A coffee landing page",
    github: "https://github.com/Abozaid92/AL-minshawi-Coffe-Land-Page",
    live: "https://al-minshawi-coffe-land-page.vercel.app/",
    images: [
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/cof-1.webp",
        width: 1021,
        height: 517,
        alt: "Al-Minshawi Hero",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/cof-2.png",
        width: 1845,
        height: 1085,
        alt: "Al-Minshawi Menu",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/cof-3.png",
        width: 2048,
        height: 800,
        alt: "Al-Minshawi Footer",
      },
    ],
    tech: ["React", "Vite", "Node.js", "Tailwind", "Express"],
  },
  {
    id: "al_amaad_hospital",
    title: "Al-Amad Hospital",
    description: "A hospital landing page",
    github: "https://github.com/Abozaid92/Hospital-Al-Amaad",
    live: "https://hospital-al-amaad.vercel.app/",
    images: [
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/hos-1.png",
        width: 1417,
        height: 1132,
        alt: "Hospital Home",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/hos-2.png",
        width: 1940,
        height: 567,
        alt: "Hospital Services",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/hos-3.png",
        width: 1273,
        height: 443,
        alt: "Hospital Contact",
      },
    ],
    tech: ["React", "Vite", "Node.js", "Tailwind", "Express"],
  },
  {
    id: "islamic_quran_website",
    title: "Islamic Quran Website",
    description: "A Quran and Islamic platform",
    github: "https://github.com/Abozaid92/islamic-",
    live: "https://islamic-alpha.vercel.app/",
    images: [
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/islamic-1.webp",
        width: 1003,
        height: 624,
        alt: "Islamic Home",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/islamic-2.png",
        width: 2056,
        height: 868,
        alt: "Islamic Reader",
      },
      {
        src: "https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/islamic-3.png",
        width: 2033,
        height: 954,
        alt: "Islamic Audio",
      },
    ],
    tech: ["Node.js", "HTML", "CSS", "JavaScript", "Bootstrap"],
  },
];
/* ─── Tech Icon Map ─── */
const techMeta: Record<
  string,
  { icon: React.ElementType; color: string; bg: string }
> = {
  "Next.js": {
    icon: SiNextdotjs,
    color: "text-black dark:text-white",
    bg: "bg-gray-100 dark:bg-gray-800",
  },
  TypeScript: {
    icon: SiTypescript,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  Tailwind: {
    icon: SiTailwindcss,
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
  },
  "Tailwind CSS": {
    icon: SiTailwindcss,
    color: "text-cyan-500",
    bg: "bg-cyan-50 dark:bg-cyan-900/20",
  },
  NextAuth: {
    icon: FaLock,
    color: "text-orange-500",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  "Node.js": {
    icon: FaNodeJs,
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
  Node: {
    icon: FaNodeJs,
    color: "text-green-600",
    bg: "bg-green-50 dark:bg-green-900/20",
  },
  Express: {
    icon: SiExpress,
    color: "text-gray-600 dark:text-gray-300",
    bg: "bg-gray-100 dark:bg-gray-800",
  },
  "Socket.IO": {
    icon: SiSocketdotio,
    color: "text-gray-800 dark:text-gray-200",
    bg: "bg-gray-100 dark:bg-gray-800",
  },
  Prisma: {
    icon: SiPrisma,
    color: "text-indigo-600",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  PostgreSQL: {
    icon: SiPostgresql,
    color: "text-blue-700",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  Redis: {
    icon: SiRedis,
    color: "text-red-600",
    bg: "bg-red-50 dark:bg-red-900/20",
  },
  Firebase: {
    icon: FaFire,
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  JWT: {
    icon: FaLock,
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
  React: {
    icon: FaReact,
    color: "text-sky-500",
    bg: "bg-sky-50 dark:bg-sky-900/20",
  },
  Vite: {
    icon: SiVite,
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
  HTML: {
    icon: FaHtml5,
    color: "text-orange-600",
    bg: "bg-orange-50 dark:bg-orange-900/20",
  },
  CSS: {
    icon: FaCss3Alt,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  JavaScript: {
    icon: FaJs,
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-900/20",
  },
  Bootstrap: {
    icon: SiBootstrap,
    color: "text-purple-600",
    bg: "bg-purple-50 dark:bg-purple-900/20",
  },
};

/* ─── Helpers ─── */
function getTechPill(tech: string) {
  const meta = techMeta[tech];
  if (!meta) {
    return (
      <span
        key={tech}
        className="inline-flex items-center gap-0 md:gap-1.5 px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <FaCode className="w-3 h-3" />
        <span className="hidden md:inline">{tech}</span>
      </span>
    );
  }
  const Icon = meta.icon;
  return (
    <span
      key={tech}
      className={`inline-flex items-center gap-0 md:gap-1.5 px-2 md:px-3 py-1 rounded-full text-xs font-medium border border-slate-200/60 dark:border-slate-700/50 shadow-sm transition-transform duration-300 hover:scale-105 ${meta.bg} ${meta.color}`}
    >
      <Icon className="w-3.5 h-3.5" />
      <span className="hidden md:inline">{tech}</span>
    </span>
  );
}

function getBentoSpan(img: ProjectImage, index: number, total: number): string {
  if (total === 5) {
    if (index === 0) return "col-span-2 md:col-span-4 row-span-2";
    return "col-span-1 md:col-span-2";
  }

  if (total <= 3) {
    if (index === 0) return "col-span-2 md:col-span-2 row-span-2";
    return "col-span-2 md:col-span-2";
  }

  if (index === 0) return "col-span-2 md:col-span-2 row-span-2";
  if (index === 3 || index === 7) return "col-span-2 md:col-span-2";
  if (index === 4) return "row-span-2";
  return "";
}

/* ─── Lightbox ─── */
function Lightbox({
  project,
  startIndex,
  onClose,
}: {
  project: Project;
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIdx(startIndex);
    requestAnimationFrame(() => setIsVisible(true));
  }, [startIndex]);

  const go = useCallback(
    (dir: number) => {
      setIdx((prev) => {
        const next = prev + dir;
        if (next < 0) return project.images.length - 1;
        if (next >= project.images.length) return 0;
        return next;
      });
    },
    [project.images.length],
  );

  useEffect(() => {
    const preload = (i: number) => {
      if (i >= 0 && i < project.images.length) {
        const img = new window.Image();
        img.src = project.images[i].src;
      }
    };
    preload((idx + 1) % project.images.length);
    preload((idx - 1 + project.images.length) % project.images.length);
  }, [idx, project.images]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go, onClose]);

  const activeImg = project.images[idx];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isVisible ?
          "opacity-100 visible"
        : "opacity-0 invisible pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-white/70 dark:bg-slate-950/85 backdrop-blur-2xl transition-colors duration-500" />

      <div
        className={`relative z-10 w-full h-full flex flex-col items-center justify-center p-4 transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-200/50 hover:bg-slate-300/60 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white transition-colors backdrop-blur-md shadow-sm"
          aria-label="Close lightbox"
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <div className="absolute top-4 left-4 z-20 px-4 py-1.5 rounded-full bg-slate-200/50 dark:bg-white/10 text-slate-800 dark:text-white text-xs font-semibold backdrop-blur-md shadow-sm">
          {idx + 1} / {project.images.length}
        </div>

        <div className="relative w-full max-w-6xl h-[62vh] md:h-[70vh]">
          <Image
            key={idx}
            src={activeImg.src}
            alt={activeImg.alt}
            fill
            className="object-contain drop-shadow-2xl"
            sizes="100vw"
            priority
            unoptimized
          />
        </div>

        <div className="mt-4 text-center max-w-xl px-4">
          <p className="text-slate-900 dark:text-white/90 font-bold text-base md:text-lg tracking-tight">
            {project.title}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-1 font-medium">
            {activeImg.alt}
          </p>
        </div>

        <button
          onClick={() => go(-1)}
          className="absolute left-2 cursor-pointer md:left-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-slate-200/60 hover:bg-slate-300/70 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white transition-all active:scale-95 shadow-md backdrop-blur-sm"
          aria-label="Previous image"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute cursor-pointer right-2 md:right-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-slate-200/60 hover:bg-slate-300/70 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white transition-all active:scale-95 shadow-md backdrop-blur-sm"
          aria-label="Next image"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2.5 max-w-[90vw] overflow-x-auto px-3 py-2.5 rounded-2xl bg-slate-200/40 dark:bg-white/5 border border-slate-300/30 dark:border-white/10 backdrop-blur-xl shadow-xl">
          {project.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`relative flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                i === idx ?
                  "border-slate-800 dark:border-white scale-105 shadow-md"
                : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="80px"
                unoptimized
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Project Card ─── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-slate-200/40 dark:shadow-none hover:shadow-2xl dark:hover:border-slate-700/80 transition-all duration-500"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-base md:text-lg font-medium">
            {project.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px] grid-flow-dense">
        {project.images.map((img, i) => {
          if (i >= 4) return null;

          const span = getBentoSpan(img, i, project.images.length);
          const isPriority = index === 0 && i === 0;

          // احتساب العنصر الأخير المشروط لعرض التلميح الرقمي
          const isLastMobile = i === 1 && project.images.length > 2;
          const isLastDesktop = i === 3 && project.images.length > 4;

          let finalSpan = span;
          if (i === 3 && project.images.length === 5) {
            finalSpan = "col-span-2 md:col-span-4";
          }

          // ضبط الـ Spans على الموبايل لتظهر الصورتين بعرض متناسق تماماً
          if (i === 1) {
            finalSpan = finalSpan.replace("col-span-1", "col-span-2");
            if (!finalSpan.includes("col-span-2")) {
              finalSpan = "col-span-2 " + finalSpan;
            }
          }

          return (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className={`relative overflow-hidden rounded-2xl md:rounded-[2rem] bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/40 shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 will-change-transform text-left ${finalSpan} ${i >= 2 ? "hidden md:block" : ""}`}
              aria-label={`Open ${img.alt} in lightbox`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03] will-change-transform"
                  priority={isPriority}
                  loading={isPriority ? "eager" : "lazy"}
                  unoptimized
                />

                {/* طبقة عرض المزيد الخاصة بالموبايل فقط (عند الصورة الثانية) */}
                {isLastMobile && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white transition-all duration-300 group-hover:bg-black/70 md:hidden">
                    <span className="text-3xl font-extrabold tracking-wider">
                      +{project.images.length - 2}
                    </span>
                    <span className="text-xs font-semibold text-white/80 mt-1.5 flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                      <FaEye className="w-4 h-4" /> View All
                    </span>
                  </div>
                )}

                {/* طبقة عرض المزيد الخاصة بالديسكتوب فقط (عند الصورة الرابعة) */}
                {isLastDesktop && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] hidden md:flex flex-col items-center justify-center text-white transition-all duration-300 group-hover:bg-black/70">
                    <span className="text-3xl md:text-4xl font-extrabold tracking-wider">
                      +{project.images.length - 4}
                    </span>
                    <span className="text-xs md:text-sm font-semibold text-white/80 mt-1.5 flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                      <FaEye className="w-4 h-4" /> View All
                    </span>
                  </div>
                )}

                {/* طبقة الـ Hover العادية للتصفح */}
                {!isLastDesktop && (
                  <>
                    <div
                      className={`absolute inset-0 bg-black/0 hover:bg-black/10 dark:hover:bg-white/5 transition-colors duration-300 ${isLastMobile ? "hidden md:block" : ""}`}
                    />
                    <div
                      className={`absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ${isLastMobile ? "hidden md:flex" : ""}`}
                    >
                      <span className="p-2.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white shadow-xl backdrop-blur-sm transform scale-90 hover:scale-100 transition-all duration-300">
                        <FaEye className="w-5 h-5" />
                      </span>
                    </div>
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/60 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-2 bg-slate-50 dark:bg-slate-950/40 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-800/40 max-w-full">
          {project.tech.map((t) => getTechPill(t))}
        </div>

        <div className="flex items-center gap-2.5 md:gap-3 flex-shrink-0">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 active:scale-95 shadow-sm"
          >
            <FaGithub className="w-4 h-4" />
            GitHub
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all duration-200 active:scale-95 shadow-md shadow-slate-900/10 dark:shadow-white/5"
          >
            <FaExternalLinkAlt className="w-3.5 h-3.5" />
            Live Demo
          </a>
          <Link
            href={`en/${project.id}`}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 active:scale-95"
          >
            Show Details
          </Link>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          project={project}
          startIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </motion.article>
  );
}

/* ─── Main Export ─── */
export default function ProjectShowcase() {
  return (
    <section className="w-full bg-slate-50/50 dark:bg-slate-950 min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Selected Work
          </h2>
          <p className="mt-4 text-base md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl font-medium">
            A curated collection of projects built with modern technologies and
            premium attention to detail.
          </p>
        </div>

        <div className="flex flex-col gap-12 md:gap-16">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
