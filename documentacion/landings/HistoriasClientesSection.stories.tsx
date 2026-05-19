import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import HistoriasClientesSection from "@/components/landings/HistoriasClientesSection";

const meta: Meta<typeof HistoriasClientesSection> = {
    title: "Landings/HistoriasClientesSection",
    component: HistoriasClientesSection,
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
        soloUnaHistoria: {
            control: "boolean",
        }
    },
};

export default meta;
type Story = StoryObj<typeof HistoriasClientesSection>;

export const Practico: Story = {
    args: {
        
    },
};

export const Completo: Story = {
    args: {
        
    },
};



