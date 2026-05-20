import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ChatWindow from "@/components/ChatWindow";

const meta: Meta<typeof ChatWindow> = {
  title: "Componentes/ChatWindow",
  component: ChatWindow,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Ventana de chat con mensajes sugeridos, input y controles de cierre.",
      },
    },
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controla si la ventana de chat esta visible.",
    },
    onClose: {
      description: "Callback que se ejecuta al cerrar la ventana.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatWindow>;

export const Practico: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
  },
};

export const Completo: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
  },
};
