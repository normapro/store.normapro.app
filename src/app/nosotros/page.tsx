import MainTestimoniosSection from "@/components/MainTestimoniosSection";
import CertificacionesSection from "@/components/landings/CertificacionesSection";
import TextSection from "@/components/landings/TextSection";
import HeroSection from "@/components/landings/HeroSection";
import ListHistoriaSection from "@/components/landings/ListHistoriaSection";
import  HistoriaTextSection  from "@/components/landings/HistoriaTextSection";
import HistoriaTextSection2 from "@/components/historiaTextSection2";
import ContactoFormSection from "@/components/ContactoFormSection";

export default function NosotrosPage() {
    return <>
         <HistoriaTextSection2 
            title="Conoce a NormaPro: Innovación, Eficiencia y Compromiso"
            claim={[
                "Impulsando la Transformación Digital en las Empresas"
            ]}
            image="reunion.jpg"
         />
        <HeroSection
            claim={[
                "Nuestra Historia",
            ]}
            pragma={[
                "NormaPro nació en el seno de Instituto de Innovación, Ciencia y Empresa con la visión de transformar la manera en que las empresas gestionan sus procesos internos. Desde nuestros  inicios, hemos crecido para convertirnos en líderes en soluciones tecnológicas empresariales, ayudando a innumerables empresas a optimizar sus operaciones y alcanzar nuevos niveles de eficiencia."
            ]}
            imgType="img"
            imgUrl="/InstitutoBlue.png"
            backgroundImg="CircleGray.png"
        />

        <section className="w-full bg-[#E7E7F0] py-20 px-6 md:px-12 lg:px-20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                <article>
                    <h2 className="text-[40px] md:text-[50px] font-black text-[#010d3d] leading-tight mb-8">
                        Mision
                    </h2>
                    <p className="text-[16px] md:text-[22px] font-[500] text-[#001B5D] leading-tight">
                        Nuestra mision es proporcionar soluciones tecnologicas avanzadas que
                        permitan a las empresas mejorar su eficiencia operativa, asegurar el
                        cumplimiento normativo y maximizar su rentabilidad.
                    </p>
                </article>

                <article>
                    <h2 className="text-[40px] md:text-[50px] font-black text-[#010d3d] leading-tight mb-8">
                        Vision
                    </h2>
                    <p className="text-[16px] md:text-[22px] font-[500] text-[#001B5D] leading-tight">
                        Ser reconocidos globalmente como una plataforma de referencia en
                        soluciones integrales para la gestion empresarial, impulsando la
                        innovacion y el exito sostenible de nuestros clientes.  
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
        <HistoriaTextSection 
            title="Nuestro equipo"
            claim={[
                "Detrás de NormaPro hay un equipo de profesionales apasionados y dedicados. Nuestro equipo combina experiencia en tecnología, consultoría empresarial y gestión de proyectos para ofrecer soluciones de alta calidad"
            ]}
            image="Todos-sin-casco.jpg"
        />
        <MainTestimoniosSection />
        <CertificacionesSection
            title="Calidad y seguridad certificada"
            subtitle="Nuestros productos y servicios cuentan con certificaciones reconocidas."
            images={["9001.png", "27001.png", "45001.png", "iqnet.png", "qaec.png", "ascom.png"]}
        />
        <TextSection
            background="white"
            level2={["Únete a nuestro equipo"]}
            level8={["¿Te apasiona la tecnología y la eficiencia empresarial? Únete a nosotros y forma parte de una empresa en constante crecimiento y evolución."]}
            buttonText="Ver ofertas de empleo"

        />

        <ContactoFormSection />


    </>
}