import ListHistoriaSection from "@/components/landings/ListHistoriaSection";
import HistoriaTextSection from "@/components/landings/HistoriaTextSection";
import HistoriaTextSection2 from "@/components/historiaTextSection2";
import ContactoFormSection from "@/components/ContactoFormSection";
import PartnersProgramsSection from "@/components/PartnersProgramsSection";
import PartnersTestimonialsSection from "@/components/PartnersTestimonialsSection";
import TextSection from "@/components/landings/TextSection";

export default function NosotrosPage() {
    return <>
        <div className="mt-20">
            <HistoriaTextSection2
                title="Únete a nuestro equipo y forma parte de la revolución empresarials"
                claim={[
                    "En NormaPro, buscamos a los mejores talentos para impulsar la innovación y la eficiencia en el mundo empresarial."
                ]}
            />
        </div>

        <ListHistoriaSection
            title="¿Por qué trabajar en NormaPro?"
            claim={[
                "En NormaPro, creemos que el éxito de nuestra empresa depende del talento y la pasión de nuestro equipo. Ofrecemos un entorno de trabajo dinámico, oportunidades de crecimiento profesional y la posibilidad de trabajar en proyectos que realmente marcan la diferencia."
            ]}
            list={[
                {
                    title: "Innovación Constante",
                    claim:
                        "Sé parte de un equipo que está a la vanguardia de la tecnología empresarial.",
                },
                {
                    title: "Desarrollo Profesional",
                    claim:
                        "Fomentamos el crecimiento personal y profesional a través de programas de formación continua y creación de oportunidades.",
                },
                {
                    title: "Cultura Colaborativa",
                    claim:
                        "Trabaja en un entorno inclusivo y colaborativo donde tus ideas son muy valoradas.",
                }
            ]}
        />

        <ListHistoriaSection
            title="Beneficios y ventajas"
            list={[
                {
                    title: "Flexibilidad Laboral",
                    claim:
                        "Horarios flexibles y opciones de trabajo remoto para apoyar un equilibrio saludable entre el trabajo y la vida personal.",
                },
                {
                    title: "Ambiente de Trabajo Positivo",
                    claim:
                        "Un entorno de trabajo amigable y motivador con eventos de equipo y actividades sociales.",
                }
            ]}
        />
       


    </>
}