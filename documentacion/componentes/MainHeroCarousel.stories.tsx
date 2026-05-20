import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MainHeroCarousel from "@/components/MainHeroCarousel";

const meta: Meta<typeof MainHeroCarousel> = {
    title: "Componentes/MainHeroCarousel",
    component: MainHeroCarousel,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Sección principal de presentación (Hero) de la plataforma. Diseñada para ocupar toda la pantalla, integra fondos decorativos de hielo, textos corporativos de alto impacto con llamadas a la acción y una composición simétrica de imágenes flotantes con animaciones secuenciales escalonadas en la base.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof MainHeroCarousel>;

export const Practico: Story = {};
export const Completo: Story = {};