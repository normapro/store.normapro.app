import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DescargaInformeSection from "@/components/landings/DescargaInformeSection";

const meta: Meta<typeof DescargaInformeSection> = {
    title: "Landings/DescargaInformeSection",
    component: DescargaInformeSection,
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
            description: "Titulo de la seccion de descarga de informe.",
        },
        claim: {
            control: "text",
            description: "Claim para mostrar en la seccion de descarga de informe.",
        },
        buttonText: {
            control: "text",
            description: "Texto del boton de accion en la seccion de descarga de informe.",
        },
    },
};


export default meta;
type Story = StoryObj<typeof DescargaInformeSection>;

export const Practico: Story = {
    args: {
        title: "Descarga el informe completo del caso de éxito",
        claim: "Si buscas resultados similares y una transformación eficaz en tu empresa, descarga el informe de caso de éxito. Conoce de primera mano cómo nuestra solución innovadora puede ser la clave.",
        buttonText: "Descarga el informe completo"
    },
};

export const Completo: Story = {
    args: {
        title: "Descarga el informe completo del caso de éxito",
        claim: "Si buscas resultados similares y una transformación eficaz en tu empresa, descarga el informe de caso de éxito. Conoce de primera mano cómo nuestra solución innovadora puede ser la clave.",
        buttonText: "Descargar informe completo"
    },
};