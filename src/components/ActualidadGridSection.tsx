'use client';

import API_ENDPOINTS from '@/config/api';
import { Actualidad } from '@/types/actualidad';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

interface ActualidadGridSectionProps {
	onlyLatest: boolean;
	temas?: string[];
	hideDescriptionAndReadMore?: boolean;
	temasDisponibles?: string[];
	isInstituto?: boolean;
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
	temasDisponibles,
	isInstituto = false
}: ActualidadGridSectionProps) {
	const [noticias, setNoticias] = useState<Actualidad[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [temaActivo, setTemaActivo] = useState<string>('todos');
	const scrollRef = useRef<HTMLDivElement>(null);

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
		const temasActivos = temaActivo === 'todos'
			? (temas ?? []).map((t) => t.trim().toLowerCase()).filter(Boolean)
			: [temaActivo.toLowerCase()];

		const noticiasFiltradas = temasActivos.length === 0
			? noticias
			: noticias.filter((noticia) => {
				const categoriasNoticia = parseCategorias(noticia.categoria ?? null);
				return categoriasNoticia.some((cat) => temasActivos.includes(cat));
			});

		return onlyLatest ? noticiasFiltradas.slice(0, 3) : noticiasFiltradas;
	}, [noticias, onlyLatest, temas, temaActivo]);

	const scroll = (dir: 'left' | 'right') => {
		scrollRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
	};

	if (isLoading) return <p className="text-[#010D3D]">Cargando noticias...</p>;
	if (error) return <p className="text-red-600">{error}</p>;

	return (
		<section className="w-full">
			{/* Filtro de temas */}
			{temasDisponibles && temasDisponibles.length > 0 && (
				<div className="flex items-center gap-2 mb-8">
					<button onClick={() => scroll('left')} className="text-[#010D3D] hover:opacity-60 transition flex-shrink-0">
						<FontAwesomeIcon icon={faChevronLeft} />
					</button>
					<div ref={scrollRef} className="flex gap-8 overflow-x-auto scroll-smooth no-scrollbar flex-1">
						<button
							onClick={() => setTemaActivo('todos')}
							className={`flex-shrink-0 px-5 py-2 rounded-xl text-base font-extrabold transition ${temaActivo === 'todos'
								? 'bg-[#cfd2d9] text-[#010D3D] border-gray-200'
								: 'bg-white text-[#010D3D] border-gray-300 hover:bg-gray-100'
								}`}
						>
							Todos los temas
						</button>
						{temasDisponibles.map((tema) => (
							<button
								key={tema}
								onClick={() => setTemaActivo(tema.toLowerCase())}
								className={`flex-shrink-0 px-5 py-2 rounded-xl text-base font-extrabold transition ${temaActivo === tema.toLowerCase()
									? 'bg-[#cfd2d9] text-[#010D3D] border-gray-200'
									: 'bg-white text-[#010D3D] border-gray-300 hover:bg-gray-100'
									}`}
							>
								{tema}
							</button>
						))}
					</div>
					<button onClick={() => scroll('right')} className="text-[#010D3D] hover:opacity-60 transition flex-shrink-0">
						<FontAwesomeIcon icon={faChevronRight} />
					</button>
				</div>
			)}

			{/* Grid de noticias */}
			{noticiasToShow.length === 0 ? (
				<p className="text-[#010D3D]">No hay noticias publicadas.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
					{noticiasToShow.map((noticia) => {
						const resumen = getResumenFromContent(noticia.content);
						const noticiaPath = isInstituto
							? `https://store.normapro.es/actualidad/${noticia.slug || noticia.id_noticia}?ref=instituto`
							: `/actualidad/${noticia.slug || noticia.id_noticia}`;
						return (
							<article key={noticia.id_noticia} className="flex flex-col mb-10">
								{isInstituto ? (
									<a
										href={noticiaPath}
										target="_blank"
										rel="noopener noreferrer"
										className="block"
									>
										<img
											src={buildImageSrc(noticia.imagen)}
											alt={noticia.title}
											className="w-full h-auto object-cover"
											loading="lazy"
										/>
									</a>
								) : (
									<Link href={noticiaPath} className="block">
										<img
											src={buildImageSrc(noticia.imagen)}
											alt={noticia.title}
											className="w-full h-auto object-cover"
											loading="lazy"
										/>
									</Link>
								)}
								<p className="mt-4 text-xs text-[#010D3D]">{noticia.fecha}</p>
								<h3 className="mt-3 text-base font-bold text-[#010D3D] leading-tight w-[85%]">
									{isInstituto ? (
										<a
											href={noticiaPath}
											target="_blank"
											rel="noopener noreferrer"
										>
											{noticia.title}
										</a>
									) : (
										<Link href={noticiaPath}>{noticia.title}</Link>
									)}
								</h3>
								{!hideDescriptionAndReadMore && (
									<>
										<p className="mt-3 text-sm text-[#010D3D] line-clamp-4">{resumen}</p>
										{isInstituto ? (
											<a
												href={noticiaPath}
												target="_blank"
												rel="noopener noreferrer"
												className="mt-4 inline-block text-md font-extrabold text-[#010D3D] underline underline-offset-2"
											>
												Seguir leyendo
											</a>
										) : (
											<Link
												href={noticiaPath}
												className="mt-4 inline-block text-md font-extrabold text-[#010D3D] underline underline-offset-2"
											>
												Seguir leyendo
											</Link>
										)}
									</>
								)}
							</article>
						);
					})}
				</div>
			)}
		</section>
	);
}
