"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

interface FooterProps {
  dict: any;
}

export function Footer({ dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-light-border dark:border-dark-border">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-light-accent to-purple-600 dark:from-dark-accent dark:to-blue-400 bg-clip-text text-transparent inline-block mb-2"
            >
              IB
            </motion.div>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              © {currentYear} {dict.footer.rights}
            </p>
          </div>

          {/* Built With */}
          <div className="flex items-center gap-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            <span>{dict.footer.builtWith}</span>
            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
            <span>Next.js & TypeScript</span>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {[
              {
                icon: Github,
                href: "https://github.com/Abozaid92",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/ibrahim-abuzaid-9750b5404/",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:ibrahim@example.com",
                label: "Email",
              },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 glass-effect rounded-full hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
