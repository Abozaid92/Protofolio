"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight, Download } from "lucide-react";

interface AboutProps {
  dict: any;
}

export default function About({ dict }: AboutProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.13 } },
  };

  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: "easeOut" as const },
    },
  };

  const imageVariant = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" as const, delay: 0.2 },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden py-24 md:py-32 bg-[#f8fafc] dark:bg-[#070711]"
    >
      {/* ── Background glows ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -left-28 -top-20 h-[400px] w-[400px] rounded-full bg-[#3b82f6]/10 blur-3xl dark:bg-[#3b82f6]/15" />
        <div className="absolute -right-28 top-32 h-[440px] w-[440px] rounded-full bg-[#7c3aed]/10 blur-3xl dark:bg-[#7c3aed]/15" />
        <div className="absolute bottom-[-140px] left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-black/5 blur-3xl dark:bg-white/[0.03]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.06),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.06),transparent_40%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(124,58,237,0.08),transparent_40%)]" />
      </div>

      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col gap-16 lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14"
        >
          {/* ── Left: text ── */}
          <motion.div variants={item} className="w-full">
            {/* Eyebrow */}
            <div className="mb-7 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#3b82f6] dark:text-[#60a5fa]">
                01
              </span>
              <span className="h-px w-14 bg-gradient-to-r from-[#3b82f6] to-[#7c3aed]" />
              <span className="text-xs font-medium uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">
                {dict?.about?.eyebrow ?? "About Me"}
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-black leading-[0.92] tracking-tight text-slate-900 dark:text-white md:text-5xl xl:text-6xl">
              {dict?.about?.title ?? "About Me"}
            </h2>

            {/* Accent bar */}
            <div className="mt-5 h-[3px] w-24 rounded-full bg-gradient-to-r from-[#3b82f6] via-[#7c3aed] to-transparent" />

            {/* Bio */}
            <p className="mt-8 text-base leading-8 text-slate-600 dark:text-slate-400 md:text-lg">
              {dict?.about?.bio}
            </p>

            {/* Quote */}
            <p className="mt-6 border-l-2 border-[#3b82f6]/40 pl-4 text-sm leading-7 text-slate-500 dark:text-slate-300">
              {dict?.about?.quote}
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3b82f6] dark:bg-white dark:text-slate-900 dark:hover:bg-[#93c5fd]"
              >
                {dict?.about?.cta_contact ?? "Contact Me"}
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href="/cv.pdf"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3b82f6] hover:bg-[#eff6ff] hover:text-[#2563eb] dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-[#60a5fa] dark:hover:bg-[#3b82f6]/10 dark:hover:text-[#93c5fd]"
              >
                {dict?.about?.cta_cv ?? "Download CV"}
                <Download className="h-4 w-4" />
              </a>
            </div>

            {/* Availability badge */}
            <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#34d399]" />
              {dict?.about?.availability ??
                "Available for selected freelance work"}
            </div>
          </motion.div>

          {/* ── Right: image ── */}
          <motion.div variants={imageVariant} className="relative w-full">
            {/* Decorative dots — desktop only */}
            <div className="absolute -right-3 -top-3 hidden h-20 w-20 rounded-full border border-slate-300/60 dark:border-white/10 lg:block" />
            <div className="absolute -bottom-4 -left-4 hidden h-12 w-12 rounded-full bg-[#3b82f6]/10 blur-xl lg:block" />

            {/* Rotated ghost card behind */}
            <div className="absolute inset-6 rotate-[-3deg] rounded-[2rem] border border-slate-200 bg-white/40 shadow-[0_18px_80px_rgba(0,0,0,0.07)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]" />

            {/* Color halo */}
            <div className="absolute inset-0 rotate-[1.5deg] rounded-[2.5rem] bg-gradient-to-br from-[#3b82f6]/12 via-transparent to-[#7c3aed]/12 blur-2xl" />

            {/* Glass card */}
            <motion.div
              whileHover={{ scale: 1.012, transition: { duration: 0.4 } }}
              className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white/80 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.13)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_30px_100px_rgba(0,0,0,0.3)]"
            >
              {/* Image — taller on mobile, wide on desktop */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-[#e2e2e2] dark:bg-[#252532] sm:aspect-[16/10]">
                <Image
                  src="https://bwmvrztnbjayktocsdvc.supabase.co/storage/v1/object/public/Protofolio/about%20section.png"
                  alt="My workspace"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 600px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                />
                {/* Subtle bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Bottom floating tag */}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
