import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SideImgTextSection from "@/components/landings/SideImgTextSection";

const meta: Meta<typeof SideImgTextSection> = {
    title: "Landings/SideImgTextSection",
    component: SideImgTextSection,
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
        imgBackground: {
            description: "URL de la imagen de fondo decorativa que se posiciona detrás de la imagen principal.",
            control: "text",
        },
        image: {
            description: "URL de la imagen principal de la sección.",
            control: "text",
        },
        title: {
            description: "Título opcional de la sección con un tamaño destacado.",
            control: "text",
        },
        plagma: {
            description: "Párrafo de texto opcional que introduce la idea principal antes del 'claim'.",
            control: "text",
        },
        claim: {
            description: "Texto principal o conclusión en negrita ubicado en la parte inferior del bloque de contenido.",
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof SideImgTextSection>;

export const Practico: Story = {
    args: {
        "plagma": "NormaPro es un ecosistema de soluciones interconectadas diseñado para impulsar la eficiencia operativa y facilitar el cumplimiento normativo de tu empresa. Al integrar NormaPro y, con la ayuda de nuestros consultores, podrás automatizar flujos de trabajo, aumentar la eficiencia operativa, reducir costos y tomar decisiones basadas en datos precisos y actualizados.",
        "claim": "Transforma Procesos, Aumenta Eficiencia con NormaPro.",
        "image": "Capa-2@2x.png",
        "imgBackground": "",
    },
};

export const Completo: Story = {
    args: {
        "image": "IICE_LandingCompliance_Etapa3.png",
        "imgBackground": "hielo6.png",
        "title": "El Modelo más completo y avanzado para implementar un Canal de denuncias",
        "claim": "Además de todo lo anterior, el canal de denuncias NormaPro está respaldado por servicios especializados de consultoría para modelar los procesos, asistir durante el proceso de gestión tramitación e investigación de la denuncia y adaptarse a las necesidades específicas de tu empresa. (ver opciones de contratación)."
    },
};



