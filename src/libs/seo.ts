import type { Metadata } from "next";
import { BreadcrumbItem } from "@/types/breadcrumb";

// Dominios canónicos de cada sitio. Se pueden sobreescribir por entorno.
export const NORMAPRO_SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.normapro.es").replace(/\/+$/, "");
export const INSTITUTO_SITE_URL = (process.env.NEXT_PUBLIC_INSTITUTO_SITE_URL || "https://www.institutodeinnovacion.es").replace(/\/+$/, "");

export const NORMAPRO_SITE_NAME = "NormaPro";
export const INSTITUTO_SITE_NAME = "Instituto de Innovación, Ciencia y Empresa";

// Imagen por defecto para redes sociales: logo existente en /public.
export const DEFAULT_OG_IMAGE = "/logos/NormaPro_Horizontal_Color@2x.png";
export const INSTITUTO_LOGO = "/iconoInstituto.svg";

// Hosts que sirve cada sitio (los usa también el middleware).
export const INSTITUTO_HOSTS = [
	"instituto.local",
	"institutodeinnovacion.es",
	"www.institutodeinnovacion.es",
	"inicie.normapro.es",
	"www.inicie.normapro.es",
];
export const NORMAPRO_HOSTS = ["normapro.local", "normapro.es", "www.normapro.es", "store.normapro.es", "www.store.normapro.es"];

// Hosts de producción que se pueden indexar. El resto (previews, .local, IPs) recibe noindex.
const INDEXABLE_HOSTS = [...NORMAPRO_HOSTS, ...INSTITUTO_HOSTS].filter((host) => !host.endsWith(".local"));

export type SiteKey = "normapro" | "instituto";

const cleanHostName = (host: string | null | undefined) => (host || "").split(":")[0].toLowerCase();

// Cualquier host que no sea del instituto sirve la tienda (mismo criterio que el middleware).
export const siteForHost = (host: string | null | undefined): SiteKey =>
	INSTITUTO_HOSTS.includes(cleanHostName(host)) ? "instituto" : "normapro";

export const siteUrl = (site: SiteKey) => (site === "instituto" ? INSTITUTO_SITE_URL : NORMAPRO_SITE_URL);

export const isIndexableHost = (host: string | null | undefined): boolean => {
	return INDEXABLE_HOSTS.includes(cleanHostName(host));
};

export const absoluteUrl = (path: string, site: SiteKey = "normapro"): string => {
	if (/^https?:\/\//.test(path)) return path;
	const cleanPath = path === "/" ? "" : `/${path.replace(/^\/+/, "")}`;
	return `${siteUrl(site)}${cleanPath}`;
};

// Normaliza rutas de imagen tal y como las pintan los componentes (URL absoluta o fichero de /public).
export const resolvePublicImage = (image?: string | null, folder?: string): string | undefined => {
	const clean = image?.trim();
	if (!clean) return undefined;
	if (clean.startsWith("http://") || clean.startsWith("https://") || clean.startsWith("/")) return clean;
	return folder ? `/${folder}/${clean}` : `/${clean}`;
};

// multimediaTypeId 1 es un vídeo de YouTube (ver MultimediaPlayer); el resto son imágenes.
export const multimediaImage = (uri?: string | null, typeId?: number | null) =>
	uri && typeId !== 1 ? resolvePublicImage(uri) : undefined;

// Recorta un texto a la longitud indicada sin partir palabras.
export const truncateText = (text: string, maxLength = 160): string => {
	const clean = text.replace(/\s+/g, " ").trim();
	if (clean.length <= maxLength) return clean;
	const cut = clean.slice(0, maxLength - 1);
	return `${cut.slice(0, cut.lastIndexOf(" ") > 0 ? cut.lastIndexOf(" ") : cut.length)}…`;
};

type PageMetadataInput = {
	// Título ya redactado para la web (titleweb): se usa tal cual, sin plantilla.
	titleWeb?: string | null;
	// Título al que se le aplica la plantilla "%s | NormaPro".
	title?: string | null;
	description?: string | null;
	path: string;
	image?: string | null;
	type?: "website" | "article";
	publishedTime?: string;
	site?: SiteKey;
};

export function pageMetadata({
	titleWeb,
	title,
	description,
	path,
	image,
	type = "website",
	publishedTime,
	site = "normapro",
}: PageMetadataInput): Metadata {
	const cleanTitleWeb = titleWeb?.trim();
	const cleanTitle = title?.trim();
	const cleanDescription = description?.trim() || undefined;
	const canonical = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;
	const resolvedTitle = cleanTitleWeb ? { absolute: cleanTitleWeb } : cleanTitle || undefined;
	const socialTitle = cleanTitleWeb || cleanTitle || undefined;
	const images = [{ url: image || (site === "instituto" ? INSTITUTO_LOGO : DEFAULT_OG_IMAGE) }];

	return {
		...(resolvedTitle ? { title: resolvedTitle } : {}),
		...(cleanDescription ? { description: cleanDescription } : {}),
		alternates: { canonical },
		openGraph: {
			type,
			url: canonical,
			siteName: site === "instituto" ? INSTITUTO_SITE_NAME : NORMAPRO_SITE_NAME,
			locale: "es_ES",
			...(socialTitle ? { title: socialTitle } : {}),
			...(cleanDescription ? { description: cleanDescription } : {}),
			images,
			...(type === "article" && publishedTime ? { publishedTime } : {}),
		},
		twitter: {
			card: "summary_large_image",
			...(socialTitle ? { title: socialTitle } : {}),
			...(cleanDescription ? { description: cleanDescription } : {}),
			images: images.map((img) => img.url),
		},
	};
}

export type BreadcrumbStep = { name: string; path: string };

// Convierte la lista de pasos al formato anidado que usa el componente Breadcrumb.
export const toBreadcrumbItem = (steps: BreadcrumbStep[]): BreadcrumbItem => {
	const [first, ...rest] = steps;
	return {
		title: first.name,
		url: first.path,
		...(rest.length > 0 ? { children: toBreadcrumbItem(rest) } : {}),
	};
};

export const breadcrumbJsonLd = (steps: BreadcrumbStep[], site: SiteKey = "normapro") => ({
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: steps.map((step, index) => ({
		"@type": "ListItem",
		position: index + 1,
		name: step.name,
		item: absoluteUrl(step.path, site),
	})),
});

export const faqJsonLd = (faqs?: { question?: string | null; answer?: string | null }[] | null) => {
	const items = (faqs || []).filter((faq) => faq.question?.trim() && faq.answer?.trim());
	if (items.length === 0) return null;
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((faq) => ({
			"@type": "Question",
			name: faq.question!.trim(),
			acceptedAnswer: { "@type": "Answer", text: faq.answer!.trim() },
		})),
	};
};

export const organizationJsonLd = (site: SiteKey = "normapro") => ({
	"@context": "https://schema.org",
	"@type": "Organization",
	name: site === "instituto" ? INSTITUTO_SITE_NAME : NORMAPRO_SITE_NAME,
	url: siteUrl(site),
	logo: absoluteUrl(site === "instituto" ? INSTITUTO_LOGO : DEFAULT_OG_IMAGE, site),
});
