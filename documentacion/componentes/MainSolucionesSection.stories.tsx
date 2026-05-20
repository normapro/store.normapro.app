import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MainSolucionesSection from "@/components/MainSolucionesSection";

const meta: Meta<typeof MainSolucionesSection> = {
    title: "Componentes/MainSolucionesSection",
    component: MainSolucionesSection,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Sección cuadriculada orientada a la presentación de paquetes de soluciones corporativas. Destaca la combinación de tecnología y consultoría experta mediante un bloque de etiquetas superior, y consume datos asíncronos para renderizar tarjetas con enlaces informativos y flujos de contratación.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof MainSolucionesSection>;

export const Practico: Story = {};
export const Completo: Story = {};