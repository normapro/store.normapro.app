import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ClientsMuralSection from "@/components/landings/ClientsMuralSection";

const meta: Meta<typeof ClientsMuralSection> = {
    title: "Landings/ClientsMuralSection",
    component: ClientsMuralSection,
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
            control: "object",
            description: "Claim para mostrar en el carrusel de clientes.",
        },
    },
};


export default meta;
type Story = StoryObj<typeof ClientsMuralSection>;

export const Practico: Story = {
    args: {
        scope: "automatizacion-procesos-negocio",
        claim: [
            "Estas marcas ya trabajan con nosotros"
        ]
    },
};

export const Completo: Story = {
    args: {
        scope: "canal-comunicacion-interno",
        claim: [
            "La Plataforma Digital NormaPro es la que utilizan ",
            "grandes empresas ",
            "para gestionar y monitorizar riesgos de cumplimiento normativo:"
        ]
    },
};