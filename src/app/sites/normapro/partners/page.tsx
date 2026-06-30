import ListHistoriaSection from "@/components/landings/ListHistoriaSection";
import HistoriaTextSection from "@/components/landings/HistoriaTextSection";
import HistoriaTextSection2 from "@/components/historiaTextSection2";
import ContactoFormSection from "@/components/ContactoFormSection";
import PartnersProgramsSection from "@/components/PartnersProgramsSection";
import PartnersTestimonialsSection from "@/components/PartnersTestimonialsSection";
import HeaderSection from "@/components/HeaderSection";

export default function NosotrosPage() {
    return <>
        <HeaderSection text="Programa de Partners" variant="light" />

        <section className="w-full py-6 px-6 flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="flex flex-col items-center mb-12 w-full">
                <h2 className="text-[#010D3D] text-2xl md:text-[35px] font-black leading-tight mb-8">
                    Alianzas estratégicas para el éxito mutuo
                </h2>
                <p className="text-[#7F859D] text-xl md:text-2xl font-black leading-relaxed">
                    Juntos impulsamos la Innovación y la Eficiencia empresarial
                </p>
            </div>
            <div className="w-full">
                <img
                    src="/historiasclientes/partners.png"
                    alt="Equipo Normapro"
                    className="w-full h-auto object-cover max-h-[600px]"
                />
            </div>
        </section>

        <section className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
            <h2 className="text-[#010D3D] text-[40px] font-black mb-8">
                Nuestra Red de Partners
            </h2>
            <p className="text-[#010D3D] text-base mb-8">
                En NormaPro, creemos en la fuerza de la colaboración. Nuestra red de partners incluye líderes en tecnología, consultoría y servicios empresariales que comparten nuestra misión de transformar y optimizar las operaciones empresariales.
            </p>
        </section>


        <ListHistoriaSection
            title="Beneficios de ser un Partner de NormaPro"
            list={[
                {
                    title: "Innovación conjunta",
                    claim:
                        "Colaboramos estrechamente con nuestros partners para desarrollar soluciones innovadoras que satisfagan las necesidades cambiantes del mercado.",
                },
                {
                    title: "Expansión del mercado",
                    claim:
                        "Aprovecha nuestra red global y nuestra reputación para acceder a nuevos mercados y oportunidades de negocio.",
                },
                {
                    title: "Soporte y Formación",
                    claim:
                        "Ofrecemos soporte técnico continuo y programas de formación para garantizar que nuestros partners tengan las herramientas necesarias para tener éxito.",
                },
                {
                    title: "Marketing conjunto",
                    claim:
                        "Participa en campañas de marketing conjuntas, eventos y promociones para aumentar la visibilidad y el alcance de nuestras soluciones.",
                }
            ]}
        />
        <PartnersTestimonialsSection
            title="Testimonios de Partners"
            testimonials={[
                {
                    quote: "Ser partner de NormaPro me ha permitido expandir mi negocio y ofrecer soluciones de vanguardia a nuestros clientes.",
                    name: "Diego Pardo",
                    details: [
                        "Consultor acreditado NormaPro",
                        "en gestion del cumplimiento",
                    ],
                },
                {
                    quote: "Como consultor de compliance penal con NormaPro, disfruto de un entorno de trabajo colaborativo y un apoyo constante que me permite ofrecer soluciones eficientes a los clientes. La plataforma transforma la gestion de riesgos y ayudan el cumplimiento normativo de manera impecable.",
                    name: "Fernando Martinez",
                    details: [
                        "Consultor acreditado NormaPro",
                        "en Compliance Penal",
                    ],
                },
            ]}
        />

        <PartnersProgramsSection
            title="Programas de Partner"
            description="Ofrecemos diferentes niveles de colaboracion para adaptarnos a las necesidades y capacidades de nuestros partners. Descubre cual es el mejor programa para tu empresa:"
            programs={[
                {
                    title: "Partner Tecnologico",
                    description: "Colabora en el desarrollo de nuevas tecnologias y soluciones innovadoras.",
                },
                {
                    title: "Partner de Implementacion",
                    description: "Ayuda a nuestros clientes a implementar y optimizar las soluciones NormaPro.",
                },
                {
                    title: "Partner de Distribucion",
                    description: "Promociona y vende nuestras soluciones en nuevos mercados.",
                },
            ]}
        />
        <ContactoFormSection />


    </>
}