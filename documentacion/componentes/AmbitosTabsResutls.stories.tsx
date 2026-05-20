import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AmbitosTabsResutls from "@/components/AmbitosTabsResutls";

const meta: Meta<typeof AmbitosTabsResutls> = {
  title: "Componentes/AmbitosTabsResutls",
  component: AmbitosTabsResutls,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Listado de resultados de soluciones y packs por ambito. Esta version muestra el estado vacio por defecto si no hay carga de datos.",
      },
    },
  },
  argTypes: {
    ambitoSlug: {
      control: "text",
      description: "Slug del ambito para construir las URLs de detalle.",
    },
    sectorSlug: {
      control: "text",
      description: "Slug del sector opcional.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AmbitosTabsResutls>;

export const Practico: Story = {
  args: {
    ambitoSlug: "gestion-documental",
    sectorSlug: null,
  },
};


