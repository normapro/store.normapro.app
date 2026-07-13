import MainTestimoniosSection from "@/components/MainTestimoniosSection";
import CertificacionesSection from "@/components/landings/CertificacionesSection";
import TextSection from "@/components/landings/TextSection";
import HeroSection from "@/components/landings/HeroSection";
import ListHistoriaSection from "@/components/landings/ListHistoriaSection";
import HistoriaTextSection from "@/components/landings/HistoriaTextSection";
import HistoriaTextSection2 from "@/components/historiaTextSection2";
import ContactoFormSection from "@/components/ContactoFormSection";
import HeaderSection from "@/components/HeaderSection";
import Image from "next/image";
import Link from "next/link";

export default function NosotrosPage() {
    return <>
        <HeaderSection text="Quiénes somos" variant="light" />

        <section className="w-full py-6 px-6 flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="flex flex-col items-center mb-12 w-full">
                <h2 className="text-[#010D3D] text-2xl md:text-[35px] font-black leading-tight mb-8">
                    Conoce a NormaPro: Innovación, Eficiencia y Compromiso
                </h2>
                <p className="text-[#7F859D] text-xl md:text-2xl font-black leading-relaxed">
                    Impulsando la Transformación Digital en las Empresas
                </p>
            </div>
            <div className="w-full">
                <img
                    src="/historiasclientes/reunion.jpg"
                    alt="Equipo Normapro"
                    className="w-full h-auto object-cover max-h-[600px]"
                />
            </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row items-center gap-12">
                {/* Texto */}
                <div className="md:w-1/2">
                    <h2 className="text-[#010D3D] text-[40px] font-black mb-6">
                        Nuestra Historia
                    </h2>
                    <p className="text-[#010D3D] text-base leading-relaxed">
                        NormaPro nació en el seno de <strong>Instituto de Innovación, Ciencia y Empresa</strong> con la visión de transformar la manera en que las empresas gestionan sus procesos internos. Desde nuestros inicios, hemos crecido para convertirnos en líderes en soluciones tecnológicas empresariales, ayudando a innumerables empresas a optimizar sus operaciones y alcanzar nuevos niveles de eficiencia.
                    </p>
                </div>
                {/* Imagen */}
                <div className="md:w-1/2 flex justify-center">
                    <div className="w-72 h-72 rounded-full bg-gray-100 flex items-center justify-center">
                        <div className="relative w-50 h-50">
                            <Image
                                src="/InstitutoBlue.png"
                                alt="Logo INICIE"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="w-full bg-[#E7E7F0] py-20 px-6 md:px-12 lg:px-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-60">
                <article>
                    <h2 className="text-[40px] md:text-[40px] font-black text-[#010d3d] leading-tight mb-8">
                        Misión
                    </h2>
                    <p className="text-sm md:text-base text-[#001B5D]">
                        Nuestra misión es proporcionar soluciones tecnológicas avanzadas que
                        permitan a las empresas mejorar su eficiencia operativa, asegurar el
                        cumplimiento normativo y maximizar su rentabilidad.
                    </p>
                </article>

                <article>
                    <h2 className="text-[40px] md:text-[40px] font-black text-[#010d3d] leading-tight mb-8">
                        Visión
                    </h2>
                    <p className="text-sm md:text-base text-[#001B5D]">
                        Ser reconocidos globalmente como una plataforma de referencia en
                        soluciones integrales para la gestión empresarial, impulsando la
                        innovación y el éxito sostenible de nuestros clientes.
                    </p>
                </article>
            </div>
        </section>

        <ListHistoriaSection
            title="Nuestros valores"
            titlelist="Ejemplo con un solo elemento"
            list={[
                {
                    title: "Innovación",
                    claim:
                        "Nos esforzamos por estar a la vanguardia de la tecnología, desarrollando soluciones innovadoras que anticipan y responden a las necesidades del mercado.",
                },
                {
                    title: "Compromiso",
                    claim:
                        "Nos comprometemos con el éxito de nuestros clientes, ofreciendo un servicio excepcional y apoyo continuo.",
                },
                {
                    title: "Integridad",
                    claim:
                        "Operamos con los más altos estándares de ética y transparencia, construyendo relaciones de confianza con nuestros clientes y socios.",
                },
                {
                    title: "Excelencia",
                    claim:
                        "Buscamos la excelencia en todo lo que hacemos, desde el desarrollo de productos hasta la atención al cliente.",
                }
            ]}
        />

        <section className="w-full py-6 px-6 flex flex-col items-start text-left max-w-4xl mx-auto">
            {/* Title y claim */}
            <h2 className="text-3xl md:text-[45px] font-black text-[#010d3d] mb-10 leading-tight">
                Nuestro equipo
            </h2>
            <div className="space-y-6 mb-12 w-full">
                <p
                    className="text-lg md:text-xl text-[#010d3d] font-medium leading-relaxed"
                >
                    Detrás de NormaPro hay un equipo de profesionales apasionados y dedicados. Nuestro equipo combina experiencia en tecnología, consultoría empresarial y gestión de proyectos para ofrecer soluciones de alta calidad
                </p>
            </div>
            <div className="w-full">
                <img
                    src="/historiasclientes/Todos-sin-casco.jpg"
                    alt="Equipo"
                    className="w-full h-auto object-cover max-h-[600px]"
                />
            </div>
        </section>


        <MainTestimoniosSection />
        <CertificacionesSection
            title="Calidad y seguridad certificada"
            subtitle="Nuestros productos y servicios cuentan con certificaciones reconocidas."
            images={["9001.png", "27001.png", "45001.png", "iqnet.png", "qaec.png", "ascom.png"]}
        />

        <section className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-[#010D3D] text-4xl font-black mb-6">
                Únete a nuestro equipo
            </h2>
            <p className="text-[#010D3D] text-base leading-relaxed mb-8">
                ¿Te apasiona la tecnología y la eficiencia empresarial? Únete a nosotros y forma parte de una empresa en constante crecimiento y evolución.
            </p>
            <Link
                href="/trabaja"
                className="inline-block bg-[#010D3D] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#04176f] transition"
            >
                Ver ofertas de empleo
            </Link>
        </section>

        <ContactoFormSection />


    </>
}