import { getAttribution } from "@/lib/attribution";
import type { LeadOrigin } from "@/lib/lead-schema";

export type MinimalLead = {
  nome: string;
  whatsapp: string;
};

export type LeadDetails = {
  banco?: string;
  tipo_contrato?: string;
  valor_parcela?: string;
};

const leadSavePromises = new Map<string, Promise<void>>();

export function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function getLeadStorageKey(whatsapp: string) {
  const phoneDigits = onlyDigits(whatsapp);
  const storageDate = new Date().toISOString().slice(0, 10);
  return `grs-lead-saved:${storageDate}:${phoneDigits}`;
}

export function hasSavedLead(whatsapp: string) {
  if (typeof window === "undefined") {
    return false;
  }

  return Boolean(window.localStorage.getItem(getLeadStorageKey(whatsapp)));
}

export function markLeadSaved(whatsapp: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(getLeadStorageKey(whatsapp), new Date().toISOString());
}

export async function saveLead(payload: MinimalLead & LeadDetails & { origem: LeadOrigin }) {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...payload, attribution: getAttribution() }),
  });

  const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;

  if (!response.ok || result?.ok !== true) {
    throw new Error(result?.error || "Não foi possível registrar seu contato agora.");
  }
}

export async function ensureLeadSaved(payload: MinimalLead & { origem: LeadOrigin }) {
  const storageKey = getLeadStorageKey(payload.whatsapp);

  if (hasSavedLead(payload.whatsapp)) {
    return;
  }

  const pendingSave = leadSavePromises.get(storageKey);

  if (pendingSave) {
    await pendingSave;
    return;
  }

  const savePromise = saveLead(payload)
    .then(() => {
      markLeadSaved(payload.whatsapp);
    })
    .finally(() => {
      leadSavePromises.delete(storageKey);
    });

  leadSavePromises.set(storageKey, savePromise);
  await savePromise;
}
