import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ClavesSection from "@/components/landings/ClavesSection";

const meta: Meta<typeof ClavesSection> = {
    title: "Landings/ClavesSection",
    component: ClavesSection,
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
            description: "Titulo de la seccion de claves.",
        },
        claves: {
            control: "object",
            description: "Lista de objetos con imagen y texto de cada clave a mostrar.",
        },
        showDividers: {
            control: "boolean",
            description: "Indica si se muestran divisores entre las claves en pantallas md o mayores.",
        },
    },
};


export default meta;
type Story = StoryObj<typeof ClavesSection>;

export const Practico: Story = {
    args: {
        title: "4 claves indispensables para organizar y automatizar tareas de cumplimiento",
        claves: [
            {
                "image": "IICE_LandingCompliance_automatizar_tareas1.svg",
                "claim": "Conocer a fondo toda la información relativa a cada actividad, área o departamento."
            },
            {
                "image": "IICE_LandingCompliance_automatizar_tareas2.svg",
                "claim": "Saber qué norma es aplicable a cada caso concreto y cual no, tenerla toda inventariada y accesible."
            },
            {
                "image": "IICE_LandingCompliance_automatizar_tareas3.svg",
                "claim": "Discernir qué evidencias hemos de tener disponibles."
            },
            {
                "image": "IICE_LandingCompliance_automatizar_tareas4.svg",
                "claim": "Estar preparado en todo momento para dar la respuesta adecuada ante una auditoría, inspección o accidente."
            }
        ]
    },
};

export const Completo: Story = {
    args: {
        title: "El Modelo más completo y Avanzado de gestión de Compliance penal",
        claves: [
            {
                "image": "Grupo3531.png",
                "claim": "Una metodología probada y que funciona desde hace más de 10 años"
            },
            {
                "image": "icons/earth-americas.svg",
                "claim": "Saber qué norma es aplicable a cada caso concreto y cual no, tenerla toda inventariada y accesible."
            },
            {
                "image": "Grupo3550.png",
                "claim": "Discernir qué evidencias hemos de tener disponibles."
            }
        ],
        showDividers: true
    },
};