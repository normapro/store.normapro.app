'use client'

import ClientCarousel from "@/components/shared/ClientCarousel";
import HistoriasClientesSection from "@/components/landings/HistoriasClientesSection";
import Formulario from "@/components/Formulario";
import { useState } from "react";
import HeroUserCount from "@/components/HeroUserCount";


export default function HistoriasPage() {
	const [openModal, setOpenModal] = useState(false);
	return (
		<main className="w-full py-12">
			<HistoriasClientesSection />
			<HeroUserCount></HeroUserCount>
			<ClientCarousel
				scope="historias"
				claim=""
			/>
			<div className="flex justify-center">
				<button
					onClick={() => setOpenModal(true)}
					className="bg-[#010d3d] text-white font-bold px-6 py-3 rounded-xl shadow-md hover:bg-[#04176f] transition"
				>
					Contacta ahora y analizaremos tu caso
				</button>
			</div>
			{/* Formulario contacto */}
			{openModal && (
				<Formulario onClose={() => setOpenModal(false)} />
			)}
		</main>
	);
}
