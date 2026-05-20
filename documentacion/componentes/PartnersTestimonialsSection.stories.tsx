import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PartnersTestimonialsSection from "@/components/PartnersTestimonialsSection";

const meta: Meta<typeof PartnersTestimonialsSection> = {
    title: "Componentes/PartnersTestimonialsSection",
    component: PartnersTestimonialsSection,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Sección de testimonios orientada a socios comerciales (partners). Despliega una cuadrícula de dos columnas que contiene tarjetas con bloques de citas estilizadas mediante iconos de FontAwesome, acompañadas de los datos identificativos y profesionales del emisor.",
            },
        },
    },
    argTypes: {
        title: {
            description: "Título principal de la sección de testimonios.",
            control: "text",
        },
        testimonials: {
            description: "Colección de testimonios recibidos, estructurados con cita textual, nombre y un array de detalles adicionales.",
            control: "object",
        },
    },
};

export default meta;
type Story = StoryObj<typeof PartnersTestimonialsSection>;

export const Practico: Story = {
    args: {
        title: "Lo que dicen nuestros asociados",
        testimonials: [
            {
                quote: "La integración con su ecosistema digital ha facilitado enormemente el cumplimiento en todos nuestros clientes.",
                name: "Carlos Mendoza",
                details: ["Socio Director", "Mendoza & Asociados"],
            },
        ],
    },
};

export const Completo: Story = {
    args: {
        title: "Casos de éxito y opiniones de nuestra red corporativa",
        testimonials: [
            {
                quote: "Implementar la plataforma NormaPro en nuestra línea de consultoría redujo los tiempos operativos de análisis normativo en más del 30% desde el primer mes.",
                name: "Elena Rostova",
                details: ["Directora de Compliance", "Global Risk Consulting"],
            },
            {
                quote: "El soporte técnico y estratégico brindado al partner es excepcional. Nos permite ofrecer un servicio de marca blanca robusto y sumamente confiable.",
                name: "Javier Ortiz",
                details: ["CTO & Cofundador", "Tech Solutions Europe"],
            },
        ],
    },
};