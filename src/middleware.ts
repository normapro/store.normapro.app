import { NextRequest, NextResponse } from "next/server";
import { INSTITUTO_HOSTS, NORMAPRO_HOSTS } from "@/libs/seo";

// Reescribe a la carpeta del sitio y pasa el ?ref al layout como cabecera de la petición.
function rewriteToNormapro(req: NextRequest, pathname: string) {
  const url = new URL(`/sites/normapro${pathname}`, req.url);
  const requestHeaders = new Headers(req.headers);
  // Nunca se acepta la cabecera si viene del cliente: solo la fija el middleware.
  requestHeaders.delete("x-site-ref");

  const ref = req.nextUrl.searchParams.get("ref");
  if (ref) {
    requestHeaders.set("x-site-ref", ref);
  }

  return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // sitemap.xml y robots.txt (con punto) se sirven desde src/app sin reescribir.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Quitar puerto
  const host = (req.headers.get("host") || "").split(":")[0];

  // Aplicar los rewrites apuntando a la carpeta sites
  if (INSTITUTO_HOSTS.includes(host)) {
    const url = new URL(`/sites/instituto${pathname}`, req.url);
    return NextResponse.rewrite(url);
  }

  if (NORMAPRO_HOSTS.includes(host)) {
    return rewriteToNormapro(req, pathname);
  }

  // Fallback para localhost
  return rewriteToNormapro(req, pathname);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
