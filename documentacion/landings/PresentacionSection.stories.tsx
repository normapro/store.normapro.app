import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PresentacionSection from "@/components/landings/PresentacionSection";

const meta: Meta<typeof PresentacionSection> = {
    title: "Landings/PresentacionSection",
    component: PresentacionSection,
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
            description: "Título principal opcional de la sección.",
            control: "text",
        },
        claim: {
            description: "Texto descriptivo o de introducción opcional ubicado debajo del título.",
            control: "text",
        },
        imgBottom: {
            description: "URL de la imagen a mostrar al final de la seccion.",
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof PresentacionSection>;

export const Practico: Story = {
    args: {
        "imgBottom": "Grupo-5260@2x.png"
    },
};

export const Completo: Story = {
    args: {
        "title": "NormaPro BPM es tu aliado estratégico en la transformación digital, simplificando y acelerando la gestión y optimización de tus procesos de negocio.",
        "claim": "Con nuestra solución, estarás equipado para aumentar la eficiencia operativa, garantizar la consistencia en tus operaciones, y adaptarte rápidamente a los cambiantes requisitos del mercado.",
        "imgBottom": "Grupo-5260@2x.png"
    },
};



