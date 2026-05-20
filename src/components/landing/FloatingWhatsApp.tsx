"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/tracking";

export function FloatingWhatsApp({ href }: { href: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      onClick={() => trackEvent("whatsapp_click", { source: "floating" })}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white shadow-2xl shadow-emerald-950/40 transition-all duration-500 hover:scale-105 hover:bg-[#20BD5C] hover:shadow-emerald-500/25 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <MessageCircle className="size-5 shrink-0" aria-hidden />
      <span className="hidden sm:inline">Falar no WhatsApp</span>
    </a>
  );
}
