'use client';

import API_ENDPOINTS from '@/config/api';
import { Actualidad } from '@/types/actualidad';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

interface ActualidadGridSectionProps {
	onlyLatest: boolean;
	temas?: string[];
	hideDescriptionAndReadMore?: boolean;
}

const getResumenFromContent = (content: unknown): string => {
	if (!content) {
		return '';
	}

	if (typeof content === 'string') {
		return content;
	}

	if (Array.isArray(content)) {
		return content
			.map((item) => String(item))
			.join(' ')
			.trim();
	}

	if (typeof content === 'object') {
		return JSON.stringify(content);
	}

	return String(content);
};

const buildImageSrc = (imagen: string): string => {
	if (!imagen) {
		return '/main/no-image.png';
	}

	if (imagen.startsWith('http://') || imagen.startsWith('https://') || imagen.startsWith('/')) {
		return imagen;
	}

	return `/${imagen}`;
};

const parseCategorias = (categoria: string | null): string[] => {
	if (!categoria) {
		return [];
	}

	const trimmed = categoria.trim();
	if (!trimmed) {
		return [];
	}

	if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
		try {
			const parsed = JSON.parse(trimmed);
			if (Array.isArray(parsed)) {
				return parsed.map((item) => String(item).trim().toLowerCase()).filter((item) => item.length > 0);
			}
		} catch {
			// Continua con parseo por separadores
		}
	}

	return trimmed
		.split(/[,|;]+/)
		.map((item) => item.trim().toLowerCase())
		.filter((item) => item.length > 0);
};

export default function ActualidadGridSection({
	onlyLatest,
	temas,
	hideDescriptionAndReadMore = false,
}: ActualidadGridSectionProps) {
	const [noticias, setNoticias] = useState<Actualidad[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchActualidad = async () => {
			try {
				const response = await fetch(API_ENDPOINTS.ACTUALIDAD);
				if (!response.ok) {
					throw new Error('Error al obtener actualidad');
				}

				const data: Actualidad[] = await response.json();
				setNoticias(Array.isArray(data) ? data : []);
			} catch (err) {
				console.error('Error al cargar actualidad:', err);
				setError('No se pudieron cargar las noticias.');
				setNoticias([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchActualidad();
	}, []);

	const noticiasToShow = useMemo(() => {
		const temasNormalizados = (temas ?? [])
			.map((tema) => tema.trim().toLowerCase())
			.filter((tema) => tema.length > 0);

		const noticiasFiltradas =
			temasNormalizados.length === 0
				? noticias
				: noticias.filter((noticia) => {
					const categoriasNoticia = parseCategorias(noticia.categoria ?? null);
					return categoriasNoticia.some((categoria) => temasNormalizados.includes(categoria));
				});

		if (onlyLatest) {
			return noticiasFiltradas.slice(0, 3);
		}

		return noticiasFiltradas;
	}, [noticias, onlyLatest, temas]);

	if (isLoading) {
		return <p className="text-[#010D3D]">Cargando noticias...</p>;
	}

	if (error) {
		return <p className="text-red-600">{error}</p>;
	}

	if (noticiasToShow.length === 0) {
		return <p className="text-[#010D3D]">No hay noticias publicadas.</p>;
	}

	return (
		<section className="w-full">
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
				{noticiasToShow.map((noticia) => {
					const resumen = getResumenFromContent(noticia.content);
					const noticiaPath = `/actualidad/${noticia.slug || noticia.id_noticia}`;

					return (
						<article key={noticia.id_noticia} className="flex flex-col mb-10">
							<Link href={noticiaPath} className="block">
								<img
									src={buildImageSrc(noticia.imagen)}
									alt={noticia.title}
									className="w-full h-auto object-cover"
									loading="lazy"
								/>
							</Link>

							<p className="mt-4 text-xs text-[#0B1D4D]">{noticia.fecha}</p>

							<h3 className="mt-3 text-xl font-extrabold text-[#0B1D4D] leading-tight w-[85%]">
								<Link href={noticiaPath}>{noticia.title}</Link>
							</h3>

							{!hideDescriptionAndReadMore ? (
								<>
									<p className="mt-3 text-sm text-[#0B1D4D] line-clamp-4">{resumen}</p>

									<Link
										href={noticiaPath}
										className="mt-4 inline-block text-md font-extrabold text-[#0B1D4D] underline underline-offset-2"
									>
										Seguir leyendo
									</Link>
								</>
							) : null}
						</article>
					);
				})}
			</div>
		</section>
	);
}
