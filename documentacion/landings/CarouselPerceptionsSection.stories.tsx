import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CarouselPerceptionsSection from "@/components/landings/CarouselPerceptionsSection";

const meta: Meta<typeof CarouselPerceptionsSection> = {
    title: "Landings/CarouselPerceptionsSection",
    component: CarouselPerceptionsSection,
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
            description: "Titulo del carrusel de percepciones.",
        },
        pragma: {
            control: "text",
            description: "Texto de reclamo o afirmacion general sobre las percepciones.",
        },
        subtitle: {
            control: "text",
            description: "Subtitulo del carrusel de percepciones.",
        },
        claim: {
            control: "text",
            description: "Texto de reclamo o afirmacion general sobre las percepciones.",
        },
        listIds: {
            control: "object",
            description: "Lista de IDs de percepciones a mostrar en el carrusel.",
        },
    },
};


export default meta;
type Story = StoryObj<typeof CarouselPerceptionsSection>;

export const Practico: Story = {
    args: {
        title: "Voces reales,\nExperiencias verdaderas",
        claim: "Descubre cómo NormaPro BPM ha transformado las operaciones y ha impulsado el crecimiento de empresas como la tuya.\nEstas son las historias y opiniones de quienes han adoptado nuestra solución y han visto resultados tangibles.",
        listIds: [9, 7, 3, 1]
    },
};

export const Completo: Story = {
    args: {
        title: "Percepciones de todos los clientes",
        pragma: "Descubre lo que opinan de NormaPro todos nuestros clientes",
        subtitle: "Testimonios reales ",
        claim: "Estas son solo algunas de las muchas experiencias positivas que nuestros clientes han tenido con NormaPro. Únete a ellos y transforma tu gestión hoy mismo.",
        listIds: [
            5, 4, 3, 6, 8
        ]

    },
};