import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MainConsultoriaSection from "@/components/MainConsultoriaSection";

const meta: Meta<typeof MainConsultoriaSection> = {
  title: "Componentes/MainConsultoriaSection",
  component: MainConsultoriaSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sección cuadriculada que promociona los servicios de consultoría estratégica. Recupera las modalidades activas de forma dinámica a través de la API, organizando la información en tarjetas con imágenes ilustrativas y accesos directos tanto para ampliar información como para contratación inmediata.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MainConsultoriaSection>;

export const Practico: Story = {};
export const Completo: Story = {};