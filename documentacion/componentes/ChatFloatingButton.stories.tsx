import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ChatFloatingButton from "@/components/ChatFloatingButton";

const meta: Meta<typeof ChatFloatingButton> = {
  title: "Componentes/ChatFloatingButton",
  component: ChatFloatingButton,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Boton flotante de chat para abrir el asistente y ocultarlo cuando sea necesario.",
      },
    },
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controla si el boton flotante esta visible.",
    },
    onClose: {
      description: "Callback que se ejecuta al cerrar el boton.",
    },
    onClick: {
      description: "Callback opcional para abrir la ventana de chat.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatFloatingButton>;

export const Practico: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onClick: () => {},
  },
};

export const Completo: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onClick: () => {},
  },
};
