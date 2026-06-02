import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ibrahim Abouzaid - Full-Stack Developer",
  description:
    "Full-stack Developer focused on building scalable web applications using Next.js, React, and PostgreSQL",
  keywords: [
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Web Development",
  ],
  authors: [{ name: "Ibrahim Mahmoud El Sayed Abouzeid" }],
  creator: "Ibrahim Mahmoud El Sayed Abouzeid",
  openGraph: {
    type: "website",
    locale: "ar_EG",
    alternateLocale: "en_US",
    url: "https://ibrahim-portfolio.com",
    title: "Ibrahim Mahmoud - Full-Stack Developer",
    description:
      "Full-stack Developer focused on building scalable web applications",
    siteName: "Ibrahim Portfolio",
  },
  twitter: {
    title: "Ibrahim Mahmoud - Full-Stack Developer",
    description:
      "Full-stack Developer focused on building scalable web applications",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
