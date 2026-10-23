"use client";

import { useSyncExternalStore } from "react";

// Preferencias de cookies guardadas en una cookie propia (técnica, no requiere consentimiento).
export const CONSENT_COOKIE = "normapro_cookie_consent";
const CONSENT_VERSION = 1;
// El consentimiento se vuelve a pedir pasados 6 meses.
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

const CHANGE_EVENT = "normapro:cookie-consent-change";
const OPEN_SETTINGS_EVENT = "normapro:open-cookie-settings";

export type CookieConsent = {
  v: number;
  analytics: boolean;
  media: boolean;
  date: string;
};

export type CookieChoices = Pick<CookieConsent, "analytics" | "media">;

let cachedRaw: string | null | undefined;
let cachedConsent: CookieConsent | null = null;

const readRawCookie = (): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((item) => item.startsWith(`${CONSENT_COOKIE}=`));
  return match ? match.slice(CONSENT_COOKIE.length + 1) : null;
};

export function getConsent(): CookieConsent | null {
  const raw = readRawCookie();
  // Misma referencia mientras la cookie no cambie, como exige useSyncExternalStore.
  if (raw === cachedRaw) return cachedConsent;
  cachedRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(decodeURIComponent(raw)) as CookieConsent) : null;
    cachedConsent = parsed && parsed.v === CONSENT_VERSION ? parsed : null;
  } catch {
    cachedConsent = null;
  }
  return cachedConsent;
}

// Borra las cookies de Google Analytics (_ga, _ga_XXXX) del dominio actual y de su dominio padre.
function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie
    .split("; ")
    .map((item) => item.split("=")[0])
    .filter((name) => name === "_ga" || name.startsWith("_ga_"))
    .forEach((name) => {
      domains.forEach((domain) => {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
      });
    });
}

export function saveConsent(choices: CookieChoices) {
  const previous = getConsent();
  const consent: CookieConsent = { v: CONSENT_VERSION, ...choices, date: new Date().toISOString() };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(consent))}; Max-Age=${CONSENT_MAX_AGE_SECONDS}; path=/; SameSite=Lax${secure}`;

  window.dispatchEvent(new Event(CHANGE_EVENT));

  // Google Analytics no se puede descargar de una página ya cargada: al retirar el permiso se borran sus cookies y se recarga.
  if (previous?.analytics && !choices.analytics) {
    clearAnalyticsCookies();
    window.location.reload();
  }
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

export function onOpenCookieSettings(listener: () => void) {
  window.addEventListener(OPEN_SETTINGS_EVENT, listener);
  return () => window.removeEventListener(OPEN_SETTINGS_EVENT, listener);
}

const subscribe = (listener: () => void) => {
  window.addEventListener(CHANGE_EVENT, listener);
  return () => window.removeEventListener(CHANGE_EVENT, listener);
};

// En servidor no se conoce la elección: se renderiza como si no hubiera consentimiento.
export function useCookieConsent(): CookieConsent | null {
  return useSyncExternalStore(subscribe, getConsent, () => null);
}
