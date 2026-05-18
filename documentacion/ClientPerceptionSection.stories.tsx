import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ClientPerceptionSection from "@/components/landings/ClientPerceptionSection";

const meta: Meta<typeof ClientPerceptionSection> = {
    title: "Landings/ClientPerceptionSection",
    component: ClientPerceptionSection,
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
            description: "Titulo de la seccion de percepcion de clientes.",
        },
        items: {
            control: "object",
            description: "Lista de objetos con imagen y texto de cada item a mostrar.",
        },
        list: {
            control: "object",
            description: "Lista de objetos con texto de cada item a mostrar en formato lista.",
        },
        secondtitle: {
            control: "text",
            description: "Titulo secundario para la seccion de percepcion de clientes.",
        },
        pragma: {
            control: "text",
            description: "Pragma para mostrar en la seccion de percepcion de clientes.",
        },
        id_testimonio: {
            control: "number",
            description: "ID del testimonio a mostrar en la seccion de percepcion de clientes.",
        },
        downtext: {
            control: "text",
            description: "Texto para mostrar debajo del testimonio en la seccion de percepcion de clientes.",
        },
        supertitle: {
            control: "text",
            description: "Supertitulo para la seccion de percepcion de clientes.",
        },
        image: {
            control: "text",
            description: "URL de la imagen a mostrar en la seccion de percepcion de clientes.",
        },
        subtitle: {
            control: "text",
            description: "Subtitulo para la seccion de percepcion de clientes.",
        },
        secondsupertitle: {
            control: "text",
            description: "Supertitulo secundario para la seccion de percepcion de clientes.",
        },
        tabla: {
            control: "object",
            description: "Objeto con datos para mostrar en formato tabla en la seccion de percepcion de clientes.",
        },

    },
};


export default meta;
type Story = StoryObj<typeof ClientPerceptionSection>;

export const Practico: Story = {
    args: {
        title: "NormaPro: Más que Software, una alianza estratégica",
        items: [
            "En un mundo lleno de soluciones digitales, NormaPro BPM se destaca por la profundidad de comprensión y compromiso que ofrecemos. Lo que nos diferencia es la sinergia entre una herramienta BPM avanzada y el apoyo constante de nuestros expertos consultores:"
        ],
        list: [
            {
                title: "Innovación Constante: ",
                claim: "Aseguramos que NormaPro BPM esté siempre a la vanguardia, adaptándose a las demandas cambiantes del mercado."
            },
            {
                title: "Consultoría Personalizada: ",
                claim: "Nuestros consultores NormaPro trabajan codo con codo con usted, entendiendo sus desafíos y proponiendo soluciones a medida."
            },
            {
                title: "Integración Flexible: ",
                claim: "Nuestro software se integra sin problemas con otros sistemas, garantizando una adaptabilidad sin precedentes."
            },
            {
                title: "Soporte Dedicado: ",
                claim: "Más allá de la implementación, nuestro equipo está siempre disponible para asistencia y orientación."
            }
        ],
        id_testimonio: 6
    },
};

export const Completo: Story = {
    args: {
        id_testimonio: 9,
        supertitle: "A través de nuestra Plataforma Digital y nuestro Método Avanzado NormaPro de gestión del Cumplimiento normativo os aportamos:",
        items: [
            "",
            "No lo pensaría dos veces y contrataría sin dudarlo",
            "",
            "Nuestro método te contará de golpe todo lo que necesitas saber para conseguir implementar un sistema ágil y eficaz de cumplimiento normativo combinado con una plataforma digital que coordine toda la actividad, la integre en vuestros procesos y eliminarás tiempos y costes adicionales."
        ],
        secondtitle: "Evita dar palos de ciego.\nTu tiempo y tu tranquilidad es lo primero.",
        pragma: "Piensa que la metodología y el software va a correr a cargo de un reconocido equipo consultor con años de experiencia y que ha trabajado con empresas de las más importantes.",
        secondsupertitle: "¿Cuándo empezamos?",
        image: "Grupo5015.png",
        tabla: [
            {
                icon: "fa-clipboard-list-check",
                claim: "Sencillos cuestionarios para que hagáis inventarios de normas y mapas documentales en cuestión de minutos."
            },
            {
                icon: "fa-glasses-round",
                claim: "Analizamos normas para vosotros"
            },
            {
                icon: "fa-fish",
                claim: "Os explicamos cómo funcionan las normas para que sepáis moveros por ellas como pez en el agua para que no andéis dando tumbos y evitéis sorpresos desagradables"
            },
            {
                icon: "fa-book-section",
                claim: "Os ayudamos a seleccionar bien los alcances normativos que aplican a tu empresa o departamento"
            },
            {
                icon: "fa-file-chart-column",
                claim: "Os asesoramos a la hora de redactar la información documentada de vuestro modelo de cumplimineto aportando plantillas y guías"
            },
            {
                icon: "fa-comment-question",
                claim: "Trabajamos para ayudaros a resolver cuantas dudas os puedan surgir a la hora de realizar un tramite"
            }
        ]
    },
};