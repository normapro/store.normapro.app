import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import EtapasSection from "@/components/landings/EtapasSection";

const meta: Meta<typeof EtapasSection> = {
    title: "Landings/EtapasSection",
    component: EtapasSection,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Seccion de video reutilizable para landings. Permite combinar niveles de video, destacados y boton de accion.",
            },
        },
    },
    argTypes: {
        title: {
            control: "text",
            description: "Titulo de la seccion de etapas.",
        },
        subtitle: {
            control: "text",
            description: "Subtitulo de la seccion de etapas.",
        },
        claim: {
            control: "text",
            description: "Claim para mostrar en la seccion de etapas.",
        },
        etapas: {
            control: "object",
            description: "Lista de etapas para mostrar en la seccion de etapas.",
        },
        buttonText: {
            control: "text",
            description: "Texto del boton de accion en la seccion de etapas.",
        },
    },
};




export default meta;
type Story = StoryObj<typeof EtapasSection>;

export const Practico: Story = {
    args: {
        title: "Descubre el programa paso a paso que transforma la gestión empresarial",
        subtitle: "En nuestro compromiso por impulsar la eficiencia y el éxito empresarial, hemos desarrollado un programa paso a paso que ha revolucionado la forma en que las empresas gestionan sus procesos internos.",
        claim: "A lo largo de las siguientes etapas, te guiaremos a través de un camino probado y estructurado que ha llevado a otras empresas a lograr sus objetivos de manera efectiva.\n\nCada etapa está diseñada para brindarte las herramientas y conocimientos necesarios para transformar tu empresa y alcanzar tu propio éxito:",
        buttonText: "Quiero saber más de vuestro sistema",
        etapas: [
            {
                imgBackground: "hielo3.png",
                image: "IICE_LandingCompliancePenal_Nivel2_9-1.svg",
                title: "Análisis de los procesos actuales",
                objective: "Objetivo: Identificaremos y documentaremos los procesos de negocio actuales, destacando áreas de mejora y cuellos de botella.",
                claim: "Disponer de buena información detallada de los procesos actuales, destacando ineficiencias y oportunidades de mejora, nos permitirá entender profundamente los procesos existentes, esencial para planificar intervenciones efectivas y personalizadas."
            },
            {
                imgBackground: "hielo3.png",
                image: "IICE_LandingCompliancePenal_Nivel1_2.svg",
                title: "Planificación estratégica",
                objective: "Objetivo: Desarrollaremos un plan de digitalización que se alinee con los objetivos específicos de tu negocio y las áreas de mejora identificadas.",
                claim: "Un plan estratégico personalizado para la implementación de soluciones digitales, alineado con tus objetivos del negocio te asegura una transición fluida y eficiente hacia procesos digitalizados, minimizando riesgos y optimizando recursos."
            },
            {
                imgBackground: "hielo6.png",
                image: "IICE_LandingCompliancePenal_Nivel3_4.svg",
                title: "Configuración y personalización de la solución",
                objective: "Objetivo: Adaptaremos y configuraremos la solución de digitalización con NormaPro para satisfacer las necesidades específicas.",
                claim: "Una solución digital ajustada específicamente a tus necesidades y procesos garantiza una mayor efectividad y adopción de la solución, maximizando el impacto en la eficiencia operativa."
            },
            {
                imgBackground: "hielo8.png",
                image: "IICE_LandingCompliancePenal_Nivel1_5-1.svg",
                title: "Formación y capacitación del equipo",
                objective: "Objetivo: Capacitaremos a tu equipo en el uso eficiente de la nueva solución digital, asegurando su competencia y confianza.",
                claim: "Dispondréis en tu empresa de personas competentes y seguras en el uso de la nueva solución digital. Con una formación adecuada facilitaremos la adaptación rápida y efectiva a la solución, y verás mejorada su productividad y eficiencia."
            },
            {
                imgBackground: "hielo3.png",
                image: "IICE_LandingCompliancePenal_Nivel1_3-1.svg",
                title: "Implementación y despliegue",
                objective: "Objetivo: Implementaremos contigo la solución en el entorno de trabajo asegurando que funcione de manera efectiva y eficiente.",
                claim: "Una solución digital completamente operativa e integrada en el entorno de tu empresa, asegurará que todas las funciones y procesos trabajen según lo planeado. Esta etapa concreta las mejoras planificadas, permitiéndote experimentar directamente los beneficios de la digitalización."
            },
            {
                imgBackground: "hielo6.png",
                image: "IICE_LandingCompliance_Etapa5.png",
                title: "Ajustes y soporte",
                objective: "Objetivo: Realizar ajustes para conseguir que la solución esté alineada con los objetivos establecidos y proporcionar soporte constante.",
                claim: "Un proceso de revisión y ajuste inmediato post-implementación, te asegura que la solución digital funcione según lo previsto y se integre perfectamente en los procesos de negocio. Estos ajustes tempranos y el soporte te garantizan que cualquier desafío operativo o técnico se resuelva rápidamente y garantizando una transición fluida."
            },
            {
                imgBackground: "hielo3.png",
                image: "IICE_LandingCompliancePenal_Nivel3_7.svg",
                title: "Monitorización y mejora continua",
                objective: "Objetivo: Establecer un sistema de monitorización constante para evaluar el rendimiento de la solución digital e identificar oportunidades para mejoras adicionales.",
                claim: "Obtendrás información continua sobre el rendimiento de la solución digital, identificando oportunidades para mejoras y refinamientos. La monitorización constante te permitirá la adaptación y evolución de la solución para enfrentar retos emergentes, mantenerla alineada con las metas de tu negocio y asegurando su efectividad operativa."
            }
        ]
    },
};

export const Completo: Story = {
    args: {
        title: "El Modelo más completo y Avanzado de gestión del Cumplimiento Normativo",
        subtitle: "Una metodología exclusiva probada y que funciona.",
        claim: "Aquí tienes los contenidos del programa. Es la que utilizan empresarios y directivos de éxito y con la que implementarás, paso a paso y ayudados por nuestros consultores, un modelo con el que conseguirás que todas las personas de tu organización conozcan cuál es su papel y su responsabilidad e interioricen hábitos de cumplimiento en los procesos productivos.",
        buttonText: "Quiero saber más de vuestro sistema",
        etapas: [
            {
                imgBackground: "hielo3.png",
                image: "IICE_LandingCompliance_Etapa1.png",
                title: "Primeros pasos",
                objective: "Objetivos: Veremos qué es y para qué sirve una política de cumplimiento.",
                list: [
                    "Acota bien los alcances y establece un procedimiento general de actuación para dejar constancia de qué documentar y cómo actuar.",
                    "El compromiso de la Dirección de la empresa es fundamental para garantizar el éxito del proyecto… aquí verás como se establece la función de cumplimiento.",
                    "Establecerás unas bases sólidas de alto nivel asentadas en principios de Compliance, Compromiso y liderazgo."
                ]
            },
            {
                imgBackground: "hielo3.png",
                image: "IICE_LandingCompliance_Etapa2.svg",
                title: "Arquitectura de la organización",
                objective: "Objetivos: Configuraremos la Plataforma Digital NormaPro para tu empresa que se compondrá a su vez, de tantas plataformas como sociedades y sedes o centros de trabajo se dispongan en tu organización.",
                list: [
                    "Tendréis plena autonomía desde el principio.",
                    "Distribuye las tareas entre los miembros de tu equipo, el cumplimiento normativo es cosa de todos, no concentres toda la carga en ti, asigna roles y permisos."
                ]
            },
            {
                imgBackground: "hielo6.png",
                image: "IICE_LandingCompliance_Etapa3.png",
                title: "Formación del equipo",
                objective: "Objetivos: Que todo tu equipo de colaboradores alcancen un nivel adecuado para usar la Plataforma Digital NormaPro para automatizar todas las tareas de cumplimiento y eliminar tiempos improductivos y trabajos repetitivos o manuales.",
                list: [
                    "Gracias a 3 sencillos módulos conocerán los fundamentos del método y los beneficios que reporta implementar un modelo de cumplimiento.",
                    "Cada miembro de tu equipo interiorizará y seran sensibles a los fines que persigue la empresa que no es otro sino el que florezca una cultura ética y de cumplimiento en el seno de la misma como seña de identidad."
                ]
            },
            {
                imgBackground: "hielo8.png",
                image: "IICE_LandingCompliance_Etapa4.svg",
                title: "Mapa de evidencias",
                objective: "Objetivos: Fabricaréis mapas de evidencias que permitan demostrar ante terceros el cumplimiento de la normativa en cada uno de los alcances elegidos.",
                list: [
                    "Realizar esta labor podría llevar a cualquier organización meses de estudio de normas y trabajo de campo, pero para ello NormaPro dispone de un número cada vez mayor de cuestionarios que os ayudan a diseñar estos mapas de manera fácil y guiada en cuestión de unos minutos.",
                    "Tan solo por esta potente herramienta ya merece la pena la inversión en NormaPro y podrás dar de alta a los empleados, instalaciones y equipos de trabajo tanto de tu empresa como de las contratas y proveedores que colaboran con vosotros y, de esta forma, tener control de las evidencias que son obligatorias por norma."
                ]
            },
            {
                imgBackground: "hielo3.png",
                image: "IICE_LandingCompliance_Etapa5.png",
                title: "Evaluación y monitorización",
                objective: "Objetivos: Hacer que todo funcione según lo planeado y en piloto automático.",
                list: [
                    "Todo tu equipo comenzará a integrar hábitos de cumplimiento en sus tareas productivas cotidianas auxiliados por un sistema de alertas que impedirá que ningún plazo se pueda pasar sin atender.",
                    "En un completo cuadro de mando gráfico, podrás hacer seguimiento de la evolución favorable del grado de cumplimiento de tu empresa, midiendo en continuo y detectando posibles desviaciones justo en el momento en que se produzcan.",
                    "Adopta medidas correctoras justo a tiempo de evitar riesgos que supongan un peligro para la organización."
                ]
            },
            {
                imgBackground: "hielo6.png",
                image: "IICE_LandingCompliance_Etapa6.png",
                title: "Mejora continua del sistema",
                objective: "Objetivos: Veremos cómo evaluar en tiempo real tanto los riesgos específicos detectados del cumplimiento normativo, como los propios del sistema implantado.",
                list: [
                    "Con nuestro método será muy sencillo descubrir oportunidades de mejora y establecer eficaces planes de acción que contribuyan claramente al éxito de vuestro proyecto empresarial.",
                    "Veremos qué elementos conviene incluir en un informe anual para reportar toda la información que necesita la Dirección de la compañía de manera clara, concisa y eficaz que les será, seguro, de vital importancia para tomar decisiones de carácter estratégico.",
                    "Al finalizar esta etapa habrás establecido un proceso completo de evaluación y control de los riesgos derivados del cumplimiento normativo para que tengas la tranquilidad de que el Modelo funciona."
                ]
            }
        ]
    },
};