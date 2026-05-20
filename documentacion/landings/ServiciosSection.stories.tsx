import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ServiciosSection from "@/components/landings/ServiciosSection";

const meta: Meta<typeof ServiciosSection> = {
    title: "Landings/ServiciosSection",
    component: ServiciosSection,
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
            description: "Título principal que encabeza la sección de servicios.",
            control: "text",
        },
        basicTitle: {
            description: "Título descriptivo de la columna o bloque de servicios básicos.",
            control: "text",
        },
        extraTitle: {
            description: "Título descriptivo de la columna o bloque de servicios opcionales o extra.",
            control: "text",
        },
        basicServices: {
            description: "Array de objetos correspondientes a los servicios básicos. Cada elemento contiene image, title y claim.",
            control: "object",
        },
        extraServices: {
            description: "Array de objetos correspondientes a los servicios extra. Cada elemento incluye image y un array de strings ('claim') cuyos fragmentos alternan su peso visual.",
            control: "object",
        },
        buttonText: {
            description: "Texto visible en el botón de llamada a la acción. Si no se especifica, el botón no se renderiza.",
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof ServiciosSection>;

export const Practico: Story = {
    args: {
        "title": "Cuánto cuesta el canal de denuncias avanzado NormaPro?",
        "basicTitle": "Nuesto servicio básico incluye:",
        "extraTitle": "Pero puedes añadir otros servicios",
        "basicServices": [
            {
                "image": "IICE_NormaPro2.png",
                "title": "Licencia de uso de la Plataforma",
                "claim": "Para las personas que intervengan en la gestión de denuncias."
            },
            {
                "image": "IICE_LandingCompliance_Expertos.png",
                "title": "Cuadro de expertos",
                "claim": "Acceso para consultas generales a través de la plataforma."
            },
            {
                "image": "IICE_Academia_FormaPro.png",
                "title": "Academia FormaPro",
                "claim": "Para formaciones en materia de canal de denuncias."
            }
        ],
        "extraServices": [
            {
                "image": "IICE_LandingCompliance_Etapa1.png",
                "claim": [
                    "Consultoría para modelar un ",
                    "procedimienot adaptado 100% ",
                    "a las circunstancias específicas de tu empresa."
                ]
            },
            {
                "image": "IICE_LandingCompliance_Etapa6.png",
                "claim": [
                    "Asesoramiento y acompañamiento durante la ",
                    "investigación y tramitación ",
                    "de casos concretos de denuncia"
                ]
            }
        ],
        "buttonText": "Reserva una sesión estratégica"
    },
};

export const Completo: Story = {
    args: {
        "title": "Cuánto cuesta el canal de denuncias avanzado NormaPro?",
        "basicTitle": "Nuesto servicio básico incluye:",
        "extraTitle": "Pero puedes añadir otros servicios",
        "basicServices": [
            {
                "image": "IICE_NormaPro2.png",
                "title": "Licencia de uso de la Plataforma",
                "claim": "Para las personas que intervengan en la gestión de denuncias."
            },
            {
                "image": "IICE_LandingCompliance_Expertos.png",
                "title": "Cuadro de expertos",
                "claim": "Acceso para consultas generales a través de la plataforma."
            },
            {
                "image": "IICE_Academia_FormaPro.png",
                "title": "Academia FormaPro",
                "claim": "Para formaciones en materia de canal de denuncias."
            }
        ],
        "extraServices": [
            {
                "image": "IICE_LandingCompliance_Etapa1.png",
                "claim": [
                    "Consultoría para modelar un ",
                    "procedimienot adaptado 100% ",
                    "a las circunstancias específicas de tu empresa."
                ]
            },
            {
                "image": "IICE_LandingCompliance_Etapa6.png",
                "claim": [
                    "Asesoramiento y acompañamiento durante la ",
                    "investigación y tramitación ",
                    "de casos concretos de denuncia"
                ]
            }
        ],
        "buttonText": "Reserva una sesión estratégica"
    },
};



