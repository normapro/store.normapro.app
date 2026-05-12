import LandingBuilder from '@/components/LandingBuilder';
import PresentacionHistoria from "@/components/landings/PresentacionHistoria";
import API_ENDPOINTS from '@/config/api';

type HistoriaPageProps = {
	params: Promise<{
		historia: string;
	}>;
};

type HistoriaPayload = {
	id: number;
	slug?: string;
	id_cliente?: number | null;
	nombre?: string | null;
	descripcion?: string | null;
	componentes: unknown;
};

type ClientePayload = {
	id_cliente: number;
	logo?: string | null;
	description?: string | null;
	descripcion?: string | null;
};

const FALLBACK_HISTORIA_NOMBRE = 'Historia demo';
const FALLBACK_HISTORIA_DESCRIPCION = 'Descripcion demo';
const FALLBACK_CLIENTE_NOMBRE = 'Cliente demo';
const FALLBACK_CLIENTE_LOGO = 'NormaPro_Horizontal_Color@2x.png';

const parseBloques = (componentes: unknown): any[] => {
	if (Array.isArray(componentes)) return componentes;
	if (typeof componentes === 'string') {
		try {
			const parsed = JSON.parse(componentes);
			return Array.isArray(parsed) ? parsed : [];
		} catch {
			return [];
		}
	}
	return [];
};

const getHistoriaBySlug = async (historiaSlug: string): Promise<HistoriaPayload | null> => {
	let response = await fetch(`${API_ENDPOINTS.HISTORIAS}/slug/${encodeURIComponent(historiaSlug)}`, {
		next: { revalidate: 0 },
	});

	if (!response.ok && /^\d+$/.test(historiaSlug.trim())) {
		response = await fetch(`${API_ENDPOINTS.HISTORIAS}/${historiaSlug}`, {
			next: { revalidate: 0 },
		});
	}

	if (response.status === 404) return null;
	if (!response.ok) {
		throw new Error('Error al cargar historia');
	}

	return response.json();
};

const getClienteById = async (clienteId?: number | null): Promise<ClientePayload | null> => {
	if (!clienteId) return null;

	const response = await fetch(`${API_ENDPOINTS.CLIENTES}/${clienteId}`, {
		next: { revalidate: 0 },
	});

	if (response.status === 404) return null;
	if (!response.ok) {
		throw new Error('Error al cargar cliente');
	}

	return response.json();
};

export default async function HistoriaPage({ params }: HistoriaPageProps) {
	const { historia } = await params;
	const data = await getHistoriaBySlug(historia);

	if (!data) {
		return (
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-3xl font-bold text-gray-900">Historia no encontrada</h1>
			</main>
		);
	}

	const bloques = parseBloques(data.componentes);
	const cliente = await getClienteById(data.id_cliente);
	const nombreHistoria = data.nombre?.trim() || FALLBACK_HISTORIA_NOMBRE;
	const descripcionHistoria = data.descripcion?.trim() || FALLBACK_HISTORIA_DESCRIPCION;
	const nombreCliente = cliente?.description?.trim() || cliente?.descripcion?.trim() || FALLBACK_CLIENTE_NOMBRE;
	const logoCliente = cliente?.logo?.trim() || FALLBACK_CLIENTE_LOGO;

	if (bloques.length === 0) {
		return (
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-3xl font-bold text-[#010d3d]">{nombreHistoria}</h1>
				<p className="mt-4 text-gray-600">Esta historia aun no tiene componentes configurados , mete el json en la bd.</p>
			</main>
		);
	}

	return (
		<>
			<PresentacionHistoria
				logo={logoCliente}
				clienteNombre={nombreCliente}
				nombre={nombreHistoria}
				descripcion={descripcionHistoria}
			/>

			<LandingBuilder bloques={bloques} />
		</>
	);
}
