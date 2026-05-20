import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MultimediaPlayer from "@/components/MultimediaPlayer";

const meta: Meta<typeof MultimediaPlayer> = {
    title: "Componentes/MultimediaPlayer",
    component: MultimediaPlayer,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Reproductor multimedia condicional. Detecta el tipo de recurso recibido mediante un identificador y renderiza un contenedor adaptativo (iframe) optimizado para vídeos incrustados de YouTube o una imagen estática con bordes suavizados.",
            },
        },
    },
    argTypes: {
        uri: {
            description: "Enlace o ruta del recurso multimedia (URL de vídeo de YouTube o ruta de la imagen).",
            control: "text",
        },
        typeId: {
            description: "Identificador del tipo de archivo. El valor numérico `1` fuerza el renderizado del reproductor de vídeo.",
            control: "number",
        },
    },
};

export default meta;
type Story = StoryObj<typeof MultimediaPlayer>;

export const Practico: Story = {
    args: {
        uri: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
        typeId: 2,
    },
};

export const Completo: Story = {
    args: {
        uri: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        typeId: 1,
    },
};