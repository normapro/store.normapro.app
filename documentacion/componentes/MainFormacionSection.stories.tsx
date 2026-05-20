import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MainFormacionSection from "@/components/MainFormacionSection";

const meta: Meta<typeof MainFormacionSection> = {
    title: "Componentes/MainFormacionSection",
    component: MainFormacionSection,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Sección promocional del catálogo de formación. Recupera de forma dinámica los cursos disponibles mediante una API externa, limitando la visualización a los primeros cuatro elementos organizados en una hilera inferior de tarjetas dinámicas.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof MainFormacionSection>;

export const Practico: Story = {};
export const Completo: Story = {};