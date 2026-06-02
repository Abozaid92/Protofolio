"use client";

import dynamic from "next/dynamic";

export const ChatBot = dynamic(() => import("@/components/ChatBot"), {
  ssr: false,
});

export const Contact = dynamic(
  () =>
    import("@/components/sections/ContactEnhanced").then((mod) => mod.Contact),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-[400px] bg-slate-950/40 rounded-2xl animate-pulse border border-slate-900 flex items-center justify-center font-mono text-xs text-slate-500">
        Loading...
      </div>
    ),
  },
);
