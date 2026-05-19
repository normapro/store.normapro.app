import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import EstudioSection from "@/components/landings/EstudioSection";

const meta: Meta<typeof EstudioSection> = {
    title: "Landings/EstudioSection",
    component: EstudioSection,
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
            description: "Titulo del estudio.",
        },
        claim: {
            control: "object",
            description: "Lista de claims para mostrar en la seccion de estudio.",
        },
        pragma: {
            control: "text",
            description: "Pragma para mostrar en la seccion de estudio.",
        },
        datos: {
            control: "object",
            description: "Datos para mostrar en la seccion de estudio.",
        },
    },
};



export default meta;
type Story = StoryObj<typeof EstudioSection>;

export const Practico: Story = {
    args: {
        title: "¿Cuánto dinero nos estamos dejando por el camino?",
        claim: [
            "Un estudio realizado por Instituto de Innovación, Ciencia y Empresa en el que han participado los responsables de Instalaciones y equipos, Seguridad Industrial, Alimentaria, y Medio Ambiente de 50 empresas de España revela que",
            " los costes actuales de operación y/o gestión en estas áreas pueden reducirse al menos en un 40%."
        ],
        pragma: [
            "¿Cuál puede ser el coste para tu empresa por un fallo de control de control normativo?"
        ],
        datos: [
            {
                icon: "fa-display-slash",
                porcentaje: "75%",
                claim: [
                    "de los encuestados no disponen de",
                    "ninguna herramienta digital",
                    "específica (Siglo pasado)"
                ]
            },
            {
                icon: "fa-file-excel",
                porcentaje: "100%",
                claim: [
                    "Reconocen usar múltiples",
                    "hojas de cálculo.",
                    "(Edad Media)"
                ]
            },
            {
                icon: "fa-file-pen",
                porcentaje: "100%",
                claim: [
                    "Reconocen utilizar aún formularios en papel en algún proceso (¡Paleolítico!)"
                ]
            },
            {
                icon: "fa-calendar-clock",
                porcentaje: "40%",
                claim: [
                    "De liberación de tiempo necesario que puedes destinar a nuevas tareas productivas"
                ]
            }
        ]
    },
};

export const Completo: Story = {
    args: {
        title: "¿Cuánto dinero nos estamos dejando por el camino?",
        claim: [
            "Un estudio realizado por Instituto de Innovación, Ciencia y Empresa en el que han participado los responsables de Instalaciones y equipos, Seguridad Industrial, Alimentaria, y Medio Ambiente de 50 empresas de España revela que",
            " los costes actuales de operación y/o gestión en estas áreas pueden reducirse al menos en un 40%."
        ],
        pragma: [
            "¿Cuál puede ser el coste para tu empresa por un fallo de control de control normativo?",
            "En NormaPro hemos desarrollado un método avanzado de cumplimiento normativo que te ayuda a alcanzar el máximo nivel posible de grado de cumplimiento en tu empresa o departamento"
        ],
        datos: [
            {
                icon: "fa-display-slash",
                porcentaje: "75%",
                claim: [
                    "de los encuestados no disponen de",
                    "ninguna herramienta digital",
                    "específica (Siglo pasado)"
                ]
            },
            {
                icon: "fa-file-excel",
                porcentaje: "100%",
                claim: [
                    "Reconocen usar múltiples",
                    "hojas de cálculo.",
                    "(Edad Media)"
                ]
            },
            {
                icon: "fa-file-pen",
                porcentaje: "100%",
                claim: [
                    "Reconocen utilizar aún formularios en papel en algún proceso (¡Paleolítico!)"
                ]
            },
            {
                icon: "fa-calendar-clock",
                porcentaje: "40%",
                claim: [
                    "De liberación de tiempo necesario que puedes destinar a nuevas tareas productivas"
                ]
            }
        ]
    },
};