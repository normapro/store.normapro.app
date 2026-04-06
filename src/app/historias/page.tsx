import ClientCarousel from "@/components/shared/ClientCarousel";
import HistoriasClientesSection from "@/components/landings/HistoriasClientesSection";


export default function HistoriasPage() {
	return (
		<main className="w-full py-12">
			<HistoriasClientesSection />
			<div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">
				<ClientCarousel
					scope="historias"
					claim="Empresas que ya confian en nosotros"
				/>
			</div>
		</main>
	);
}
