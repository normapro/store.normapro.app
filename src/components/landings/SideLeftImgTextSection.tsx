'use client';

import { FC, useState } from 'react';
import Formulario from '@/components/Formulario';

type Props = {
	image: string;
	imgBackground?: string;
	title?: string;
	claim: string | string[];
	paragraphs?: string | string[];
	plagma?: string;
};

const SideLeftImgTextSection: FC<Props> = ({
	image,
	imgBackground,
	title,
	claim,
	paragraphs,
	plagma,
}) => {
	const [openModal, setOpenModal] = useState(false);

	const claimList = Array.isArray(claim)
		? claim
		: claim.split('\n\n').filter((text) => text.trim().length > 0);

	const paragraphList = Array.isArray(paragraphs)
		? paragraphs
		: typeof paragraphs === 'string'
			? paragraphs.split('\n\n').filter((text) => text.trim().length > 0)
			: [];

	return (
		<section className="max-w-7xl mx-auto w-full py-10 px-6 md:px-12">
			{title && (
				<h2 className="text-3xl md:text-[44px] leading-[1.05] tracking-tight font-black text-[#010d3d] max-w-3xl mx-auto mb-14 md:mb-16 text-center">
					{title}
				</h2>
			)}

			<div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 mt-2 md:mt-4">
			<div className="relative w-[290px] md:w-[500px] overflow-visible -mt-3 md:-mt-6">
				{imgBackground && (
					<img
						src={`/apps/${imgBackground}`}
						alt=""
						className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-none h-auto object-contain"
					/>
				)}
				<img
					src={`/apps/${image}`}
					alt="Imagen cabecera"
					className="relative z-10 h-[180px] md:h-[430px] object-contain"
				/>
			</div>

			<div className="max-w-xl">
				{plagma && (
					<p className="text-[13px] md:text-[15px] text-[#010D3D] mb-4 leading-relaxed">
						{plagma}
					</p>
				)}
				<div className="space-y-5 mb-5">
					{claimList.map((text, index) => (
						<p key={`claim-${index}`} className="text-[13px] md:text-[15px] font-bold text-[#010d3d] whitespace-pre-line leading-relaxed">
							{text}
						</p>
					))}
				</div>
				<div className="space-y-5">
					{paragraphList.map((paragraph, index) => (
						<p key={index} className="text-[13px] md:text-[15px] text-[#010d3d] whitespace-pre-line leading-relaxed">
							{paragraph}
						</p>
					))}
				</div>

			</div>
			</div>

		
		</section>
	);
};

export default SideLeftImgTextSection;
