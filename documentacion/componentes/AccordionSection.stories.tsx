import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AccordionSection from "@/components/AccordionSection";

const meta: Meta<typeof AccordionSection> = {
  title: "Componentes/AccordionSection",
  component: AccordionSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Seccion de acordeon reutilizable para bloques de preguntas, politicas u ofertas.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Titulo general del bloque de acordeon.",
    },
    items: {
      control: "object",
      description: "Lista de elementos del acordeon. Cada item requiere title y content.",
    },
    interpretHtmlStrings: {
      control: "boolean",
      description: "Si esta activo, interpreta el contenido de texto como HTML.",
    },
    defaultOpenIndex: {
      control: "number",
      description: "Indice inicialmente abierto. Usa null para iniciar todo cerrado.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AccordionSection>;

export const Basico: Story = {
  args: {
    title: "Preguntas frecuentes",
    defaultOpenIndex: 0,
    items: [
      {
        title: "Que incluye la implementacion",
        content:
          "Incluye configuracion inicial, acompanamiento de puesta en marcha y formacion para tu equipo.",
      },
      {
        title: "Cuanto tarda en estar operativo",
        content:
          "Depende del alcance, pero los primeros procesos suelen estar activos en pocas semanas.",
      },
      {
        title: "Puedo integrarlo con otras herramientas",
        content:
          "Si. Se puede integrar con sistemas de negocio existentes para unificar datos y flujos.",
      },
    ],
  },
};

export const Completo: Story = {
  args: {
    title: "Politicas corporativas",
    interpretHtmlStrings: false,
    defaultOpenIndex: 0,
    items: [
      {
        title: "Politica de calidad",
        content:
          "Nuestro sistema de gestion promueve la mejora continua y el cumplimiento normativo.",
      },
      {
        title: "Politica de seguridad",
        content:
          "Aplicamos controles tecnicos y organizativos para proteger la informacion.",
      },
    ],
  },
};
