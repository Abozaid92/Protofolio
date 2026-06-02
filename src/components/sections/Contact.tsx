"use client";

import { useState, useEffect, useActionState, startTransition } from "react";
import { FormState, sendContactMessage } from "@/app/lib/contact.action";
import { motion, AnimatePresence } from "framer-motion";
// npm install leaflet react-leaflet
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  User,
  Mail,
  FileText,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// تظبيط أيقونة Leaflet الافتراضية عشان متختفيش مع الـ Webpack في Next.js
const customIcon =
  typeof window !== "undefined" ?
    L.icon({
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    })
  : undefined;

interface ContactProps {
  dict: {
    lang: "ar" | "en";
    title: string;
    subtitle: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    placeholderName: string;
    placeholderEmail: string;
    placeholderSubject: string;
    placeholderMessage: string;
    submit: string;
    sending: string;
    successHeader: string;
    mapPopup: string;
  };
}

export function Contact({ dict }: ContactProps) {
  const isAr = dict.lang === "ar";
  const [mounted, setMounted] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // حماية من الـ SSR: الخريطة مش هتعمل رندر إلا على المتصفح
  useEffect(() => {
    setMounted(true);
  }, []);

  // إدارة حالة الفورم عبر الـ useActionState المدعوم في React 19 / Next.js 15
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    sendContactMessage,
    null,
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };

  // مسارات الخرائط الذكية (تتغير حسب لغة الموقع والـ Dark Mode تلقائياً)
  const lightMap =
    "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png";
  const darkMap =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  return (
    <section
      className="relative w-full py-20 px-4 max-w-7xl mx-auto overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Glow Effects للمود المظلم تعطى طابع فخم */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none hidden dark:block" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none hidden dark:block" />

      {/* الهيدر */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-neutral-900 to-neutral-600 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent"
        >
          {dict.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto"
        >
          {dict.subtitle}
        </motion.p>
      </div>

      {/* الجريد المقسم 50/50 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch min-h-[550px]">
        {/* النصف الأيسر: الخريطة التفاعلية الفخمة */}
        <div className="w-full h-full min-h-[350px] lg:min-h-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/80 dark:border-neutral-800/50 relative bg-neutral-100 dark:bg-neutral-900">
          {
            mounted ?
              <div className="w-full h-full relative z-10 isolation-auto">
                <MapContainer
                  center={[30.995626, 31.012434]}
                  zoom={14}
                  scrollWheelZoom={false}
                  className="w-full h-full"
                  style={{ height: "100%", width: "100%" }}
                >
                  {/* سورس خريطة لايت */}
                  <TileLayer url={lightMap} className="block dark:hidden" />
                  {/* سورس خريطة دارك أسطوري */}
                  <TileLayer url={darkMap} className="hidden dark:block" />

                  {customIcon && (
                    <Marker position={[30.995626, 31.012434]} icon={customIcon}>
                      <Popup>
                        <div className="p-1 font-sans text-xs font-semibold text-neutral-800">
                          {dict.mapPopup}
                        </div>
                      </Popup>
                    </Marker>
                  )}
                </MapContainer>
                {/* تأثير النبض الاحترافي فوق الخريطة كـ Overlay بصري */}
                <div className="absolute top-4 right-4 z-[1000] bg-white/80 dark:bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-mono font-medium text-neutral-600 dark:text-neutral-300 pointer-events-none border border-neutral-200/50 dark:border-neutral-700/30">
                  LOC: 30.9956° N, 31.0124° E
                </div>
              </div>
              // الهيكل المؤقت لحين التحميل (Skeleton)
            : <div className="w-full h-full flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
              </div>

          }
        </div>

        {/* النصف الأيمن: الفورم الحرايق والمبهر */}
        <motion.div
          initial={{ opacity: 0, x: isAr ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-10 rounded-3xl bg-white/60 dark:bg-neutral-900/40 backdrop-blur-xl border border-neutral-200/80 dark:border-neutral-800/50 shadow-2xl flex flex-col justify-between"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* فخ الـ Honeypot للبوتات */}
            <input
              type="text"
              name="website_hp"
              tabIndex={-1}
              className="hidden"
              autoComplete="off"
            />

            {/* حقل الاسم */}
            <div className="relative">
              <div
                className={`absolute ${isAr ? "right-4" : "left-4"} top-4 text-neutral-400 transition-colors duration-300 ${(focusedField === "name" || formValues.name) && "text-emerald-500"}`}
              >
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="name"
                required
                disabled={isPending}
                value={formValues.name}
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.target.value })
                }
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                className={`w-full py-3.5 ${isAr ? "pr-12 pl-4" : "pl-12 pr-4"} bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none transition-all duration-300 text-neutral-900 dark:text-white font-medium focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/5 placeholder-transparent peer`}
                placeholder={dict.placeholderName}
              />
              <label
                className={`absolute ${isAr ? "right-12" : "left-12"} top-3.5 text-neutral-400 pointer-events-none transition-all duration-300 origin-top-left text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white dark:peer-focus:bg-neutral-950 px-1.5 peer-focus:text-emerald-500 ${formValues.name && "-top-2.5 text-xs bg-white dark:bg-neutral-950 text-emerald-500"}`}
              >
                {dict.name}
              </label>
              {state?.errors?.name && (
                <p
                  role="alert"
                  className="text-xs text-red-500 mt-1.5 px-1 flex items-center gap-1 animate-fade-in"
                >
                  <AlertCircle className="w-3 h-3" /> {state.errors.name[0]}
                </p>
              )}
            </div>

            {/* حقل الإيميل */}
            <div className="relative">
              <div
                className={`absolute ${isAr ? "right-4" : "left-4"} top-4 text-neutral-400 transition-colors duration-300 ${(focusedField === "email" || formValues.email) && "text-emerald-500"}`}
              >
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="email"
                required
                disabled={isPending}
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.target.value })
                }
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className={`w-full py-3.5 ${isAr ? "pr-12 pl-4" : "pl-12 pr-4"} bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none transition-all duration-300 text-neutral-900 dark:text-white font-medium focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/5 placeholder-transparent peer`}
                placeholder={dict.placeholderEmail}
              />
              <label
                className={`absolute ${isAr ? "right-12" : "left-12"} top-3.5 text-neutral-400 pointer-events-none transition-all duration-300 origin-top-left text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white dark:peer-focus:bg-neutral-950 px-1.5 peer-focus:text-emerald-500 ${formValues.email && "-top-2.5 text-xs bg-white dark:bg-neutral-950 text-emerald-500"}`}
              >
                {dict.email}
              </label>
              {state?.errors?.email && (
                <p
                  role="alert"
                  className="text-xs text-red-500 mt-1.5 px-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" /> {state.errors.email[0]}
                </p>
              )}
            </div>

            {/* حقل الموضوع */}
            <div className="relative">
              <div
                className={`absolute ${isAr ? "right-4" : "left-4"} top-4 text-neutral-400 transition-colors duration-300 ${(focusedField === "subject" || formValues.subject) && "text-emerald-500"}`}
              >
                <FileText className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="subject"
                required
                disabled={isPending}
                value={formValues.subject}
                onChange={(e) =>
                  setFormValues({ ...formValues, subject: e.target.value })
                }
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
                className={`w-full py-3.5 ${isAr ? "pr-12 pl-4" : "pl-12 pr-4"} bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none transition-all duration-300 text-neutral-900 dark:text-white font-medium focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/5 placeholder-transparent peer`}
                placeholder={dict.placeholderSubject}
              />
              <label
                className={`absolute ${isAr ? "right-12" : "left-12"} top-3.5 text-neutral-400 pointer-events-none transition-all duration-300 origin-top-left text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white dark:peer-focus:bg-neutral-950 px-1.5 peer-focus:text-emerald-500 ${formValues.subject && "-top-2.5 text-xs bg-white dark:bg-neutral-950 text-emerald-500"}`}
              >
                {dict.subject}
              </label>
              {state?.errors?.subject && (
                <p
                  role="alert"
                  className="text-xs text-red-500 mt-1.5 px-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" /> {state.errors.subject[0]}
                </p>
              )}
            </div>

            {/* حقل الرسالة */}
            <div className="relative">
              <div
                className={`absolute ${isAr ? "right-4" : "left-4"} top-4 text-neutral-400 transition-colors duration-300 ${(focusedField === "message" || formValues.message) && "text-emerald-500"}`}
              >
                <MessageSquare className="w-5 h-5" />
              </div>
              <textarea
                name="message"
                required
                rows={4}
                disabled={isPending}
                value={formValues.message}
                onChange={(e) =>
                  setFormValues({ ...formValues, message: e.target.value })
                }
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className={`w-full py-3.5 ${isAr ? "pr-12 pl-4" : "pl-12 pr-4"} bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl outline-none transition-all duration-300 text-neutral-900 dark:text-white font-medium focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:focus:ring-emerald-500/5 placeholder-transparent resize-none peer`}
                placeholder={dict.placeholderMessage}
              />
              <label
                className={`absolute ${isAr ? "right-12" : "left-12"} top-3.5 text-neutral-400 pointer-events-none transition-all duration-300 origin-top-left text-base peer-focus:-top-2.5 peer-focus:text-xs peer-focus:bg-white dark:peer-focus:bg-neutral-950 px-1.5 peer-focus:text-emerald-500 ${formValues.message && "-top-2.5 text-xs bg-white dark:bg-neutral-950 text-emerald-500"}`}
              >
                {dict.message}
              </label>
              {state?.errors?.message && (
                <p
                  role="alert"
                  className="text-xs text-red-500 mt-1.5 px-1 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" /> {state.errors.message[0]}
                </p>
              )}
            </div>

            {/* زر الإرسال مع الترانزيشن والميكرو-أنيميشن */}
            <motion.button
              type="submit"
              disabled={isPending}
              whileHover={{
                scale: isPending ? 1 : 1.02,
                y: isPending ? 0 : -2,
              }}
              whileTap={{ scale: isPending ? 1 : 0.98 }}
              className="w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 hover:shadow-xl hover:shadow-emerald-500/20 dark:hover:shadow-emerald-900/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ?
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{dict.sending}</span>
                </>
              : <>
                  <Send className={`w-5 h-5 ${isAr ? "rotate-180" : ""}`} />
                  <span>{dict.submit}</span>
                </>
              }
            </motion.button>
          </form>

          {/* البانرات الخاصة بالنجاح أو الفشل الكلي بحركات ناعمة جداً */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              {state && state.success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  role="alert"
                  className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-emerald-800 dark:text-emerald-400 text-sm">
                      {dict.successHeader}
                    </h4>
                    <p className="text-xs text-emerald-600 dark:text-emerald-500/90 mt-0.5">
                      {state.message}
                    </p>
                  </div>
                </motion.div>
              )}

              {state && !state.success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  role="alert"
                  className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-red-800 dark:text-red-400 text-sm">
                      Error
                    </h4>
                    <p className="text-xs text-red-600 dark:text-red-500/90 mt-0.5">
                      {state.message}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
