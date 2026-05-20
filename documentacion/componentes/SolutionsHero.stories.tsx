import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SolutionsHero from "@/components/SolutionsHero";

const meta: Meta<typeof SolutionsHero> = {
    title: "Componentes/SolutionsHero",
    component: SolutionsHero,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Cabecera principal (Hero) para la sección de soluciones. Presenta un diseño asimétrico en cuadrícula que combina un bloque de texto descriptivo, una galería horizontal con logotipos de clientes destacados obtenidos dinámicamente desde la API y una tarjeta de llamada a la acción (CTA) lateral para la solicitud de diagnósticos.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof SolutionsHero>;

export const Practico: Story = {};
export const Completo: Story = {};