import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import InformeDescargaCtaSection from "@/components/landings/InformeDescargaCtaSection";

const meta: Meta<typeof InformeDescargaCtaSection> = {
    title: "Landings/InformeDescargaCtaSection",
    component: InformeDescargaCtaSection,
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
        textoDescarga: {
            description: "Texto que se mostrará en el botón o enlace de descarga.",
            control: "text",
        },

    },
};

export default meta;
type Story = StoryObj<typeof InformeDescargaCtaSection>;

export const Practico: Story = {
    args: {
        textoDescarga: "Boton de descarga"
    },
};

export const Completo: Story = {
    args: {
        textoDescarga: "Boton de descarga completo"

    },
};



