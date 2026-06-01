import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.nextUrl.hostname;

  if (hostname === "https://institutodeinnovacion.es/") {
    url.pathname = `/instituto${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  if (hostname === "https://store.normapro.es/") {
    url.pathname = `/${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};