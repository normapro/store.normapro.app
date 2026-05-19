import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PorcentajesSection from "@/components/landings/PorcentajesSection";

const meta: Meta<typeof PorcentajesSection> = {
    title: "Landings/PorcentajesSection",
    component: PorcentajesSection,
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
        subtitle: {
            description: "Subtítulo explicativo en color gris ubicado debajo del título.",
            control: "text",
        },
        datos: {
            description: "Array de objetos que contienen las estadísticas. Cada objeto incluye una propiedad 'porcentaje' (string) y un array de strings llamado 'claim' con los fragmentos de texto descriptivo.",
            control: "object",
        },
        claim: {
            description: "Párrafo explicativo o planteamiento del problema que se renderiza tras la tarjeta de datos.",
            control: "text",
        },
        pragma: {
            description: "Texto de cierre en negrita y tamaño destacado al final de la sección.",
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof PorcentajesSection>;

export const Practico: Story = {
    args: {
        "title": "¿Por qué deberías acceder a este programa?",
        "subtitle": "Porque cientos de empresas son sancionadas por diversos motivos cada día y porque creemos firmemente que implementando el Modelo Avanzado de gestión del cumplimiento NormaPro tendrás sensación de tranquilidad y seguridad.",
        "claim": "El problema es que la mayoría de las empresas no disponen de una metodología que sea capaz de integrar hábitos de cumplimiento en su plantilla ya que, o no dedican los recursos necesarios o los que disponen se pierden en un consumo excesivo de tiempo y tareas improductivas que no consiguen evitar consecuencias desagradables cuando se encuentran con una inspección o se produce un incidente.",
        "pragma": "Nosotros no queremos que esto te ocurra a ti y de hecho las empresas que ya tienen el Modelo Avanzado NormaPro ahora mismo tienen a su personal sensibilizado y sus Sistemas de gestión funcionando en piloto automático.",
        "datos": [
            {
                "porcentaje": "20%",
                "claim": [
                    "En materia de",
                    "prevención de riesgos en el trabajo",
                    "el Gobierno español aumentará un 20% la presión a las empresas que irán desde 49.141 euros hasta 982.914 euros."
                ]
            },
            {
                "porcentaje": "57%",
                "claim": [
                    "",
                    "La vulneración de las normativas europeas en materia de medio ambiente",
                    "ha ascendido un 57% en tan solo cinco años y, en su mayor parte, estas infracciones están relacionadas con la festión de residuos y vertidos, lo que ha hecho que las autoridades competentes de la Unión Europea aumenten sus acciones de control, detección y denuncia."
                ]
            }
        ]
    },
};

export const Completo: Story = {
    args: {
        "title": "¿Por qué deberías acceder a este programa?",
        "subtitle": "Porque cientos de empresas son sancionadas por diversos motivos cada día y porque creemos firmemente que implementando el Modelo Avanzado de gestión del cumplimiento NormaPro tendrás sensación de tranquilidad y seguridad.",
        "claim": "El problema es que la mayoría de las empresas no disponen de una metodología que sea capaz de integrar hábitos de cumplimiento en su plantilla ya que, o no dedican los recursos necesarios o los que disponen se pierden en un consumo excesivo de tiempo y tareas improductivas que no consiguen evitar consecuencias desagradables cuando se encuentran con una inspección o se produce un incidente.",
        "pragma": "Nosotros no queremos que esto te ocurra a ti y de hecho las empresas que ya tienen el Modelo Avanzado NormaPro ahora mismo tienen a su personal sensibilizado y sus Sistemas de gestión funcionando en piloto automático.",
        "datos": [
            {
                "porcentaje": "20%",
                "claim": [
                    "En materia de",
                    "prevención de riesgos en el trabajo",
                    "el Gobierno español aumentará un 20% la presión a las empresas que irán desde 49.141 euros hasta 982.914 euros."
                ]
            },
            {
                "porcentaje": "57%",
                "claim": [
                    "",
                    "La vulneración de las normativas europeas en materia de medio ambiente",
                    "ha ascendido un 57% en tan solo cinco años y, en su mayor parte, estas infracciones están relacionadas con la festión de residuos y vertidos, lo que ha hecho que las autoridades competentes de la Unión Europea aumenten sus acciones de control, detección y denuncia."
                ]
            }
        ]
    },
};



