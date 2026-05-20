import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SideLeftImgTextSection from "@/components/landings/SideLeftImgTextSection";

const meta: Meta<typeof SideLeftImgTextSection> = {
    title: "Landings/SideLeftImgTextSection",
    component: SideLeftImgTextSection,
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
            description: "Título principal opcional centrado sobre la sección.",
            control: "text",
        },
        plagma: {
            description: "Párrafo de texto introductorio opcional con tipografía estándar.",
            control: "text",
        },
        claim: {
            description: "Texto o lista de textos destacados en negrita. Admite un string con saltos de línea doble o un array de strings.",
            control: "object",
        },
        paragraphs: {
            description: "Bloque de párrafos estándar opcionales. Admite un string con saltos de línea doble o un array de strings.",
            control: "object",
        },
    },
};

export default meta;
type Story = StoryObj<typeof SideLeftImgTextSection>;

export const Practico: Story = {
    args: {
        "title": "Tu tiempo y tu tranquilidad es lo primero",
        "claim": [
            "Actualmente toda la actividad empresarial se desarrolla en medio de una avalancha regulatoria hiper dinámica; tan solo en España se vienen publicando desde los años 70 una media de un millón de páginas de Boletines Oficiales, de las cuales la mitad aproximadamente están  dedicadas a la promulgación de normas nuevas o  modificación de las existentes."
        ],
        "image": "IICE_LandingCompliance_tiempo.png",
        "imgBackground": "hielo3.png",
        "paragraphs": [
            "¡¡Imagínate!! Cada vez que alguien decide iniciar una actividad empresarial ha de rebuscar entre más de veinte millones de estas páginas para saber qué le aplica y qué no.",
            "Por otro lado, la Ley Orgánica 1/2015, de 30 de marzo cual amplía el ámbito de aplicación de la responsabilidad penal de las personas jurídicas tanto en la vertiente de los sujetos responsables (representantes legales, apoderados, directivos, consejeros, patronos etc) como en la de los delitos por los que pueden ser imputados y las penas asociadas a los mismos.",
            "Por lo tanto, las responsabilidades penales en España se extienden a las personas jurídicas siempre y cuando no ejecuten unas tareas de prevención, supervisión, vigilancia y - control.",
            "Ante esto, muchos empresarios, directivos y técnicos de empresas están pasando a la acción para conseguir aumentar la tranquilidad que viene de saber que el cumplimento normativo en su área de responsabilidad está bajo control.",
            "Ahora la tendencia es lograr implementar un modelo eficaz de cumplimiento normativo que te lleve a contribuir de forma significativa al éxito de tu empresa y ser reconocido  como un empresario o un directivo brillante."
        ]
    },
};

export const Completo: Story = {
    args: {
        "title": "Tu tiempo y tu tranquilidad es lo primero",
        "claim": [
            "Actualmente toda la actividad empresarial se desarrolla en medio de una avalancha regulatoria hiper dinámica; tan solo en España se vienen publicando desde los años 70 una media de un millón de páginas de Boletines Oficiales, de las cuales la mitad aproximadamente están  dedicadas a la promulgación de normas nuevas o  modificación de las existentes."
        ],
        "image": "IICE_LandingCompliance_tiempo.png",
        "imgBackground": "hielo3.png",
        "paragraphs": [
            "¡¡Imagínate!! Cada vez que alguien decide iniciar una actividad empresarial ha de rebuscar entre más de veinte millones de estas páginas para saber qué le aplica y qué no.",
            "Por otro lado, la Ley Orgánica 1/2015, de 30 de marzo cual amplía el ámbito de aplicación de la responsabilidad penal de las personas jurídicas tanto en la vertiente de los sujetos responsables (representantes legales, apoderados, directivos, consejeros, patronos etc) como en la de los delitos por los que pueden ser imputados y las penas asociadas a los mismos.",
            "Por lo tanto, las responsabilidades penales en España se extienden a las personas jurídicas siempre y cuando no ejecuten unas tareas de prevención, supervisión, vigilancia y - control.",
            "Ante esto, muchos empresarios, directivos y técnicos de empresas están pasando a la acción para conseguir aumentar la tranquilidad que viene de saber que el cumplimento normativo en su área de responsabilidad está bajo control.",
            "Ahora la tendencia es lograr implementar un modelo eficaz de cumplimiento normativo que te lleve a contribuir de forma significativa al éxito de tu empresa y ser reconocido  como un empresario o un directivo brillante."
        ]
    },
};



