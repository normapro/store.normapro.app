import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import TextSection from "@/components/landings/TextSection";

const meta: Meta<typeof TextSection> = {
  title: "Landings/TextSection",
  component: TextSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Seccion de texto reutilizable para landings. Permite combinar niveles de texto, destacados y boton de accion.",
      },
    },
  },
  argTypes: {
    background: {
      control: "select",
      options: ["white", "gray"],
      description: "Define el color de fondo de la seccion.",
    },
    level1: { control: "object", description: "Titulo principal grande." },
    level2: { control: "object", description: "Subtitulo principal." },
    level3: { control: "object", description: "Texto de apoyo nivel 3." },
    level4: { control: "object", description: "Texto de apoyo nivel 4." },
    level5: { control: "object", description: "Texto destacado grande." },
    level6: { control: "object", description: "Texto de apoyo nivel 6." },
    level7: { control: "object", description: "Texto de apoyo nivel 7." },
    level8: { control: "object", description: "Texto descriptivo principal." },
    level9: { control: "object", description: "Texto descriptivo secundario." },
    buttonText: { control: "text", description: "Texto del boton CTA." },
    remarkableText: { control: "text", description: "Texto destacado grande." },
    remarkableText2: {
      control: "text",
      description: "Texto destacado secundario.",
    },
    remarkableText3: {
      control: "text",
      description: "Texto destacado en formato circular.",
    },
  },
  args: {
    background: "white",
  },
};

export default meta;
type Story = StoryObj<typeof TextSection>;

export const Basica: Story = {
  args: {
    level2: ["Digitaliza y simplifica tu gestion"],
    level8: [
      "Centraliza procesos, mejora trazabilidad y acelera decisiones con NormaPro.",
    ],
  },
};

export const ConCTA: Story = {
  args: {
    background: "gray",
    level2: ["Unete a nuestro equipo"],
    level8: [
      "Buscamos perfiles con pasion por producto, tecnologia y mejora continua.",
    ],
    buttonText: "Ver ofertas",
  },
};

export const ConDestacados: Story = {
  args: {
    background: "white",
    remarkableText3: "95%",
    level9: ["de clientes mejoran tiempos operativos en menos de 3 meses."],
    remarkableText: "Resultados medibles",
    remarkableText2: "Desde el primer trimestre",
  },
};

export const EjemploCompletoReal: Story = {
  args: {
    background: "gray",
    level1: ["La mayor parte de las empresas", "no encuentran todo ese tiempo."],
    level2: ["Tiempo para enfocarte en produccion y crecimiento real."],
    level3: [
      "Si no estructuras habitos de cumplimiento, el equipo pierde foco.",
    ],
    level4: ["Con NormaPro alineas personas, procesos y resultados."],
    level5: ["Mas control, menos friccion"],
    level6: ["Implementacion guiada y seguimiento continuo."],
    level7: ["Solicita una demo y evalua el impacto con tu propio caso."],
    level8: [
      "Tiempo que, realmente, lo necesitas para no desviarte de tus objetivos de produccion ya que sabes que nunca vas a poder recuperarlo y que vale mucho mas que el precio que cuesta el paquete de servicios que te ofrecemos para establecer entre los miembros de tu plantilla los habitos de cumplimiento necesarios que estaran alineados con vuestros procesos y ayuden a mejorar vuestros resultados.",
    ],
    level9: [
      "Te acompanamos en cada etapa para convertir cumplimiento en ventaja competitiva.",
    ],
    buttonText: "Quiero una demostracion",
    remarkableText: "Resultados visibles desde el primer trimestre",
    remarkableText2: "Metodologia orientada a negocio",
    remarkableText3: "95%",
  },
};