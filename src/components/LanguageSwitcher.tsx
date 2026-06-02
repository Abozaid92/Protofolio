"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex gap-2 glass-effect rounded-full p-1">
      {(["ar", "en"] as const).map((locale) => (
        <motion.button
          key={locale}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => switchLocale(locale)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
            currentLocale === locale ?
              "bg-light-accent dark:bg-dark-accent text-primary"
            : " bg-light-accent dark:bg-dark-accent text-secondary"
          }`}
        >
          {locale.toUpperCase()}
        </motion.button>
      ))}
    </div>
  );
}
