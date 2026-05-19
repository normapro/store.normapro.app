import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import HeroSection2 from "@/components/landings/HeroSection2";

const meta: Meta<typeof HeroSection2> = {
    title: "Landings/HeroSection2",
    component: HeroSection2,
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
            description: "Titulo principal de la seccion. Puede ser un string o un array de strings para aplicar diferentes colores a cada parte.",
            control: "object",
        },
        claim: {
            description: "Lista de textos destacados debajo del titulo. Puede ser un string o un array de strings para aplicar diferentes colores a cada parte.",
            control: "object",
        },
        pragma: {
            description: "Lista de textos descriptivos debajo de los destacados. Puede ser un string o un array de strings para aplicar diferentes colores a cada parte.",
            control: "object",
        },
        imgBottom: {
            description: "URL de la imagen a mostrar al final de la seccion.",
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof HeroSection2>;

export const Practico: Story = {
    args: {
        claim: [
            "Cómo activar en un solo día un ",
            "canal de denuncias ",
            "acorde a la normativa."
        ],
        pragma: [
            "100% adaptado a las necesidades específicas de tu empresa"
        ],
        imgBottom: "portatilcanaldenuncias.png"
    },
};

export const Completo: Story = {
    args: {
        title: [
            "",
            "NormaPro Tickets"
        ],
        claim: [
            "Cómo lograr respuestas ágiles sin sobrecarga"
        ],
        pragma: [
            "",
            "Operativo en menos de 24 horas"
        ],
        imgBottom: "portatiltickets.png"
    },
};



