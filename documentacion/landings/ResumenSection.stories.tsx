import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ResumenSection from "@/components/landings/ResumenSection";

const meta: Meta<typeof ResumenSection> = {
    title: "Landings/ResumenSection",
    component: ResumenSection,
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
            description: "URL de la imagen de fondo decorativa que se posiciona detrás de la imagen de cabecera.",
            control: "text",
        },
        imgCabecera: {
            description: "URL de la imagen principal de cabecera de la seccion.",
            control: "text",
        },
        title: {
            description: "Título principal de la sección, con soporte para saltos de línea.",
            control: "text",
        },
        claim: {
            description: "Texto introductorio o descripción general ubicada debajo del título principal.",
            control: "text",
        },
        titlelist: {
            description: "Título opcional en color oscuro que da paso e introduce la lista de bloques.",
            control: "text",
        },
        list: {
            description: "Array de objetos que representan los beneficios o puntos clave. Cada elemento acepta de forma opcional un string de icono, un title y un pragma obligatorio.",
            control: "object",
        },
        cta: {
            description: "Objeto de configuración para el bloque de llamada a la acción final. Contiene pretitle opcional, title, buttonText y un pragma final.",
            control: "object",
        },
    },
};

export default meta;
type Story = StoryObj<typeof ResumenSection>;

export const Practico: Story = {
    args: {
        "imgCabecera": "IICE_Medioambiente.png",
        "imgBackground": "hielo2.png",
        "title": "Inversión en Innovación: El coste de Nuestro Programa",
        "claim": "",
        "titlelist": "",
        "list": [
            {
                "icon": "",
                "title": "Entender el coste de nuestro programa para transformación digital es más que simplemente conocer un precio; es comprender la inversión en eficiencia y el ahorro a largo plazo para tu empresa.",
                "pragma": "Nuestro modelo de precios está diseñado para adaptarse a las necesidades y al tamaño de tu negocio, asegurando que obtengas el máximo valor. En lugar de ver el coste como un gasto, en NormaPro lo consideramos una inversión estratégica que se traduce en ahorros significativos a través de la optimización de procesos, la reducción de errores y la mejora en la toma de decisiones.\n\nNuestra política de precios transparente y nuestra consultoría personalizada te ayudarán a comprender cómo la eficiencia mejorada y la reducción de costos operativos pueden compensar rápidamente tu inversión inicial.\n\nEl verdadero costo no está en la implementación de NormaPro BPM Suite, sino en no aprovechar las oportunidades de ahorro y eficiencia que ofrece."
            }
        ],
        "cta": {
            "title": "",
            "buttonText": "Habla con un consultor",
            "pragma": ""
        }
    },
};

export const Completo: Story = {
    args: {
        "imgCabecera": "IICE_FormaPro_NormaPro.png",
        "imgBackground": "hielo1.png",
        "title": "Da el Siguiente Paso en Eficiencia Empresarial con NormaPro BPM Suite",
        "claim": "",
        "titlelist": "",
        "list": [
            {
                "icon": "",
                "title": "",
                "pragma": "Imagina un futuro donde cada proceso de tu empresa fluye sin esfuerzo, donde las decisiones se basan en datos precisos y actualizados, y donde la eficiencia y la innovación van de la mano. Ese futuro es posible hoy con NormaPro BPM Suite.\n\nHemos demostrado que la transformación y optimización de procesos no solo es alcanzable, sino también rentable. Pero no te quedes solo con nuestra palabra: descubre por ti mismo cómo NormaPro BPM Suite puede llevar tu negocio a nuevas alturas de rendimiento y competitividad."
            },
            {
                "icon": "",
                "title": "¿Estás listo para explorar las posibilidades ilimitadas que NormaPro BPM Suite puede ofrecer a tu empresa?",
                "pragma": ""
            }
        ],
        "cta": {
            "title": "",
            "buttonText": "Descubre el futuro de la gestión empresarial",
            "pragma": ""
        }
    },
};



