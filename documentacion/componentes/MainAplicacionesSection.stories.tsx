import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MainAplicacionesSection from "@/components/MainAplicacionesSection";

const meta: Meta<typeof MainAplicacionesSection> = {
  title: "Componentes/MainAplicacionesSection",
  component: MainAplicacionesSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sección principal que despliega el catálogo de aplicaciones disponibles en el ecosistema. Consume un endpoint interno para listar las herramientas dinámicamente mediante tarjetas interconectadas con sus respectivos iconos, títulos y descripciones cortas.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MainAplicacionesSection>;

export const Practico: Story = {};
export const Completo: Story = {};