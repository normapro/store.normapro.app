import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ActualidadGridSection from "@/components/ActualidadGridSection";

const meta: Meta<typeof ActualidadGridSection> = {
  title: "Componentes/ActualidadGridSection",
  component: ActualidadGridSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Grid de noticias de actualidad con opcion de mostrar ultimas entradas, filtrar por temas y ocultar descripcion.",
      },
    },
  },
  argTypes: {
    onlyLatest: {
      control: "boolean",
      description: "Si esta activo, limita la salida a las 3 ultimas noticias.",
    },
    temas: {
      control: "object",
      description: "Lista de temas para filtrar noticias por categoria.",
    },
    hideDescriptionAndReadMore: {
      control: "boolean",
      description: "Oculta resumen y enlace Seguir leyendo.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActualidadGridSection>;

export const Practico: Story = {
  args: {
    onlyLatest: true,
    hideDescriptionAndReadMore: false,
  },
};

export const Completo: Story = {
  args: {
    onlyLatest: false,
    temas: ["compliance", "documental"],
    hideDescriptionAndReadMore: true,
  },
};
