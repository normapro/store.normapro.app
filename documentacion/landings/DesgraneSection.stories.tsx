import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DesgraneSection from "@/components/landings/DesgraneSection";

const meta: Meta<typeof DesgraneSection> = {
    title: "Landings/DesgraneSection",
    component: DesgraneSection,
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
            description: "Titulo de la seccion de desgrane.",
        },
        claim: {
            control: "text",
            description: "Claim para mostrar en la seccion de desgrane.",
        },
        pragma: {
            control: "text",
            description: "Pragma para mostrar en la seccion de desgrane.",
        },
        listTitle: {
            control: "text",
            description: "Titulo para la lista de items en la seccion de desgrane.",
        },
        list: {
            control: "object",
            description: "Lista de objetos con texto de cada item a mostrar en formato lista en la seccion de desgrane.",
        },
    },
};



export default meta;
type Story = StoryObj<typeof DesgraneSection>;

export const Practico: Story = {
    args: {
        
    },
};

export const Completo: Story = {
    args: {
        
    },
};