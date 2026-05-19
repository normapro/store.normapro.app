import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PresentacionHistoria from "@/components/landings/PresentacionHistoria";

const meta: Meta<typeof PresentacionHistoria> = {
    title: "Landings/PresentacionHistoria",
    component: PresentacionHistoria,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Seccion de texto reutilizable para landings. Permite combinar niveles de texto con diferentes colores y una imagen final.",
            },
        },
    },
    argTypes: {
        logo: {
            description: "URL de la imagen a mostrar al final de la seccion.",
            control: "text",
        },
        clienteNombre: {
            description: "Nombre del cliente utilizado para el texto alternativo (alt) de la imagen del logo.",
            control: "text",
        },
        nombre: {
            description: "Título principal o nombre de la historia que se muestra en tamaño grande.",
            control: "text",
        },
        descripcion: {
            description: "Texto descriptivo o subtítulo destacado que se renderiza debajo del nombre.",
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof PresentacionHistoria>;

export const Practico: Story = {
    args: {
        
    },
};

export const Completo: Story = {
    args: {

    },
};



