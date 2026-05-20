import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LandingBuilder from "@/components/LandingBuilder";

const meta: Meta<typeof LandingBuilder> = {
  title: "Componentes/LandingBuilder",
  component: LandingBuilder,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Orquestador dinámico de páginas de destino (Landing Pages). Recibe una colección secuencial de bloques de datos y renderiza cooperativamente los componentes visuales correspondientes mapeados en su diccionario interno.",
      },
    },
  },
  
};

export default meta;
type Story = StoryObj<typeof LandingBuilder>;

export const Practico: Story = {
  args: {
    },
};

export const Completo: Story = {
  args: {
   },
};