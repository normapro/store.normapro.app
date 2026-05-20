import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ListColumnsSection from "@/components/landings/ListColumnsSection";

const meta: Meta<typeof ListColumnsSection> = {
    title: "Landings/ListColumnsSection",
    component: ListColumnsSection,
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
        list: {
            description: "Lista de elementos que se mostrarán en columnas. Cada elemento es un objeto que contiene un 'title' opcional y un 'claim' obligatorio.",
            control: "object",
        },
        image: {
            description: "URL de la imagen a mostrar al final de la seccion.",
            control: "text",
        },

    },
};

export default meta;
type Story = StoryObj<typeof ListColumnsSection>;

export const Practico: Story = {
    args: {
        list: [
                {
                    claim: "Cuando CALIDAD PASCUAL se embarcó en su viaje con nuestro Modelo Avanzado NormaPro, enfrentaba retos significativos en el ámbito del cumplimiento normativo. En un entorno empresarial que evoluciona rápidamente, CALIDAD PASCUAL necesitaba una solución que no solo abordara sus necesidades actuales de cumplimiento, sino que también se adaptara a los cambios futuros."
                },
                {
                    claim: "Calidad Pascual S.A.U. es una empresa familiar española dedicada a la preparación y envasado de leche y derivados, además de otros productos alimenticios y exporta sus productos a 52 países de los cinco continentes. Es una de las mayores marcas de consumo de productos lácteos en España."
                }
            ],
            image: "calidadpascual1.png"
    },
};

export const Completo: Story = {
    args: {
        title: "Valor de la solución aportada",
            list: [
                {
                    title: "Reto del proyecto",
                    claim: "CALIDAD PASCUAL enfrentaba desafíos significativos en cumplimiento normativo en un entorno empresarial en rápida evolución. Los retos incluían adaptarse a normativas cambiantes, optimizando los procesos internos de control y verificación de cumplimiento y fortalecer su reputación."
                },
                {
                    title: "Objetivo del proyecto",
                    claim: "El objetivo era implementar un Modelo Avanzado de Prevención de Cumplimiento de NormaPro en CALIDAD PASCUAL, para optimizar la gestión del cumplimiento normativo, integrar tecnología avanzada para automatizar los procesos de control y lograr un alto nivel de cumplimiento y gestión eficiente."
                },
                {
                    title: "Valor de la solución aportada",
                    claim: "NormaPro aportó un valor sustancial a CALIDAD PASCUAL, mejorando el control del cumplimiento normativo, automatizando y estandarizando los procesos asociados, optimizando recursos, proporcionando soporte experto, gestionando riesgos, alineándose con certificaciones ISO y fortaleciendo la cultura de cumplimiento."
                }
            ],
            image: "calidadpascual2.png"
    },
};



