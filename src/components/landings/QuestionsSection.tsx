'use client';

import { FC, useState } from 'react';
import Formulario from '@/components/Formulario';

type Props = {
	title?: string;
	intro?: string | string[];
	preQuestionsText?: string;
	questions?: string[];
	bigMarkText?: string;
	buttonText?: string;
	background?: 'white' | 'gray';
};

const cardOffsets = [
	'md:-translate-x-24',
	'md:translate-x-16',
	'md:-translate-x-18',
	'md:translate-x-22',
	'md:-translate-x-12',
	'md:translate-x-20',
];

const QuestionsSection: FC<Props> = ({
	title,
	intro,
	preQuestionsText,
	questions,
	bigMarkText = '?',
	buttonText,
	background = 'white',
}) => {
	const [openModal, setOpenModal] = useState(false);

	const bgColor = background === 'gray' ? 'bg-[#f1f1f7]' : 'bg-white';
	const introList = Array.isArray(intro)
		? intro
		: typeof intro === 'string'
			? intro.split('\n\n').filter((text) => text.trim().length > 0)
			: [];

	return (
		<section className={`w-full py-12 px-6 ${bgColor}`}>
			<div className="max-w-4xl mx-auto">
				{title && (
					<h2 className="text-[34px] md:text-[52px] leading-[1.08] tracking-tight font-black text-[#010d3d] mb-8 text-left">
						{title}
					</h2>
				)}

				<div className="space-y-5 mb-8">
					{introList.map((text, index) => (
						<p key={index} className="text-[13px] md:text-[17px] leading-relaxed text-[#010d3d]">
							{text}
						</p>
					))}
				</div>

				{preQuestionsText && (
					<p className="text-[15px] md:text-[24px] font-semibold text-[#7d839b] mb-8">
						{preQuestionsText}
					</p>
				)}

				<div className="space-y-7 md:space-y-10">
					{(questions || []).map((question, index) => (
						<div
							key={index}
							className={`w-full flex justify-center ${cardOffsets[index % cardOffsets.length]} transition-transform`}
						>
							<div className="bg-[#e8eaf0] rounded-lg px-3 md:px-4 py-3 flex items-start gap-2 md:gap-3 w-fit max-w-full md:max-w-[72%]">
								<span className="text-[#c9cdd9] text-[64px] md:text-[86px] leading-none font-black shrink-0 -mt-1">
									{bigMarkText}
								</span>
								<p className="text-[11px] md:text-[17px] leading-snug text-[#010d3d] pt-2 max-w-[440px] font-semibold">
									{question}
								</p>
							</div>
						</div>
					))}
				</div>

				{buttonText && (
					<div className="flex justify-center mt-10">
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

export default QuestionsSection;
