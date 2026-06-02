"use client";

import { useEffect, useState, useActionState, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { sendContactMessage } from "@/app/lib/contact.action";
import { Loader2, Send, AlertCircle, CheckCircle2 } from "lucide-react";

// نقل البيانات الثابتة خارج المكون لمنع إعادة إنشائها مع كل Render
const POSITION: [number, number] = [30.995626, 31.012434];

export function Contact({ dict }: any) {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const [state, formAction, isPending] = useActionState(
    sendContactMessage,
    null,
  );

  useEffect(() => {
    setMounted(true);

    // دالة لفحص الثيم الحالي
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    // الفحص المبدئي
    checkTheme();

    // مراقبة تغيير الثيم في الوقت الفعلي (Real-time)
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // إعادة تعيين الفورم عند النجاح
  useEffect(() => {
    if (state?.success) {
      setFormKey((k) => k + 1);
    }
  }, [state?.success]);

  // إنشاء الـ Icon داخل useMemo لضمان عدم تشغيله على السيرفر ولتحسين الأداء
  const markerIcon = useMemo(() => {
    if (!mounted) return null;
    return new L.DivIcon({
      className: "custom-marker",
      html: `<div class="marker-inner"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  }, [mounted]);

  const fields = useMemo(
    () => [
      { name: "name", type: "text", label: dict.form.fields.name.placeholder },
      {
        name: "email",
        type: "email",
        label: dict.form.fields.email.placeholder,
      },
      {
        name: "subject",
        type: "text",
        label: dict.form.fields.subject.placeholder,
      },
    ],
    [dict],
  );

  return (
    <section className="bg-white dark:bg-[#0a0a0a] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Map */}
          <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
            <div className="h-[480px] w-full">
              {mounted && (
                <MapContainer
                  center={POSITION}
                  zoom={10}
                  scrollWheelZoom="center"
                  zoomControl={false}
                  className="h-full w-full z-0"
                >
                  <ZoomControl position="bottomright" />

                  {/* روابط خرائط CartoDB المستقرة والمجانية تماماً */}
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url={
                      isDark ?
                        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" // ثيم داكن مريح للعين
                      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // ثيم فاتح نقي ومودرن
                    }
                  />

                  {/* دائرة النطاق الجغرافي - تم استبدال الأخضر بلون بنفسجي/أزرق تقني (Indigo) */}
                  <Circle
                    center={POSITION}
                    radius={500}
                    pathOptions={{
                      color: isDark ? "#6366f1" : "#4f46e5",
                      fillColor: isDark ? "#6366f1" : "#4f46e5",
                      fillOpacity: 0.07,
                      weight: 1.5,
                    }}
                  />

                  {markerIcon && (
                    <Marker position={POSITION} icon={markerIcon}>
                      <Popup className="custom-popup">
                        <div className="text-sm font-medium text-neutral-900 dark:text-white">
                          {dict.map?.locationLabel}
                        </div>
                      </Popup>

                      {/* التلميح (Tooltip) أصبح يتغير لونه تلقائياً حسب الثيم */}
                      <Tooltip
                        direction="top"
                        offset={[0, -8]}
                        className="bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs px-2.5 py-1 rounded-md font-medium border border-neutral-200 dark:border-neutral-800 shadow-md"
                      >
                        {dict.map?.locationLabel}
                      </Tooltip>
                    </Marker>
                  )}
                </MapContainer>
              )}
            </div>

            {/* بطاقة الموقع الطافية (Overlay) - تم دعمها بتأثير الـ Ping النبضي الحي */}
            <div className="absolute bottom-4 left-4 z-[400]">
              <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-700 dark:text-neutral-200 border border-neutral-200/60 dark:border-neutral-800/80 shadow-sm flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                {dict.map?.locationLabel}
              </div>
            </div>
          </div>
          {/* Form */}
          <div className="max-w-md">
            <h2 className="text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight mb-2">
              {dict.form?.title || "Contact"}
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 mb-8 text-sm leading-relaxed">
              {dict.form?.subtitle ||
                "Send us a message and we'll get back to you shortly."}
            </p>

            <form key={formKey} action={formAction} className="space-y-5">
              {/* Honeypot field for spam protection */}
              <input
                type="text"
                name="website_hp"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {fields.map((field) => (
                <div key={field.name} className="space-y-1.5">
                  <label
                    htmlFor={field.name}
                    className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider ml-1"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.label}
                    disabled={isPending}
                    className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 text-sm transition-all duration-200 outline-none
                      ${
                        (
                          state?.errors?.[
                            field.name as keyof typeof state.errors
                          ]
                        ) ?
                          "border-red-400 dark:border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                        : "border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-2 focus:ring-neutral-200/50 dark:focus:ring-neutral-700/50 hover:border-neutral-300 dark:hover:border-neutral-700"
                      }
                      ${isPending ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  />
                  {state?.errors?.[field.name as keyof typeof state.errors] && (
                    <p className="text-red-500 dark:text-red-400 text-xs ml-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {
                        (
                          state.errors[
                            field.name as keyof typeof state.errors
                          ] as string[] | undefined
                        )?.[0]
                      }
                    </p>
                  )}
                </div>
              ))}

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider ml-1"
                >
                  {dict.form.fields.message.placeholder}
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder={dict.form.fields.message.placeholder}
                  disabled={isPending}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 text-sm transition-all duration-200 outline-none resize-none
                    ${
                      state?.errors?.message ?
                        "border-red-400 dark:border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                      : "border-neutral-200 dark:border-neutral-800 focus:border-neutral-400 dark:focus:border-neutral-600 focus:ring-2 focus:ring-neutral-200/50 dark:focus:ring-neutral-700/50 hover:border-neutral-300 dark:hover:border-neutral-700"
                    }
                    ${isPending ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                />
                {state?.errors?.message && (
                  <p className="text-red-500 dark:text-red-400 text-xs ml-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {state.errors.message[0]}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 px-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
              >
                {isPending ?
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {dict.form?.submitting || "Sending..."}
                  </>
                : <>
                    {dict.form?.submit || "Send Message"}
                    <Send className="w-4 h-4" />
                  </>
                }
              </button>

              {state?.message && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                    state.success ?
                      "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20"
                    : "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20"
                  }`}
                >
                  {state.success ?
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{state.message}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-marker {
          background: transparent;
          border: none;
        }
        .marker-inner {
          width: 12px;
          height: 12px;
          background: ${isDark ? "#22c55e" : "#16a34a"};
          border-radius: 50%;
          border: 2px solid ${isDark ? "#0a0a0a" : "#ffffff"};
          box-shadow: 0 0 0 4px
            ${isDark ? "rgba(34,197,94,0.25)" : "rgba(22,163,74,0.25)"};
          position: relative;
        }
        .marker-inner::after {
          content: "";
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px solid
            ${isDark ? "rgba(34,197,94,0.3)" : "rgba(22,163,74,0.3)"};
          animation: markerPulse 2s ease-out infinite;
        }
        @keyframes markerPulse {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .leaflet-popup-content-wrapper {
          border-radius: 10px;
          padding: 8px 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .dark .leaflet-popup-content-wrapper,
        .dark .leaflet-popup-tip {
          background: #171717;
          color: white;
          border: 1px solid #262626;
        }
      `}</style>
    </section>
  );
}
