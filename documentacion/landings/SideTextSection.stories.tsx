import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SideTextSection from "@/components/landings/SideTextSection";

const meta: Meta<typeof SideTextSection> = {
    title: "Landings/SideTextSection",
    component: SideTextSection,
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
            description: "Título principal de la sección que se sitúa en la columna izquierda.",
            control: "text",
        },
        claim: {
            description: "Texto descriptivo o cuerpo del mensaje ubicado en la columna derecha.",
            control: "text",
        },
        pragma: {
            description: "Texto de cierre en negrita que se posiciona justo debajo del 'claim' en la columna derecha.",
            control: "text",
        },
        buttonText: {
            description: "Texto visible dentro del botón centrado de llamada a la acción.",
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof SideTextSection>;

export const Practico: Story = {
    args: {

    },
};

export const Completo: Story = {
    args: {

    },
};



