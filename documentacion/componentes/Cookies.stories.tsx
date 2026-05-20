import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Cookies from "@/components/Cookies";

const meta: Meta<typeof Cookies> = {
  title: "Componentes/Cookies",
  component: Cookies,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sección informativa de cookies organizada en acordeones dinámicos. Obtiene los datos de uso, privacidad y tablas de caducidad directamente desde la API.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Cookies>;

export const Practico: Story = {};
export const Completo: Story = {};