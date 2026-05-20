import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import historiaTextSection2 from "@/components/historiaTextSection2";

const meta: Meta<typeof historiaTextSection2> = {
  title: "Componentes/historiaTextSection2",
  component: historiaTextSection2,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sección de contenido centrada para casos de éxito o historias de clientes. Renderiza un título principal, un bloque secuencial de párrafos explicativos, un botón de llamada a la acción que abre la modal de contacto y una imagen destacada opcional.",
      },
    },
  },
  argTypes: {
    title: {
      description: "Título principal de la sección.",
      control: "text",
    },
    claim: {
      description: "Array de cadenas de texto donde cada elemento representa un párrafo con tipografía destacada.",
      control: "object",
    },
    buttonText: {
      description: "Texto del botón de llamada a la acción. Si se omite, el botón no se renderiza en la interfaz.",
      control: "text",
    },
    image: {
      description: "Nombre del archivo de imagen (ubicado en la ruta estática '/historiasclientes/') que se proyectará en la parte inferior.",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof historiaTextSection2>;

export const Practico: Story = {
  args: {
    title: "Cómo transformamos la gestión de riesgos",
    claim: [
      "Gracias a la centralización de los procesos normativos, el equipo redujo los tiempos de auditoría a la mitad.",
    ],
    buttonText: "Saber más",
  },
};

export const Completo: Story = {
  args: {
    title: "Un cambio de paradigma en el cumplimiento normativo empresarial",
    claim: [
      "Implementamos un ecosistema automatizado que eliminó el uso de plantillas manuales obsoletas en toda la organización.",
      "El resultado directo fue un incremento del 40% en la eficiencia operativa de los oficiales de cumplimiento durante el primer trimestre.",
    ],
    buttonText: "Solicitar caso de estudio",
    image: "ejemplo-caso.png",
  },
};