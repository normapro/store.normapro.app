
import InformesGridSection from "@/components/informes/InformesGridSection";

export default async function InformesPage() {
	return (
		<main className="w-full py-10 md:py-12">
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<header className="border-b border-gray-300 pb-4">
					<h1 className="text-3xl font-extrabold text-[#010d3d]">Informes</h1>
				</header>

				<InformesGridSection showOnlyLastThree={false} />
			</section>
		</main>
	);
}
