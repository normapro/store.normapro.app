import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import VentajasSection from "@/components/landings/VentajasSection";

const meta: Meta<typeof VentajasSection> = {
    title: "Landings/VentajasSection",
    component: VentajasSection,
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
            description: "Título principal de la sección de ventajas.",
            control: "text",
        },
        highlightText: {
            description: "Texto complementario opcional que se añade en color gris al final del título principal.",
            control: "text",
        },
        claim: {
            description: "Texto descriptivo o de introducción ubicado debajo del título, con soporte para saltos de línea.",
            control: "text",
        },
        items: {
            description: "Array de objetos que representan los elementos de ventajas. Cada objeto contiene una propiedad 'title' y una propiedad 'icon' para identificar el icono a renderizar.",
            control: "object",
        },
        background: {
            description: "Color de fondo opcional para el contenedor principal de la sección.",
            control: "select",
            options: ["white", "gray"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof VentajasSection>;

export const Practico: Story = {
    args: {
        "title": "Cuando implementas un Sistema Avanzado de gestión de Compliance los parámetros de valoración de tu compañía se disparan.",
        "highlightText": "Todos se fijan en ella.",
        "claim": "La vorágine legislativa supone un problema cada vez mayor para las empresas, pero existen mecanismos para establecer líneas solidas de defensa que convierten la gestión de Compliance penal en una inversión inteligente más que en un mero costo ya que aportan beneficios que contribuyen a la salud a largo plazo de la empresa:",
        "items": [
            {
                "title": "Reducción de Riesgo Legal",
                "icon": "fa-chart-line-up"
            },
            {
                "title": "Protección de la Reputación",
                "icon": "fa-trophy-star"
            },
            {
                "title": "Fomento de la Cultuta Ética",
                "icon": "fa-handshake"
            },
            {
                "title": "Eficiencia Operativa",
                "icon": "fa-award"
            },
            {
                "title": "Ventaja competitiva",
                "icon": "fa-pegasus"
            }
        ]
    },
};

export const Completo: Story = {
    args: {
        "title": "Cuando implementas un Sistema Avanzado de gestión de Compliance los parámetros de valoración de tu compañía se disparan.",
        "highlightText": "Todos se fijan en ella.",
        "claim": "La vorágine legislativa supone un problema cada vez mayor para las empresas, pero existen mecanismos para establecer líneas solidas de defensa que, ademásconviertan esta situación en un filón de oportunidades favorables de:",
        "items": [
            {
                "title": "Mejora de los procesos internos de negocio",
                "icon": "fa-chart-line-up"
            },
            {
                "title": "Aumento de la competitividad",
                "icon": "fa-trophy-star"
            },
            {
                "title": "Mejora del clima laboral",
                "icon": "fa-handshake"
            },
            {
                "title": "Engrandecimiento de la credibilidad de la marca",
                "icon": "fa-award"
            },
            {
                "title": "Y un largo etc",
                "icon": "fa-pegasus"
            }
        ]
    },
};



