import ClientCarousel from "@/components/shared/ClientCarousel";
import HistoriasClientesSection from "@/components/landings/HistoriasClientesSection";


export default function HistoriasPage() {
	return (
		<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<HistoriasClientesSection />
			<ClientCarousel
				scope="historias"
				claim="Empresas que ya confian en nosotros"
			/>
		</main>
	);
}
