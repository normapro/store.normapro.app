import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PartnersProgramsSection from "@/components/PartnersProgramsSection";

const meta: Meta<typeof PartnersProgramsSection> = {
    title: "Componentes/PartnersProgramsSection",
    component: PartnersProgramsSection,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Sección informativa que expone las diferentes modalidades o programas de colaboración para asociados (partners). Renderiza un bloque de cabecera centrado y una cuadrícula adaptativa de tarjetas independientes con los detalles de cada programa.",
            },
        },
    },
    argTypes: {
        title: {
            description: "Título principal de la sección de programas.",
            control: "text",
        },
        description: {
            description: "Texto introductorio o propuesta de valor del programa de asociados.",
            control: "text",
        },
        programs: {
            description: "Colección de programas disponibles, cada uno con su propio título descriptivo y desarrollo de contenido.",
            control: "object",
        },
    },
};

export default meta;
type Story = StoryObj<typeof PartnersProgramsSection>;

export const Practico: Story = {
    args: {
        title: "Programas de Alianzas",
        description: "Elige la modalidad que mejor se adapte a los objetivos estratégicos y operativos de tu negocio.",
        programs: [
            {
                title: "Partner Tecnológico",
                description: "Integra soluciones mediante nuestra API y expande las capacidades técnicas de tus herramientas.",
            },
        ],
    },
};

export const Completo: Story = {
    args: {
        title: "Descubre nuestros programas para Partners",
        description: "Creamos relaciones a largo plazo con consultoras, integradores y profesionales del cumplimiento normativo para impulsar la digitalización empresarial de forma segura.",
        programs: [
            {
                title: "Partner de Referencia",
                description: "Recomienda las soluciones digitales del ecosistema y obtén comisiones recurrentes por cada cliente verificado.",
            },
            {
                title: "Consultor Certificado",
                description: "Utiliza e implementa la plataforma directamente en tus proyectos de asesoría con soporte prioritario.",
            },
            {
                title: "Alianza Estratégica",
                description: "Diseñado para corporaciones que buscan co-crear módulos específicos o integraciones exclusivas de marca blanca.",
            },
        ],
    },
};