import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ApotacionSection from "@/components/landings/AportacionesSection";

const meta: Meta<typeof ApotacionSection> = {
    title: "Landings/AportacionesSection",
    component: ApotacionSection,
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
            description: "Titulo de la aportacion.",
        },
        claim: {
            control: "text",
            description: "Texto de reclamo o afirmacion general sobre las aportaciones.",
        },
        aportaciones: {
            control: "object",
            description: "Lista de objetos que representan cada aportacion, incluyendo imagen, titulo, puntos destacados y texto del boton.",
        },
    },
};

export default meta;
type Story = StoryObj<typeof ApotacionSection>;

export const Practico: Story = {
    args: {
        title: "Aportaciones clave de NormaPro",
        claim: "Transforma tu gestion con estas aportaciones clave de NormaPro",
        aportaciones: [
            {
                "image": "IICE_LandingCompliance_Expertos.png",
                "imageBackground": "hielo5.png",
                "title": "El Cuadro de Expertos",
                "claim": "Muy valorado y utilizado por tods nuestros clientes",
                "items": [
                    "Tendrás acceso ilimitado desde el primer día.",
                    "Ellos estarán ahí los 365 días del año para ayudarte.",
                    "Resuelve tus dudas.",
                    "Pídeles opinión."
                ],
                "buttonText": "Quiero saber en qué consiste"
            }
        ]

    },
};

export const Completo: Story = {
    args: {
        title: "Aportaciones clave de NormaPro",
        claim: "Transforma tu gestion con estas aportaciones clave de NormaPro",
        aportaciones: [

            {
                "image": "IICE_LandingCompliance_Expertos.png",
                "imageBackground": "hielo5.png",
                "title": "El Cuadro de Expertos",
                "claim": "Muy valorado y utilizado por tods nuestros clientes",
                "items": [
                    "Tendrás acceso ilimitado desde el primer día.",
                    "Ellos estarán ahí los 365 días del año para ayudarte.",
                    "Resuelve tus dudas.",
                    "Pídeles opinión."
                ],
                "buttonText": "Quiero saber en qué consiste"
            },
            {
                "image": "IICE_Academia_FormaPro.png",
                "imageBackground": "hielo2.png",
                "title": "Academia FormaPro",
                "claim": "Una selección de cursos y conferencias pensados para facilitar las cosas",
                "items": [
                    "Para conocer un detalle la normativa sin perder tiempo",
                    "Para transmitirse los consejos más prácticos",
                    "Para sacarle el máximo partido a tu canal de denuncias.",
                    "Para conocer todo lo que puede hacer por ti la Plataforma Digital NormaPro "
                ],
                "buttonText": "Descubre los cursos gratuitos"
            }
        ]
    },
};