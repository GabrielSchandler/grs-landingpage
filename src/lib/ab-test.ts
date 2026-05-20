"use client";

export type FormVariant = "long" | "short";

const STORAGE_KEY = "grs_form_variant";

function getRandomVariant(): FormVariant {
  return Math.random() < 0.5 ? "long" : "short";
}

export function getFormVariant(): FormVariant {
  if (typeof window === "undefined") return "long"; // SSR fallback

  // Override via querystring para QA: ?variant=short ou ?variant=long
  const params = new URLSearchParams(window.location.search);
  const override = params.get("variant");
  if (override === "short" || override === "long") {
    return override;
  }

  // Verificar variant já atribuído
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "short" || stored === "long") {
    return stored;
  }

  // Atribuir e persistir
  const variant = getRandomVariant();
  localStorage.setItem(STORAGE_KEY, variant);
  return variant;
}
