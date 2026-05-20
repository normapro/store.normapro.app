import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CandidaturaFormSection from "@/components/CandidaturaFormSection";

const meta: Meta<typeof CandidaturaFormSection> = {
  title: "Componentes/CandidaturaFormSection",
  component: CandidaturaFormSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Formulario de candidatura para vacantes. Incluye datos personales, puesto, mensaje y carga de CV.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CandidaturaFormSection>;

export const Principal: Story = {};
