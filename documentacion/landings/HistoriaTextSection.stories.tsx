import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import HistoriaTextSection from "@/components/landings/HistoriaTextSection";

const meta: Meta<typeof HistoriaTextSection> = {
    title: "Landings/HistoriaTextSection",
    component: HistoriaTextSection,
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
        claim: {
            description: "Lista de párrafos destacados debajo del título. Cada elemento del array se renderiza como un párrafo independiente.",
            control: "object",
        },
        buttonText: {
            description: "Texto que se mostrará dentro del botón para abrir el formulario.",
            control: "text",
        },
        image: {
            description: "URL de la imagen a mostrar al final de la seccion.",
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof HistoriaTextSection>;

export const Practico: Story = {
    args: {
        title: "¿Por qué es un éxito?",
        claim: [
            "El proyecto con ROBERT BOSCH España y NormaPro ha sido un éxito rotundo por la superación de objetivos, un impacto positivo en toda la empresa que ha impulsado su crecimiento y estabilidad, la alta adopción y satisfacción del personal con las nuevas herramientas y procesos, y la obtención de resultados tangibles y sostenibles. Estos logros subrayan la eficacia y el valor añadido de NormaPro como una inversión continua valiosa para ROBERT BOSCH España."
        ]
    },
};

export const Completo: Story = {
    args: {
        title: "¿Por qué Robert BOSCH España eligió trabajar con nosotros?",
        claim: [
            "Para la implementación y certificación de la norma UNE 19601 ROBERT BOSCH ESPAÑA buscaba un acompañante de viaje con experiencia comprobada en Compliance penal y transformación digital, soluciones personalizadas, compromiso con la calidad e innovación y credenciales de confianza como las normas ISO. ",
            "NormaPro fue elegida por su tecnología avanzada y adaptable, facilidad de uso e integración, soporte continuo y asesoramiento experto, asegurando que ROBERT BOSCH España se mantuviera a la vanguardia en la gestión del cumplimiento penal."
        ],
        buttonText: "Contacta ahora y analizamos tu caso"
    },
};



