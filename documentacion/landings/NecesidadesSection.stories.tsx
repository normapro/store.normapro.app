import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import NecesidadesSection from "@/components/landings/NecesidadesSection";

const meta: Meta<typeof NecesidadesSection> = {
    title: "Landings/NecesidadesSection",
    component: NecesidadesSection,
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
        imgBackground: {
            description: "URL de la imagen de fondo decorativa que se muestra detrás de la imagen principal.",
            control: "text",
        },
        image: {
            description: "URL de la imagen principal a mostrar en la cabecera de la seccion.",
            control: "text",
        },
        title: {
            description: "Título secundario o categoría pequeña ubicada arriba del todo.",
            control: "text",
        },
        subtitle: {
            description: "Título principal de la sección con un tamaño destacado.",
            control: "text",
        },
        titlelist: {
            description: "Texto destacado en gris que introduce o da contexto a la lista.",
            control: "text",
        },
        list: {
            description: "Lista de strings que se renderizan de forma ordenada con viñetas alfabéticas (a, b, c...).",
            control: "object",
        },
        claim: {
            description: "Texto explicativo u opcional que se renderiza entre el 'titlelist' y la lista.",
            control: "text",
        },

    },
};

export default meta;
type Story = StoryObj<typeof NecesidadesSection>;

export const Practico: Story = {
    args: {
        "imgBackground": "hielo4.png",
        "image": "IICE_NormaPro1.png",
        "title": "Ahora piensa:",
        "subtitle": "¿Cuánto tiempo vas a dedicarle a implantar un sistema de gestión del cumplimiento?",
        "titlelist": "Para ello necesitas:",
        "claim": "Descubrir por ti mismo cómo funciona el ordenamiento jurídico en este ámbito. Y no se trata solo de diseñar un modelo, sino de todos los pasos que necesitas dar para que finalmente consigas implantarlo, ponerlo en marcha y que se mantenga funcionando en el tiempo gracias a que tu equipo ha integrado los hábitos necesarios para que os aporte la tranquilidad que necesitas."
    },
};

export const Completo: Story = {
    args: {
        "imgBackground": "hielo4.png",
        "image": "IICE_NormaPro1.png",
        "title": "Ahora piensa:",
        "subtitle": "¿Cuánto tiempo vas a dedicarle a implantar un sistema de gestión del cumplimiento?",
        "titlelist": "Para ello necesitas:",
        "list": [
            "Conocer las normas que afectan a tus instalaciones, a tus equipos de trabajo y a tus máquinas, o en materia ambiental desde gestión de residuos y vertidos hasta emisiones, formaciones obligatorias de tu personal o entrega de EPI’s, almacenamiento de productos químicos, legionela o normativa sanitaria, por nombrar algunas.",
            "Descubrir por ti mismo cómo funciona el ordenamiento jurídico en este ámbito porque no te estoy hablando solo de diseñar un modelo me refiero a todos los pasos que necesitas dar para que finalmente consigas implantarlo, ponerlo en marcha y que se mantenga funcionando en el tiempo gracias a que tu equipo ha integrado los hábitos necesarios para que os aporte la tranquilidad que necesitas."
        ],            
        "claim": "Descubrir por ti mismo cómo funciona el ordenamiento jurídico en este ámbito. Y no se trata solo de diseñar un modelo, sino de todos los pasos que necesitas dar para que finalmente consigas implantarlo, ponerlo en marcha y que se mantenga funcionando en el tiempo gracias a que tu equipo ha integrado los hábitos necesarios para que os aporte la tranquilidad que necesitas."

    },
};



