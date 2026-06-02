import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

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
  if (host === "instituto.local") {
    const url = new URL(`/sites/instituto${pathname}`, req.url);
    console.log(`[MIDDLEWARE] Rewrite a: ${url.pathname}`);
    return NextResponse.rewrite(url);
  }

  if (host === "normapro.local") {
    const url = new URL(`/sites/normapro${pathname}`, req.url);
    console.log(`[MIDDLEWARE] Rewrite a: ${url.pathname}`);
    return NextResponse.rewrite(url);
  }

  // Fallback para localhost
  return NextResponse.rewrite(new URL(`/sites/normapro${pathname}`, req.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};