import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ChatManager from "@/components/ChatManager";

const meta: Meta<typeof ChatManager> = {
  title: "Componentes/ChatManager",
  component: ChatManager,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Componente contenedor que coordina el boton flotante y la ventana de chat.",
      },
    },
  },
  argTypes: {
    children: {
      control: "object",
      description: "Contenido principal sobre el que se monta el sistema de chat.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChatManager>;

export const Practico: Story = {
  args: {
    children: (
      <main className="mx-auto max-w-4xl p-8 text-[#010d3d]">
        <h2 className="text-2xl font-bold">Pagina de ejemplo</h2>
        <p className="mt-2">Contenido principal renderizado dentro de ChatManager.</p>
      </main>
    ),
  },
};

export const Completo: Story = {
  args: {
    children: (
      <section className="mx-auto max-w-6xl p-8 text-[#010d3d]">
        <h2 className="text-2xl font-bold">Landing de ejemplo</h2>
        <p className="mt-2">El chat se mantiene disponible sobre todo el contenido.</p>
      </section>
    ),
  },
};
