import { cache } from "react";
import API_ENDPOINTS from "@/config/api";
import { Ambito } from "@/types/ambito";
import { Sector } from "@/types/sector";
import { ItemListSolucion, Solucion } from "@/types/solucion";
import { ItemListPack, Pack } from "@/types/pack";
import { TestimonioConCliente } from "@/types/testimonio";
import { Actualidad } from "@/types/actualidad";
import { HistoriaCliente } from "@/types/historiaCliente";
import { Informe } from "@/types/informe";
import { Aplicacion } from "@/types/aplicacion";
import { Consultoria } from "@/types/consultoria";

// Segundos que se reutiliza una respuesta de la API antes de volver a pedirla.
export const STORE_REVALIDATE_SECONDS = 300;

/**
 * Consulta la API en servidor.
 * Devuelve null si la entidad no existe (404 o cuerpo vacío) y lanza en cualquier otro error,
 * para que un fallo puntual de la API no se confunda con contenido inexistente.
 */
async function getJson<T>(url: string): Promise<T | null> {
	const response = await fetch(url, { next: { revalidate: STORE_REVALIDATE_SECONDS } });

	if (response.status === 404) return null;
	if (!response.ok) {
		throw new Error(`Error ${response.status} al consultar ${url}`);
	}

	const text = await response.text();
	if (!text.trim()) return null;
	return JSON.parse(text) as T;
}

// Igual que getJson, pero para listados de apoyo (sitemap, menús): un fallo devuelve lista vacía.
async function getList<T>(url: string): Promise<T[]> {
	try {
		const data = await getJson<T[]>(url);
		return Array.isArray(data) ? data : [];
	} catch (error) {
		console.error(error);
		return [];
	}
}

export const getAmbitos = cache(() => getList<Ambito>(API_ENDPOINTS.AMBITOS));

export const getAmbitoBySlug = cache(async (slug: string) => {
	const ambitos = await getAmbitos();
	return ambitos.find((ambito) => ambito.slug === slug) ?? null;
});

export const getSectores = cache(() => getList<Sector>(API_ENDPOINTS.SECTORES));

export const getSectorBySlug = cache((slug: string) =>
	getJson<Sector>(`${API_ENDPOINTS.SECTOR_INFO}/${encodeURIComponent(slug)}`)
);

export const getAmbitosConSoluciones = cache((sectorSlug: string) =>
	getList<Ambito>(`${API_ENDPOINTS.AMBITOS_SOLUCIONES}?sector=${encodeURIComponent(sectorSlug)}`)
);

export const getSolucion = cache((slug: string, sectorSlug?: string) => {
	const query = sectorSlug ? `?sectorSlug=${encodeURIComponent(sectorSlug)}` : "";
	return getJson<Solucion>(`${API_ENDPOINTS.SOLUCION}/${encodeURIComponent(slug)}${query}`);
});

export const getListSoluciones = cache((ambitoSlug: string, sectorSlug?: string) => {
	const sector = sectorSlug ? `&sector=${encodeURIComponent(sectorSlug)}` : "";
	return getList<ItemListSolucion>(`${API_ENDPOINTS.LISTSOLUCIONES}?ambito=${encodeURIComponent(ambitoSlug)}${sector}`);
});

export const getPack = cache((slug: string, ambitoSlug: string) =>
	getJson<Pack>(`${API_ENDPOINTS.PACKS}/${encodeURIComponent(slug)}?ambito=${encodeURIComponent(ambitoSlug)}`)
);

export const getPacksCategoria = cache(() => getList<ItemListPack>(API_ENDPOINTS.PACKSCATEGORIA));

export const getTestimonios = cache(async (maxItems: number) => {
	const data = await getJson<TestimonioConCliente[]>(`${API_ENDPOINTS.TESTIMONIOS}?maxItems=${maxItems}`);
	return Array.isArray(data) ? data : [];
});

export const getHistorias = cache(() => getList<HistoriaCliente>(`${API_ENDPOINTS.HISTORIAS}?maxItems=1000`));

export const getInformes = cache(() => getList<Informe>(API_ENDPOINTS.INFORMES));

export const getActualidad = cache(() => getList<Actualidad>(API_ENDPOINTS.ACTUALIDAD));

export const getAplicaciones = cache(() => getList<Aplicacion>(API_ENDPOINTS.APLICACIONES));

export const getConsultorias = cache(() => getList<Consultoria>(API_ENDPOINTS.CONSULTORIA));
