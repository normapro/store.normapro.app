import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Testimonios from "@/components/Testimonios";

const meta: Meta<typeof Testimonios> = {
  title: "Componentes/Testimonios",
  component: Testimonios,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Lista vertical simplificada de testimonios y valoraciones. Controla de forma interna los estados vacíos mostrando un mensaje de espera predeterminado y renderiza tarjetas minimalistas con citas textuales y metadatos del autor cuando se inyectan datos.",
      },
    },
  },
  argTypes: {
    testimonios: {
      description: "Colección de objetos con la información estructurada de las opiniones recibidas.",
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Testimonios>;

export const Practico: Story = {
  args: {
    testimonios: [],
  },
};

export const Completo: Story = {
  args: {
    testimonios: [
      {
        autor: "Beatriz Palacios",
        cargo: "Chief Compliance Officer",
        empresa: "Logística del Norte S.A.",
        mensaje: "La automatización de alertas normativas transformó por completo nuestra eficiencia operativa semanal.",
      },
      {
        autor: "Ricardo Domínguez",
        cargo: "Director de Operaciones",
        empresa: "Iberian Tech Group",
        mensaje: "Un componente limpio, intuitivo y con un equipo de soporte detrás que responde al instante ante cualquier cambio legislativo.",
      },
    ],
  },
};