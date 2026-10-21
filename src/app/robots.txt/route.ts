import { NextRequest } from "next/server";
import { absoluteUrl, isIndexableHost, siteForHost } from "@/libs/seo";

export function GET(request: NextRequest) {
	const host = request.headers.get("host");

	// Previews, entornos locales e IPs no se indexan.
	const body = isIndexableHost(host)
		? `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl("/sitemap.xml", siteForHost(host))}\n`
		: "User-agent: *\nDisallow: /\n";

	return new Response(body, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
}
