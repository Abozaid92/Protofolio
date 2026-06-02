"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Briefcase,
  Code2,
  Github,
  Globe,
  Linkedin,
  Mail,
  Terminal,
  Users,
} from "lucide-react";

interface HeroProps {
  dict: any;
}

interface StatItem {
  icon: ReactNode;
  value: number;
  suffix: string;
  label: string;
}

type TerminalLine = {
  type: "cmd" | "out";
  text: string;
};

type TerminalBlock = {
  title?: string;
  lines: TerminalLine[];
};

type HeroCopy = {
  name?: {
    first?: string;
    last?: string;
  };
  available?: string;
  bio?: string;
  cta?: string;
  contact?: string;
  roles?: string[];
  socials?: {
    linkedin?: string;
    email?: string;
    github?: string;
  };
  stats?: Array<{
    value: number;
    suffix?: string;
    label: string;
  }>;
  terminal?: TerminalBlock;
};

const DEFAULT_ROLES = [
  "Full Stack Developer",
  "Next.js Specialist",
  "React Craftsman",
  "UI/UX Engineer",
  "Problem Solver",
];

const DEFAULT_STATS: StatItem[] = [
  { icon: <Code2 size={20} />, value: 50, suffix: "+", label: "Projects" },
  { icon: <Users size={20} />, value: 30, suffix: "+", label: "Clients" },
  { icon: <Briefcase size={20} />, value: 5, suffix: "+", label: "Years" },
];

const DEFAULT_TERMINAL_LINES: TerminalLine[] = [
  { type: "cmd", text: "cat contact.json" },
  { type: "out", text: "{" },
  { type: "out", text: '  "name": "Ibrahim Abuzaid",' },
  { type: "out", text: '  "location": "Tanta, Egypt",' },
  { type: "out", text: '  "phone": "+20 108 076 1700",' },
  { type: "out", text: '  "email": "ebrahim.abozaid567@gmail.com",' },
  { type: "out", text: '  "role": "Full Stack Developer",' },
  { type: "out", text: '  "status": "✅ Available for Hire"' },
  { type: "out", text: "}" },
  { type: "cmd", text: "node ready.js" },
  { type: "out", text: "🚀 Ready to build something great." },
  { type: "out", text: "📬 Let's connect and make it happen." },
];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function useIsDarkTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const update = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => update();

    if (media.addEventListener) {
      media.addEventListener("change", onChange);
    } else {
      media.addListener(onChange);
    }

    return () => {
      observer.disconnect();
      if (media.removeEventListener) {
        media.removeEventListener("change", onChange);
      } else {
        media.removeListener(onChange);
      }
    };
  }, []);

  return isDark;
}

export default function Hero({ dict }: HeroProps) {
  const hero: HeroCopy = dict?.hero ?? {};

  const roles =
    Array.isArray(hero.roles) && hero.roles.length > 0 ?
      hero.roles
    : DEFAULT_ROLES;

  const stats: StatItem[] =
    Array.isArray(hero.stats) && hero.stats.length > 0 ?
      hero.stats.map((item, index) => ({
        icon:
          index === 0 ? <Code2 size={20} />
          : index === 1 ? <Users size={20} />
          : <Briefcase size={20} />,
        value: item.value,
        suffix: item.suffix ?? "+",
        label: item.label,
      }))
    : DEFAULT_STATS;

  const terminalLines =
    hero.terminal?.lines && hero.terminal.lines.length > 0 ?
      hero.terminal.lines
    : DEFAULT_TERMINAL_LINES;

  const firstName = hero.name?.first ?? "Ibrahim";
  const lastName = hero.name?.last ?? "Abuzaid";

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        @keyframes pulse-dot {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.3);
          }
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes shimmer-sweep {
          from {
            transform: translateX(-100%) skewX(-15deg);
          }
          to {
            transform: translateX(220%) skewX(-15deg);
          }
        }

        .gradient-name {
          background: linear-gradient(
            90deg,
            #3b82f6 0%,
            #7c3aed 30%,
            #60a5fa 55%,
            #7c3aed 80%,
            #3b82f6 100%
          );
          background-size: 300% 300%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          animation: gradientShift 4s ease infinite;
        }

        .shimmer-btn {
          position: relative;
          overflow: hidden;
        }
        .shimmer-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.28) 50%,
            transparent 100%
          );
          transform: translateX(-100%) skewX(-15deg);
          z-index: 1;
          pointer-events: none;
        }
        .shimmer-btn:hover::before {
          animation: shimmer-sweep 0.75s ease-in-out forwards;
        }

        .terminal-wrapper {
          animation:
            slideInRight 0.7s ease-out 0.3s both,
            float 6s ease-in-out 1.5s infinite;
        }

        .terminal-window {
          transition:
            box-shadow 0.6s ease,
            border-color 0.4s ease,
            background-color 0.4s ease;
        }
        .terminal-window.typing-active {
          box-shadow:
            0 0 0 1px rgba(80, 161, 79, 0.16),
            0 0 28px rgba(80, 161, 79, 0.08),
            0 20px 60px rgba(0, 0, 0, 0.18);
        }
        .dark .terminal-window.typing-active {
          box-shadow:
            0 0 0 1px rgba(52, 211, 153, 0.15),
            0 0 30px rgba(52, 211, 153, 0.05),
            0 20px 60px rgba(0, 0, 0, 0.45);
        }
        .terminal-window.typing-done {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.16);
        }
        .dark .terminal-window.typing-done {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .terminal-body {
          position: relative;
        }
        .terminal-body::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.025) 2px,
            rgba(0, 0, 0, 0.025) 4px
          );
          z-index: 2;
          border-radius: 0 0 0.75rem 0.75rem;
        }
        .dark .terminal-body::after {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 255, 255, 0.03) 2px,
            rgba(255, 255, 255, 0.03) 4px
          );
        }

        .stat-card {
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.08) 0%,
            rgba(124, 58, 237, 0.06) 100%
          ) !important;
          border-color: rgba(96, 165, 250, 0.3) !important;
        }

        .social-icon-btn {
          transition: all 0.3s ease;
        }
        .social-icon-btn:hover {
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
        }

        @media (max-width: 767px) {
          .terminal-wrapper {
            animation: slideInRight 0.7s ease-out 0.3s both !important;
          }
          .terminal-body {
            min-height: 280px !important;
            font-size: 0.75rem !important;
            line-height: 1.6 !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .terminal-wrapper {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .gradient-name {
            animation: none !important;
            background-position: 0% 50%;
          }
          .shimmer-btn::before {
            display: none;
          }
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <section
        id="hero"
        className="relative min-h-screen w-full overflow-hidden bg-white transition-colors duration-500 dark:bg-[#070711]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="pointer-events-none absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-blue-500 opacity-10 blur-[120px]" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-[500px] w-[500px] rounded-full bg-violet-500 opacity-10 blur-[120px]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-indigo-500 opacity-[0.05] blur-[80px]" />
        <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-[200px] w-[200px] rounded-full bg-blue-400 opacity-[0.04] blur-[60px]" />

        <div className="relative mx-auto flex min-h-screen max-w-[1280px] flex-col items-center justify-center px-6 py-20 md:flex-row md:items-center md:justify-between md:gap-12 lg:gap-20">
          <div className="flex w-full max-w-xl flex-col items-start md:w-1/2">
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-white/70 px-4 py-2 ring-1 ring-emerald-500/20 backdrop-blur-sm dark:bg-white/5"
              style={{
                animation: "fadeInDown 0.6s ease-out 0s both",
                filter: "drop-shadow(0 0 8px rgba(52, 211, 153, 0.3))",
              }}
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500"
                style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                {hero.available ?? "Available for Hire"}
              </span>
            </div>

            <h1
              className="mb-2 font-black leading-[1.05] tracking-tight"
              style={{
                fontSize: "clamp(3rem, 8vw, 6rem)",
                animation: "fadeInUp 0.6s ease-out 0.1s both",
              }}
            >
              <span className="text-slate-900 dark:text-white">
                {firstName}
              </span>{" "}
              <span className="gradient-name">{lastName}</span>
            </h1>

            <div
              className="mb-5 h-8"
              style={{ animation: "fadeInUp 0.6s ease-out 0.2s both" }}
            >
              <Typewriter roles={roles} />
            </div>

            <p
              className="mb-8 max-w-md text-lg leading-relaxed text-slate-600 dark:text-slate-400"
              style={{ animation: "fadeInUp 0.6s ease-out 0.3s both" }}
            >
              {hero.bio ??
                "Turning ideas into fast, scalable, beautiful web experiences."}
            </p>

            <div
              className="mb-8 grid w-full grid-cols-3 gap-3"
              style={{ animation: "fadeInUp 0.6s ease-out 0.4s both" }}
            >
              {stats.map((stat, i) => (
                <StatCard key={i} stat={stat} delay={i * 0.1} />
              ))}
            </div>

            <div
              className="mb-8 flex flex-wrap gap-4"
              style={{ animation: "fadeInUp 0.6s ease-out 0.5s both" }}
            >
              <a
                href="#projects"
                className="shimmer-btn rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40"
              >
                <span className="relative z-10">
                  {hero.cta ?? "View My Work"}
                </span>
              </a>
              <a
                href="#contact"
                className="rounded-xl border border-slate-300 bg-white/70 px-7 py-3.5 font-semibold text-slate-700 backdrop-blur-sm transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-blue-400/50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
              >
                {hero.contact ?? "Get In Touch"}
              </a>
            </div>

            <div
              className="flex items-center gap-3"
              style={{ animation: "fadeInUp 0.6s ease-out 0.6s both" }}
            >
              <SocialIcon
                href="https://www.linkedin.com/in/ibrahim-abuzaid-9750b5404/"
                icon={<Linkedin size={18} />}
                label={hero.socials?.linkedin ?? "LinkedIn"}
              />

              <SocialIcon
                href="https://github.com/Abozaid92"
                icon={<Github size={18} />}
                label={hero.socials?.github ?? "GitHub"}
              />
            </div>
          </div>

          <div className="terminal-wrapper mt-12 w-full md:mt-0 md:w-1/2">
            <TerminalWindow
              title={hero.terminal?.title ?? "portfolio"}
              lines={terminalLines}
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Typewriter({ roles }: { roles: string[] }) {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const speedRef = useRef(80);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    const timer = setTimeout(() => {
      if (isDeleting) {
        if (displayText.length === 0) {
          speedRef.current = 80;
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        } else {
          speedRef.current = 40;
          setDisplayText((prev) => prev.slice(0, -1));
        }
      } else {
        if (displayText === currentRole) {
          pauseTimerRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, 2500);
          return;
        }
        speedRef.current = 80;
        setDisplayText(currentRole.slice(0, displayText.length + 1));
      }
    }, speedRef.current);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, []);

  return (
    <div className="flex items-center gap-1 text-lg font-semibold text-slate-700 dark:text-slate-300 sm:text-xl">
      <span>
        {displayText}
        <span
          className="inline-block w-[2px] bg-gradient-to-b from-blue-500 to-violet-600"
          style={{
            height: "1.1em",
            verticalAlign: "text-bottom",
            marginLeft: "2px",
            animation: "blink 1s step-end infinite",
          }}
        />
      </span>
    </div>
  );
}

function StatCard({ stat, delay }: { stat: StatItem; delay: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          observer.disconnect();

          let start = 0;
          const end = stat.value;
          const duration = 1500;
          const stepTime = Math.max(Math.floor(duration / end), 20);

          const ticker = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(ticker);
          }, stepTime);
        }
      },
      { threshold: 0.5, rootMargin: "0px 0px -20px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.value]);

  return (
    <div
      ref={ref}
      className="stat-card group flex flex-col items-center rounded-xl border border-white/20 bg-white/70 p-3 backdrop-blur-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 dark:border-white/10 dark:bg-white/5"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="mb-1.5 text-blue-500 transition-colors duration-300 group-hover:text-violet-500 dark:text-blue-400 dark:group-hover:text-violet-400">
        {stat.icon}
      </div>
      <div className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
        {count}
        {stat.suffix}
      </div>
      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {stat.label}
      </div>
    </div>
  );
}

function SocialIcon({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon-btn group relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-600 backdrop-blur-sm hover:scale-110 hover:border-blue-400/50 hover:text-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:hover:text-blue-400"
      aria-label={label}
      title={label}
    >
      {icon}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-md bg-slate-800 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-slate-700">
        {label}
      </span>
    </a>
  );
}

function TerminalWindow({
  title,
  lines,
}: {
  title: string;
  lines: TerminalLine[];
}) {
  const isDark = useIsDarkTheme();
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [currentTypingLine, setCurrentTypingLine] =
    useState<TerminalLine | null>(null);
  const [currentTypingText, setCurrentTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);

  const promptColor = isDark ? "#34d399" : "#50a14f";
  const arrowColor = isDark ? "#475569" : "#9ca3af";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(media.matches);

    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    setDisplayedLines([]);
    setCurrentTypingLine(null);
    setCurrentTypingText("");
    setIsTyping(true);

    if (prefersReduced) {
      setDisplayedLines(lines.map((line) => ({ ...line })));
      setIsTyping(false);
      return;
    }

    let cancelled = false;

    const run = async () => {
      for (const line of lines) {
        if (cancelled) return;

        setCurrentTypingLine(line);
        setCurrentTypingText("");

        for (let j = 0; j <= line.text.length; j++) {
          if (cancelled) return;
          setCurrentTypingText(line.text.slice(0, j));
          await sleep(35);
        }

        if (cancelled) return;

        setDisplayedLines((prev) => [
          ...prev,
          { type: line.type, text: line.text },
        ]);
        setCurrentTypingLine(null);
        setCurrentTypingText("");
        await sleep(120);
      }

      if (!cancelled) {
        setIsTyping(false);
        setCurrentTypingLine(null);
        setCurrentTypingText("");
        await sleep(2500);
        if (!cancelled) setResetKey((k) => k + 1);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [resetKey, prefersReduced, lines]);

  return (
    <div
      className={`terminal-window overflow-hidden rounded-xl border border-white/10 ${
        isTyping ? "typing-active" : "typing-done"
      }`}
    >
      <div className="flex items-center gap-2 border-b border-black/5 bg-gradient-to-r from-[#e2e2e2] to-[#d4d4d4] px-4 py-3 text-slate-600 dark:border-white/5 dark:from-[#2d2d3a] dark:to-[#252532] dark:text-slate-400">
        <div className="flex gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: "#ff5f57" }}
          />
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: "#febc2e" }}
          />
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: "#28c840" }}
          />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            <Terminal size={12} />
            <Globe size={12} className="opacity-70" />
            ibrahim@{title}: ~
          </span>
        </div>
        <div className="w-14" />
      </div>

      <div
        className="terminal-body min-h-[340px] overflow-hidden bg-[#f8f8f2] p-5 font-mono text-sm leading-relaxed text-[#383a42] dark:bg-[#0d1117] dark:text-[#cbd5e1]"
        style={{ scrollbarWidth: "none" }}
      >
        {displayedLines.map((line, i) => (
          <div key={`${line.type}-${i}`} className="flex whitespace-pre">
            <span className="mr-2 shrink-0">
              {line.type === "cmd" ?
                <span style={{ color: promptColor }}>$</span>
              : <span style={{ color: arrowColor }}>&gt;</span>}
            </span>
            <span className="whitespace-pre">
              {line.type === "cmd" ?
                <span style={{ color: promptColor }}>{line.text}</span>
              : highlightSyntax(line.text, isDark)}
            </span>
          </div>
        ))}

        {currentTypingLine !== null && (
          <div className="flex whitespace-pre">
            <span className="mr-2 shrink-0" style={{ color: promptColor }}>
              {currentTypingLine.type === "cmd" ? "$" : ">"}
            </span>
            <span className="whitespace-pre">
              {currentTypingLine.type === "cmd" ?
                <span style={{ color: promptColor }}>{currentTypingText}</span>
              : highlightSyntax(currentTypingText, isDark)}
              <span
                className="ml-px inline-block w-[2px]"
                style={{
                  height: "1em",
                  verticalAlign: "text-bottom",
                  backgroundColor: promptColor,
                  animation: "blink 1s step-end infinite",
                }}
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function highlightSyntax(text: string, isDark: boolean): ReactNode {
  const outputColor = isDark ? "#cbd5e1" : "#383a42";
  const emojiColor = isDark ? "#f8fafc" : "#383a42";
  const stringColor = isDark ? "#fcd34d" : "#c18401";
  const keyColor = isDark ? "#93c5fd" : "#4078f2";
  const bracketColor = isDark ? "#c084fc" : "#a626a4";
  const punctuationColor = isDark ? "#cbd5e1" : "#6b7280";

  if (/[✅📍🚀]/.test(text) || /\p{Emoji_Presentation}/u.test(text)) {
    return <span style={{ color: emojiColor }}>{text}</span>;
  }

  const tokens: Array<{ text: string; color: string }> = [];
  let i = 0;

  while (i < text.length) {
    const ch = text[i];

    if (ch === " ") {
      let j = i;
      while (j < text.length && text[j] === " ") j++;
      tokens.push({ text: text.slice(i, j), color: outputColor });
      i = j;
      continue;
    }

    if ("{}[]".includes(ch)) {
      tokens.push({ text: ch, color: bracketColor });
      i++;
      continue;
    }

    if (ch === ",") {
      tokens.push({ text: ",", color: punctuationColor });
      i++;
      continue;
    }

    if (ch === ":") {
      tokens.push({ text: ":", color: punctuationColor });
      i++;
      continue;
    }

    if (ch === '"') {
      let j = i + 1;
      while (j < text.length) {
        if (text[j] === "\\") {
          j += 2;
          continue;
        }
        if (text[j] === '"') {
          j++;
          break;
        }
        j++;
      }

      const str = text.slice(i, j);
      let k = j;
      while (k < text.length && text[k] === " ") k++;
      const isKey = k < text.length && text[k] === ":";
      tokens.push({ text: str, color: isKey ? keyColor : stringColor });
      i = j;
      continue;
    }

    tokens.push({ text: ch, color: outputColor });
    i++;
  }

  if (tokens.length === 0) {
    return <span style={{ color: outputColor }}>{text}</span>;
  }

  return (
    <>
      {tokens.map((tok, idx) => (
        <span key={idx} style={{ color: tok.color }}>
          {tok.text}
        </span>
      ))}
    </>
  );
}
