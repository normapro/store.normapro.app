import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ClientCarouselWrapper from "@/components/landings/ClientCarouselWrapper";

const meta: Meta<typeof ClientCarouselWrapper> = {
    title: "Landings/ClientCarouselWrapper",
    component: ClientCarouselWrapper,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Seccion de video reutilizable para landings. Permite combinar niveles de video, destacados y boton de accion.",
            },
        },
    },
    argTypes: {
        scope: {
            control: "text",
            description: "Scope para filtrar los clientes a mostrar en el carrusel.",
        },
        claim: {
            control: "text",
            description: "Claim para mostrar en el carrusel de clientes.",
        },

    },
};


export default meta;
type Story = StoryObj<typeof ClientCarouselWrapper>;

export const Practico: Story = {
    args: {
        claim: "Clientes que ya utilizan soluciones del ecosistema NormaPro",
        scope: "gestor-documental"
    },
};

export const Completo: Story = {
    args: {
        claim: "Clientes que ya utilizan soluciones del ecosistema NormaPro",
        scope: "formapro"
    },
};