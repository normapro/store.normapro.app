import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Breadcrumb from "@/components/breadcrump";

const meta: Meta<typeof Breadcrumb> = {
  title: "Componentes/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Navegacion breadcrumb recursiva para paginas de soluciones y detalle.",
      },
    },
  },
  argTypes: {
    breadcrumb: {
      control: "object",
      description: "Objeto jerarquico con title, url y children opcional.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Practico: Story = {
  args: {
    breadcrumb: {
      title: "Home",
      url: "/",
      children: {
        title: "Soluciones",
        url: "/soluciones",
      },
    },
  },
};

export const Completo: Story = {
  args: {
    breadcrumb: {
      title: "Home",
      url: "/",
      children: {
        title: "Soluciones",
        url: "/soluciones",
        children: {
          title: "Gestion documental",
          url: "/soluciones/gestion-documental",
          children: {
            title: "Control documental",
            url: "/soluciones/gestion-documental/control-documental",
          },
        },
      },
    },
  },
};
