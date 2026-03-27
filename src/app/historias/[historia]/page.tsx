import archivo from "../../../../plantillas/historiasdemo.json";
import LandingBuilder from '@/components/LandingBuilder';
import API_ENDPOINTS from '@/config/api';

type HistoriaPageProps = {
	params: Promise<{
		historia: string;
	}>;
};

type HistoriaPayload = {
	id: number;
	nombre: string;
	componentes: unknown;
};

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

const getHistoriaById = async (historiaId: string): Promise<HistoriaPayload | null> => {
	/*
	const response = await fetch(`${API_ENDPOINTS.HISTORIAS}/${historiaId}`, {
		next: { revalidate: 0 },
	});

	if (response.status === 404) return null;
	if (!response.ok) {
		throw new Error('Error al cargar historia');
	}

	return response.json();
	*/

	return {
		id: Number(historiaId) || 1,
		nombre: 'Historia demo',
		componentes: archivo,
	};
};

export default async function HistoriaPage({ params }: HistoriaPageProps) {
	const { historia } = await params;
	const data = await getHistoriaById(historia);

	if (!data) {
		return (
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-3xl font-bold text-gray-900">Historia no encontrada</h1>
			</main>
		);
	}

	const bloques = parseBloques(data.componentes);

	if (bloques.length === 0) {
		return (
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<h1 className="text-3xl font-bold text-[#010d3d]">{data.nombre}</h1>
				<p className="mt-4 text-gray-600">Esta historia aun no tiene componentes configurados , mete el json en la bd.</p>
			</main>
		);
	}

	return <LandingBuilder bloques={bloques} />;
}
