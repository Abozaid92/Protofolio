"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  Fragment,
} from "react";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface ProjectImage {
  src: string;
  alt: string;
  label?: string;
  aspectRatio?: string;
  priority?: boolean;
}

export interface ProjectSection {
  title: string;
  content: string;
}

export interface DeepDiveBlock {
  title: string;
  description: string;
}

export interface TechnicalCaseStudy {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  philosophy: string;
  category: string;
  role: string;
  duration?: string;
  github: string;
  live: string;
  techStack: string[];
  heroImage?: ProjectImage;
  images: ProjectImage[];
  overview: string;
  problemStatement: string;
  architectureOverview: string;
  systemDesign: string;
  dataFlow: string;
  challengesSolved: string;
  edgeCasesHandled: string;
  tradeOffs: string;
  failureScenarios: string;
  performanceStrategy: string;
  renderingStrategy: string;
  cachingStrategy: string;
  securityStrategy: string;
  authFlow: string;
  memoryAndStateManagement: string;
  stateIsolation: string;
  uxStrategy: string;
  interactionDesign: string;
  visualHierarchy: string;
  scalabilityNotes: string;
  extensibility: string;
  seoAccessibilityNotes: string;
  codeQualityNotes: string;
  features: string[];
  outcomes: string[];
  lessonsLearned: string[];
  deepDive: DeepDiveBlock[];
  sections: ProjectSection[];
}

export type SupportedLocale = "en" | "ar";

interface Props {
  project: TechnicalCaseStudy;
  locale: SupportedLocale;
}

// ─────────────────────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────────────────────

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0);
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return progress;
}

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function useParallax(speed = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        setOffset(center * speed);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [speed]);

  return { ref, offset };
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV CONFIG
// ─────────────────────────────────────────────────────────────────────────────

const NAV = [
  { id: "philosophy", en: "Philosophy", ar: "الفلسفة" },
  { id: "overview", en: "Overview", ar: "نظرة عامة" },
  { id: "architecture", en: "Architecture", ar: "البنية" },
  { id: "system-design", en: "System Design", ar: "تصميم النظام" },
  { id: "data-flow", en: "Data Flow", ar: "تدفق البيانات" },
  { id: "challenges", en: "Challenges", ar: "التحديات" },
  { id: "strategies", en: "Strategies", ar: "الاستراتيجيات" },
  { id: "ux-design", en: "UX & Design", ar: "UX والتصميم" },
  { id: "deep-dive", en: "Deep Dive", ar: "تحليل عميق" },
  { id: "features", en: "Features", ar: "المميزات" },
  { id: "outcomes", en: "Outcomes", ar: "النتائج" },
  { id: "gallery", en: "Gallery", ar: "معرض الصور" },
];

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────

const I = {
  github: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  externalLink: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14L21 3" />
    </svg>
  ),
  check: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  arrowLeft: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  ),
  arrowRight: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  ),
  close: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  expand: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  ),
  performance: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  security: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  database: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  layers: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  monitor: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  users: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  target: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
  trending: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  sparkle: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
    </svg>
  ),
  code: (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// PRIMITIVE: Reveal wrapper
// ─────────────────────────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function StaggerList({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useReveal(0.05);
  return (
    <div
      ref={ref}
      className={className}
      style={
        {
          "--stagger-visible": visible ? "1" : "0",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL PROGRESS BAR
// ─────────────────────────────────────────────────────────────────────────────

function ProgressBar() {
  const p = useScrollProgress();
  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-teal-400 origin-left transition-transform duration-75"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDE NAVIGATION RAIL
// ─────────────────────────────────────────────────────────────────────────────

function NavRail({
  locale,
  active,
  onNav,
}: {
  locale: SupportedLocale;
  active: string;
  onNav: (id: string) => void;
}) {
  return (
    <nav
      className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-1"
      aria-label="Section navigation"
    >
      {NAV.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => onNav(s.id)}
            aria-label={locale === "ar" ? s.ar : s.en}
            className="group flex items-center gap-3 py-1 outline-none"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive ?
                  "w-6 h-[2px] bg-amber-400"
                : "w-3 h-[2px] bg-gray-500 dark:bg-gray-600 group-hover:w-5 group-hover:bg-amber-400/60"
              }`}
            />
            <span
              className={`text-[10px] font-medium tracking-widest uppercase transition-all duration-300 ${
                isActive ?
                  "opacity-100 text-amber-400"
                : "opacity-0 group-hover:opacity-60 text-gray-400 dark:text-gray-500"
              }`}
            >
              {locale === "ar" ? s.ar : s.en}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────────────────────────────────────

function SectionHeading({
  num,
  title,
  sub,
}: {
  num: string;
  title: string;
  sub?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      <p className="text-[10px] font-bold tracking-[0.2em] text-amber-400 uppercase mb-3">
        {num}
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
        {title}
      </h2>
      {sub && (
        <p className="mt-3 text-base text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
          {sub}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD
// ─────────────────────────────────────────────────────────────────────────────

function Card({
  icon,
  title,
  text,
  accent = false,
  delay = 0,
}: {
  icon?: React.ReactNode;
  title: string;
  text: string;
  accent?: boolean;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={`group relative rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
          accent ?
            "border-teal-400/30 bg-teal-950/20 dark:bg-teal-900/10 hover:border-teal-400/60 hover:shadow-teal-400/10"
          : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-amber-400/40 hover:shadow-amber-400/5"
        }`}
      >
        {icon && (
          <div
            className={`mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl ${
              accent ?
                "bg-teal-400/10 text-teal-400"
              : "bg-amber-400/10 text-amber-500 dark:text-amber-400"
            }`}
          >
            {icon}
          </div>
        )}
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 tracking-wide">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {text}
        </p>
        <div
          className={`absolute bottom-0 left-6 right-6 h-px transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left ${
            accent ?
              "bg-gradient-to-r from-teal-400/60 to-transparent"
            : "bg-gradient-to-r from-amber-400/60 to-transparent"
          }`}
        />
      </div>
    </Reveal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────

function Hero({
  project,
  locale,
}: {
  project: TechnicalCaseStudy;
  locale: SupportedLocale;
}) {
  const { ref, offset } = useParallax(0.2);

  return (
    <section
      className="relative h-screen min-h-[140px] px-20  overflow-hidden"
      aria-label="Project hero"
      style={{ height: "350px" }}
    >
      {/* Content */}
      <div
        className="relative z-10 flex flex-col justify-start  pt-20 h-full px-6 sm:px-12 lg:px-20 pb-16 sm:pb-20 max-w-6xl"
        id="project-content"
      >
        <div className="animate-[fadeSlideUp_0.9s_ease-out_0.1s_both]">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-amber-400 uppercase">
              {project.category}
            </span>
          </div>
          <h1
            // clamp size
            style={{ fontSize: "clamp(1.2rem, 6vw, 3.5rem)" }}
            className=" font-black tracking-tight text-slate-400 leading-[0.95] mb-4"
          >
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-light max-w-xl mb-3 leading-snug">
            {project.subtitle}
          </p>
          <p className="text-sm sm:text-base text-amber-300/80 font-medium italic max-w-lg">
            &ldquo;{project.tagline}&rdquo;
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 sm:right-12 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase rotate-90 mb-3">
          {locale === "ar" ? "اسحب" : "Scroll"}
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-gray-400 to-transparent" />
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QUICK INFO BAR
// ─────────────────────────────────────────────────────────────────────────────

function InfoBar({
  project,
  locale,
}: {
  project: TechnicalCaseStudy;
  locale: SupportedLocale;
}) {
  const ar = locale === "ar";
  return (
    <div className="sticky top-[2px] z-40 bg-white/80 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20 py-4 flex flex-wrap items-center gap-6 justify-between">
        {/* Meta */}
        <div className="flex items-center gap-6 flex-wrap">
          <MetaItem label={ar ? "الدور" : "Role"} value={project.role} />
          {project.duration && (
            <MetaItem
              label={ar ? "المدة" : "Duration"}
              value={project.duration}
            />
          )}
          <MetaItem
            label={ar ? "التصنيف" : "Category"}
            value={project.category}
          />
        </div>
        {/* Actions */}
        <div className="flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-amber-400 hover:text-amber-500 dark:hover:text-amber-400 transition-all duration-200"
            >
              {I.github}
              <span>GitHub</span>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-amber-400 hover:bg-amber-300 text-gray-900 transition-all duration-200 shadow-lg shadow-amber-400/20"
            >
              <span>{ar ? "المعاينة" : "Live Demo"}</span>
              {I.externalLink}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500">
        {label}
      </span>
      <span className="text-sm font-semibold text-gray-900 dark:text-white">
        {value}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY + LIGHTBOX
// ─────────────────────────────────────────────────────────────────────────────

function Gallery({
  images,
  locale,
}: {
  images: ProjectImage[];
  locale: SupportedLocale;
}) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [imgLoaded, setImgLoaded] = useState<boolean[]>(() =>
    new Array(images.length).fill(false),
  );
  const ar = locale === "ar";

  // Keyboard nav
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowLeft")
        setLightboxIdx((p) =>
          p === null ? null
          : p > 0 ? p - 1
          : images.length - 1,
        );
      if (e.key === "ArrowRight")
        setLightboxIdx((p) =>
          p === null ? null
          : p < images.length - 1 ? p + 1
          : 0,
        );
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [lightboxIdx, images.length]);

  const markLoaded = (i: number) => {
    setImgLoaded((prev) => {
      const next = [...prev];
      next[i] = true;
      return next;
    });
  };

  const prev = () =>
    setLightboxIdx((p) =>
      p === null ? null
      : p > 0 ? p - 1
      : images.length - 1,
    );
  const next = () =>
    setLightboxIdx((p) =>
      p === null ? null
      : p < images.length - 1 ? p + 1
      : 0,
    );

  return (
    <>
      {/* Gallery grid — masonry-like using CSS columns */}
      <section
        id="gallery"
        className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-950"
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20">
          <SectionHeading
            num="13"
            title={ar ? "معرض الصور" : "Project Gallery"}
            sub={
              ar ? "لقطات شاشة مفصلة" : "Detailed screenshots from the project"
            }
          />

          {/* Thumbnail strip */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {images.map((img, i) => (
              <Reveal key={`${img.src}-${i}`} delay={i * 50}>
                <button
                  onClick={() => setLightboxIdx(i)}
                  className="group relative w-full overflow-hidden rounded-2xl aspect-video bg-gray-200 dark:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label={`View ${img.alt}`}
                >
                  {/* Skeleton shimmer */}
                  {!imgLoaded[i] && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse" />
                  )}
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className={`object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded[i] ? "opacity-100" : "opacity-0"}`}
                    onLoad={() => markLoaded(i)}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gray-950/0 group-hover:bg-gray-950/60 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/30">
                        {I.expand}
                      </div>
                      {img.label && (
                        <span className="text-[11px] font-semibold text-white/90 tracking-wide px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                          {img.label}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Index badge */}
                  <span className="absolute top-2 left-2 text-[10px] font-bold text-white/60 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          {/* Featured large view — first image */}
          {images[0] && (
            <Reveal delay={100}>
              <button
                onClick={() => setLightboxIdx(0)}
                className="group relative mt-6 w-full overflow-hidden rounded-3xl aspect-[16/7] bg-gray-200 dark:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                aria-label="View featured screenshot"
              >
                <Image
                  src={images[0].src}
                  alt={images[0].alt}
                  fill
                  sizes="100vw"
                  className="object-cover transition-all duration-700 group-hover:scale-[1.02]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 flex items-center gap-3">
                  <span className="text-sm sm:text-base font-semibold text-white/90">
                    {images[0].label || "Featured View"}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 text-amber-400 text-sm font-medium">
                    {I.expand}
                    <span>{ar ? "توسيع" : "Expand"}</span>
                  </div>
                </div>
              </button>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-gray-950/95 backdrop-blur-2xl"
          onClick={() => setLightboxIdx(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close */}
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 backdrop-blur-sm border border-white/10"
            aria-label="Close"
          >
            {I.close}
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 sm:left-6 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-amber-400/80 hover:text-gray-900 text-white transition-all duration-200 backdrop-blur-sm border border-white/10 group"
            aria-label="Previous"
          >
            {ar ? I.arrowRight : I.arrowLeft}
          </button>

          {/* Image container */}
          <div
            className="relative max-w-5xl w-full mx-16 sm:mx-24 rounded-2xl overflow-hidden shadow-2xl shadow-black/80"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loading skeleton */}
            <div className="w-full aspect-video bg-gray-900 animate-pulse absolute inset-0" />
            <Image
              src={images[lightboxIdx].src}
              alt={images[lightboxIdx].alt}
              width={1600}
              height={900}
              className="relative z-10 w-full h-auto object-cover"
              priority
            />
            {/* Caption bar */}
            <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-gray-950/90 to-transparent px-6 py-5 flex items-center justify-between">
              <div>
                {images[lightboxIdx].label && (
                  <p className="text-sm font-semibold text-white">
                    {images[lightboxIdx].label}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-0.5 leading-relaxed max-w-lg">
                  {images[lightboxIdx].alt}
                </p>
              </div>
              <span className="text-xs font-bold text-gray-400 tabular-nums whitespace-nowrap">
                {lightboxIdx + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 sm:right-6 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-amber-400/80 hover:text-gray-900 text-white transition-all duration-200 backdrop-blur-sm border border-white/10"
            aria-label="Next"
          >
            {ar ? I.arrowLeft : I.arrowRight}
          </button>

          {/* Dot strip */}
          <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIdx(i);
                }}
                className={`rounded-full transition-all duration-200 ${
                  i === lightboxIdx ?
                    "w-6 h-1.5 bg-amber-400"
                  : "w-1.5 h-1.5 bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DIVIDER
// ─────────────────────────────────────────────────────────────────────────────

function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20">
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ProjectDetailsClient({ project, locale }: Props) {
  const [active, setActive] = useState("");
  const ar = locale === "ar";

  // Scroll spy
  useEffect(() => {
    const check = () => {
      const pos = window.scrollY + window.innerHeight / 3;
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i].id);
        if (el && el.offsetTop <= pos) {
          setActive(NAV[i].id);
          return;
        }
      }
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, []);

  const navTo = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Strategy cards
  const strategies = useMemo(
    () => [
      {
        icon: I.performance,
        title: ar ? "الأداء" : "Performance",
        text: project.performanceStrategy,
      },
      {
        icon: I.monitor,
        title: ar ? "العرض" : "Rendering",
        text: project.renderingStrategy,
      },
      {
        icon: I.database,
        title: ar ? "التخزين المؤقت" : "Caching",
        text: project.cachingStrategy,
      },
      {
        icon: I.security,
        title: ar ? "الأمان" : "Security",
        text: project.securityStrategy,
      },
      {
        icon: I.users,
        title: ar ? "المصادقة" : "Auth Flow",
        text: project.authFlow,
      },
      {
        icon: I.layers,
        title: ar ? "إدارة الحالة" : "State Management",
        text: project.memoryAndStateManagement,
      },
      {
        icon: I.target,
        title: ar ? "عزل الحالة" : "State Isolation",
        text: project.stateIsolation,
      },
      {
        icon: I.trending,
        title: ar ? "قابلية التوسع" : "Scalability",
        text: project.scalabilityNotes,
      },
    ],
    [ar, project],
  );

  // Section wrapper classes
  const sec = "py-20 sm:py-28";
  const secAlt = "py-20 sm:py-28 bg-gray-50 dark:bg-gray-900/50";
  const cnt = "max-w-6xl mx-auto px-6 sm:px-12 lg:px-20";
  const cntNarrow = "max-w-3xl mx-auto px-6 sm:px-12";

  return (
    <div className="relative bg-white dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen font-sans antialiased">
      <ProgressBar />
      <NavRail locale={locale} active={active} onNav={navTo} />

      {/* ── HERO ── */}
      <Hero project={project} locale={locale} />

      {/* ── INFO BAR ── */}
      <InfoBar project={project} locale={locale} />

      {/* ── 01 PHILOSOPHY ── */}
      <section id="philosophy" className={sec}>
        <div className={cntNarrow}>
          <SectionHeading
            num="01"
            title={ar ? "الفلسفة التصميمية" : "Design Philosophy"}
          />

          <Reveal delay={150}>
            <blockquote className="relative mt-10 pl-6 border-l-2 border-amber-400">
              <p className="text-xl sm:text-2xl font-light italic leading-relaxed text-gray-700 dark:text-gray-200">
                &ldquo;{project.philosophy}&rdquo;
              </p>
              <footer className="mt-4 text-xs font-bold tracking-widest uppercase text-amber-500 dark:text-amber-400">
                — {ar ? "فلسفة المشروع" : "Project Philosophy"}
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-8 text-base leading-[1.85] text-gray-600 dark:text-gray-400">
              {project.description}
            </p>
          </Reveal>

          <Reveal delay={250}>
            <div className="mt-10">
              <p className="text-[9px] font-bold tracking-[0.25em] uppercase text-gray-400 dark:text-gray-500 mb-4">
                {ar ? "التقنيات المستخدمة" : "Tech Stack"}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-200 cursor-default"
                    style={{ transitionDelay: `${i * 30}ms` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ── 02 OVERVIEW ── */}
      <section id="overview" className={secAlt}>
        <div className={cnt}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <SectionHeading
                num="02"
                title={ar ? "نظرة عامة" : "Overview"}
                sub={
                  ar ?
                    "الرؤية والهدف من وراء المشروع"
                  : "The vision and purpose behind this project"
                }
              />
              <Reveal delay={150}>
                <p className="mt-6 text-base leading-[1.85] text-gray-600 dark:text-gray-400">
                  {project.overview}
                </p>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 relative overflow-hidden group hover:border-amber-400/40 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-teal-400 opacity-60" />
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-amber-500 dark:text-amber-400 mb-4">
                  02-A
                </p>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {ar ? "بيان المشكلة" : "Problem Statement"}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {project.problemStatement}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 03 ARCHITECTURE ── */}
      <section id="architecture" className={sec}>
        <div className={cntNarrow}>
          <SectionHeading
            num="03"
            title={ar ? "البنية التقنية" : "Architecture Overview"}
          />
          <Reveal delay={150}>
            <p className="mt-6 text-base leading-[1.85] text-gray-600 dark:text-gray-400">
              {project.architectureOverview}
            </p>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ── 04 SYSTEM DESIGN ── */}
      <section id="system-design" className={secAlt}>
        <div className={cnt}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <SectionHeading
                num="04"
                title={ar ? "تصميم النظام" : "System Design"}
              />
              <Reveal delay={150}>
                <p className="mt-6 text-base leading-[1.85] text-gray-600 dark:text-gray-400">
                  {project.systemDesign}
                </p>
              </Reveal>
            </div>
            <div className="flex flex-col gap-4">
              <Card
                icon={I.code}
                title={ar ? "جودة الكود" : "Code Quality"}
                text={project.codeQualityNotes}
                delay={150}
              />
              <Card
                icon={I.sparkle}
                title={ar ? "SEO والوصول" : "SEO & Accessibility"}
                text={project.seoAccessibilityNotes}
                delay={200}
              />
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 05 DATA FLOW ── */}
      <section id="data-flow" className={sec}>
        <div className={cntNarrow}>
          <SectionHeading
            num="05"
            title={ar ? "تدفق البيانات" : "Data Flow"}
            sub={
              ar ?
                "كيف تتحرك البيانات عبر النظام"
              : "How data moves through the system"
            }
          />
          <Reveal delay={150}>
            <div className="relative mt-10 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-8">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-amber-400/60 via-teal-400/60 to-transparent" />
              {/* Decorative circles */}
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-amber-400/5 blur-2xl pointer-events-none" />
              <p className="relative text-base leading-[1.85] text-gray-600 dark:text-gray-400 font-mono text-sm">
                {project.dataFlow}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ── 06 CHALLENGES ── */}
      <section id="challenges" className={secAlt}>
        <div className={cnt}>
          <SectionHeading
            num="06"
            title={ar ? "التحديات والحلول" : "Challenges & Solutions"}
          />
          <div className="mt-12 grid sm:grid-cols-2 gap-4">
            <Card
              icon={I.target}
              title={ar ? "التحديات" : "Challenges Solved"}
              text={project.challengesSolved}
              delay={0}
            />
            <Card
              icon={I.security}
              title={ar ? "حالات الحافة" : "Edge Cases"}
              text={project.edgeCasesHandled}
              delay={80}
            />
            <Card
              icon={I.layers}
              title={ar ? "المقايضات" : "Trade-offs"}
              text={project.tradeOffs}
              delay={160}
            />
            <Card
              icon={I.monitor}
              title={ar ? "سيناريوهات الفشل" : "Failure Scenarios"}
              text={project.failureScenarios}
              delay={240}
            />
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 07 STRATEGIES ── */}
      <section id="strategies" className={sec}>
        <div className={cnt}>
          <SectionHeading
            num="07"
            title={ar ? "الاستراتيجيات التقنية" : "Technical Strategies"}
            sub={
              ar ?
                "النهج الهندسي التفصيلي لكل جانب"
              : "Detailed engineering approach for every aspect of the system"
            }
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {strategies.slice(0, 4).map((s, i) => (
              <Card
                key={s.title}
                icon={s.icon}
                title={s.title}
                text={s.text}
                delay={i * 60}
              />
            ))}
          </div>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {strategies.slice(4).map((s, i) => (
              <Card
                key={s.title}
                icon={s.icon}
                title={s.title}
                text={s.text}
                delay={i * 60}
              />
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-4 rounded-2xl border border-teal-400/30 dark:border-teal-500/20 bg-teal-50/50 dark:bg-teal-950/20 p-6 flex gap-4 hover:border-teal-400/60 transition-all duration-300">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-teal-400/10 text-teal-500 dark:text-teal-400 flex items-center justify-center">
                {I.trending}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-teal-700 dark:text-teal-300 mb-1">
                  {ar ? "قابلية التوسع" : "Extensibility"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {project.extensibility}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Divider />

      {/* ── 08 UX & DESIGN ── */}
      <section id="ux-design" className={secAlt}>
        <div className={cnt}>
          <SectionHeading
            num="08"
            title={ar ? "تصميم تجربة المستخدم" : "UX & Interaction Design"}
          />
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            <Card
              icon={I.sparkle}
              title={ar ? "استراتيجية UX" : "UX Strategy"}
              text={project.uxStrategy}
              delay={0}
            />
            <Card
              icon={I.users}
              title={ar ? "تصميم التفاعل" : "Interaction Design"}
              text={project.interactionDesign}
              delay={80}
            />
            <Card
              icon={I.layers}
              title={ar ? "التسلسل الهرمي البصري" : "Visual Hierarchy"}
              text={project.visualHierarchy}
              delay={160}
            />
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 09 DEEP DIVE ── */}
      <section id="deep-dive" className={sec}>
        <div className={cnt}>
          <SectionHeading
            num="09"
            title={ar ? "تحليل عميق" : "Deep Dive"}
            sub={
              ar ?
                "رؤى متعمقة حول القرارات الهندسية الأساسية"
              : "In-depth insights into the core engineering decisions"
            }
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.deepDive.map((dive, i) => (
              <Reveal key={dive.title} delay={i * 100}>
                <div className="group relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 hover:border-amber-400/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 origin-left bg-gradient-to-r from-amber-400 to-transparent transition-transform duration-500" />
                  <span className="block text-4xl font-black text-gray-100 dark:text-gray-800 mb-4 group-hover:text-amber-400/20 transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-3">
                    {dive.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {dive.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 10 FEATURES ── */}
      <section id="features" className={secAlt}>
        <div className={cntNarrow}>
          <SectionHeading
            num="10"
            title={ar ? "المميزات الرئيسية" : "Key Features"}
          />
          <div className="mt-10 grid gap-3">
            {project.features.map((f, i) => (
              <Reveal key={f} delay={i * 40}>
                <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800/60 bg-white dark:bg-gray-900/50 hover:border-amber-400/30 transition-all duration-200 group">
                  <span className="flex-shrink-0 mt-0.5 w-6 h-6 rounded-full bg-amber-400/10 text-amber-500 dark:text-amber-400 flex items-center justify-center group-hover:bg-amber-400/20 transition-colors duration-200">
                    {I.check}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                    {f}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 11 OUTCOMES & LESSONS ── */}
      <section id="outcomes" className={sec}>
        <div className={cntNarrow}>
          <SectionHeading
            num="11"
            title={ar ? "النتائج والدروس" : "Outcomes & Lessons"}
          />

          <div className="mt-10">
            <Reveal>
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-5">
                {ar ? "النتائج" : "Outcomes"}
              </h3>
            </Reveal>
            <div className="grid gap-3">
              {project.outcomes.map((o, i) => (
                <Reveal key={o} delay={i * 80}>
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-200">
                    <span className="flex-shrink-0 text-amber-500 dark:text-amber-400 mt-0.5">
                      {I.trending}
                    </span>
                    <p className="text-sm font-medium text-amber-900 dark:text-amber-100 leading-relaxed">
                      {o}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <Reveal>
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500 mb-5">
                {ar ? "الدروس المستفادة" : "Lessons Learned"}
              </h3>
            </Reveal>
            <div className="flex flex-col gap-4">
              {project.lessonsLearned.map((lesson, i) => (
                <Reveal key={lesson} delay={i * 80}>
                  <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-gray-200 dark:border-gray-700 hover:border-amber-400 dark:hover:border-amber-500 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-300">
                    {lesson}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 12 ENGINEERING PERSPECTIVE ── */}
      <section className={secAlt}>
        <div className={cntNarrow}>
          <SectionHeading
            num="12"
            title={ar ? "تحليل هندسي" : "Engineering Perspective"}
          />
          <div className="mt-10 flex flex-col gap-5">
            {project.sections.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-7 hover:border-amber-400/40 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-amber-400/0 group-hover:bg-amber-400/60 transition-all duration-300 rounded-l-2xl" />
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 tracking-wide">
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {s.content}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13 GALLERY ── */}
      <Gallery images={project.images} locale={locale} />

      {/* ── FOOTER CTA ── */}
      <section className="py-20 sm:py-28 bg-gray-950 dark:bg-gray-950 text-center relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-400/5 blur-3xl" />
        </div>
        <div className="relative max-w-xl mx-auto px-6">
          <Reveal>
            <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-400 mb-4">
              {ar ? "المشروع" : "Project"}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
              {project.title}
            </h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              {project.tagline}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-gray-700 text-gray-300 hover:border-amber-400 hover:text-amber-400 transition-all duration-200"
                >
                  {I.github}
                  <span>GitHub</span>
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-amber-400 hover:bg-amber-300 text-gray-900 transition-all duration-200 shadow-xl shadow-amber-400/25"
                >
                  <span>{ar ? "المعاينة المباشرة" : "View Live Demo"}</span>
                  {I.externalLink}
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
