import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Footer from "@/components/Footer";

const meta: Meta<typeof Footer> = {
  title: "Componentes/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Pie de página institucional global. Incluye bloques con suscripción a newsletter, enlaces de redes sociales, menús de navegación dinámicos, marcas de certificación asociadas y textos legales.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Practico: Story = {};
export const Completo: Story = {};