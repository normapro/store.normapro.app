import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SolucionCard from "@/components/SolucionCard";

const meta: Meta<typeof SolucionCard> = {
  title: "Componentes/SolucionCard",
  component: SolucionCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tarjeta individual para la presentación de un paquete de soluciones (Pack). Muestra un icono descriptivo centralizado, títulos de alto impacto corporativo y accesos de navegación tanto para expandir detalles como para iniciar flujos de contratación.",
      },
    },
  },
  argTypes: {
    pack: {
      description: "Objeto con los datos estructurados de la solución o paquete a renderizar.",
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SolucionCard>;

export const Practico: Story = {
  args: {
    pack: {
      id_pack: 1,
      description: "Compliance Básico",
      shortDescription: "Garantiza el cumplimiento normativo inicial de tu organización de forma automatizada.",
      uriIcon: "compliance-icon.png",
      slug: "compliance-basico",
    } as any,
  },
};

export const Completo: Story = {
  args: {
    pack: {
      id_pack: 2,
      description: "Gestión Integral de Riesgos Corporativos",
      shortDescription: "Plataforma avanzada con soporte pericial y auditorías continuas para mitigar vulnerabilidades operativas, legales y tecnológicas.",
      uriIcon: "security-expert.png",
      slug: "gestion-integral-riesgos",
    } as any,
  },
};