'use client';

import React, { FC, useState } from 'react';
import Formulario from '@/components/Formulario';

type VentajaItem = {
	title: string;
	image?: string;
};

type Props = {
	title: string;
	highlightText?: string;
	claim: string;
	items?: VentajaItem[];
	buttonText?: string;
	background?: 'white' | 'gray';
};


//La coleccion de los iconos de abajo(por ahora son estaticos a menos que encuentre este mismo componente con otros :) 
const defaultItems: VentajaItem[] = [
	{ title: 'Reduccion de Riesgo Legal', image: '/apps/icons/chart-line-up.svg' },
	{ title: 'Proteccion de la Reputacion', image: '/apps/icons/award.svg' },
	{ title: 'Fomento de la Cultura Etica', image: '/apps/icons/handshake.svg' },
	{ title: 'Eficiencia Operativa', image: '/apps/icons/trophy-star.svg' },
	{ title: 'Ventaja competitiva', image: '/apps/icons/pegasus.svg' },
];

const VentajasSection: FC<Props> = ({
	title,
	highlightText,
	claim,
	items = defaultItems,
	buttonText,
	background = 'gray',
}) => {
	const [openModal, setOpenModal] = useState(false);
	const bgColor = background === 'gray' ? 'bg-[#f1f1f7]' : 'bg-white';

	const resolveImagePath = (image: string | undefined, index: number) => {
		const fallback = `ventaja-${index + 1}.png`;
		if (!image) return `/apps/${fallback}`;
		if (image.startsWith('/')) return image;
		return `/apps/${image}`;
	};

	return (
		<section className={`w-full py-16 md:py-20 px-6 ${bgColor}`}>
			<div className="max-w-7xl mx-auto">
				<div className="max-w-3xl mx-auto text-center md:text-left">
					<h2 className="text-[25px] md:text-[35px] leading-tight font-black text-[#010d3d] text-center ">
						{title}{' '}
						{highlightText && (
							<span className="text-[#b5b9c7]">{highlightText}</span>
						)}
					</h2>

					<p className="mt-8 text-lg text-[#010d3d] leading-relaxed whitespace-pre-line text-[15px]">
						{claim}
					</p>
				</div>

				<div className="mt-14 rounded-2xl bg-[#f4f4f8] overflow-hidden">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
						{items.map((item, index) => (
							<div
								key={`${item.title}-${index}`}
								className="flex flex-col items-center justify-center text-center px-6 py-10 min-h-[220px] lg:border-r lg:border-[#d9dce8] last:lg:border-r-0"
							>
								<img
									src={resolveImagePath(item.image, index)}
									alt={item.title}
									className="w-14 h-14 object-contain mb-6"
								/>
								<p className="text-[20px] leading-tight font-bold text-[#010d3d]">
									{item.title}
								</p>
							</div>
						))}
					</div>
				</div>

				{buttonText && (
					<div className="flex justify-center mt-12">
						<button
							onClick={() => setOpenModal(true)}
							className="bg-[#010d3d] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#04176f] transition"
						>
							{buttonText}
						</button>
					</div>
				)}
			</div>

			{openModal && <Formulario onClose={() => setOpenModal(false)} />}
		</section>
	);
};

export default VentajasSection;
