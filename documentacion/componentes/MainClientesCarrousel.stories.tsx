import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MainClientesCarrousel from "@/components/MainClientesCarrousel";

const meta: Meta<typeof MainClientesCarrousel> = {
  title: "Componentes/MainClientesCarrousel",
  component: MainClientesCarrousel,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sección que combina un contador de usuarios activos y un carrusel animado de marcas de clientes. Realiza peticiones asíncronas concurrentes a la API para obtener dinámicamente tanto el total de usuarios registrados como los logotipos corporativos.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MainClientesCarrousel>;

export const Practico: Story = {};
export const Completo: Story = {};