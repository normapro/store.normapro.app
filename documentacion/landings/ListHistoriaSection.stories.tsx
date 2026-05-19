import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ListHistoriaSection from "@/components/landings/ListHistoriaSection";

const meta: Meta<typeof ListHistoriaSection> = {
    title: "Landings/ListHistoriaSection",
    component: ListHistoriaSection,
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
        claim: {
            description: "Lista de párrafos de introducción colocados antes del listado principal.",
            control: "object",
        },
        titlelist: {
            description: "Texto en negrita que actúa como subtítulo o introducción directa a la lista.",
            control: "text",
        },
        list: {
            description: "Lista de elementos a enumerar. Cada objeto contiene un 'title' obligatorio y un 'claim' opcional.",
            control: "object",
        },
        image: {
            description: "URL de la imagen a mostrar al final de la seccion.",
            control: "text",
        },
        pragma: {
            description: "Lista de párrafos de texto de cierre ubicados en la parte inferior de la sección.",
            control: "object",
        },
        listStyle: {
            description: "Estilo visual de la lista. Si se define como 'numbered', muestra iconos numéricos; de lo contrario, muestra checks de verificación.",
            control: "select",
            options: ["numbered"],
        },
        compact: {
            description: "Si se activa, reduce los márgenes y paddings verticales internos del componente.",
            control: "boolean",
        },

    },
};

export default meta;
type Story = StoryObj<typeof ListHistoriaSection>;

export const Practico: Story = {
    args: {
        "claim": [
            "ROBERT BOSCH España se embarcó en el desafío de implementar y certificar la norma UNE 19601 de gestión de Compliance penal. Este reto incluía:"
        ],
        "list": [
            {
                "title": "Adaptarse a un marco normativo riguroso,",
                "claim": "lo que requería una alta precisión en las prácticas de Compliance penal"
            },
            {
                "title": "Transformar y digitalizar sus procesos internos",
                "claim": "para cumplir con los estándares de Compliance penal, representando un cambio significativo en sus operaciones diarias."
            },
            {
                "title": "Fomentar una cultura organizacional de Compliance penal",
                "claim": "a través de toda la empresa para asegurar el entendimiento y compromiso con los nuevos estándares y prácticas."
            }
        ],
        "image": "bosch1.png",
        "pragma": [
            "El Grupo BOSCH es un proveedor líder mundial de tecnología innovadora y servicios relacionados englobadas que cuenta con más de 460 filiales y empresas regionales en más de 60 países.",
            "Concretamente, las actividades industriales en España se centran sobre todo en el área de Mobility Solutions con unos 20 emplazamientos. En 2021, Bosch alcanzó unas ventas de aproximadamente 2.280 millones de euros en España. En la actualidad, Bosch España emplea a alrededor de 8.000 personas."
        ]
    },
};

export const Completo: Story = {
    args: {
        "title": "Valor de la solución aportada",
        "claim": [
            "La colaboración con ROBERT BOSCH España para implementar y certificar la norma UNE 19601 de gestión de Compliance penal ha aportado un valor considerable a través de la plataforma NormaPro.",
            "Este valor se manifiesta en varios aspectos clave:"
        ],
        "list": [
            {
                "title": "Un cumplimiento normativo eficaz y preciso"
            },
            {
                "title": "La automatización y estandarización de procesos clave para mejorar la eficiencia operativa."
            },
            {
                "title": "La adaptabilidad y mejora continua de las prácticas de Compliance. El soporte y asesoramiento especializado."
            },
            {
                "title": "El fortalecimiento de la cultura de Compliance y la reputación de la empresa."
            },
            {
                "title": "El uso de herramientas avanzadas para el monitoreo y control del cumplimiento."
            },
            {
                "title": "El reconocimiento externo a través de la certificación UNE 19601 por AENOR."
            }
        ],
        "image": "bosch2.png"
    },
};



