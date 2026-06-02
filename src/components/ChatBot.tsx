"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import {
  Bot,
  MessageCircleMore,
  PhoneCall,
  SendHorizontal,
  X,
  Sparkles,
  Clock3,
} from "lucide-react";

type Lang = "ar" | "en";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  streaming?: boolean;
}

type Dict = {
  chatbot?: Record<string, any>;
  chatBot?: Record<string, any>;
  contact?: Record<string, any>;
  form?: Record<string, any>;
  [key: string]: any;
};

const BACKEND = "https://protofolio-chat-bot-69fl.vercel.app/api/chat";

const COLOR_CATALOG = {
  light: {
    rootBg: "#f8f8f2",
    panelBg: "#ffffff",
    cardBg: "rgba(255, 255, 255, 0.70)",
    border: "#d4d4d4",
    borderSoft: "rgba(255, 255, 255, 0.28)",
    borderAccent: "rgba(80, 161, 79, 0.16)",
    text: "#0f172a",
    textSoft: "#334155",
    textMuted: "#6b7280",
    brand: "#3b82f6",
    brandAlt: "#7c3aed",
    brandSoft: "#60a5fa",
    brandSecondary: "#50a14f",
    inverseText: "#ffffff",
    accent: "#10b981",
    danger: "#ff5f57",
    warning: "#febc2e",
    shadow: "rgba(0, 0, 0, 0.18)",
    subtleShadow: "rgba(0, 0, 0, 0.025)",
    hoverBg: "#eff6ff",
    hoverText: "#2563eb",
    hoverBorder: "#60a5fa",
    chipBg: "#ffffff",
    chipBorder: "#d4d4d4",
    chipText: "#475569",
    tagBg: "#f8f8f2",
    gradientFrom: "#3b82f6",
    gradientTo: "#7c3aed",
  },
  dark: {
    rootBg: "#070711",
    panelBg: "#0d1117",
    cardBg: "rgba(255, 255, 255, 0.03)",
    border: "#252532",
    borderSoft: "#2d2d3a",
    borderAccent: "rgba(52, 211, 153, 0.15)",
    text: "#f8fafc",
    textSoft: "#cbd5e1",
    textMuted: "#94a3b8",
    brand: "#60a5fa",
    brandAlt: "#c084fc",
    brandSoft: "#93c5fd",
    brandSecondary: "#34d399",
    inverseText: "#0f172a",
    accent: "#34d399",
    danger: "#ff5f57",
    warning: "#fcd34d",
    shadow: "rgba(0, 0, 0, 0.45)",
    subtleShadow: "rgba(255, 255, 255, 0.03)",
    hoverBg: "rgba(59, 130, 246, 0.10)",
    hoverText: "#60a5fa",
    hoverBorder: "rgba(96, 165, 250, 0.50)",
    chipBg: "rgba(255, 255, 255, 0.03)",
    chipBorder: "#475569",
    chipText: "#cbd5e1",
    tagBg: "#0d1117",
    gradientFrom: "#60a5fa",
    gradientTo: "#c084fc",
  },
} as const;

function detectLang(text: string): Lang {
  return /[\u0600-\u06FF]/.test(text) ? "ar" : "en";
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function useThemeMode() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;

    const sync = () => {
      const isDark =
        root.classList.contains("dark") ||
        window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;

      setTheme(isDark ? "dark" : "light");
    };

    sync();

    const observer = new MutationObserver(sync);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

function normalizeDigits(value: string) {
  return value.replace(/[^\d]/g, "");
}

function extractWhatsAppNumber(contact: Record<string, any>) {
  const raw = String(
    contact?.whatsappNumber ??
      contact?.whatsapp ??
      contact?.whatsappUrl ??
      contact?.whatsappLink ??
      contact?.phone ??
      contact?.phoneNumber ??
      "",
  ).trim();

  if (!raw) return "";

  const waMatch = raw.match(/wa\.me\/(\d+)/i);
  if (waMatch?.[1]) return waMatch[1];

  const digits = normalizeDigits(raw);
  if (digits.startsWith("00")) return digits.slice(2);
  return digits;
}

function buildWhatsAppUrl(contact: Record<string, any>, lang: Lang) {
  const number = "+201080761700"; // extractWhatsAppNumber(contact);
  // if (!number) return "";

  const customAr =
    contact?.whatsappMessageAr ?? "مرحبا، جئت من موقع البورتفوليو.";
  const customEn =
    contact?.whatsappMessageEn ?? "Hello, I came from the portfolio website.";

  const message = lang === "ar" ? customAr : customEn;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function ParsedMessage({
  content,
  lang,
  onSendText,
  onOpenWhatsApp,
  onCall,
  chat,
  palette,
}: {
  content: string;
  lang: Lang;
  onSendText: (text: string) => void;
  onOpenWhatsApp: () => void;
  onCall: () => void;
  chat: Record<string, any>;
  palette: (typeof COLOR_CATALOG)["light"];
}) {
  const hasContactPrompt = content.includes("<contact-prompt/>");
  const hasWa = content.includes("<wa/>");
  const hasPhone = content.includes("<phone/>");

  const clean = content
    .replace(/<contact-prompt\/>/g, "")
    .replace(/<wa\/>/g, "")
    .replace(/<phone\/>/g, "")
    .trim();

  const whatsappText =
    chat?.whatsappBtn ?? (lang === "ar" ? "واتساب" : "WhatsApp");
  const callText = chat?.callBtn ?? (lang === "ar" ? "اتصال" : "Call Now");

  return (
    <span className="block whitespace-pre-wrap leading-relaxed">
      {clean}

      {(hasContactPrompt || hasWa || hasPhone) && (
        <span className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-current/10">
          {(hasContactPrompt || hasWa) && (
            <button
              onClick={onOpenWhatsApp}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${palette.gradientFrom}, ${palette.gradientTo})`,
                color: "#ffffff",
              }}
            >
              <MessageCircleMore className="w-3.5 h-3.5" />
              {whatsappText}
            </button>
          )}

          {(hasContactPrompt || hasPhone) && (
            <button
              onClick={onCall}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm hover:scale-[1.02]"
              style={{
                backgroundColor: palette.brandSecondary,
                color: "#ffffff",
              }}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              {callText}
            </button>
          )}
        </span>
      )}
    </span>
  );
}

function TypingDots({ palette }: { palette: (typeof COLOR_CATALOG)["light"] }) {
  return (
    <span className="inline-flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full animate-bounce"
          style={{
            backgroundColor: palette.brand,
            opacity: 0.7,
            animationDelay: `${i * 0.15}s`,
            animationDuration: "0.9s",
          }}
        />
      ))}
    </span>
  );
}

export default function ChatBot({ dict }: { dict: Dict }) {
  const chat = dict?.chatbot ?? dict?.chatBot ?? {};
  const contact = dict?.contact ?? {};
  const form = dict?.form ?? {};

  const theme = useThemeMode();
  const palette = COLOR_CATALOG[theme];

  const initialWelcome = chat.welcomeMessage ?? chat.placeholder ?? "";
  const initialLang: Lang = detectLang(initialWelcome || "en");

  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>(initialLang);
  const [langLocked, setLangLocked] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: uid(),
      role: "assistant",
      content: initialWelcome,
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const whatsappUrl = useMemo(
    () => buildWhatsAppUrl(contact, lang),
    [contact, lang],
  );
  const phoneNumber = useMemo(() => "+201080761700", []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  const openWhatsApp = useCallback(() => {
    if (!whatsappUrl) return;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }, [whatsappUrl]);

  const callPhone = useCallback(() => {
    if (!phoneNumber) return;
    window.location.href = `tel:${phoneNumber}`;
  }, [phoneNumber]);

  const sendMessage = useCallback(
    async (text?: string) => {
      const content = (text ?? input).trim();
      if (!content || loading) return;

      if (!langLocked) {
        const detected = detectLang(content);
        setLang(detected);
        setLangLocked(true);
      }

      setInput("");
      setShowSuggestions(false);

      if (textareaRef.current) textareaRef.current.style.height = "auto";

      const userMsg: Message = {
        id: uid(),
        role: "user",
        content,
        timestamp: new Date(),
      };

      const botId = uid();
      const botMsg: Message = {
        id: botId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
        streaming: true,
      };

      const history = [...messages, userMsg]
        .filter((m) => m.content.trim())
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }));

      setMessages((prev) => [...prev, userMsg, botMsg]);
      setLoading(true);

      abortRef.current = new AbortController();

      try {
        const res = await fetch(BACKEND, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history, lang }),
          signal: abortRef.current.signal,
        });

        if (!res.ok || !res.body) throw new Error("Network error");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          accumulated += decoder.decode(value, { stream: true });
          const snap = accumulated;

          setMessages((prev) =>
            prev.map((m) =>
              m.id === botId ? { ...m, content: snap, streaming: true } : m,
            ),
          );
        }

        setMessages((prev) =>
          prev.map((m) => (m.id === botId ? { ...m, streaming: false } : m)),
        );
      } catch (err: unknown) {
        if ((err as { name?: string })?.name === "AbortError") return;

        setMessages((prev) =>
          prev.map((m) =>
            m.id === botId ?
              {
                ...m,
                content:
                  contact.error ??
                  chat.error ??
                  "Oops, something went wrong. Try again! 🔄",
                streaming: false,
              }
            : m,
          ),
        );
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, langLocked, lang, chat.error, contact.error],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const openLabel = chat.openLabel ?? "Open chat";
  const closeLabel = chat.closeLabel ?? "Close chat";
  const sendLabel = chat.send ?? "Send";
  const typingLabel = chat.typing ?? "Typing...";
  const onlineLabel = chat.online ?? "Online now";
  const placeholder = chat.placeholder ?? "Type your message...";
  const assistantName = chat.assistantName ?? "AI Assistant";
  const suggestions = Array.isArray(chat.suggestions) ? chat.suggestions : [];

  const isRTL = lang === "ar";

  const cssVars: CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    ["--chat-root-bg" as any]: palette.rootBg,
    ["--chat-panel-bg" as any]: palette.panelBg,
    ["--chat-card-bg" as any]: palette.cardBg,
    ["--chat-border" as any]: palette.border,
    ["--chat-border-soft" as any]: palette.borderSoft,
    ["--chat-border-accent" as any]: palette.borderAccent,
    ["--chat-text" as any]: palette.text,
    ["--chat-text-soft" as any]: palette.textSoft,
    ["--chat-text-muted" as any]: palette.textMuted,
    ["--chat-brand" as any]: palette.brand,
    ["--chat-brand-alt" as any]: palette.brandAlt,
    ["--chat-brand-soft" as any]: palette.brandSoft,
    ["--chat-inverse-text" as any]: palette.inverseText,
    ["--chat-accent" as any]: palette.accent,
    ["--chat-warning" as any]: palette.warning,
    ["--chat-shadow" as any]: palette.shadow,
    ["--chat-subtle-shadow" as any]: palette.subtleShadow,
  };

  return (
    <>
      <style>{`
        .chatbot-root * { box-sizing: border-box; }

        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: .7; }
          70%  { transform: scale(1.7); opacity: 0;  }
          100% { transform: scale(1.7); opacity: 0;  }
        }

        .pulse-ring {
          animation: pulse-ring 1.8s ease-out infinite;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(18px) scale(.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .chat-window-enter {
          animation: slideUp .28s cubic-bezier(.22,.68,0,1.2) both;
        }

        @keyframes fabPop {
          0%   { transform: scale(.85) rotate(-10deg); }
          60%  { transform: scale(1.08) rotate(4deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        .fab-pop { animation: fabPop .25s ease both; }

        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .msg-enter { animation: msgIn .22s ease both; }

        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb {
          border-radius: 99px;
          background: rgba(128,128,128,.25);
        }
      `}</style>

      <div className="chatbot-root" style={cssVars}>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? closeLabel : openLabel}
          className="
            fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50
            w-14 h-14 rounded-full
            flex items-center justify-center
            shadow-[0_8px_30px_var(--chat-shadow)]
            transition-transform duration-200
            hover:scale-105 active:scale-95
          "
          style={{
            background: `linear-gradient(135deg, ${palette.brand}, ${palette.brandAlt})`,
            color: palette.inverseText,
          }}
        >
          {!open && (
            <>
              <span
                className="pulse-ring absolute inset-0 rounded-full opacity-0"
                style={{
                  background: `linear-gradient(135deg, ${palette.brand}, ${palette.brandAlt})`,
                }}
              />
              <span
                className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                style={{
                  backgroundColor: palette.accent,
                  borderColor: theme === "dark" ? "#070711" : "#ffffff",
                }}
              />
            </>
          )}

          <span className="fab-pop" key={String(open)}>
            {open ?
              <X className="w-6 h-6" />
            : <MessageCircleMore className="w-6 h-6" />}
          </span>
        </button>

        {open && (
          <div
            dir={isRTL ? "rtl" : "ltr"}
            className="
              chat-window-enter
              fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50
              w-[min(480px,calc(100vw-1rem))]
              sm:w-[min(480px,calc(100vw-1.5rem))]
              h-[min(600px,calc(100dvh-5rem))]
              flex flex-col overflow-hidden
              rounded-2xl
              border backdrop-blur-xl
            "
            style={{
              backgroundColor: palette.rootBg,
              borderColor: palette.borderSoft,
              color: palette.text,
              boxShadow: `0 24px 64px ${palette.shadow}`,
            }}
          >
            <div
              className="flex items-center gap-3 px-4 sm:px-5 py-4 border-b"
              style={{
                borderColor: palette.borderSoft,
                background:
                  theme === "dark" ?
                    "rgba(255, 255, 255, 0.03)"
                  : "rgba(255, 255, 255, 0.70)",
              }}
            >
              <div className="relative shrink-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${palette.brand}, ${palette.brandAlt})`,
                    color: palette.inverseText,
                  }}
                >
                  <Bot className="w-5 h-5" />
                </div>

                <span
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                  style={{
                    backgroundColor: palette.accent,
                    borderColor: palette.panelBg,
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p
                  className="text-[15px] font-semibold truncate leading-none"
                  style={{
                    color: palette.text,
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {assistantName}
                </p>
                <p
                  className="text-xs font-medium mt-0.5 inline-flex items-center gap-1"
                  style={{ color: palette.brandSecondary }}
                >
                  <Sparkles className="w-3 h-3" />
                  {onlineLabel}
                </p>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label={closeLabel}
                className="
                  w-8 h-8 rounded-full flex items-center justify-center
                  transition-all duration-150
                "
                style={{
                  color: palette.textMuted,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    theme === "dark" ? "rgba(255,255,255,0.03)" : "#eff6ff";
                  e.currentTarget.style.color = palette.brand;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = palette.textMuted;
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div
              className="chat-scroll flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-4"
              style={{
                background:
                  theme === "dark" ?
                    "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.00))"
                  : "linear-gradient(180deg, rgba(255,255,255,0.60), rgba(255,255,255,0.00))",
              }}
            >
              {messages.map((msg) => {
                const isBot = msg.role === "assistant";

                return (
                  <div
                    key={msg.id}
                    className={`msg-enter flex gap-2.5 ${
                      isBot ? "justify-start" : "justify-end"
                    }`}
                  >
                    {isBot && (
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0 mt-0.5"
                        style={{
                          background: `linear-gradient(135deg, ${palette.brand}, ${palette.brandAlt})`,
                          color: palette.inverseText,
                        }}
                      >
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div className="max-w-[84%] sm:max-w-[78%]">
                      <div
                        className="px-4 py-3 rounded-2xl text-sm leading-relaxed break-words"
                        style={
                          isBot ?
                            {
                              backgroundColor: palette.cardBg,
                              color: palette.text,
                              border: `1px solid ${palette.borderSoft}`,
                              boxShadow: `0 2px 10px ${palette.subtleShadow}`,
                              borderTopLeftRadius: "4px",
                            }
                          : {
                              background: `linear-gradient(135deg, ${palette.brand}, ${palette.brandAlt})`,
                              color: palette.inverseText,
                              borderTopRightRadius: "4px",
                            }
                        }
                      >
                        {isBot ?
                          msg.streaming && msg.content === "" ?
                            <TypingDots palette={palette as any} />
                          : <ParsedMessage
                              content={msg.content}
                              lang={lang}
                              onSendText={sendMessage}
                              onOpenWhatsApp={openWhatsApp}
                              onCall={callPhone}
                              chat={chat}
                              palette={palette as any}
                            />

                        : <span className="whitespace-pre-wrap">
                            {msg.content}
                          </span>
                        }
                      </div>

                      <p
                        className="text-[10px] mt-1 px-1 inline-flex items-center gap-1"
                        style={{
                          color: palette.textMuted,
                          textAlign: isBot ? "start" : "end",
                        }}
                      >
                        <Clock3 className="w-3 h-3" />
                        {formatTime(msg.timestamp)}
                        {isBot && msg.streaming && (
                          <span
                            className="ml-1"
                            style={{ color: palette.warning }}
                          >
                            {typingLabel}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}

              {showSuggestions && suggestions.length > 0 && (
                <div
                  className={`flex flex-wrap gap-2 ${
                    isRTL ? "justify-end" : "justify-start"
                  }`}
                >
                  {suggestions.map((s: string) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="
                        px-3 py-1.5 rounded-full text-xs font-medium
                        border transition-all duration-150
                        hover:-translate-y-0.5
                      "
                      style={{
                        borderColor: palette.border,
                        color: palette.chipText,
                        backgroundColor: palette.chipBg,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = palette.hoverBg;
                        e.currentTarget.style.color = palette.hoverText;
                        e.currentTarget.style.borderColor = palette.hoverBorder;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = palette.chipBg;
                        e.currentTarget.style.color = palette.chipText;
                        e.currentTarget.style.borderColor = palette.border;
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div
              className="px-3 sm:px-4 py-3 border-t"
              style={{
                borderColor: palette.borderSoft,
                background:
                  theme === "dark" ?
                    "rgba(255,255,255,0.03)"
                  : "rgba(255,255,255,0.70)",
              }}
            >
              <div
                className="
                  flex items-end gap-2
                  border rounded-xl px-3 py-2
                  focus-within:shadow-sm
                  transition-all duration-200
                "
                style={{
                  backgroundColor: palette.panelBg,
                  borderColor: palette.border,
                  boxShadow: `0 8px 24px ${palette.subtleShadow}`,
                }}
              >
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  dir={isRTL ? "rtl" : "ltr"}
                  onChange={(e) => {
                    setInput(e.target.value);
                    resizeTextarea();
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  disabled={loading}
                  className="
                    flex-1 resize-none overflow-hidden bg-transparent outline-none
                    text-sm leading-relaxed py-0.5
                    disabled:opacity-50
                  "
                  style={{
                    color: palette.text,
                    maxHeight: "120px",
                    caretColor: palette.brand,
                  }}
                />

                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || loading}
                  aria-label={sendLabel}
                  className="
                    shrink-0 w-9 h-9 rounded-lg
                    flex items-center justify-center
                    transition-all duration-150
                    active:scale-90
                    disabled:opacity-30
                  "
                  style={{
                    background: `linear-gradient(135deg, ${palette.brand}, ${palette.brandAlt})`,
                    color: palette.inverseText,
                  }}
                >
                  {loading ?
                    <svg
                      className="w-4 h-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        d="M12 2a10 10 0 0 1 10 10"
                        strokeDasharray="31.4"
                        strokeDashoffset="0"
                      />
                    </svg>
                  : <SendHorizontal className="w-4 h-4" />}
                </button>
              </div>

              <p
                className="text-center text-[10px] mt-2"
                style={{ color: palette.textMuted }}
              >
                {form.footerNote ?? "Ibrahim Abu Zeid · AI Assistant"}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
