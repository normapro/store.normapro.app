import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import HistoriaClienteSection from "@/components/landings/HistoriaClienteSection";

const meta: Meta<typeof HistoriaClienteSection> = {
    title: "Landings/HistoriaClienteSection",
    component: HistoriaClienteSection,
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
        claim: {
            description: "Lista de textos destacados debajo del titulo. Puede ser un string o un array de strings para aplicar diferentes colores a cada parte.",
            control: "object",
        },
        id_testimonio: {
            description: "ID del testimonio a mostrar. Se busca en el endpoint de testimonios para mostrar el testimonio completo con cliente e imagen.",
            control: "number",
        },
    },
};

export default meta;
type Story = StoryObj<typeof HistoriaClienteSection>;

export const Practico: Story = {
    args: {
        claim: [
            "He de reconocer que no me han defraudado desde el primer momento, desde el área comercial hasta el área de sistemas de gestión y auditoría interna como en la parte legal. Me he dejado llevar por ellos y su experiencia, y aunque hemos finalizado la fase 1 del proyecto (año 1), mi sensación ha sido de total coordinación, se han adaptado a nuestros requerimientos y necesidades, transformando lo difícil en fácil con su actitud. Incluso me han aportado información interesante y válida para mejorar ciertos procesos en mi trabajo diario."
        ],
        id_testimonio: 4
    },
};

export const Completo: Story = {
    args: {
        claim: [
            "Con este proyecto, hemos logrado avances significativos en varios aspectos críticos de nuestra operación, incluyendo el inventario efectivo de nuestras máquinas, la asignación de responsabilidades legales claras y la jerarquización de estas responsabilidades.",
            "La experiencia con su equipo hasta ahora ha sido en general muy positiva, destacando especialmente la cercanía y humanidad de sus profesionales, así como la evolución favorable de la Plataforma Digital NormaPro y su capacidad de ajustarse y expandirse de acuerdo a nuestras sugerencias y su notable capacidad de adaptación a nuestras necesidades específicas."
        ],
        id_testimonio: 3
    },
};



