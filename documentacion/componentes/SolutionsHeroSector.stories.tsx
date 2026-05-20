import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SolutionsHeroSector from "@/components/SolutionsHeroSector";

const meta: Meta<typeof SolutionsHeroSector> = {
    title: "Componentes/SolutionsHeroSector",
    component: SolutionsHeroSector,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Cabecera dinámica (Hero) contextualizada por sector industrial. Realiza peticiones asíncronas en paralelo para obtener los textos e imágenes de fondo específicos del sector, filtra el listado de logotipos de clientes vinculados y prepara las etiquetas de catálogo correspondientes.",
            },
        },
    },
    argTypes: {
        sectorSlug: {
            description: "Identificador único (slug) del sector que parametriza las consultas a la API y el filtrado de contenidos.",
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof SolutionsHeroSector>;

export const Practico: Story = {
    args: {
        sectorSlug: "ingenieria",
    },
};

export const Completo: Story = {
    args: {
        sectorSlug: "compliance-alimentario",
    },
};