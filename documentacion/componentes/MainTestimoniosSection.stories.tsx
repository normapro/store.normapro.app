import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MainTestimoniosSection from "@/components/MainTestimoniosSection";

const meta: Meta<typeof MainTestimoniosSection> = {
    title: "Componentes/MainTestimoniosSection",
    component: MainTestimoniosSection,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Sección de opiniones y testimonios organizada en un diseño fluido tipo cascada (Masonry). Recupera los datos de los clientes desde la API y permite segmentar la vista para mostrar únicamente las primeras valoraciones o el catálogo completo.",
            },
        },
    },
    argTypes: {
        soloOpiniones: {
            description: "Modifica la maquetación del título y limita la renderización a los 3 primeros testimonios si se activa.",
            control: "boolean",
        },
    },
};

export default meta;
type Story = StoryObj<typeof MainTestimoniosSection>;

export const Practico: Story = {
    args: {
        soloOpiniones: false,
    },
};

export const Completo: Story = {
    args: {
        soloOpiniones: true,
    },
};