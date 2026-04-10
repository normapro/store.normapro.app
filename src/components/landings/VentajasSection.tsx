'use client';

import React, { FC, useState } from 'react';
import Formulario from '@/components/Formulario';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';;
import { 
	faAward,
	faChartLineUp,
	faHandshake,
	faPegasus,
	faTrophyStar
} from '@fortawesome/pro-duotone-svg-icons';

const iconMap: Record<string, any> = {
	'fa-chart-line-up': faChartLineUp,
	'fa-award': faAward,
	'fa-handshake': faHandshake,
	'fa-trophy-star': faTrophyStar,
	'fa-pegasus': faPegasus
}

type VentajaItem = {
	title: string;
	icon: string;
};

type Props = {
	title: string;
	highlightText?: string;
	claim: string;
	items: VentajaItem[];
	background?: 'white' | 'gray';
};

const VentajasSection: FC<Props> = ({
	title,
	highlightText,
	claim,
	items,
	background = 'gray',
}) => {
	const bgColor = background === 'gray' ? 'bg-[#f1f1f7]' : 'bg-white';

	return (
		<section className={`w-full py-16 md:py-20 px-6`}>
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
								<div className="text-[#010d3d] text-5xl mb-10">
									<FontAwesomeIcon icon={iconMap[item.icon]} className="fa-duotone" />
								</div>
								<p className="text-[20px] leading-tight font-bold text-[#010d3d]">
									{item.title}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default VentajasSection;
