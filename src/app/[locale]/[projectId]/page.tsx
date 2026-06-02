import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";

import {
  getAllProjectIds,
  getProjectById,
  SUPPORTED_LOCALES,
} from "../../lib/data";
import ProjectDetailsClient from "./ProjectDetailsClient";
import type { SupportedLocale } from "../../lib/data";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ locale: string; projectId: string }>;
}

// ---------------------------------------------------------------------------
// Static Generation — pre-render ALL projects × ALL locales
// ---------------------------------------------------------------------------

export async function generateStaticParams(): Promise<
  { locale: string; projectId: string }[]
> {
  const ids = getAllProjectIds();
  return SUPPORTED_LOCALES.flatMap((locale) =>
    ids.map((projectId) => ({ locale, projectId })),
  );
}

// ---------------------------------------------------------------------------
// Metadata — SEO critical
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, projectId } = await params;
  const project = getProjectById(projectId);

  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    };
  }

  const heroSrc = project.heroImage?.src ?? project.images[0]?.src ?? "";
  const canonicalPath = `/${locale}/${project.id}`;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  return {
    title: {
      absolute: `${project.title} — ${project.subtitle}`,
    },
    description: project.description,
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((l) => [l, `${siteUrl}/${l}/${project.id}`]),
      ),
    },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.description,
      url: canonicalUrl,
      siteName: "Portfolio",
      images:
        heroSrc ?
          [
            {
              url: heroSrc,
              width: 1600,
              height: 900,
              alt: project.heroImage?.alt ?? project.title,
            },
          ]
        : [],
      locale: locale === "ar" ? "ar_SA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${project.subtitle}`,
      description: project.description,
      images: heroSrc ? [heroSrc] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

// ---------------------------------------------------------------------------
// JSON-LD Structured Data helper
// ---------------------------------------------------------------------------

function buildJsonLd(
  project: NonNullable<ReturnType<typeof getProjectById>>,
  locale: string,
) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.heroImage?.src ?? project.images[0]?.src ?? undefined,
    author: {
      "@type": "Person",
      name: "Portfolio Author",
      url: siteUrl,
    },
    url: `${siteUrl}/${locale}/${project.id}`,
    keywords: project.techStack.join(", "),
    genre: project.category,
    abstract: project.overview,
  };
}

// ---------------------------------------------------------------------------
// Loading skeleton — minimal, no layout shift
// ---------------------------------------------------------------------------

function ProjectSkeleton() {
  return (
    <div
      className="project-skeleton"
      aria-hidden="true"
      aria-label="Loading project details"
    >
      <div className="skeleton-hero" />
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-line--wide" />
        <div className="skeleton-line skeleton-line--medium" />
        <div className="skeleton-line skeleton-line--narrow" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page — Server Component
// ---------------------------------------------------------------------------

export default async function ProjectPage({ params }: PageProps) {
  const { locale, projectId } = await params;
  const project = getProjectById(projectId);

  if (!project) notFound();

  const dir = locale === "ar" ? "rtl" : "ltr";
  const jsonLd = buildJsonLd(project, locale);
  const typedLocale = (
    SUPPORTED_LOCALES.includes(locale as SupportedLocale) ? locale : (
      "en"
    )) as SupportedLocale;

  return (
    <>
      {/* JSON-LD — injected in <head> equivalent via script tag */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" dir={dir} lang={locale} className="project-main">
        {/* Skip-to-content link for keyboard / AT users */}
        <a href="#project-content" className="skip-link">
          Skip to content
        </a>

        <Suspense fallback={<ProjectSkeleton />}>
          <ProjectDetailsClient project={project} locale={typedLocale} />
        </Suspense>
      </main>
    </>
  );
}
