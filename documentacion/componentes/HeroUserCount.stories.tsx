import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import HeroUserCount from "@/components/HeroUserCount";

const meta: Meta<typeof HeroUserCount> = {
  title: "Componentes/HeroUserCount",
  component: HeroUserCount,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Pequeño bloque de texto dinámico para la sección Hero. Muestra un contador formateado con el total de usuarios activos que consumen la plataforma, recuperando el dato en tiempo real desde una API externa.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroUserCount>;

export const Practico: Story = {};
export const Completo: Story = {};