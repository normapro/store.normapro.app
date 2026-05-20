import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import solutionsRefered from "@/components/solutionsRefered";

const meta: Meta<typeof solutionsRefered> = {
    title: "Componentes/solutionsRefered",
    component: solutionsRefered,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Sección que cruza datos de ámbitos y sectores para mostrar recomendaciones cruzadas. Renderiza un diseño asimétrico de dos columnas distribuyendo de forma dinámica listados de soluciones independientes con iconos parseados de FontAwesome y tarjetas descriptivas de paquetes (Packs) comerciales asociados.",
            },
        },
    },
    argTypes: {
        sectorSlug: {
            description: "Identificador del sector industrial opcional para filtrar los resultados cruzados.",
            control: "text",
        },
        ambitoSlug: {
            description: "Identificador del ámbito normativo u operativo principal para segmentar la consulta.",
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof solutionsRefered>;

export const Practico: Story = {
    args: {
        ambitoSlug: "legal",
    },
};

export const Completo: Story = {
    args: {
        sectorSlug: "construccion",
        ambitoSlug: "seguridad-salud",
    },
};