import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ImgTextSection from "@/components/landings/ImgTextSection";

const meta: Meta<typeof ImgTextSection> = {
  title: "Landings/ImgTextSection",
  component: ImgTextSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Seccion de imagen + texto para landings. Renderiza imagen principal, fondo opcional y bloques de texto de apoyo.",
      },
    },
  },
  argTypes: {
    imgCabecera: {
      control: "text",
      description: "Nombre de la imagen principal en /public/apps.",
    },
    imgBackground: {
      control: "text",
      description: "Nombre de la imagen de fondo opcional en /public/apps.",
    },
    title: {
      control: "text",
      description: "Titulo principal de la seccion.",
    },
    subtitle: {
      control: "text",
      description: "Subtitulo opcional.",
    },
    claim: {
      control: "text",
      description: "Frase de refuerzo opcional.",
    },
    pragma: {
      control: "text",
      description: "Texto largo explicativo opcional.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImgTextSection>;


export const ConAlgunasProps: Story = {
  args: {
    imgCabecera: "Grupo-4593@2x.png",
    title: "Con NormaPro BPM, convierte complejidad en claridad.",
    subtitle:
      "Es el momento de decidir si quieres contar con una herramienta que te ayudara a reducir demoras, mejorar la coherencia operativa y facilitar decisiones basadas en datos.",
  },
};

export const ConTodasLasProps: Story = {
  args: {
    imgCabecera: "Grupo-4593@2x.png",
    imgBackground: "hielo3.png",
    title: "Transforma tu gestion normativa: eficiencia y seguridad en un solo clic",
    subtitle:
      "Es el momento de decidir si quieres contar con una herramienta que te ayudara a evitar problemas de sanciones, incumplimientos y perdida de reputacion.",
    claim:
      "Con NormaPro puedes mejorar tu posicion en el mercado, optimizar recursos y reforzar la confianza de tus stakeholders.",
    pragma:
      "Si mantienes procesos manuales, el coste de no actuar se multiplica con cada desviacion y cada retraso. Con una gestion estructurada, el equipo gana visibilidad, trazabilidad y capacidad de respuesta.",
  },
};
