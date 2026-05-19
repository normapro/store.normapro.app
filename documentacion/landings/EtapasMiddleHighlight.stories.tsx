import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import EtapasMiddleHighlight from "@/components/landings/EtapasMiddleHighlight";

const meta: Meta<typeof EtapasMiddleHighlight> = {
    title: "Landings/EtapasMiddleHighlight",
    component: EtapasMiddleHighlight,
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
        data: {
            control: "object",
            description: "Lista de etapas para mostrar en la seccion de etapas.",
        },
    },
};




export default meta;
type Story = StoryObj<typeof EtapasMiddleHighlight>;

export const Practico: Story = {
    args: {
        
    },
};

export const Completo: Story = {
    args: {
        
    },
};