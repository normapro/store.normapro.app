import type { Metadata } from "next";
import { pageMetadata } from "@/libs/seo";
import ListHistoriaSection from "@/components/landings/ListHistoriaSection";
import HistoriaTextSection2 from "@/components/historiaTextSection2";
import AccordionSection from "@/components/AccordionSection";
import CandidaturaFormSection from "@/components/CandidaturaFormSection";

export const metadata: Metadata = pageMetadata({ title: "Únete a nuestro equipo y forma parte de la revolución empresarial", description: "En NormaPro, buscamos a los mejores talentos para impulsar la innovación y la eficiencia en el mundo empresarial.", path: "/trabaja" });

export default function TrabajaPage() {
    return <>
        <div className="mt-20">
            <HistoriaTextSection2
                title="Únete a nuestro equipo y forma parte de la revolución empresarial"
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
                                backend. El candidato ideal será un referente técnico dentro del equipo y deberá tener
                                un sólido conocimiento de los estándares web y las tecnologías modernas.
                            </p>

                            <p className="mt-8 font-bold">Requisitos:</p>
                            <ul className="mt-4 list-['·_'] space-y-2 pl-6">
                                <li><strong>Experiencia Laboral:</strong> Valorable en función de la experiencia demostrable en desarrollo web frontend y backend.</li>
                                <li><strong>Liderazgo Técnico:</strong> Valorable experiencia en participación como referente técnico dentro de un equipo.</li>
                                <li><strong>Estándares Web:</strong> Valorable conocimiento sobre los estándares W3C, HTML5, CSS3, JavaScript, Web Components.</li>
                                <li><strong>Angular:</strong> Valorable experiencia con Angular.</li>
                                <li><strong>Node-js y Express:</strong> Valorable conocimientos en Node.js y Express, preferiblemente con experiencia en Typescript y NESTjs.</li>
                                <li><strong>Base de Datos:</strong> Valorable conocimiento de ANSI SQL y experiencia con MySQL.</li>
                                <li><strong>Control de Código:</strong> Valorable experiencia usando sistemas de control de código Git.</li>
                                <li><strong>Diseño de Interfaces:</strong> Comprensión general de los principios de diseño de interfaces y experiencia de usuario.</li>
                            </ul>
                            <a href="#candidatura" className="mt-8 inline-block font-bold underline underline-offset-4">Rellena el formulario para postular a este puesto</a>
                        </>
                    ),
                },
                {
                    title: "Consultor(a) NormaPro",
                    content: (
                        <>
                            <p>
                                En NormaPro, buscamos un/a Consultor/a con experiencia en la implementación de
                                sistemas de gestión avanzados y automatización de procesos de negocio. Como parte de
                                nuestro equipo, serás responsable de ayudar a nuestros clientes a optimizar sus
                                operaciones mediante la implantación de nuestras soluciones tecnológicas y servicios de
                                consultoría estratégica. Trabajarás directamente con empresarios y directivos para
                                identificar áreas de mejora, desarrollar propuestas personalizadas y guiar la
                                implementación de sistemas que promuevan el cumplimiento normativo y la eficiencia
                                operativa.
                            </p>
                            <p className="mt-4">
                                Tus responsabilidades incluirán la asesoría en procesos de cumplimiento normativo,
                                automatización de flujos de trabajo, gestión documental y formación de equipos de
                                trabajo. Serás una pieza clave en el éxito de nuestros clientes, ayudándoles a
                                implementar sistemas avanzados que generen resultados medibles y sostenibles.
                            </p>

                            <p className="mt-8 font-bold">Requisitos:</p>
                            <ul className="mt-4 list-['·_'] space-y-2 pl-6">
                                <li>Titulación universitaria en Ingeniería, Administración de Empresas, Derecho o similar.</li>
                                <li>Experiencia mínima de 3 años en consultoría de procesos, sistemas de gestión (ISO 9001, ISO 27001, ISO 45001), automatización de procesos o cumplimiento normativo.</li>
                                <li>Conocimientos avanzados en plataformas digitales de gestión empresarial.</li>
                                <li>Capacidad para trabajar en entornos dinámicos y colaborar con equipos multidisciplinares.</li>
                                <li>Excelentes habilidades de comunicación oral y escrita, con enfoque en la atención al cliente y desarrollo de relaciones a largo plazo.</li>
                                <li>Capacidad para analizar y diagnosticar procesos internos de negocio y proponer soluciones tecnológicas innovadoras.</li>
                                <li>Experiencia demostrable en la gestión de proyectos y cumplimiento de objetivos.</li>
                                <li>Dominio del español y nivel intermedio/alto de inglés.</li>
                            </ul>

                            <p className="mt-8 font-bold">Se valorará:</p>
                            <ul className="mt-4 list-['·_'] space-y-2 pl-6">
                                <li>Certificaciones en sistemas de gestión (ISO, compliance, entre otros).</li>
                                <li>Experiencia en el sector tecnológico o en la consultoría estratégica.</li>
                                <li>Conocimientos en automatización y modelado de procesos empresariales (BPM, ERP, etc.).</li>
                            </ul>
                            <a href="#candidatura" className="mt-8 inline-block font-bold underline underline-offset-4">Rellena el formulario para postular a este puesto</a>
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

        <div id="candidatura" className="scroll-mt-24">
            <CandidaturaFormSection />
        </div>



    </>
}