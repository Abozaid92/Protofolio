"use client";

import { FaWhatsapp } from "react-icons/fa";

const WhatsAppBtn = ({ lang }: { lang: string }) => {
  const openWhatsApp = () => {
    const msg =
      lang === "ar" ?
        "مرحبا، أريد إنشاء لاندينج بيدج بنفس جودة وتصميم هذا الموقع."
      : "Hello, I want to create a landing page with the same quality and design as this website.";
    window.open(
      `https://wa.me/201080761700?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };
  return (
    <button
      onClick={openWhatsApp}
      className="fixed bottom-6 z-[90]  mx-6 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
      style={{
        background: "#25D366",
        // right: lang === "ar" ? "24px" : "auto",
        left: lang === "en" ? "auto" : "24px",
      }}
      title="WhatsApp"
    >
      <FaWhatsapp size={24} color="white" fill="white" />
    </button>
  );
};

export default WhatsAppBtn;
