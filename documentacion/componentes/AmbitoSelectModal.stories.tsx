import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AmbitoSelectModal from "@/components/AmbitoSelectModal";

const meta: Meta<typeof AmbitoSelectModal> = {
  title: "Componentes/AmbitoSelectModal",
  component: AmbitoSelectModal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Modal para seleccionar un ambito y lanzar busqueda de soluciones.",
      },
    },
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controla si el modal esta visible.",
    },
    ambitos: {
      control: "object",
      description: "Listado de ambitos disponibles en el selector.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AmbitoSelectModal>;

const BASE_AMBITOS = [
  { id_ambito: 1, slug: "compliance-penal", description: "Compliance penal" },
  { id_ambito: 2, slug: "gestion-documental", description: "Gestion documental" },
  { id_ambito: 3, slug: "bpm", description: "Automatizacion de procesos" },
];

export const Practico: Story = {
  args: {
    isOpen: true,
    ambitos: BASE_AMBITOS,
    onClose: () => {},
    onSelectAmbito: () => {},
  },
};

export const Completo: Story = {
  args: {
    isOpen: true,
    ambitos: BASE_AMBITOS,
    onClose: () => {},
    onSelectAmbito: () => {},
  },
};
