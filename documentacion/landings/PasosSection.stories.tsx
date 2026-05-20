import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PasosSection from "@/components/landings/PasosSection";

const meta: Meta<typeof PasosSection> = {
    title: "Landings/PasosSection",
    component: PasosSection,
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
            description: "Subtítulo de la sección ubicado debajo del título principal.",
            control: "text",
        },
        pasos: {
            description: "Lista de pasos a renderizar. Cada elemento es un objeto que contiene un array de strings ('claim') con los párrafos de texto explicativos.",
            control: "object",
        },
    },
};

export default meta;
type Story = StoryObj<typeof PasosSection>;

export const Practico: Story = {
    args: {
        "title": "¿Cuál debería ser el valor de este paquete de servicios",
        "subtitle": "Hagamos un ejercicio muy simple:",
        "pasos": [
            {
                "claim": [
                    "Imagina que ya tienes la idea de cómo organizar toda la actividad relativa a la gestión del cumplimiento de tu empresa o de tu departamento y sabes aproximadamente los alcances normativos que te afectan pero, por falta de tiempo o conocimientos específicos, necesitas contratar a un consultor que te ayude a establecer un mapa de obligaciones legales específico a medida de vuestras circunstancias y te oriente sobre qué documentación es la mejor para evidenciar el cumplimiento ante terceros. ",
                    "Todo este proceso te puede costar un mínimo de 6.000€ dependiendo del tamaño de tu organización"
                ]
            },
            {
                "claim": [
                    "Pongámonos ahora en el caso de que todo eso puedes hacerlo por ti mismo porque conoces perfectamente tu empresa y el sector en el que operáis etc, perfecto, pero quizás tengas dudas sobre cómo establecer un sistema para mantenerlo todo actualizado y cuidando que no se pase ningún plazo y, sobre todo, disponer de algunas herramientas de software que te funcione a la hora de coordinaros y ahorrar tiempo.",
                    "Podrías entonces contratar a una consultora con un software para hacerlo, ¿verdad? un programa de consultoría más las licencias del software te puede costar un mínimo de otros 6.000 € al año."
                ]
            },
            {
                "claim": [
                    "Ahora seguramente estás pensando que en realidad todo eso te lo puedes ahorrar y lo puedes hacer tú mismo y podrías hacerlo, pero ¿cuánto tiempo vas a tardar en resolver todas las dudas que te van a ir saliendo por el camino por tu cuenta y riesgo? Piénsalo, ¿meses?, y algo muy importante y es que tu tiempo también vale dinero. Ponle un valor a tu tiempo y al de tu equipo, ¿cuánto vale una hora de vuestro trabajo? ¿40€?, ¿60€?, ¿80€? eso tú lo sabes mejor."
                ]
            }
        ]
    },
};

export const Completo: Story = {
    args: {
        "title": "¿Cuál debería ser el valor de este paquete de servicios",
        "subtitle": "Hagamos un ejercicio muy simple:",
        "pasos": [
            {
                "claim": [
                    "Imagina que ya tienes la idea de cómo organizar toda la actividad relativa a la gestión del cumplimiento de tu empresa o de tu departamento y sabes aproximadamente los alcances normativos que te afectan pero, por falta de tiempo o conocimientos específicos, necesitas contratar a un consultor que te ayude a establecer un mapa de obligaciones legales específico a medida de vuestras circunstancias y te oriente sobre qué documentación es la mejor para evidenciar el cumplimiento ante terceros. ",
                    "Todo este proceso te puede costar un mínimo de 6.000€ dependiendo del tamaño de tu organización"
                ]
            },
            {
                "claim": [
                    "Pongámonos ahora en el caso de que todo eso puedes hacerlo por ti mismo porque conoces perfectamente tu empresa y el sector en el que operáis etc, perfecto, pero quizás tengas dudas sobre cómo establecer un sistema para mantenerlo todo actualizado y cuidando que no se pase ningún plazo y, sobre todo, disponer de algunas herramientas de software que te funcione a la hora de coordinaros y ahorrar tiempo.",
                    "Podrías entonces contratar a una consultora con un software para hacerlo, ¿verdad? un programa de consultoría más las licencias del software te puede costar un mínimo de otros 6.000 € al año."
                ]
            },
            {
                "claim": [
                    "Ahora seguramente estás pensando que en realidad todo eso te lo puedes ahorrar y lo puedes hacer tú mismo y podrías hacerlo, pero ¿cuánto tiempo vas a tardar en resolver todas las dudas que te van a ir saliendo por el camino por tu cuenta y riesgo? Piénsalo, ¿meses?, y algo muy importante y es que tu tiempo también vale dinero. Ponle un valor a tu tiempo y al de tu equipo, ¿cuánto vale una hora de vuestro trabajo? ¿40€?, ¿60€?, ¿80€? eso tú lo sabes mejor."
                ]
            }
        ]
    },
};



