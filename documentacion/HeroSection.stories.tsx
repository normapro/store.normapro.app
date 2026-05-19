import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import HeroSection from "@/components/landings/HeroSection";

const meta: Meta<typeof HeroSection> = {
    title: "Landings/HeroSection",
    component: HeroSection,
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
            description: "Titulo principal de la seccion",
            control: "text",
        },
        claim: {
            description: "Lista de textos destacados debajo del titulo. Puede ser un string o un array de strings.",
            control: "object",
        },
        pragma: {
            description: "Lista de textos descriptivos debajo de los destacados. Puede ser un string o un array de strings.",
            control: "object",
        },
        cta: {
            description: "Texto del boton de llamada a la accion",
            control: "text",
        },
        imgType: {
            description: "Tipo de imagen a mostrar. Puede ser 'lottie' para animaciones o 'img' para imagenes estaticas.",
            control: "select",
            options: ["lottie", "img"]
        },
        imgUrl: {
            description: "URL de la imagen o animacion a mostrar. Para lotties, se asume que el JSON esta en /public/lotties/ si no es una URL externa.",
            control: "text",
        },
        backgroundImg: {
            description: "URL de la imagen de fondo para la seccion.",
            control: "text",
        },
        backgroundRepeat: {
            description: "Propiedad CSS background-repeat para la imagen de fondo.",
            control: "text",
        },
        backgroundSize: {
            description: "Propiedad CSS background-size para la imagen de fondo.",
            control: "text",
        },
        backgroundPositionX: {
            description: "Propiedad CSS background-position-x para la imagen de fondo.",
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Practico: Story = {
    args: {
        title: "NormaPro BPM",
        claim: [
            "Optimiza y automatiza tus procesos sin complicaciones, en semanas"
        ],
        pragma: [],
        cta: "Quiero una demostración",
        imgType: "lottie",
        imgUrl: "bpm",
        backgroundImg: "hielo3.png",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "center"
    },
};

export const Completo: Story = {
    args: {
        title: "Programa para Modelado y digitalización de procesos internos de negocio con NormaPro BPM Suite",
        claim: [
            "Optimiza, ahorra, simplifica: el camino del éxito"
        ],
        pragma: [],
        cta: "Reserva una sesión estratégica",
        imgType: "lottie",
        imgUrl: "automatizacion-procesos-negocio",
        backgroundImg: "hielo6.png",
        backgroundSize: "90%",
        backgroundRepeat: "no-repeat",
        backgroundPositionX: "center"
    },
};



