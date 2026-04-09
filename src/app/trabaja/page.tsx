import ListHistoriaSection from "@/components/landings/ListHistoriaSection";
import HistoriaTextSection from "@/components/landings/HistoriaTextSection";
import HistoriaTextSection2 from "@/components/historiaTextSection2";
import ContactoFormSection from "@/components/ContactoFormSection";
import PartnersProgramsSection from "@/components/PartnersProgramsSection";
import PartnersTestimonialsSection from "@/components/PartnersTestimonialsSection";
import TextSection from "@/components/landings/TextSection";
import FaqSection from "@/components/landings/FaqSection";
import AccordionSection from "@/components/AccordionSection";
import CandidaturaFormSection from "@/components/CandidaturaFormSection";

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

        <AccordionSection
            title="Oportunidades Disponibles"
            items={[
                {
                    title: "Desarrollador(a) Senior Fullstack (Express, Angular, NodeJs)",
                    content: (
                        <>
                            <p>
                                Buscamos para trabajar en nuestro ecosistema NormaPro un Desarrollador Fullstack con
                                experiencia en el desarrollo de aplicaciones web tanto en el frontend como en el
                                backend. El candidato ideal sera un referente tecnico dentro del equipo y debera tener
                                un solido conocimiento de los estandares web y las tecnologias modernas.
                            </p>

                            <p className="mt-8 font-bold">Requisitos:</p>
                            <ul className="mt-4 list-disc space-y-2 pl-6">
                                <li><strong>Experiencia Laboral:</strong> Valorable en funcion de la experiencia demostrable en desarrollo web frontend y backend.</li>
                                <li><strong>Liderazgo Tecnico:</strong> Valorable experiencia en participacion como referente tecnico dentro de un equipo.</li>
                                <li><strong>Estandares Web:</strong> Valorable conocimiento sobre los estandares W3C, HTML5, CSS3, JavaScript, Web Components.</li>
                                <li><strong>Angular:</strong> Valorable experiencia con Angular.</li>
                                <li><strong>Node-js y Express:</strong> Valorable conocimientos en Node.js y Express, preferiblemente con experiencia en Typescript y NESTjs.</li>
                                <li><strong>Base de Datos:</strong> Valorable conocimiento de ANSI SQL y experiencia con MySQL.</li>
                                <li><strong>Control de Codigo:</strong> Valorable experiencia usando sistemas de control de codigo Git.</li>
                                <li><strong>Diseno de Interfaces:</strong> Comprension general de los principios de diseno de interfaces y experiencia de usuario.</li>
                            </ul>
                        </>
                    ),
                },
                {
                    title: "Consultor(a) NormaPro",
                    content: (
                        <>
                            <p>
                                En NormaPro, buscamos un/a Consultor/a con experiencia en la implementacion de
                                sistemas de gestion avanzados y automatizacion de procesos de negocio. Como parte de
                                nuestro equipo, seras responsable de ayudar a nuestros clientes a optimizar sus
                                operaciones mediante la implantacion de nuestras soluciones tecnologicas y servicios de
                                consultoria estrategica. Trabajaras directamente con empresarios y directivos para
                                identificar areas de mejora, desarrollar propuestas personalizadas y guiar la
                                implementacion de sistemas que promuevan el cumplimiento normativo y la eficiencia
                                operativa.
                            </p>
                            <p className="mt-4">
                                Tus responsabilidades incluiran la asesoria en procesos de cumplimiento normativo,
                                automatizacion de flujos de trabajo, gestion documental y formacion de equipos de
                                trabajo. Seras una pieza clave en el exito de nuestros clientes, ayudandoles a
                                implementar sistemas avanzados que generen resultados medibles y sostenibles.
                            </p>

                            <p className="mt-8 font-bold">Requisitos:</p>
                            <ul className="mt-4 list-disc space-y-2 pl-6">
                                <li>Titulacion universitaria en Ingenieria, Administracion de Empresas, Derecho o similar.</li>
                                <li>Experiencia minima de 3 anos en consultoria de procesos, sistemas de gestion (ISO 9001, ISO 27001, ISO 45001), automatizacion de procesos o cumplimiento normativo.</li>
                                <li>Conocimientos avanzados en plataformas digitales de gestion empresarial.</li>
                                <li>Capacidad para trabajar en entornos dinamicos y colaborar con equipos multidisciplinares.</li>
                                <li>Excelentes habilidades de comunicacion oral y escrita, con enfoque en la atencion al cliente y desarrollo de relaciones a largo plazo.</li>
                                <li>Capacidad para analizar y diagnosticar procesos internos de negocio y proponer soluciones tecnologicas innovadoras.</li>
                                <li>Experiencia demostrable en la gestion de proyectos y cumplimiento de objetivos.</li>
                                <li>Dominio del espanol y nivel intermedio/alto de ingles.</li>
                            </ul>

                            <p className="mt-8 font-bold">Se valorara:</p>
                            <ul className="mt-4 list-disc space-y-2 pl-6">
                                <li>Certificaciones en sistemas de gestion (ISO, compliance, entre otros).</li>
                                <li>Experiencia en el sector tecnologico o en la consultoria estrategica.</li>
                                <li>Conocimientos en automatización y modelado de procesos empresariales (BPM, ERP, etc.).</li>
                            </ul>
                        </>
                    ),
                },
            ]}
        />

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

        <ListHistoriaSection
            title="Nuestro Proceso de Selección"
            listStyle="numbered"
            claim={[
                "Nos esforzamos por hacer que nuestro proceso de selección sea justo y transparente. Aquí tienes una visión general de lo que puedes esperar:"
            ]}
            list={[
                {
                    title: "Solicitud",
                    claim: "Envía tu CV y una carta de presentación.",
                },
                {
                    title: "Entrevista Inicial",
                    claim: "Conversa con nuestro equipo de recursos humanos para conocerte mejor.",
                }, {
                    title: "Evaluación Técnica",
                    claim: "Demuestra tus habilidades a través de pruebas o entrevistas técnicas.",
                }, {
                    title: "Entrevista Final",
                    claim: "Reúnete con el equipo y los líderes de la empresa.",
                }, {
                    title: "Oferta",
                    claim: "Si eres seleccionado, recibirás una oferta formal para unirte a NormaPro.",
                }
            ]}
        />

        <CandidaturaFormSection />



    </>
}