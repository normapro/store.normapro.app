import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ParallaxProvider } from "react-scroll-parallax";
import MainParallaxSection from "@/components/MainParallaxSection";

const meta: Meta<typeof MainParallaxSection> = {
    title: "Componentes/MainParallaxSection",
    component: MainParallaxSection,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Sección visual de impacto con efecto de desplazamiento Parallax. Renderiza una imagen de fondo que se mueve a una velocidad controlada respecto al scroll del usuario, coronada por un bloque de texto central con sombras optimizadas para mejorar la legibilidad.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof MainParallaxSection>;

export const Practico: Story = {};
export const Completo: Story = {};