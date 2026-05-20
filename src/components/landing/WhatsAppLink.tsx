"use client";

import { trackEvent } from "@/lib/tracking";
import { type WhatsAppContext, getWhatsAppHref } from "@/lib/whatsapp";

interface Props {
  context: WhatsAppContext;
  children: React.ReactNode;
  className?: string;
}

export function WhatsAppLink({ context, children, className }: Props) {
  const href = getWhatsAppHref(context);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { source: context })}
      className={className}
    >
      {children}
    </a>
  );
}
