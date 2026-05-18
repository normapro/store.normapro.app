import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CertificacionesSection from "@/components/landings/CertificacionesSection";

const meta: Meta<typeof CertificacionesSection> = {
    title: "Landings/CertificacionesSection",
    component: CertificacionesSection,
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
        title: {
            control: "text",
            description: "Titulo de la seccion de certificaciones.",
        },
        subtitle: {
            control: "text",
            description: "Subtitulo de la seccion de certificaciones.",
        },
        images: {
            control: "object",
            description: "Lista de nombres de archivos de imagen de certificaciones a mostrar.",
        },
    },
};


export default meta;
type Story = StoryObj<typeof CertificacionesSection>;

export const Practico: Story = {
    args: {
        title: "Calidad y seguridad certificada",
        subtitle: "Nuestros productos y servidios cuentan con certificación AENOR:",
        images: [
            "27001.png",
            "9001.png",
            "45001.png",
            "iqnet.png"
        ]
    },
};

export const Completo: Story = {
    args: {
        title: "Calidad y seguridad certificada",
        subtitle: "Un Modelo original con el software más avanzado",
        images: [
            "27001.png",
            "9001.png",
            "ascom.png",
            "qaec.png"
        ]
    },
};