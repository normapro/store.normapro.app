import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AmbitosTabs from "@/components/AmbitosTabs";

const meta: Meta<typeof AmbitosTabs> = {
  title: "Componentes/AmbitosTabs",
  component: AmbitosTabs,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Tabs de ambitos con carga de soluciones y packs asociados desde API.",
      },
    },
  },
  argTypes: {
    ambitoSlug: {
      control: "text",
      description: "Slug del ambito inicial seleccionado.",
    },
    sectorSlug: {
      control: "text",
      description: "Slug de sector opcional para filtrar resultados.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AmbitosTabs>;

export const Practico: Story = {
  args: {
    ambitoSlug: "gestion-documental",
    sectorSlug: null,
  },
};

export const Completo: Story = {
  args: {
    ambitoSlug: "compliance-penal",
    sectorSlug: "industrial",
  },
};
