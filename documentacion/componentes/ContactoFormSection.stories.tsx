import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ContactoFormSection from "@/components/ContactoFormSection";

const meta: Meta<typeof ContactoFormSection> = {
  title: "Componentes/ContactoFormSection",
  component: ContactoFormSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Formulario de contacto general con campos de nombre, email, asunto y mensaje.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContactoFormSection>;

export const Practico: Story = {};

export const Completo: Story = {};
