import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MainEventosSection from "@/components/MainEventosSection";

const meta: Meta<typeof MainEventosSection> = {
  title: "Componentes/MainEventosSection",
  component: MainEventosSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sección que presenta la agenda de eventos y webinars activos de la plataforma. Consume datos asíncronos en tiempo real y procesa internamente los hilos de fecha y hora para separarlos en tarjetas visuales de calendario con accesos directos para reservar plazas.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MainEventosSection>;

export const Practico: Story = {};
export const Completo: Story = {};