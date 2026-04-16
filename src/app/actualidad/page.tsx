
'use client';

import ActualidadGridSection from '@/components/ActualidadGridSection';
import { useMemo, useState } from 'react';

const tabs = ['Todas las publicaciones', 'Destacadas', 'Temas', 'Servicios'];

const temasDisponibles = [
	{ label: 'Tecnología', filters: ['Tecnología', 'Tecnologica'] },
	{ label: 'Salud', filters: ['Salud'] },
	{ label: 'Medioambiente', filters: ['Medioambiente', 'Medio ambiente'] },
	{ label: 'Digitalización', filters: ['Digitalización', 'Digitalizacion'] },
	{ label: 'Formación', filters: ['Formación', 'Formacion'] },
	{ label: 'Industria', filters: ['Industria'] },
	{ label: 'Seguridad alimentaria', filters: ['Seguridad alimentaria'] },
	{ label: 'Destacadas', filters: ['Destacadas', 'Destacado'] },
];

export default function InformesPage() {
	const [activeTab, setActiveTab] = useState(tabs[0]);
	const [selectedTema, setSelectedTema] = useState<string | null>(null);
	const [isTemasMenuOpen, setIsTemasMenuOpen] = useState(false);

	const filtrosTemas = useMemo(() => {
		if (activeTab === 'Destacadas') {
			return ['Destacadas', 'Destacado'];
		}

		if (activeTab === 'Temas' && selectedTema) {
			const tema = temasDisponibles.find((item) => item.label === selectedTema);
			return tema?.filters;
		}

		return undefined;
	}, [activeTab, selectedTema]);

	const handleTabClick = (tab: string) => {
		if (tab === 'Temas') {
			setActiveTab('Temas');
			setIsTemasMenuOpen((prev) => !prev);
			return;
		}

		setActiveTab(tab);
		setIsTemasMenuOpen(false);

		if (tab !== 'Temas') {
			setSelectedTema(null);
		}
	};

	const handleTemaSelect = (temaLabel: string) => {
		setSelectedTema(temaLabel);
		setActiveTab('Temas');
		setIsTemasMenuOpen(false);
	};

	return (
		<main className="w-full py-10 md:py-12">
			<section className="max-w-7xl mx-auto px-6">
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-gray-300">
					<div className="flex flex-wrap items-center gap-2 text-2xl font-extrabold">
						<h1 className="text-[#0B1D4D]">Actualidad</h1>
						{activeTab === 'Temas' && selectedTema ? (
							<>
								<span className="text-[#0B1D4D]">&gt;</span>
								<span className="text-[#00B2E3]">{selectedTema}</span>
							</>
						) : null}
					</div>

					<div className="flex flex-wrap items-center gap-2 md:gap-3">
						{tabs.map((tab) => {
							const isActive = activeTab === tab;

							return (
								<button
									key={tab}
									type="button"
									onClick={() => handleTabClick(tab)}
									className={`px-5 py-2 text-md font-bold rounded-md transition-colors  ${
										isActive
											? 'bg-transparent text-[#00B2E3]'
											: 'bg-transparent text-[#0B1D4D] hover:bg-[#EEF6FB]'
									}`}
								>
									{tab}
								</button>
							);
						})}
					</div>
				</div>

				<div
					className={`bg-[#e8e9ee] px-6 overflow-hidden transition-all duration-300 ease-in-out ${
						isTemasMenuOpen ? 'max-h-[420px] opacity-100 py-12' : 'max-h-0 opacity-0 py-0'
					}`}
				>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-10">
						{temasDisponibles.map((tema) => {
							const isSelected = selectedTema === tema.label;

							return (
								<button
									key={tema.label}
									type="button"
									onClick={() => handleTemaSelect(tema.label)}
									className={`text-left text-[15px] font-extrabold transition-colors ${
										isSelected ? 'text-[#00B2E3]' : 'text-[#0B1D4D] hover:text-[#00B2E3]'
									}`}
								>
									{tema.label}
								</button>
							);
						})}
					</div>
				</div>

				<div className="mt-8">
					<ActualidadGridSection onlyLatest={false} temas={filtrosTemas} />
				</div>
			</section>
		</main>
	);
}
