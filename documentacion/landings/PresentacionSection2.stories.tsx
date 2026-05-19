import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PresentacionSection2 from "@/components/landings/PresentacionSection2";

const meta: Meta<typeof PresentacionSection2> = {
    title: "Landings/PresentacionSection2",
    component: PresentacionSection2,
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
            description: "Título principal opcional de la sección.",
            control: "text",
        },
        claim: {
            description: "Texto descriptivo o de introducción opcional ubicado debajo del título.",
            control: "text",
        },
        images: {
            description: "Lista con las URLs de las imágenes a mostrar de forma coordinada con animaciones en la sección.",
            control: "object",
        },
        bottomText: {
            description: "Texto aclaratorio o de cierre opcional que se renderiza al final de todo el componente.",
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof PresentacionSection2>;

export const Practico: Story = {
    args: {
        "title": "NormaPro BPM es tu aliado estratégico en la transformación digital, simplificando y acelerando la gestión y optimización de tus procesos de negocio.",
        "claim": "Con nuestra solución, estarás equipado para aumentar la eficiencia operativa, garantizar la consistencia en tus operaciones, y adaptarte rápidamente a los cambiantes requisitos del mercado.",
        "images": [
            "Grupo-5210.png",
            "Grupo-4574.png",
            "Grupo-4575.png"
        ]
    },
};

export const Completo: Story = {
    args: {
        "title": "NormaPro BPM es tu aliado estratégico en la transformación digital, simplificando y acelerando la gestión y optimización de tus procesos de negocio.",
        "claim": "Con nuestra solución, estarás equipado para aumentar la eficiencia operativa, garantizar la consistencia en tus operaciones, y adaptarte rápidamente a los cambiantes requisitos del mercado.",
        "images": [
            "canaldenuncias1.png",
            "canaldenuncias2.png",
            "canaldenuncias3.png"
        ],
        "bottomText": "Nuestro canal de denuncias avanzado NormaPro te ofrece la opción de denunciar nominativamente o anónimamente, garantizando siempre la confidencialidad del denunciante. Además, podrás hacer seguimiento del estado de tu denuncia en todo momento, sin necesidad de aplicaciones adicionales."

    },
};



