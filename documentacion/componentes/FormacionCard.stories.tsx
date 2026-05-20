import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import formacionCard from "@/components/formacionCard";

const meta: Meta<typeof formacionCard> = {
    title: "Componentes/FormacionCard",
    component: formacionCard,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Tarjeta visual para elementos de formación. Renderiza una imagen de fondo con una capa superpuesta, logotipos corporativos, un botón central de reproducción y el título del curso.",
            },
        },
    },
    argTypes: {
        formacion: {
            description: "Objeto con los datos de la formación a visualizar, incluyendo título, descripción y URL de la imagen.",
            control: "object",
        },
    },
};

export default meta;
type Story = StoryObj<typeof formacionCard>;

export const Practico: Story = {
    args: {

    },
};

export const Completo: Story = {
    args: {

    },
};