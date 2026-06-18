"use client";

import { createContext, useContext } from "react";

export type SiteRef = "instituto" | null;

interface SiteContextValue {
  ref: SiteRef;
}

export const SiteContext = createContext<SiteContextValue>({ ref: null });

export function useSiteRef() {
  return useContext(SiteContext).ref;
}

export function SiteProvider({
  siteRef,
  children,
}: {
  siteRef: SiteRef;
  children: React.ReactNode;
}) {
  return (
    <SiteContext.Provider value={{ ref: siteRef }}>
      {children}
    </SiteContext.Provider>
  );
}
