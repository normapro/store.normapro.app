import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import VideoSection from "@/components/landings/VideoSection";
 
const meta: Meta<typeof VideoSection> = {
  title: "Landings/VideoSection",
  component: VideoSection,
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
        description: "Titulo del video.",
 
    },
    items: {
        control: "object",
        description: "Lista de puntos destacados relacionados al video.",
    },
    url_video: {
        control: "text",
        description: "URL del video acortados",
    },
    buttonText: {
        control: "text",
        description: "Texto del boton CTA.",
    },
    imgBackground: {
        control: "text",
        description: "Nombre del archivo de imagen de fondo .",
    }
  },
};
 
export default meta;
type Story = StoryObj<typeof VideoSection>;
 
export const Completo: Story = {
  args: {
    title: "Descubre NormaPro en accion",
    items: [
      "Visualiza la interfaz intuitiva de NormaPro.",
    ],
    url_video: "https://youtu.be/dQw4w9WgXcQ",
    buttonText: "Solicitar demo",
    imgBackground: "video-bg.png"
  },
};
 

export const Practico: Story = {
  args: {
    title: "Descubre NormaPro en accion",
    items: [
      "Visualiza la interfaz intuitiva de NormaPro.",
    ],
    url_video: "https://www.youtube.com/watch?v=dFzszQnFyT0",
  },
};
