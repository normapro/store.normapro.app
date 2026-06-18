import HeaderInstitutoSection from "@/components/HeaderInstitutoSection";
import Image from "next/image";
import { CertificacionesSection } from "@/components/landings";

const soluciones = [
    {
        image: "/Grupo6327@2x.png",
        imageAlt: "Programas de consultoría",
        title: "Programas de consultoría",
        description: "Nuestros programas exclusivos de consultoría (Mentoría), que proporcionan un asesoramiento personalizado y continuo.",
        links: [
            { text: "Programa avanzado de Cumplimiento normativo Técnico", href: "https://store.normapro.es/consultorias/cumplimiento-normativo?ref=instituto" },
            { text: "Programa avanzado de Compliance Penal", href: "https://store.normapro.es/consultorias/compliance-penal?ref=instituto" },
            { text: "Consultoría para automatización de procesos de negocio", href: "https://store.normapro.es/consultorias/automatizacion-procesos?ref=instituto" },
        ]
    },
    {
        image: "/icononormapro.png",
        imageAlt: "Tecnología NormaPro",
        title: "Tecnología NormaPro",
        description: "Nuestra Plataforma Digital NormaPro, que facilita la gestión y el control del sistema mediante la digitalización y la automatización.",
        links: [
            { text: "Ver más sobre la Plataforma NormaPro", href: "https://store.normapro.es/" },
        ]
    }
]

const pilares = [
    {
        prefix: "In",
        suffix: "novación",
        paragraphs: [
            "La plataforma NormaPro es un conjunto de soluciones Cloud desarrollado 100% por Instituto de Innovación, Ciencia y Empresa están perfectamente integradas entre sí y te ayudarán a mejorar la operativa de tu compañía independientemente del lugar donde tus empleados trabajen.",
            "Se ha diseñado con la idea de que sea un instrumento de uso cotidiano para todas las personas implicadas en los procesos. Sus herramientas permiten simplificar, estandarizar y automatizar todos los procesos minimizando los costes de adaptación y aprovechando los sistemas y datos ya existentes."
        ]
    },
    {
        prefix: "In",
        suffix: "vestigación",
        paragraphs: [
            "Queremos ayudar a las empresas a que cuenten con los sistemas más fiables que aporten valor y seguridad a la propia organización a la vez que sus procesos internos entran en una espiral de mejora continua que contribuyan de manera significativa a conseguir los mejores resultados.",
            "Tenemos un continuo afán de descubrimiento exclusivas metodologías que funcionen, dirigidas a empresarios y directivos de éxito y con la que implementar, paso a paso, modelos con los que puedan conseguir que todas las personas de su organización conozcan cuál es su papel, su responsabilidad e interioricen hábitos de eficacia y eficiencia en los procesos productivos."
        ]
    },
    {
        prefix: "In",
        suffix: "formación",
        paragraphs: [
            "Creemos que la innovación y la investigación genera conocimiento y que el crecimiento, tanto el empresarial como el de la sociedad en general, depende de que este sea compartido.",
            "Diseñamos programas formativos para poder consumar un proceso de dominio absoluto de nuestras metodologías que aportan a nuestros clientes la posibilidad de implementar estrategias y hábitos que producen cambios extraordinarios en la gestión diaria de sus empresas."
        ]
    }
];

export default function QueHacemosPage() {
    return (
        <>
            <HeaderInstitutoSection text="¿Qué hacemos?" variant="dark" />

            <section className="w-full" style={{ background: "linear-gradient(to bottom, #010D3D 60%, white 50%)" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row gap-50 items-center">
                    <div className="md:w-1/3 flex items-start">
                        <h2 className="text-white text-5xl md:text-6xl font-black leading-tight">
                            Consultoría especializada
                        </h2>
                    </div>
                    <div className="md:w-2/3 flex flex-col gap-4">
                        <p className="text-white font-bold text-xl md:text-2xl">
                            Ayudamos a las organizaciones a ser más eficientes mediante sistemas avanzados de gestión y automatización de procesos.
                        </p>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                    <div className="w-full h-[400px] relative">
                        <Image
                            src="/instituto/que-hacemos/que-hacemos.jpg"
                            alt="Consultoría especializada"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row text-[#010D3D] gap-4">
                <p>
                    La misión de Instituto de INNOVACIÓN, CIENCIA y ESMPRESA es acompañar a las organizaciones que quieren <strong>mejorar sus resultados,</strong> ya sea implementando completos sistemas de gestión basados en normas internacionales ISO, o bien ajustando y automatizando procesos concretos de su negocio con tecnología propia.
                </p>
                <p>
                    Con nuestra innovadora metodología, ayudamos a nuestros clientes a optimizar sus procesos, reducir costes, aumentar la calidad de sus productos o servicios, satisfacer a sus clientes y cumplir con las normas vigentes. Nuestro equipo cuenta con <strong>más de 30 años de experiencia</strong> en la presentación de servicios de consultoría.
                </p>
            </section>

            {/* Soluciones */}
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-[#010D3D] text-3xl md:text-4xl font-black mb-4">Soluciones</h2>
                    <p className="text-[#010D3D] text-base">Nuestras soluciones se sustentan en dos elementos fundamentales:</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {soluciones.map((solucion) => (
                        <div
                            key={solucion.title}
                            className="bg-gray-100 rounded-2xl p-10 flex flex-col items-center text-center gap-6"
                        >
                            <div className="w-36 h-36 relative">
                                <Image
                                    src={solucion.image}
                                    alt={solucion.imageAlt}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-[#010D3D] text-4xl font-black">{solucion.title}</h3>
                            <p className="text-[#010D3D] text-base leading-relaxed">{solucion.description}</p>
                            <div className="flex flex-col gap-2">
                                {solucion.links.map((link) => (
                                    <a
                                        key={link.text}
                                        href={link.href}
                                        className="text-[#010D3D] font-bold text-base underline underline-offset-4 hover:opacity-70 transition"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link.text}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Certificaciones */}
            <CertificacionesSection
                title="Calidad y seguridad certificada"
                pragma="Un modelo de consultoría original con el software más avanzado"
                images={["9001.png", "27001.png", "45001.png", "iqnet.png", "ascom.png", "qaec.png"]}
            />

            {/* Pilares */}
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-[#010D3D] text-3xl md:text-4xl font-black text-center mb-16">
                    Nuestros 3 pilares
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {pilares.map((pilar) => (
                        <div key={pilar.suffix}>
                            <h3 className="text-[#010D3D] text-2xl mb-3">
                                {pilar.prefix}<span className="font-black">{pilar.suffix}</span>
                            </h3>
                            <hr className="border-t border-[#010D3D]/30 mb-6" />
                            <div className="flex flex-col gap-4">
                                {pilar.paragraphs.map((p, i) => (
                                    <p key={i} className="text-[#010D3D] text-base leading-relaxed">
                                        {p}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}