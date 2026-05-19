import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import QuestionsSection from "@/components/landings/QuestionsSection";

const meta: Meta<typeof QuestionsSection> = {
    title: "Landings/QuestionsSection",
    component: QuestionsSection,
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
            description: "Título principal opcional de la sección.",
            control: "text",
        },
        intro: {
            description: "Texto introductorio opcional. Puede recibir un string con saltos de línea o un array de strings.",
            control: "object",
        },
        preQuestionsText: {
            description: "Texto destacado en gris que se renderiza justo antes del bloque de preguntas.",
            control: "text",
        },
        questions: {
            description: "Lista de preguntas o frases a mostrar dentro de los bocadillos de forma alternada.",
            control: "object",
        },
        bigMarkText: {
            description: "Símbolo o caracter grande que acompaña de fondo a cada una de las preguntas.",
            control: "text",
        },
        buttonText: {
            description: "Texto del botón de llamada a la acción. Si no se define, el botón se oculta.",
            control: "text",
        },
        background: {
            description: "Color de fondo para el contenedor principal de la sección.",
            control: "select",
            options: ["white", "gray"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof QuestionsSection>;

export const Practico: Story = {
    args: {
        "title": "¿Cuándo vas poner en marcha un Modelo de gestión de Compliance penal o actualizar el que ya tienes?",
        "intro": [
            "Son diarios los casos que se suceden en los juzgados derivados de incumplimientos con consecuencias legales graves; son situaciones muy desagradables que pueden dar al traste con tu futuro profesional y personal.",
            "Puedes seguir dando palos de ciego con hojas de cálculo y correos electrónicos que generan un sinfín de trabajos manuales con errores, fallos, tiempo mal invertido y que acaban siendo descuidados y poniendo en riesgo a tu organización y ti mismo."
        ],
        "preQuestionsText": "Lo normal es que en estos momentos solo sabes:",
        "questions": [
            "Que no sabes por dónde empezar",
            "Que no cuentas con los recursos financieros o humanos necesarios para implementar un sistema de Compliance penal efectivo.",
            "Que las leyes y regulaciones en torno al Compliance son a menudo complejas y cambiantes, lo que hace difícil que tu empresa se mantenga actualizada.",
            "¿Que no dispones del expertise legal necesario para interpretar y aplicar las leyes y regulaciones de manera efectiva.?",
            "Que puede haber resistencia por parte de algunos empleados para adoptar nuevas prácticas o cambios que implique un sistema de Compliance."
        ],
        "buttonText": "Reserva una sesión estratégica"
    },
};

export const Completo: Story = {
    args: {
        "title": "¿Cuándo vas poner en marcha un Modelo de gestión de Compliance penal o actualizar el que ya tienes?",
        "intro": [
            "Son diarios los casos que se suceden en los juzgados derivados de incumplimientos con consecuencias legales graves; son situaciones muy desagradables que pueden dar al traste con tu futuro profesional y personal.",
            "Puedes seguir dando palos de ciego con hojas de cálculo y correos electrónicos que generan un sinfín de trabajos manuales con errores, fallos, tiempo mal invertido y que acaban siendo descuidados y poniendo en riesgo a tu organización y ti mismo."
        ],
        "preQuestionsText": "Lo normal es que en estos momentos solo sabes:",
        "questions": [
            "Que no sabes por dónde empezar",
            "Que no cuentas con los recursos financieros o humanos necesarios para implementar un sistema de Compliance penal efectivo.",
            "Que las leyes y regulaciones en torno al Compliance son a menudo complejas y cambiantes, lo que hace difícil que tu empresa se mantenga actualizada.",
            "¿Que no dispones del expertise legal necesario para interpretar y aplicar las leyes y regulaciones de manera efectiva.?",
            "Que puede haber resistencia por parte de algunos empleados para adoptar nuevas prácticas o cambios que implique un sistema de Compliance."
        ],
        "buttonText": "Reserva una sesión estratégica"
    },
};



