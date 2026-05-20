import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import NormaproAccessButton from "@/components/NormaproAccessButton";

const meta: Meta<typeof NormaproAccessButton> = {
    title: "Componentes/NormaproAccessButton",
    component: NormaproAccessButton,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Botón de acceso interactivo con microanimaciones basadas en Framer Motion. Al pasar el cursor por encima desplaza suavemente el icono corporativo, y al hacer clic ejecuta una animación de deslizamiento lateral completa antes de redirigir al usuario al portal externo.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof NormaproAccessButton>;

export const Practico: Story = {};
export const Completo: Story = {};