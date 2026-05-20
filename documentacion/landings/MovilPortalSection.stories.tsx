import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MovilPortalSection from "@/components/landings/MovilPortalSection";

const meta: Meta<typeof MovilPortalSection> = {
    title: "Landings/MovilPortalSection",
    component: MovilPortalSection,
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
        title: {
            description: "Título principal de la sección.",
            control: "text",
        },
        subtitle: {
            description: "Subtítulo o descripción corta ubicada debajo del título principal.",
            control: "text",
        },
        images: {
            description: "Lista con las URLs de las imágenes a mostrar de forma escalonada en la sección.",
            control: "object",
        },

    },
};

export default meta;
type Story = StoryObj<typeof MovilPortalSection>;

export const Practico: Story = {
    args: {
        "title": "Y todo esto, hazlo también desde tu móvil",
        "subtitle": "Potencia la movilidad y la eficiencia fuera de la oficina.",
        "images": [
            "portalmovil5.png",
            "portalmovil6.png",
            "portalmovil7.png",
            "portalmovil8.png"
        ]
    },
};

export const Completo: Story = {
    args: {
        "title": "Y todo esto, hazlo también desde tu móvil",
        "subtitle": "Potencia la movilidad y la eficiencia fuera de la oficina.",
        "images": [
            "formapro1.png",
            "formapro2.png",
            "formapro3.png",
            "formapro4.png"
        ]
    },
};



