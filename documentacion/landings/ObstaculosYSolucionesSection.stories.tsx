import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ObstaculosYSolucionesSection from "@/components/landings/ObstaculosYSolucionesSection";

const meta: Meta<typeof ObstaculosYSolucionesSection> = {
    title: "Landings/ObstaculosYSolucionesSection",
    component: ObstaculosYSolucionesSection,
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
        image: {
            description: "URL de la imagen principal de cabecera de la seccion.",
            control: "text",
        },
        title: {
            description: "Título principal de la sección.",
            control: "text",
        },
        claim: {
            description: "Texto descriptivo o de introducción general para la sección.",
            control: "text",
        },
        tabletitle: {
            description: "Subtítulo opcional que se muestra directamente arriba de la tabla.",
            control: "text",
        },
        table: {
            description: "Array de objetos (celdas) que componen la tabla horizontal. Cada celda contiene un idcelda, un string identificador de icono, un title y un pragma.",
            control: "object",
        },
        pragma: {
            description: "Lista de párrafos de texto explicativos o de cierre que se muestran al final de la sección.",
            control: "object",
        },
        buttonText: {
            description: "Texto del botón de llamada a la acción para abrir el formulario. Si no se define, el botón se oculta.",
            control: "text",
        },
        background: {
            description: "Color de fondo del contenedor principal de la sección.",
            control: "text",
        },
        backgroundtable: {
            description: "Color de fondo interno para la estructura de la tabla.",
            control: "text",
        },

    },
};

export default meta;
type Story = StoryObj<typeof ObstaculosYSolucionesSection>;

export const Practico: Story = {
    args: {
        "title": "Evita obstáculos, elige el éxito de tu empresa",
        "claim": "En un mundo donde la digitalización es clave, quedarse atrás con herramientas obsoletas o mal implementadas no es una opción. Al elegir nuestro servicio de consultoría avanzada evitas estos problemas:",
        "pragma": [],
        "buttonText": "Concertar una reunión",
        "table": [
            {
                "idcelda": 1,
                "icono": "fa-hourglass",
                "title": "Ineficiencias operativas",
                "pragma": "Sin la guía adecuada, las empresas a menudo enfrentan procesos internos lentos, redundantes y con pérdidas significativas de tiempo y recursos."
            },
            {
                "idcelda": 2,
                "icono": "fa-file-zipper",
                "title": "Errores en la gestión de los datos",
                "pragma": "La falta de un sistema eficaz conduce a errores en la entrada y manejo de datos, comprometiendo la integridad y la utilidad de la información."
            },
            {
                "idcelda": 3,
                "icono": "fa-calendar-clock",
                "title": "Dificultad en la adaptación al cambio",
                "pragma": "En ausencia de una consultoría experta, las empresas luchan por adaptarse a las tendencias y quedan rezagadas frente a la competencia."
            },
            {
                "idcelda": 4,
                "icono": "fa-coins",
                "title": "Costes elevados",
                "pragma": "No resolver estos problemas se traduce en pérdidas directa financieras, oportunidades de negocio perdidas y menor competitividad."
            }
        ]
    },
};

export const Completo: Story = {
    args: {
        "imgBackground": "hielo4.png",
        "image": "IICE_NormaPro1.png",
        "title": "¿Por qué decidirse por nuestro Programa?",
        "claim": "La respuesta es simple: ofrecemos una combinación única de innovación tecnológica y consultoría personalizada que transforma radicalmente la eficiencia y la gestión de tu empresa.",
        "pragma": [],
        "buttonText": "Concertar una reunión",
        "backgroundtable": "gray",
        "table": [
            {
                "idcelda": 1,
                "icono": "fa-laptop-mobile",
                "title": "Innovación constante",
                "pragma": "Integrando las últimas tecnologías nuestro programa asegura que tu empresa siempre esté a la vanguardia de la eficiencia operativa."
            },
            {
                "idcelda": 2,
                "icono": "fa-sliders",
                "title": "Personalización",
                "pragma": "Entendemos que cada negocio es único. Por eso, nuestra solución se adapta específicamente a tus necesidades y procesos."
            },
            {
                "idcelda": 3,
                "icono": "fa-handshake-simple",
                "title": "Consultoría especializada",
                "pragma": "Nuestro equipo de consultores no solo implementa soluciones. También trabaja contigo para entender y atender las necesidades específicas de tu negocio."
            },
            {
                "idcelda": 4,
                "icono": "fa-chart-column",
                "title": "Resultados tangibles",
                "pragma": "Nos enfocamos en resultados que puedes ver y medir, desde mejoras en la eficiencia hasta reducciones en costos y tiempos de procesamiento."
            }
        ]
    },
};



