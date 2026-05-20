import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SimpleClientPerceptionSection from "@/components/landings/SimpleClientPerceptionSection";

const meta: Meta<typeof SimpleClientPerceptionSection> = {
    title: "Landings/SimpleClientPerceptionSection",
    component: SimpleClientPerceptionSection,
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
            description: "Título opcional de la sección que introduce el testimonio del cliente.",
            control: "text",
        },
        id_testimonio: {
            description: "Identificador numérico único para buscar y filtrar el testimonio específico desde la API.",
            control: "number",
        },
    },
};

export default meta;
type Story = StoryObj<typeof SimpleClientPerceptionSection>;

export const Practico: Story = {
    args: {
        "id_testimonio": 6

    },
};

export const Completo: Story = {
    args: {
        "title": "Más de 2.000 directivos y técnicos han trabajado mano a mano en el último año con nuestros consultores",
        "id_testimonio": 8
    },
};



