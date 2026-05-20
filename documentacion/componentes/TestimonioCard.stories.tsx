import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TestimonioCard from "@/components/TestimonioCard";

const meta: Meta<typeof TestimonioCard> = {
  title: "Componentes/TestimonioCard",
  component: TestimonioCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tarjeta individual para la visualización de opiniones de clientes. Estructura de forma vertical un componente contenedor para el logotipo corporativo, el cuerpo de la cita textual con soporte para saltos de línea y un bloque final con los metadatos de filiación del profesional.",
      },
    },
  },
  
};

export default meta;
type Story = StoryObj<typeof TestimonioCard>;

export const Practico: Story = {
};

export const Completo: Story = {

};