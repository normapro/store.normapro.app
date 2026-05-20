import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Formulario from "@/components/Formulario";

const meta: Meta<typeof Formulario> = {
  title: "Componentes/Formulario",
  component: Formulario,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Ventana modal que contiene el formulario de contacto para la reserva de sesiones estratégicas. Incluye campos de perfil corporativo, selectores de rango de empleados y casillas de consentimiento legal.",
      },
    },
  },
  argTypes: {
    onClose: {
      description: "Función de retorno (callback) que se ejecuta al hacer clic en los botones de cierre o en el fondo de la capa superpuesta.",
      action: "clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Formulario>;

export const Practico: Story = {
  args: {
    onClose: () => {},
  },
};

export const Completo: Story = {
  args: {
    onClose: () => {},
  },
};