import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MultipleEtapasSection from "@/components/landings/MultipleEtapasSection";

const meta: Meta<typeof MultipleEtapasSection> = {
    title: "Landings/MultipleEtapasSection",
    component: MultipleEtapasSection,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Seccion de texto reutilizable para landings. Permite combinar niveles de texto con diferentes colores y una imagen final.",
            },
        },
    },
    argTypes: {
        title: {
            description: "Título principal de la sección.",
            control: "text",
        },
        subtitle: {
            description: "Subtítulo opcional ubicado debajo del título principal.",
            control: "text",
        },
        claim: {
            description: "Texto descriptivo o de introducción general para la sección.",
            control: "text",
        },
        selectorTitle: {
            description: "Texto que actúa como llamada a la acción o título justo encima de las tarjetas de selección.",
            control: "text",
        },
        options: {
            description: "Array de opciones disponibles. Cada opción configura su propia tarjeta de selección, títulos internos, bloque destacado central y su correspondiente línea de tiempo de etapas.",
            control: "object",
        },
    },
};

export default meta;
type Story = StoryObj<typeof MultipleEtapasSection>;

export const Practico: Story = {
    args: {
        "title": "¿Listo para llevar el Compliance penal de tu empresa al siguiente nivel?",
        "claim": "Aquí tienes los contenidos del programa. Es el que utilizan los empresarios y Compliance Officers de éxito y con el que implementarás un modelo con el que conseguirás que todas las personas de tu organización conozcan cuál es su papel y su responsabilidad e interioricen hábitos de cumplimiento en sus procesos productivos.",
        "selectorTitle": "Elije la opción en la que mejor encaje tu caso:",
        "options": [
            {
                "pretitle": "Para empresas pequeñas o emergentes",
                "title": "Nivel Básico",
                "claim": "¿Tienes menos de 100 empleados y buscas cumplir con los requisitos legales esenciales?",
                "image": "IICE_LandingCompliancePenal_icono1.png",
                "imgBackground": "hielo2.png",
                "cardButtonText": "Empieza con lo esencial",
                "introTitle": "Protege tu negocio, sin complicaciones",
                "introClaim": [
                    "Sabemos que no tienes tiempo ni recursos para lidiar con procesos complejos. Por eso, queremos ser tu aliado para que cumplas con la ley de la forma más sencilla y directa posible.",
                    "Tras años de investigación y experiencia en el campo del Compliance penal, en Instituto de Innovación, Ciencia y Empresa hemos desarrollado un programa estructurado en 6 etapas.",
                    "Nos enorgullece decir que es un método probado que ha permitido a numerosas organizaciones, al igual que la tuya, operar con la confianza de que están protegidas y en pleno cumplimiento legal."
                ],
                "etapas": [
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_1.png",
                        "title": "Primeros pasos",
                        "objective": "Objetivo: Crear un sistema de Compliance simplificado que se adapte perfectamente a tu pequeña empresa, garantizando una operación segura y alineada con la ley, sin complicaciones.",
                        "list": [
                            {
                                "title": "Comprendiendo tu Empresa",
                                "content": "Estudiaremos la esencia de tu negocio, la estructura organizacional y cómo tomas decisiones. Esto nos permitirá ofrecerte una estrategia de Compliance personalizada. Sabemos que cada empresa es única y, por ello, te proporcionaremos soluciones hechas a medida, asegurándonos de que entiendas y te sientas cómodo con cada paso del proceso."
                            },
                            {
                                "title": "Plataforma NormaPro",
                                "content": "Simplificaremos nuestro sistema de Compliance. Te mostraremos cómo NormaPro puede adaptarse a tus necesidades específicas, garantizando un uso intuitivo y eficiente. Además, te formaremos para que saques el máximo provecho de ella, optimizando recursos y tiempo."
                            },
                            {
                                "title": "Definiendo tu Estructura de Compliance",
                                "content": "Te ayudaremos a esbozar una estructura de Compliance sencilla pero robusta, definiendo roles claros. Incluso en una pequeña empresa, es esencial saber quién es responsable de qué. Además, te asesoraremos sobre el perfil ideal del Compliance Officer para tu empresa, garantizando que cuentes con una figura que vigile y gestione los retos del cumplimiento."
                            },
                            {
                                "title": "Tranquilidad y Seguridad",
                                "content": "Más que implementar un sistema, te ofrecemos la seguridad de estar respaldado en cada decisión. Estaremos a tu lado, asegurando que estés siempre al tanto de cómo se gestiona el cumplimiento en tu empresa. Te permitimos centrarte en lo que mejor sabes hacer, mientras cuidamos de que todo esté en orden y conforme a la ley."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_2.svg",
                        "title": "Evaluación y planificación",
                        "objective": "Objetivo: Descubrir tus áreas vulnerables, fortalecer tus defensas y trazar una hoja de ruta clara, todo con el propósito de asegurar un negocio resiliente y alineado con la ley.",
                        "list": [
                            {
                                "title": "Descubrimiento de Riesgos y Refuerzo",
                                "content": "Haremos un análisis exhaustivo de tu negocio para identificar posibles riesgos penales. No solo te ofreceremos una visión clara de las posibles áreas vulnerables, sino que también potenciaremos los controles que ya tienes en marcha. Al optimizar tus defensas existentes, estarás más preparado y seguro, permitiendo que tu negocio opere con mayor tranquilidad y confianza."
                            },
                            {
                                "title": "Diseño personalizado de Controles y Roles",
                                "content": "Crearemos una estructura de controles hecha a la medida de tu negocio y clarificaremos roles y responsabilidades. Con cada tarea y función bien definida, tu flujo de trabajo será más claro, lo que se traduce en decisiones más rápidas y efectivas. Además, este diseño garantizará que estés minimizando riesgos y actuando conforme a la Ley."
                            },
                            {
                                "title": "Mapa visual y Hoja de ruta anual",
                                "content": "Te proporcionaremos una representación visual de tus riesgos y una hoja de ruta clara para tus actividades de Compliance durante todo el año. Esta combinación te permitirá priorizar acciones, asignar recursos eficientemente y tener un control firme sobre tus objetivos. Podrás centrarte en lo que mejor sabes hacer: crecer tu negocio con la seguridad de estar bien respaldado."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_3.svg",
                        "title": "Políticas e información documentada",
                        "objective": "Objetivo: Documentar y organizar de manera clara y accesible todos los aspectos del Compliance, garantizando coherencia, transparencia y eficiencia en nuestras acciones.",
                        "list": [
                            {
                                "title": "Código ético",
                                "content": "Crearemos o perfeccionaremos tu código ético para que refleje la esencia y los valores de tu empresa que ayude a fortalecer tu imagen corporativa, inspire confianza y garantice que todos en la organización se rijan por principios y valores alineados."
                            },
                            {
                                "title": "Políticas",
                                "content": "Definiremos políticas claras que marquen las pautas de actuación en diversas áreas de la empresa. Facilitarás la toma de decisiones, reducirás ambigüedades y asegurarás un funcionamiento coherente y conforme a los estándares que deseas mantener."
                            },
                            {
                                "title": "Organización en NormaPro",
                                "content": "Configuraremos esta herramienta para que se ajuste perfectamente a tus necesidades. NormaPRO te permitirá acceder de manera rápida y eficiente a la información crucial, optimizando tiempo y garantizando que todas las tareas de Compliance estén siempre al alcance de tu mano."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_4.svg",
                        "title": "Canal interno de información (Canal de denuncias)",
                        "objective": "Objetivo: Establecer un sistema de reporte y respuesta para proteger la integridad de la empresa y fomentar una cultura de responsabilidad y transparencia.",
                        "list": [
                            {
                                "title": "Canal interno de comunicación (Canal de denuncias)",
                                "content": "Pondremos en marcha un sistema que permita el reporte de cualquier irregularidad. Esta herramienta refuerza la transparencia y la confianza, demostrando a empleados, clientes y proveedores que te tomas en serio la integridad y el buen gobierno corporativo."
                            },
                            {
                                "title": "Proceso interno",
                                "content": "Definiremos una metodología para gestionar y resolver las denuncias de manera efectiva de acuerdo a la Ley 2/2023 que requiere un proceso bien estructurado. De esta forma aseguras una respuesta oportuna y adecuada a cada situación, minimizando impactos negativos y fortaleciendo la cultura de integridad en tu organización."
                            },
                            {
                                "title": "Tolerancia cero",
                                "content": "Estableceremos un enfoque estricto contra cualquier tipo de incumplimiento. Con esta postura, no solo proteges a tu empresa de posibles sanciones o daños a su reputación, sino que también atraes y retienes a aquellos empleados y socios que valoran y respetan un ambiente laboral ético y profesional."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_5.svg",
                        "title": "Formación, Comunicación y Sensibilización",
                        "objective": "Objetivo: Integrar activamente el Compliance en las operaciones y mentalidad de la empresa, asegurando una comprensión y compromiso profundos a todos los niveles",
                        "list": [
                            {
                                "title": "Formación",
                                "content": "Brindaremos formación integral a tu equipo, asegurando que todos comprendan y se comprometan con las prácticas de cumplimiento. Un equipo bien formado reduce los errores de cumplimiento y fortalece la cultura organizacional, lo que a su vez mejora la reputación y confianza de la empresa en el mercado."
                            },
                            {
                                "title": "Comunicación",
                                "content": "Trabajaremos en optimizar los canales de comunicación interna de tu empresa. Esto incluirá la creación o mejora de protocolos de comunicación para que toda tu organización esté alineada y bien informada sobre las políticas y procedimientos de Compliance. Reducirás las probabilidades de malentendidos o fallos en el cumplimiento, y garantizarás una aplicación coherente y uniforme de las políticas."
                            },
                            {
                                "title": "Sensibilización",
                                "content": "Implementaremos actividades orientadas a generar conciencia sobre la importancia del Compliance. Más que simples reglas, queremos que tu equipo entienda el valor y la relevancia de actuar correctamente. Cultivar una cultura empresarial consciente aumenta la protección y reduce los riesgos."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_2.svg",
                        "title": "Mejora continua del sistema",
                        "objective": "Objetivos: Generaremos informes anuales detallados que reflejan la salud y eficacia de tus prácticas de Compliance, identificando áreas de mejora.",
                        "list": [
                            {
                                "title": "No conformidades",
                                "content": "Identificaremos y analizaremos los errores, convirtiéndolos en oportunidades de mejora. No solo minimizarás riesgos futuros, sino que fortalecerás la resiliencia y adaptabilidad de tu empresa, ganando confianza y credibilidad en el mercado."
                            },
                            {
                                "title": "Memoria anual",
                                "content": "Facilitaremos la revisión y recapitulación de tus esfuerzos en Compliance a lo largo del año. Esto te permitirá tener una perspectiva clara del progreso, reconociendo logros y áreas de mejora, lo que facilitará la toma de decisiones y el diseño de estrategias más eficientes."
                            },
                            {
                                "title": "Nuevos objetivos",
                                "content": "Os ayudaremos a definir y alcanzar nuevas metas en vuestro programa de Compliance. Es la mejor forma de garantizar un crecimiento sostenido y una adaptación continua a los desafíos del cumplimiento, posicionando a tu empresa como líder y referente en el sector."
                            }
                        ]
                    }
                ]
            },
            {
                "pretitle": "Para empresas en crecimiento",
                "title": "Nivel Avanzado",
                "claim": "¿Listo para una estrategia de compliance que proteja eficazmente tu reputación y minimice riesgos?",
                "image": "IICE_LandingCompliancePenal_icono2.png",
                "imgBackground": "hielo1.png",
                "cardButtonText": "Potencia tu estrategia de Compliance",
                "introTitle": "Tu tranquilidad es nuestra misión",
                "introClaim": [
                    "Sabemos que liderar o gestionar una empresa en crecimiento presenta desafíos únicos, especialmente cuando se trata de asegurar el cumplimiento penal. ¿Estás preocupado por la reputación de tu empresa, la posible falta de claridad en procedimientos o el temor a sanciones?",
                    "Con nuestro Modelo Avanzado de Compliance Penal NormaPro, hemos diseñado una ruta clara y estructurada, paso a paso, para guiarte de inicio a fin. Cada paso ha sido cuidadosamente diseñado basado en años de investigación y experiencia práctica.",
                    "Si seguimos juntos este camino, te aseguramos que llegaremos a la meta de forma exitosa, cumpliendo todos los estándares y protegiendo tu negocio."
                ],
                "etapas": [
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel2_1.svg",
                        "title": "Primeros pasos",
                        "objective": "Objetivo: Establecer un fundamento firme adaptándonos a la esencia de tu negocio y garantizando alineación y compromiso total en la gestión del Compliance.",
                        "list": [
                            {
                                "title": "Compromiso de la dirección",
                                "content": "Lo primero es lo primero. Vamos a asegurarnos de que los líderes de tu empresa estén completamente alineados y comprometidos con el programa de Compliance. Un equipo comprometido reduce el riesgo de malas prácticas."
                            },
                            {
                                "title": "Conociendo tu organización",
                                "content": "Nos sumergiremos en el corazón de tu negocio, revisando documentos y procesos, es la única forma de adaptar soluciones de Compliance que se alineen perfectamente con tus objetivos y forma de trabajar."
                            },
                            {
                                "title": "Formación inicial sobre NormaPro",
                                "content": "Te guiaremos en la integración de NormaPRO, demostrándote su potencial. Al adaptar la plataforma a tu empresa, disfrutarás de una herramienta que no sólo te ayuda a asegurar el cumplimiento, sino que también simplifica procesos y optimiza recursos."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel2_2.svg",
                        "title": "La Organización y la toma de Decisiones",
                        "objective": "Objetivo: Analizar la estructura y dinámica de decisiones de tu empresa para incorporar una estrategia de Compliance coherente y personalizada.",
                        "list": [
                            {
                                "title": "Tu organigrama al detalle",
                                "content": "Estudiaremos tu estructura organizacional, comprendiendo cómo se distribuyen roles y responsabilidades. Esto nos permitirá identificar posibles puntos de mejora y optimizar flujos de trabajo, lo que se traduce en operaciones más ágiles y eficientes."
                            },
                            {
                                "title": "Entendiendo tus protocolos y a tus líderes de cumplimiento",
                                "content": "Profundizaremos en tu forma de tomar decisiones y en la identificación de las personas esenciales en cada área. De esa forma, podremos ayudarte a diseñar estrategias de Compliance más alineadas y efectivas, fortaleciendo la integridad de tu negocio."
                            },
                            {
                                "title": "Configurando NormaPro a tu medida",
                                "content": "Personalizaremos la herramienta para que sea el complemento perfecto de tu operación. Con NormaPro adaptado a tu realidad, garantizarás un uso más intuitivo, eficiente y que realmente se ajuste a tus desafíos y necesidades específicas, ahorrando tiempo y esfuerzos."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel2_3.svg",
                        "title": "La función de Compliance",
                        "objective": "Objetivo: Establecer y financiar una estructura clara de Compliance, asegurando su correcta regulación y operatividad.",
                        "list": [
                            {
                                "title": "Órgano de Compliance",
                                "content": "No solo ayudaremos a esbozar la estructura perfecta, sino también a definir su misión y visión. Con un órgano de Compliance estructurado y con una dirección clara, tu empresa contará con una base sólida para abordar y gestionar los retos de cumplimiento, aportando mayor seguridad y confianza en tu operativa."
                            },
                            {
                                "title": "Compliance Officer",
                                "content": "Te asesoraremos en la elección del perfil más adecuado, definiendo sus tareas y competencias esenciales. Disponer de un Compliance Officer con las capacidades y habilidades adecuadas, garantizarás un seguimiento meticuloso y eficiente de los protocolos, minimizando riesgos y protegiendo la reputación de tu empresa."
                            },
                            {
                                "title": "Gestión Integral de Compliance",
                                "content": "No solo garantizaremos que cuentes con todo lo necesario en términos de recursos, sino que además te brindaremos actualizaciones constantes. Estarás siempre al tanto de cómo se está gestionando el cumplimiento en tu empresa, lo que te permitirá tomar decisiones informadas y mantener la tranquilidad de saber que estás en manos expertas y que todo marcha según lo planeado."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel2_4.svg",
                        "title": "La Evaluación de Riesgos Penales",
                        "objective": "Objetivo: Identificar, evaluar y visualizar los riesgos penales para fortalecer la resiliencia y protección de tu negocio.",
                        "list": [
                            {
                                "title": "Identificación de riesgos",
                                "content": "Adentrándonos en cada aspecto de tu negocio, detectaremos posibles riesgos penales. Tendrás una visión clara de tus áreas vulnerables, lo que te permitirá tomar decisiones más informadas y proactivas para proteger tu negocio. Con un entendimiento profundo de tu operación, estarás en una posición más fuerte para prevenir problemas antes de que surjan."
                            },
                            {
                                "title": "Controles actuales",
                                "content": "Analizaremos las medidas y protocolos que ya tienes en marcha. Al optimizar tus controles existentes, maximizarás la eficiencia y eficacia de tus recursos, asegurándote de que cada esfuerzo en cumplimiento tenga un impacto positivo directo en tu negocio."
                            },
                            {
                                "title": "Evaluación y mapa de riesgos",
                                "content": "Crearemos una representación visual clara de tus riesgos y tu nivel de exposición. Un mapa de riesgos te permitirá priorizar acciones, asignar recursos de manera más eficiente y asegurarte de que todos en la organización comprendan y se alineen con las áreas clave de enfoque en cumplimiento."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_2.svg",
                        "title": "Plan de Acción de Compliance",
                        "objective": "Objetivo: Establecer estructuras, roles y una hoja de ruta clara para asegurar un cumplimiento eficiente y proteger proactivamente tu negocio.",
                        "list": [
                            {
                                "title": "Controles",
                                "content": "Juntos diseñaremos una estructura de controles que se adaptará a la medida de tu negocio. Podrás operar con mayor tranquilidad, sabiendo que estás minimizando tus riesgos y asegurando una operación más transparente y conforme a la ley."
                            },
                            {
                                "title": "Distribución de tareas",
                                "content": "Clarificaremos roles y responsabilidades dentro de tu organización. Cada tarea y función estarán claramente definidas, evitarás duplicidades y potenciarás la eficiencia, lo que se traduce en un flujo de trabajo más fluido y una toma de decisiones más rápida y efectiva."
                            },
                            {
                                "title": "Planning anual",
                                "content": "Estableceremos una hoja de ruta clara para tus actividades de Compliance a lo largo del año. Con un plan anual bien definido, podrás anticiparte a retos y asegurarte de que todos los aspectos del cumplimiento se manejen en tiempo y forma. Esto te proporcionará una visión y control más claros de tus objetivos, permitiendo que te enfoques en crecer tu negocio con la confianza de que estás en el camino correcto."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_3.svg",
                        "title": "Información Documentada de Compliance",
                        "objective": "Objetivo: Documentar y organizar de manera clara y accesible todos los aspectos del Compliance, garantizando coherencia, transparencia y eficiencia en nuestras acciones.",
                        "list": [
                            {
                                "title": "Código ético",
                                "content": "Crearemos o perfeccionaremos tu código ético para que refleje la esencia y los valores de tu empresa que ayude a fortalecer tu imagen corporativa, inspire confianza y garantice que todos en la organización se rijan por principios y valores alineados."
                            },
                            {
                                "title": "Políticas",
                                "content": "Definiremos políticas claras que marquen las pautas de actuación en diversas áreas de la empresa. Facilitarás la toma de decisiones, reducirás ambigüedades y asegurarás un funcionamiento coherente y conforme a los estándares que deseas mantener."
                            },
                            {
                                "title": "Organización en NormaPro",
                                "content": "Configuraremos esta herramienta para que se ajuste perfectamente a tus necesidades. NormaPRO te permitirá acceder de manera rápida y eficiente a la información crucial, optimizando tiempo y garantizando que todas las tareas de Compliance estén siempre al alcance de tu mano."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_4.svg",
                        "title": "Denunciar y Sancionar",
                        "objective": "Objetivo: Establecer sistemas robustos de reporte y respuesta para proteger la integridad de la empresa y fomentar una cultura de responsabilidad y transparencia.",
                        "list": [
                            {
                                "title": "Canal interno de comunicación (Canal de denuncias)",
                                "content": "Pondremos en marcha un sistema que permita el reporte de cualquier irregularidad. Esta herramienta refuerza la transparencia y la confianza, demostrando a empleados, clientes y proveedores que te tomas en serio la integridad y el buen gobierno corporativo."
                            },
                            {
                                "title": "Proceso interno",
                                "content": "Definiremos una metodología para gestionar y resolver las denuncias de manera efectiva de acuerdo a la Ley 2/2023 que requiere un proceso bien estructurado. De esta forma aseguras una respuesta oportuna y adecuada a cada situación, minimizando impactos negativos y fortaleciendo la cultura de integridad en tu organización."
                            },
                            {
                                "title": "Tolerancia cero",
                                "content": "Estableceremos un enfoque estricto contra cualquier tipo de incumplimiento. Con esta postura, no solo proteges a tu empresa de posibles sanciones o daños a su reputación, sino que también atraes y retienes a aquellos empleados y socios que valoran y respetan un ambiente laboral ético y profesional."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_5.svg",
                        "title": "Formación, Comunicación y Sensibilización",
                        "objective": "Objetivo: Integrar activamente el Compliance en las operaciones y mentalidad de la empresa, asegurando una comprensión y compromiso profundos a todos los niveles.",
                        "list": [
                            {
                                "title": "Formación",
                                "content": "Brindaremos formación integral a tu equipo, asegurando que todos comprendan y se comprometan con las prácticas de cumplimiento. Un equipo bien formado reduce los errores de cumplimiento y fortalece la cultura organizacional, lo que a su vez mejora la reputación y confianza de la empresa en el mercado."
                            },
                            {
                                "title": "Uso de NormaPro",
                                "content": "Instruiremos a tu personal en la utilización efectiva de NormaPRO. Al optimizar el uso de la plataforma, garantizas una gestión más eficiente y coherente del cumplimiento, lo que se traduce en menos errores y mayor productividad. Estudiaremos la esencia de tu negocio, la estructura organizacional y cómo tomas decisiones. Esto nos permitirá ofrecerte una estrategia de Compliance personalizada. Sabemos que cada empresa es única y, por ello, te proporcionaremos soluciones hechas a medida, asegurándonos de que entiendas y te sientas cómodo con cada paso del proceso. Plataforma NormaPro Definiendo tu Estructura de Compliance Tranquilidad y Seguridad"
                            },
                            {
                                "title": "Comunicación",
                                "content": "Potenciaremos la comunicación interna y externa acerca de la relevancia del Compliance en tu organización. Al comunicar activamente tus esfuerzos y compromisos en materia de cumplimiento, refuerzas la imagen de tu empresa como una entidad responsable y transparente, atrayendo a clientes y socios alineados con estos valores."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel2_9.svg",
                        "title": "Evaluación del desempeño",
                        "objective": "Objetivo: Asegurar la eficacia y adaptabilidad del sistema de Compliance mediante la monitorización proactiva y la mejora continua.",
                        "list": [
                            {
                                "title": "Activación del sistema",
                                "content": "Juntos, activaremos un sistema de seguimiento robusto y eficaz. Gracias a NormaPro tendrás la seguridad de contar con una infraestructura sólida que monitorea constantemente el cumplimiento, permitiéndote detectar y abordar problemas a tiempo, evitando sanciones o daños a la reputación."
                            },
                            {
                                "title": "Indicadores",
                                "content": "Estableceremos métricas claras y objetivas para monitorear el cumplimiento. Estos te facilitarán la toma de decisiones informadas y medir con precisión el avance de tus esfuerzos en materia de cumplimiento, lo que se traduce en mejoras continuas y eficiencia operativa."
                            },
                            {
                                "title": "Mentoring",
                                "content": "Te acompañaremos en sesiones periódicas de seguimiento, brindando asesoría experta en cada fase del proceso. Tener a expertos a tu lado asegura un aprendizaje continuo y una adaptación más rápida a las dinámicas de cumplimiento, maximizando la protección y eficacia de tu empresa en esta área."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_6.svg",
                        "title": "Mejora continua",
                        "objective": "Objetivo: Fomentar la adaptabilidad y excelencia del sistema de Compliance a través de la identificación proactiva de áreas de mejora y la renovación constante de objetivos.",
                        "list": [
                            {
                                "title": "No conformidades",
                                "content": "Identificaremos y analizaremos los errores, convirtiéndolos en oportunidades de mejora. No solo minimizarás riesgos futuros, sino que fortalecerás la resiliencia y adaptabilidad de tu empresa, ganando confianza y credibilidad en el mercado."
                            },
                            {
                                "title": "Memoria anual",
                                "content": "Facilitaremos la revisión y recapitulación de tus esfuerzos en Compliance a lo largo del año. Esto te permitirá tener una perspectiva clara del progreso, reconociendo logros y áreas de mejora, lo que facilitará la toma de decisiones y el diseño de estrategias más eficientes."
                            },
                            {
                                "title": "Nuevos objetivos",
                                "content": "Os ayudaremos a definir y alcanzar metas más ambiciosas en vuestro programa de Compliance. Es la mejor forma de garantizar un crecimiento sostenido y una adaptación continua a los desafíos del cumplimiento, posicionando a tu empresa como líder y referente en el sector."
                            }
                        ]
                    }
                ]
            },
            {
                "pretitle": "Para empresas líderes",
                "title": "Excelencia Certificada",
                "claim": "¿Estás comprometido con la excelencia y buscas certificarte bajo la norma UNE 19601?",
                "image": "IICE_LandingCompliancePenal_icono3.png",
                "imgBackground": "hielo2.png",
                "cardButtonText": "Alcanza la excelencia en Compliance",
                "introTitle": "Más que una norma, UNE 19601 es Valor, Confianza y Liderazgo",
                "introClaim": [
                    "La cumbre de la excelencia corporativa no se alcanza simplemente con palabras o intenciones, sino con acciones respaldadas por estándares globalmente reconocidos.",
                    "En el ámbito del Compliance Penal, eso significa alinearse con la norma UNE 19601. ¿Por qué?",
                    "Porque es más que una simple normativa a seguir. Es el estandarte que ondea en lo más alto, representando integridad, rigor y compromiso."
                ],
                "midSection": {
                    "title": "¿Por qué las empresas líderes eligen certificarse bajo la Norma UNE 19601?",
                    "items": [
                        {
                            "title": "Visión a Largo Plazo",
                            "content": "Las empresas líderes no buscan soluciones temporales. Al adoptar la norma UNE 19601, están haciendo una inversión estratégica que refuerza su integridad, potencia su reputación y solidifica su resiliencia ante riesgos legales y operativos."
                        },
                        {
                            "title": "Globalmente Alineadas",
                            "content": "En un mundo donde los negocios ya no conocen fronteras, las empresas líderes entienden la importancia de adherirse a estándares que sean coherentes con las prácticas internacionales de Compliance. La norma UNE 19601 ofrece exactamente eso."
                        },
                        {
                            "title": "Compromiso Real",
                            "content": "Más allá de las palabras, certificarse demuestra un compromiso real con la excelencia. Es una clara señal para clientes, inversores y otras partes interesadas de que la empresa no solo habla, sino que actúa."
                        }
                    ],
                    "footerTop": "Si tu organización está comprometida con la excelencia, y busca ir más allá de lo ordinario, te invitamos a explorar el camino hacia la Excelencia Certificada con la norma UNE 19601.",
                    "footerBottom": "Porque las empresas líderes no siguen las tendencias; las establecen."
                },
                "etapas": [
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel3_1.svg",
                        "title": "Contexto, necesidades y alcance",
                        "objective": "Objetivo: entender el entorno en el que opera tu empresa y las regulaciones a las que te enfrentas.",
                        "list": [
                            {
                                "title": "Contexto de la Organización",
                                "content": "Vamos a mapear tu entorno empresarial para poder tener una visión clara del panorama que te permitirá anticiparte a desafíos y aprovechar oportunidades."
                            },
                            {
                                "title": "Necesidades y expectativas de partes interesadas",
                                "content": "Identificaremos a todos los stakeholders y entenderemos sus requerimientos; podrás construir relaciones más sólidas y generar confianza."
                            },
                            {
                                "title": "Sistema de gestión de Compliance penal",
                                "content": "Implantaremos un sistema adaptado a tu organización, determinando su alcance y asegurando una hoja de ruta clara que maximice la seguridad y minimice riesgos legales, evitando cualquier área gris."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel3_2.svg",
                        "title": "Liderazgo",
                        "objective": "Objetivo: Reforzar el compromiso con el Compliance penal, asegurando que tu empresa tenga una dirección clara y fortaleciendo su reputación.",
                        "list": [
                            {
                                "title": "Compromiso",
                                "content": "Fomentaremos un compromiso firme con el Compliance penal. Un equipo comprometido reduce el riesgo de malas prácticas."
                            },
                            {
                                "title": "Política de Compilance penal",
                                "content": "Ayudaremos a establecer una política sólida, tendrás una guía clara para todos los miembros de la organización"
                            },
                            {
                                "title": "Roles, responsabilidades y autoridades",
                                "content": "Clarificaremos roles y responsabilidades, evitarás duplicidades y huecos de responsabilidad."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_2.svg",
                        "title": "Planificación",
                        "objective": "Objetivo: Diseñar el camino a seguir, teniendo en cuenta los riesgos y estableciendo objetivos claros.",
                        "list": [
                            {
                                "title": "Acciones para abordar riesgos y oportunidades",
                                "content": "Trazaremos un mapa de acciones para enfrentar cualquier desafío y aprovechar oportunidades, aumentando la resiliencia de tu empresa en esta materia."
                            },
                            {
                                "title": "Evaluación y plan de riesgos penales específicos",
                                "content": "Te proporcionaremos herramientas para identificar riesgos específicos, minimizando posibles amenazas. Conseguirás tener una estrategia de mitigación."
                            },
                            {
                                "title": "Objetivos de Compliance",
                                "content": "Estableceremos objetivos que complementen tu estrategia general. Asegurarás la coherencia y efectividad de todas las acciones."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel3_4.svg",
                        "title": "Elementos de apoyo",
                        "objective": "Objetivo: Proporcionar todas las herramientas y recursos necesarios para que tu sistema de Compliance funcione de verdad.",
                        "list": [
                            {
                                "title": "Cultura y ética",
                                "content": "Se promoverá una verdadera cultura de Compliance en tu organización y establecerás un código ético sólido. Os distinguiréis como una organización que valora la transparencia y la ética, incrementando la confianza de tus stakeholders."
                            },
                            {
                                "title": "Recursos y formación",
                                "content": "Aseguraremos que tengas todo lo necesario, desde el personal competente hasta programas de capacitación efectivos. Dispondrás de una plantilla formada y preparada para afrontar cualquier situación en materia de cumplimiento."
                            },
                            {
                                "title": "Comunicación",
                                "content": "Te ayudaremos a establecer canales efectivos de comunicación sobre Compliance, incluyendo cómo manejar consultas y mantener la información documentada al día, garantizando así un flujo de comunicación transparente y actualizado."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel3_5.svg",
                        "title": "Control operacional",
                        "objective": "Objetivo: Garantizar que todas las operaciones diarias estén en línea con tus objetivos de Compliance.",
                        "list": [
                            {
                                "title": "Planificación y control operacional",
                                "content": "Guiaremos tus operaciones diarias alineadas con el Compliance penal con lo que maximizarás la eficiencia operacional reduciendo el riesgo penal."
                            },
                            {
                                "title": "Diligencia debida",
                                "content": "Aseguraremos que todas las acciones y decisiones de la empresa sean tomadas con responsabilidad y precaución. Estarás protegido de incurrir en negligencias, resguardando la integridad de tu organización."
                            },
                            {
                                "title": "Integración y Control de Compliance",
                                "content": "Implementaremos controles financieros y no financieros robustos, extendiendo la uniformidad de cumplimiento a filiales y socios de negocio. Además, reforzaremos tus contratos con cláusulas de cumplimiento. Asegurarás transparencia, minimizarás riesgos y fortalecerás las relaciones contractuales y corporativas, garantizando una gestión integral alineada con el Compliance penal."
                            },
                            {
                                "title": "Sistema Interno de Información (Canal de Denuncias)",
                                "content": "Instauraremos un canal efectivo para reportar y gestionar incidentes o preocupaciones. Mantendrás la transparencia y fomentarás una cultura de reporte, asegurando una respuesta rápida a posibles desviaciones."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel3_6.svg",
                        "title": "Evaluación del desempeño",
                        "objective": "Objetivo: Medir y evaluar cómo está funcionando tu sistema, y hacer los ajustes necesarios.",
                        "list": [
                            {
                                "title": "Seguimiento y análisis",
                                "content": "Te ofreceremos las mejores herramientas y métodos para monitorizar y evaluar tu sistema de Compliance."
                            },
                            {
                                "title": "Revisión por la Dirección",
                                "content": "Tomarás decisiones estratégicas basadas en una visión completa del desempeño del Compliance."
                            },
                            {
                                "title": "Auditorías",
                                "content": "Te asistiremos tanto en las internas como las externas de certificación para garantizar que todo esté en orden."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel3_7.svg",
                        "title": "Mejora continua",
                        "objective": "Objetivo: Garantizar que tu sistema de Compliance esté siempre evolucionando y adaptándose a las nuevas necesidade",
                        "list": [
                            {
                                "title": "No conformidades y acciones correctivas",
                                "content": "Abordaremos cualquier desviación del sistema proponiendo soluciones. Transformarás los desafíos en oportunidades de mejora y aprendizaje."
                            },
                            {
                                "title": "Mejora continua",
                                "content": "Te ayudaremos a establecer un ciclo de mejora continua, asegurando que tu sistema de Compliance evolucione adaptándose a los cambios y asegurando que siempre esté al más alto nivel."
                            }
                        ]
                    }
                ],
                "finalText": "La certificación bajo la norma UNE 19601 no es solo un distintivo, es una demostración clara de tu compromiso con el cumplimiento penal. Si tu empresa está lista para adoptar este nivel de responsabilidad y excelencia, no esperes más."
            }
        ]
    },
};

export const Completo: Story = {
    args: {
        "title": "¿Listo para llevar el Compliance penal de tu empresa al siguiente nivel?",
        "claim": "Aquí tienes los contenidos del programa. Es el que utilizan los empresarios y Compliance Officers de éxito y con el que implementarás un modelo con el que conseguirás que todas las personas de tu organización conozcan cuál es su papel y su responsabilidad e interioricen hábitos de cumplimiento en sus procesos productivos.",
        "selectorTitle": "Elije la opción en la que mejor encaje tu caso:",
        "options": [
            {
                "pretitle": "Para empresas pequeñas o emergentes",
                "title": "Nivel Básico",
                "claim": "¿Tienes menos de 100 empleados y buscas cumplir con los requisitos legales esenciales?",
                "image": "IICE_LandingCompliancePenal_icono1.png",
                "imgBackground": "hielo2.png",
                "cardButtonText": "Empieza con lo esencial",
                "introTitle": "Protege tu negocio, sin complicaciones",
                "introClaim": [
                    "Sabemos que no tienes tiempo ni recursos para lidiar con procesos complejos. Por eso, queremos ser tu aliado para que cumplas con la ley de la forma más sencilla y directa posible.",
                    "Tras años de investigación y experiencia en el campo del Compliance penal, en Instituto de Innovación, Ciencia y Empresa hemos desarrollado un programa estructurado en 6 etapas.",
                    "Nos enorgullece decir que es un método probado que ha permitido a numerosas organizaciones, al igual que la tuya, operar con la confianza de que están protegidas y en pleno cumplimiento legal."
                ],
                "etapas": [
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_1.png",
                        "title": "Primeros pasos",
                        "objective": "Objetivo: Crear un sistema de Compliance simplificado que se adapte perfectamente a tu pequeña empresa, garantizando una operación segura y alineada con la ley, sin complicaciones.",
                        "list": [
                            {
                                "title": "Comprendiendo tu Empresa",
                                "content": "Estudiaremos la esencia de tu negocio, la estructura organizacional y cómo tomas decisiones. Esto nos permitirá ofrecerte una estrategia de Compliance personalizada. Sabemos que cada empresa es única y, por ello, te proporcionaremos soluciones hechas a medida, asegurándonos de que entiendas y te sientas cómodo con cada paso del proceso."
                            },
                            {
                                "title": "Plataforma NormaPro",
                                "content": "Simplificaremos nuestro sistema de Compliance. Te mostraremos cómo NormaPro puede adaptarse a tus necesidades específicas, garantizando un uso intuitivo y eficiente. Además, te formaremos para que saques el máximo provecho de ella, optimizando recursos y tiempo."
                            },
                            {
                                "title": "Definiendo tu Estructura de Compliance",
                                "content": "Te ayudaremos a esbozar una estructura de Compliance sencilla pero robusta, definiendo roles claros. Incluso en una pequeña empresa, es esencial saber quién es responsable de qué. Además, te asesoraremos sobre el perfil ideal del Compliance Officer para tu empresa, garantizando que cuentes con una figura que vigile y gestione los retos del cumplimiento."
                            },
                            {
                                "title": "Tranquilidad y Seguridad",
                                "content": "Más que implementar un sistema, te ofrecemos la seguridad de estar respaldado en cada decisión. Estaremos a tu lado, asegurando que estés siempre al tanto de cómo se gestiona el cumplimiento en tu empresa. Te permitimos centrarte en lo que mejor sabes hacer, mientras cuidamos de que todo esté en orden y conforme a la ley."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_2.svg",
                        "title": "Evaluación y planificación",
                        "objective": "Objetivo: Descubrir tus áreas vulnerables, fortalecer tus defensas y trazar una hoja de ruta clara, todo con el propósito de asegurar un negocio resiliente y alineado con la ley.",
                        "list": [
                            {
                                "title": "Descubrimiento de Riesgos y Refuerzo",
                                "content": "Haremos un análisis exhaustivo de tu negocio para identificar posibles riesgos penales. No solo te ofreceremos una visión clara de las posibles áreas vulnerables, sino que también potenciaremos los controles que ya tienes en marcha. Al optimizar tus defensas existentes, estarás más preparado y seguro, permitiendo que tu negocio opere con mayor tranquilidad y confianza."
                            },
                            {
                                "title": "Diseño personalizado de Controles y Roles",
                                "content": "Crearemos una estructura de controles hecha a la medida de tu negocio y clarificaremos roles y responsabilidades. Con cada tarea y función bien definida, tu flujo de trabajo será más claro, lo que se traduce en decisiones más rápidas y efectivas. Además, este diseño garantizará que estés minimizando riesgos y actuando conforme a la Ley."
                            },
                            {
                                "title": "Mapa visual y Hoja de ruta anual",
                                "content": "Te proporcionaremos una representación visual de tus riesgos y una hoja de ruta clara para tus actividades de Compliance durante todo el año. Esta combinación te permitirá priorizar acciones, asignar recursos eficientemente y tener un control firme sobre tus objetivos. Podrás centrarte en lo que mejor sabes hacer: crecer tu negocio con la seguridad de estar bien respaldado."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_3.svg",
                        "title": "Políticas e información documentada",
                        "objective": "Objetivo: Documentar y organizar de manera clara y accesible todos los aspectos del Compliance, garantizando coherencia, transparencia y eficiencia en nuestras acciones.",
                        "list": [
                            {
                                "title": "Código ético",
                                "content": "Crearemos o perfeccionaremos tu código ético para que refleje la esencia y los valores de tu empresa que ayude a fortalecer tu imagen corporativa, inspire confianza y garantice que todos en la organización se rijan por principios y valores alineados."
                            },
                            {
                                "title": "Políticas",
                                "content": "Definiremos políticas claras que marquen las pautas de actuación en diversas áreas de la empresa. Facilitarás la toma de decisiones, reducirás ambigüedades y asegurarás un funcionamiento coherente y conforme a los estándares que deseas mantener."
                            },
                            {
                                "title": "Organización en NormaPro",
                                "content": "Configuraremos esta herramienta para que se ajuste perfectamente a tus necesidades. NormaPRO te permitirá acceder de manera rápida y eficiente a la información crucial, optimizando tiempo y garantizando que todas las tareas de Compliance estén siempre al alcance de tu mano."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_4.svg",
                        "title": "Canal interno de información (Canal de denuncias)",
                        "objective": "Objetivo: Establecer un sistema de reporte y respuesta para proteger la integridad de la empresa y fomentar una cultura de responsabilidad y transparencia.",
                        "list": [
                            {
                                "title": "Canal interno de comunicación (Canal de denuncias)",
                                "content": "Pondremos en marcha un sistema que permita el reporte de cualquier irregularidad. Esta herramienta refuerza la transparencia y la confianza, demostrando a empleados, clientes y proveedores que te tomas en serio la integridad y el buen gobierno corporativo."
                            },
                            {
                                "title": "Proceso interno",
                                "content": "Definiremos una metodología para gestionar y resolver las denuncias de manera efectiva de acuerdo a la Ley 2/2023 que requiere un proceso bien estructurado. De esta forma aseguras una respuesta oportuna y adecuada a cada situación, minimizando impactos negativos y fortaleciendo la cultura de integridad en tu organización."
                            },
                            {
                                "title": "Tolerancia cero",
                                "content": "Estableceremos un enfoque estricto contra cualquier tipo de incumplimiento. Con esta postura, no solo proteges a tu empresa de posibles sanciones o daños a su reputación, sino que también atraes y retienes a aquellos empleados y socios que valoran y respetan un ambiente laboral ético y profesional."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_5.svg",
                        "title": "Formación, Comunicación y Sensibilización",
                        "objective": "Objetivo: Integrar activamente el Compliance en las operaciones y mentalidad de la empresa, asegurando una comprensión y compromiso profundos a todos los niveles",
                        "list": [
                            {
                                "title": "Formación",
                                "content": "Brindaremos formación integral a tu equipo, asegurando que todos comprendan y se comprometan con las prácticas de cumplimiento. Un equipo bien formado reduce los errores de cumplimiento y fortalece la cultura organizacional, lo que a su vez mejora la reputación y confianza de la empresa en el mercado."
                            },
                            {
                                "title": "Comunicación",
                                "content": "Trabajaremos en optimizar los canales de comunicación interna de tu empresa. Esto incluirá la creación o mejora de protocolos de comunicación para que toda tu organización esté alineada y bien informada sobre las políticas y procedimientos de Compliance. Reducirás las probabilidades de malentendidos o fallos en el cumplimiento, y garantizarás una aplicación coherente y uniforme de las políticas."
                            },
                            {
                                "title": "Sensibilización",
                                "content": "Implementaremos actividades orientadas a generar conciencia sobre la importancia del Compliance. Más que simples reglas, queremos que tu equipo entienda el valor y la relevancia de actuar correctamente. Cultivar una cultura empresarial consciente aumenta la protección y reduce los riesgos."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_2.svg",
                        "title": "Mejora continua del sistema",
                        "objective": "Objetivos: Generaremos informes anuales detallados que reflejan la salud y eficacia de tus prácticas de Compliance, identificando áreas de mejora.",
                        "list": [
                            {
                                "title": "No conformidades",
                                "content": "Identificaremos y analizaremos los errores, convirtiéndolos en oportunidades de mejora. No solo minimizarás riesgos futuros, sino que fortalecerás la resiliencia y adaptabilidad de tu empresa, ganando confianza y credibilidad en el mercado."
                            },
                            {
                                "title": "Memoria anual",
                                "content": "Facilitaremos la revisión y recapitulación de tus esfuerzos en Compliance a lo largo del año. Esto te permitirá tener una perspectiva clara del progreso, reconociendo logros y áreas de mejora, lo que facilitará la toma de decisiones y el diseño de estrategias más eficientes."
                            },
                            {
                                "title": "Nuevos objetivos",
                                "content": "Os ayudaremos a definir y alcanzar nuevas metas en vuestro programa de Compliance. Es la mejor forma de garantizar un crecimiento sostenido y una adaptación continua a los desafíos del cumplimiento, posicionando a tu empresa como líder y referente en el sector."
                            }
                        ]
                    }
                ]
            },
            {
                "pretitle": "Para empresas en crecimiento",
                "title": "Nivel Avanzado",
                "claim": "¿Listo para una estrategia de compliance que proteja eficazmente tu reputación y minimice riesgos?",
                "image": "IICE_LandingCompliancePenal_icono2.png",
                "imgBackground": "hielo1.png",
                "cardButtonText": "Potencia tu estrategia de Compliance",
                "introTitle": "Tu tranquilidad es nuestra misión",
                "introClaim": [
                    "Sabemos que liderar o gestionar una empresa en crecimiento presenta desafíos únicos, especialmente cuando se trata de asegurar el cumplimiento penal. ¿Estás preocupado por la reputación de tu empresa, la posible falta de claridad en procedimientos o el temor a sanciones?",
                    "Con nuestro Modelo Avanzado de Compliance Penal NormaPro, hemos diseñado una ruta clara y estructurada, paso a paso, para guiarte de inicio a fin. Cada paso ha sido cuidadosamente diseñado basado en años de investigación y experiencia práctica.",
                    "Si seguimos juntos este camino, te aseguramos que llegaremos a la meta de forma exitosa, cumpliendo todos los estándares y protegiendo tu negocio."
                ],
                "etapas": [
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel2_1.svg",
                        "title": "Primeros pasos",
                        "objective": "Objetivo: Establecer un fundamento firme adaptándonos a la esencia de tu negocio y garantizando alineación y compromiso total en la gestión del Compliance.",
                        "list": [
                            {
                                "title": "Compromiso de la dirección",
                                "content": "Lo primero es lo primero. Vamos a asegurarnos de que los líderes de tu empresa estén completamente alineados y comprometidos con el programa de Compliance. Un equipo comprometido reduce el riesgo de malas prácticas."
                            },
                            {
                                "title": "Conociendo tu organización",
                                "content": "Nos sumergiremos en el corazón de tu negocio, revisando documentos y procesos, es la única forma de adaptar soluciones de Compliance que se alineen perfectamente con tus objetivos y forma de trabajar."
                            },
                            {
                                "title": "Formación inicial sobre NormaPro",
                                "content": "Te guiaremos en la integración de NormaPRO, demostrándote su potencial. Al adaptar la plataforma a tu empresa, disfrutarás de una herramienta que no sólo te ayuda a asegurar el cumplimiento, sino que también simplifica procesos y optimiza recursos."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel2_2.svg",
                        "title": "La Organización y la toma de Decisiones",
                        "objective": "Objetivo: Analizar la estructura y dinámica de decisiones de tu empresa para incorporar una estrategia de Compliance coherente y personalizada.",
                        "list": [
                            {
                                "title": "Tu organigrama al detalle",
                                "content": "Estudiaremos tu estructura organizacional, comprendiendo cómo se distribuyen roles y responsabilidades. Esto nos permitirá identificar posibles puntos de mejora y optimizar flujos de trabajo, lo que se traduce en operaciones más ágiles y eficientes."
                            },
                            {
                                "title": "Entendiendo tus protocolos y a tus líderes de cumplimiento",
                                "content": "Profundizaremos en tu forma de tomar decisiones y en la identificación de las personas esenciales en cada área. De esa forma, podremos ayudarte a diseñar estrategias de Compliance más alineadas y efectivas, fortaleciendo la integridad de tu negocio."
                            },
                            {
                                "title": "Configurando NormaPro a tu medida",
                                "content": "Personalizaremos la herramienta para que sea el complemento perfecto de tu operación. Con NormaPro adaptado a tu realidad, garantizarás un uso más intuitivo, eficiente y que realmente se ajuste a tus desafíos y necesidades específicas, ahorrando tiempo y esfuerzos."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel2_3.svg",
                        "title": "La función de Compliance",
                        "objective": "Objetivo: Establecer y financiar una estructura clara de Compliance, asegurando su correcta regulación y operatividad.",
                        "list": [
                            {
                                "title": "Órgano de Compliance",
                                "content": "No solo ayudaremos a esbozar la estructura perfecta, sino también a definir su misión y visión. Con un órgano de Compliance estructurado y con una dirección clara, tu empresa contará con una base sólida para abordar y gestionar los retos de cumplimiento, aportando mayor seguridad y confianza en tu operativa."
                            },
                            {
                                "title": "Compliance Officer",
                                "content": "Te asesoraremos en la elección del perfil más adecuado, definiendo sus tareas y competencias esenciales. Disponer de un Compliance Officer con las capacidades y habilidades adecuadas, garantizarás un seguimiento meticuloso y eficiente de los protocolos, minimizando riesgos y protegiendo la reputación de tu empresa."
                            },
                            {
                                "title": "Gestión Integral de Compliance",
                                "content": "No solo garantizaremos que cuentes con todo lo necesario en términos de recursos, sino que además te brindaremos actualizaciones constantes. Estarás siempre al tanto de cómo se está gestionando el cumplimiento en tu empresa, lo que te permitirá tomar decisiones informadas y mantener la tranquilidad de saber que estás en manos expertas y que todo marcha según lo planeado."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel2_4.svg",
                        "title": "La Evaluación de Riesgos Penales",
                        "objective": "Objetivo: Identificar, evaluar y visualizar los riesgos penales para fortalecer la resiliencia y protección de tu negocio.",
                        "list": [
                            {
                                "title": "Identificación de riesgos",
                                "content": "Adentrándonos en cada aspecto de tu negocio, detectaremos posibles riesgos penales. Tendrás una visión clara de tus áreas vulnerables, lo que te permitirá tomar decisiones más informadas y proactivas para proteger tu negocio. Con un entendimiento profundo de tu operación, estarás en una posición más fuerte para prevenir problemas antes de que surjan."
                            },
                            {
                                "title": "Controles actuales",
                                "content": "Analizaremos las medidas y protocolos que ya tienes en marcha. Al optimizar tus controles existentes, maximizarás la eficiencia y eficacia de tus recursos, asegurándote de que cada esfuerzo en cumplimiento tenga un impacto positivo directo en tu negocio."
                            },
                            {
                                "title": "Evaluación y mapa de riesgos",
                                "content": "Crearemos una representación visual clara de tus riesgos y tu nivel de exposición. Un mapa de riesgos te permitirá priorizar acciones, asignar recursos de manera más eficiente y asegurarte de que todos en la organización comprendan y se alineen con las áreas clave de enfoque en cumplimiento."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_2.svg",
                        "title": "Plan de Acción de Compliance",
                        "objective": "Objetivo: Establecer estructuras, roles y una hoja de ruta clara para asegurar un cumplimiento eficiente y proteger proactivamente tu negocio.",
                        "list": [
                            {
                                "title": "Controles",
                                "content": "Juntos diseñaremos una estructura de controles que se adaptará a la medida de tu negocio. Podrás operar con mayor tranquilidad, sabiendo que estás minimizando tus riesgos y asegurando una operación más transparente y conforme a la ley."
                            },
                            {
                                "title": "Distribución de tareas",
                                "content": "Clarificaremos roles y responsabilidades dentro de tu organización. Cada tarea y función estarán claramente definidas, evitarás duplicidades y potenciarás la eficiencia, lo que se traduce en un flujo de trabajo más fluido y una toma de decisiones más rápida y efectiva."
                            },
                            {
                                "title": "Planning anual",
                                "content": "Estableceremos una hoja de ruta clara para tus actividades de Compliance a lo largo del año. Con un plan anual bien definido, podrás anticiparte a retos y asegurarte de que todos los aspectos del cumplimiento se manejen en tiempo y forma. Esto te proporcionará una visión y control más claros de tus objetivos, permitiendo que te enfoques en crecer tu negocio con la confianza de que estás en el camino correcto."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_3.svg",
                        "title": "Información Documentada de Compliance",
                        "objective": "Objetivo: Documentar y organizar de manera clara y accesible todos los aspectos del Compliance, garantizando coherencia, transparencia y eficiencia en nuestras acciones.",
                        "list": [
                            {
                                "title": "Código ético",
                                "content": "Crearemos o perfeccionaremos tu código ético para que refleje la esencia y los valores de tu empresa que ayude a fortalecer tu imagen corporativa, inspire confianza y garantice que todos en la organización se rijan por principios y valores alineados."
                            },
                            {
                                "title": "Políticas",
                                "content": "Definiremos políticas claras que marquen las pautas de actuación en diversas áreas de la empresa. Facilitarás la toma de decisiones, reducirás ambigüedades y asegurarás un funcionamiento coherente y conforme a los estándares que deseas mantener."
                            },
                            {
                                "title": "Organización en NormaPro",
                                "content": "Configuraremos esta herramienta para que se ajuste perfectamente a tus necesidades. NormaPRO te permitirá acceder de manera rápida y eficiente a la información crucial, optimizando tiempo y garantizando que todas las tareas de Compliance estén siempre al alcance de tu mano."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_4.svg",
                        "title": "Denunciar y Sancionar",
                        "objective": "Objetivo: Establecer sistemas robustos de reporte y respuesta para proteger la integridad de la empresa y fomentar una cultura de responsabilidad y transparencia.",
                        "list": [
                            {
                                "title": "Canal interno de comunicación (Canal de denuncias)",
                                "content": "Pondremos en marcha un sistema que permita el reporte de cualquier irregularidad. Esta herramienta refuerza la transparencia y la confianza, demostrando a empleados, clientes y proveedores que te tomas en serio la integridad y el buen gobierno corporativo."
                            },
                            {
                                "title": "Proceso interno",
                                "content": "Definiremos una metodología para gestionar y resolver las denuncias de manera efectiva de acuerdo a la Ley 2/2023 que requiere un proceso bien estructurado. De esta forma aseguras una respuesta oportuna y adecuada a cada situación, minimizando impactos negativos y fortaleciendo la cultura de integridad en tu organización."
                            },
                            {
                                "title": "Tolerancia cero",
                                "content": "Estableceremos un enfoque estricto contra cualquier tipo de incumplimiento. Con esta postura, no solo proteges a tu empresa de posibles sanciones o daños a su reputación, sino que también atraes y retienes a aquellos empleados y socios que valoran y respetan un ambiente laboral ético y profesional."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_5.svg",
                        "title": "Formación, Comunicación y Sensibilización",
                        "objective": "Objetivo: Integrar activamente el Compliance en las operaciones y mentalidad de la empresa, asegurando una comprensión y compromiso profundos a todos los niveles.",
                        "list": [
                            {
                                "title": "Formación",
                                "content": "Brindaremos formación integral a tu equipo, asegurando que todos comprendan y se comprometan con las prácticas de cumplimiento. Un equipo bien formado reduce los errores de cumplimiento y fortalece la cultura organizacional, lo que a su vez mejora la reputación y confianza de la empresa en el mercado."
                            },
                            {
                                "title": "Uso de NormaPro",
                                "content": "Instruiremos a tu personal en la utilización efectiva de NormaPRO. Al optimizar el uso de la plataforma, garantizas una gestión más eficiente y coherente del cumplimiento, lo que se traduce en menos errores y mayor productividad. Estudiaremos la esencia de tu negocio, la estructura organizacional y cómo tomas decisiones. Esto nos permitirá ofrecerte una estrategia de Compliance personalizada. Sabemos que cada empresa es única y, por ello, te proporcionaremos soluciones hechas a medida, asegurándonos de que entiendas y te sientas cómodo con cada paso del proceso. Plataforma NormaPro Definiendo tu Estructura de Compliance Tranquilidad y Seguridad"
                            },
                            {
                                "title": "Comunicación",
                                "content": "Potenciaremos la comunicación interna y externa acerca de la relevancia del Compliance en tu organización. Al comunicar activamente tus esfuerzos y compromisos en materia de cumplimiento, refuerzas la imagen de tu empresa como una entidad responsable y transparente, atrayendo a clientes y socios alineados con estos valores."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel2_9.svg",
                        "title": "Evaluación del desempeño",
                        "objective": "Objetivo: Asegurar la eficacia y adaptabilidad del sistema de Compliance mediante la monitorización proactiva y la mejora continua.",
                        "list": [
                            {
                                "title": "Activación del sistema",
                                "content": "Juntos, activaremos un sistema de seguimiento robusto y eficaz. Gracias a NormaPro tendrás la seguridad de contar con una infraestructura sólida que monitorea constantemente el cumplimiento, permitiéndote detectar y abordar problemas a tiempo, evitando sanciones o daños a la reputación."
                            },
                            {
                                "title": "Indicadores",
                                "content": "Estableceremos métricas claras y objetivas para monitorear el cumplimiento. Estos te facilitarán la toma de decisiones informadas y medir con precisión el avance de tus esfuerzos en materia de cumplimiento, lo que se traduce en mejoras continuas y eficiencia operativa."
                            },
                            {
                                "title": "Mentoring",
                                "content": "Te acompañaremos en sesiones periódicas de seguimiento, brindando asesoría experta en cada fase del proceso. Tener a expertos a tu lado asegura un aprendizaje continuo y una adaptación más rápida a las dinámicas de cumplimiento, maximizando la protección y eficacia de tu empresa en esta área."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_6.svg",
                        "title": "Mejora continua",
                        "objective": "Objetivo: Fomentar la adaptabilidad y excelencia del sistema de Compliance a través de la identificación proactiva de áreas de mejora y la renovación constante de objetivos.",
                        "list": [
                            {
                                "title": "No conformidades",
                                "content": "Identificaremos y analizaremos los errores, convirtiéndolos en oportunidades de mejora. No solo minimizarás riesgos futuros, sino que fortalecerás la resiliencia y adaptabilidad de tu empresa, ganando confianza y credibilidad en el mercado."
                            },
                            {
                                "title": "Memoria anual",
                                "content": "Facilitaremos la revisión y recapitulación de tus esfuerzos en Compliance a lo largo del año. Esto te permitirá tener una perspectiva clara del progreso, reconociendo logros y áreas de mejora, lo que facilitará la toma de decisiones y el diseño de estrategias más eficientes."
                            },
                            {
                                "title": "Nuevos objetivos",
                                "content": "Os ayudaremos a definir y alcanzar metas más ambiciosas en vuestro programa de Compliance. Es la mejor forma de garantizar un crecimiento sostenido y una adaptación continua a los desafíos del cumplimiento, posicionando a tu empresa como líder y referente en el sector."
                            }
                        ]
                    }
                ]
            },
            {
                "pretitle": "Para empresas líderes",
                "title": "Excelencia Certificada",
                "claim": "¿Estás comprometido con la excelencia y buscas certificarte bajo la norma UNE 19601?",
                "image": "IICE_LandingCompliancePenal_icono3.png",
                "imgBackground": "hielo2.png",
                "cardButtonText": "Alcanza la excelencia en Compliance",
                "introTitle": "Más que una norma, UNE 19601 es Valor, Confianza y Liderazgo",
                "introClaim": [
                    "La cumbre de la excelencia corporativa no se alcanza simplemente con palabras o intenciones, sino con acciones respaldadas por estándares globalmente reconocidos.",
                    "En el ámbito del Compliance Penal, eso significa alinearse con la norma UNE 19601. ¿Por qué?",
                    "Porque es más que una simple normativa a seguir. Es el estandarte que ondea en lo más alto, representando integridad, rigor y compromiso."
                ],
                "midSection": {
                    "title": "¿Por qué las empresas líderes eligen certificarse bajo la Norma UNE 19601?",
                    "items": [
                        {
                            "title": "Visión a Largo Plazo",
                            "content": "Las empresas líderes no buscan soluciones temporales. Al adoptar la norma UNE 19601, están haciendo una inversión estratégica que refuerza su integridad, potencia su reputación y solidifica su resiliencia ante riesgos legales y operativos."
                        },
                        {
                            "title": "Globalmente Alineadas",
                            "content": "En un mundo donde los negocios ya no conocen fronteras, las empresas líderes entienden la importancia de adherirse a estándares que sean coherentes con las prácticas internacionales de Compliance. La norma UNE 19601 ofrece exactamente eso."
                        },
                        {
                            "title": "Compromiso Real",
                            "content": "Más allá de las palabras, certificarse demuestra un compromiso real con la excelencia. Es una clara señal para clientes, inversores y otras partes interesadas de que la empresa no solo habla, sino que actúa."
                        }
                    ],
                    "footerTop": "Si tu organización está comprometida con la excelencia, y busca ir más allá de lo ordinario, te invitamos a explorar el camino hacia la Excelencia Certificada con la norma UNE 19601.",
                    "footerBottom": "Porque las empresas líderes no siguen las tendencias; las establecen."
                },
                "etapas": [
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel3_1.svg",
                        "title": "Contexto, necesidades y alcance",
                        "objective": "Objetivo: entender el entorno en el que opera tu empresa y las regulaciones a las que te enfrentas.",
                        "list": [
                            {
                                "title": "Contexto de la Organización",
                                "content": "Vamos a mapear tu entorno empresarial para poder tener una visión clara del panorama que te permitirá anticiparte a desafíos y aprovechar oportunidades."
                            },
                            {
                                "title": "Necesidades y expectativas de partes interesadas",
                                "content": "Identificaremos a todos los stakeholders y entenderemos sus requerimientos; podrás construir relaciones más sólidas y generar confianza."
                            },
                            {
                                "title": "Sistema de gestión de Compliance penal",
                                "content": "Implantaremos un sistema adaptado a tu organización, determinando su alcance y asegurando una hoja de ruta clara que maximice la seguridad y minimice riesgos legales, evitando cualquier área gris."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel3_2.svg",
                        "title": "Liderazgo",
                        "objective": "Objetivo: Reforzar el compromiso con el Compliance penal, asegurando que tu empresa tenga una dirección clara y fortaleciendo su reputación.",
                        "list": [
                            {
                                "title": "Compromiso",
                                "content": "Fomentaremos un compromiso firme con el Compliance penal. Un equipo comprometido reduce el riesgo de malas prácticas."
                            },
                            {
                                "title": "Política de Compilance penal",
                                "content": "Ayudaremos a establecer una política sólida, tendrás una guía clara para todos los miembros de la organización"
                            },
                            {
                                "title": "Roles, responsabilidades y autoridades",
                                "content": "Clarificaremos roles y responsabilidades, evitarás duplicidades y huecos de responsabilidad."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel1_2.svg",
                        "title": "Planificación",
                        "objective": "Objetivo: Diseñar el camino a seguir, teniendo en cuenta los riesgos y estableciendo objetivos claros.",
                        "list": [
                            {
                                "title": "Acciones para abordar riesgos y oportunidades",
                                "content": "Trazaremos un mapa de acciones para enfrentar cualquier desafío y aprovechar oportunidades, aumentando la resiliencia de tu empresa en esta materia."
                            },
                            {
                                "title": "Evaluación y plan de riesgos penales específicos",
                                "content": "Te proporcionaremos herramientas para identificar riesgos específicos, minimizando posibles amenazas. Conseguirás tener una estrategia de mitigación."
                            },
                            {
                                "title": "Objetivos de Compliance",
                                "content": "Estableceremos objetivos que complementen tu estrategia general. Asegurarás la coherencia y efectividad de todas las acciones."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel3_4.svg",
                        "title": "Elementos de apoyo",
                        "objective": "Objetivo: Proporcionar todas las herramientas y recursos necesarios para que tu sistema de Compliance funcione de verdad.",
                        "list": [
                            {
                                "title": "Cultura y ética",
                                "content": "Se promoverá una verdadera cultura de Compliance en tu organización y establecerás un código ético sólido. Os distinguiréis como una organización que valora la transparencia y la ética, incrementando la confianza de tus stakeholders."
                            },
                            {
                                "title": "Recursos y formación",
                                "content": "Aseguraremos que tengas todo lo necesario, desde el personal competente hasta programas de capacitación efectivos. Dispondrás de una plantilla formada y preparada para afrontar cualquier situación en materia de cumplimiento."
                            },
                            {
                                "title": "Comunicación",
                                "content": "Te ayudaremos a establecer canales efectivos de comunicación sobre Compliance, incluyendo cómo manejar consultas y mantener la información documentada al día, garantizando así un flujo de comunicación transparente y actualizado."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel3_5.svg",
                        "title": "Control operacional",
                        "objective": "Objetivo: Garantizar que todas las operaciones diarias estén en línea con tus objetivos de Compliance.",
                        "list": [
                            {
                                "title": "Planificación y control operacional",
                                "content": "Guiaremos tus operaciones diarias alineadas con el Compliance penal con lo que maximizarás la eficiencia operacional reduciendo el riesgo penal."
                            },
                            {
                                "title": "Diligencia debida",
                                "content": "Aseguraremos que todas las acciones y decisiones de la empresa sean tomadas con responsabilidad y precaución. Estarás protegido de incurrir en negligencias, resguardando la integridad de tu organización."
                            },
                            {
                                "title": "Integración y Control de Compliance",
                                "content": "Implementaremos controles financieros y no financieros robustos, extendiendo la uniformidad de cumplimiento a filiales y socios de negocio. Además, reforzaremos tus contratos con cláusulas de cumplimiento. Asegurarás transparencia, minimizarás riesgos y fortalecerás las relaciones contractuales y corporativas, garantizando una gestión integral alineada con el Compliance penal."
                            },
                            {
                                "title": "Sistema Interno de Información (Canal de Denuncias)",
                                "content": "Instauraremos un canal efectivo para reportar y gestionar incidentes o preocupaciones. Mantendrás la transparencia y fomentarás una cultura de reporte, asegurando una respuesta rápida a posibles desviaciones."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel3_6.svg",
                        "title": "Evaluación del desempeño",
                        "objective": "Objetivo: Medir y evaluar cómo está funcionando tu sistema, y hacer los ajustes necesarios.",
                        "list": [
                            {
                                "title": "Seguimiento y análisis",
                                "content": "Te ofreceremos las mejores herramientas y métodos para monitorizar y evaluar tu sistema de Compliance."
                            },
                            {
                                "title": "Revisión por la Dirección",
                                "content": "Tomarás decisiones estratégicas basadas en una visión completa del desempeño del Compliance."
                            },
                            {
                                "title": "Auditorías",
                                "content": "Te asistiremos tanto en las internas como las externas de certificación para garantizar que todo esté en orden."
                            }
                        ]
                    },
                    {
                        "imgBackground": "hielo8.png",
                        "image": "IICE_LandingCompliancePenal_Nivel3_7.svg",
                        "title": "Mejora continua",
                        "objective": "Objetivo: Garantizar que tu sistema de Compliance esté siempre evolucionando y adaptándose a las nuevas necesidade",
                        "list": [
                            {
                                "title": "No conformidades y acciones correctivas",
                                "content": "Abordaremos cualquier desviación del sistema proponiendo soluciones. Transformarás los desafíos en oportunidades de mejora y aprendizaje."
                            },
                            {
                                "title": "Mejora continua",
                                "content": "Te ayudaremos a establecer un ciclo de mejora continua, asegurando que tu sistema de Compliance evolucione adaptándose a los cambios y asegurando que siempre esté al más alto nivel."
                            }
                        ]
                    }
                ],
                "finalText": "La certificación bajo la norma UNE 19601 no es solo un distintivo, es una demostración clara de tu compromiso con el cumplimiento penal. Si tu empresa está lista para adoptar este nivel de responsabilidad y excelencia, no esperes más."
            }
        ]
    },
};



