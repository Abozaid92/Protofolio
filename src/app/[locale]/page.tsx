import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ProjectsSection from "@/components/sections/ProjectsEnhanced";
import { getDictionary } from "@/i18n/get-dictionary";
import type { Locale } from "@/i18n/config";
import { SkillsSphere } from "@/components/sections/skills";
import WhatsAppBtn from "@/components/WhatsAppBtn";

import { ChatBot, Contact } from "@/components/ClientComponents";

// Static fallback data - used when database is empty

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const param = await params;
  const lang = param.locale;
  const dict = getDictionary(param.locale);

  return (
    <>
      <Hero dict={dict} />
      <hr className="border-t border-neutral-200 dark:border-neutral-600 max-w-5xl mx-auto" />
      <About dict={dict} />
      <hr className="border-t border-neutral-200 dark:border-neutral-600 max-w-5xl mx-auto" />

      <h2 className="text-center text-3xl font-bold tracking-tight mt-16 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent dark:from-white dark:via-neutral-350 dark:to-neutral-400">
        Technologies & Skills
      </h2>
      <SkillsSphere />

      <hr className="border-t border-neutral-200 dark:border-neutral-600 max-w-5xl mx-auto" />
      <ProjectsSection />

      {/* {testimonials.length > 0 && (
        <Testimonials dict={dict} testimonials={testimonials} />
      )} */}

      <hr className="border-t border-neutral-200 dark:border-neutral-600 max-w-5xl mx-auto" />
      <h2 className="text-center text-3xl font-bold tracking-tight mt-16 mb-16 bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent dark:from-white dark:via-neutral-350 dark:to-neutral-400">
        Contact
      </h2>

      {/* الـ Components دي دلوقتي هتشتغل أوتوماتيك أول ما العميل يفتح من المتصفح بدون كسر البيلد */}
      <Contact dict={dict} />
      <ChatBot dict={dict} />

      {/* =========================================================
          FLOATING WHATSAPP BUTTON
      ========================================================= */}
      <WhatsAppBtn lang={lang} />
    </>
  );
}

export async function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}
