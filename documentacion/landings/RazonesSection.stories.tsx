import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RazonesSection from "@/components/landings/RazonesSection";

const meta: Meta<typeof RazonesSection> = {
    title: "Landings/RazonesSection",
    component: RazonesSection,
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
            description: "Título principal de la sección.",
            control: "text",
        },
        claim: {
            description: "Texto descriptivo o de introducción ubicado debajo del título principal.",
            control: "text",
        },
        titleList: {
            description: "Título destacado en color gris que introduce la lista de acordeones.",
            control: "text",
        },
        list: {
            description: "Array de objetos (bloques) que componen el acordeón. Cada elemento debe contener un identificador de icono, un title y un pragma para el contenido oculto.",
            control: "object",
        },
        buttonText: {
            description: "Texto del botón de llamada a la acción para abrir el formulario.",
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof RazonesSection>;

export const Practico: Story = {
    args: {
        "imgCabecera": "IICE_LandingCompliance_Etapa5.png",
        "imgBackground": "hielo3.png",
        "title": "¿Por qué mi empresa debería tener un canal de denuncias?",
        "claim": "Son diarios los casos que se suceden en los juzgados derivados de incumplimientos con consecuencias legales graves. Son situaciones muy desagradables que podían dar al traste con vuestro futuro profesional y personal. En un principio se trata de una exigencia legal, tanto a nivel europeo como nacional si tiene más de 50 trabajadores.\n\nDisponer de un canal de denuncias para delitos penales es la mejor demostración de voluntad decidida para favorecer la consolidación de una cultura ética y de cumplimiento.",
        "titleList": "5 Razones principales",
        "list": [
            {
                "icon": "fa-chart-line-up",
                "title": "Prevenir y detectar irregularidades",
                "pragma": "El canal de denuncias permite que los empleados, clientes, proveedores y otras partes interesadas informen sobre cualquier tipo de irregularidad o conducta inapropiada en la empresa. Esto ayuda a prevenir y detectar posibles problemas antes de que se conviertan en situaciones más graves."
            },
            {
                "icon": "fa-people-pants",
                "title": "Mejorar la cultura organizacional",
                "pragma": "El canal de denuncias promueve una cultura de transparencia y ética dentro de la empresa. Al fomentar la denuncia de conductas inapropiadas, se crea un ambiente más saludable para los empleados y se fortalece la confianza en la empresa."
            },
            {
                "icon": "fa-scale-balanced",
                "title": "Cumplir con la ley",
                "pragma": "En algunos países, existen regulaciones que obligan a las empresas a contar con canales de denuncia para asegurar el cumplimiento de las normativas. Un canal de denuncias adecuado puede ayudar a la empresa a cumplir con estas regulaciones."
            },
            {
                "icon": "fa-gavel",
                "title": "Reducir riesgos legales",
                "pragma": "Al tener un canal de denuncias, la empresa puede abordar y resolver los problemas antes de que se conviertan en situaciones más graves que puedan generar demandas y litigios legales."
            },
            {
                "icon": "fa-comments",
                "title": "Proteger la reputación de la empresa",
                "pragma": "Un canal de denuncias puede ayudar a la empresa a proteger su reputación al permitirle actuar de manera rápida y efectiva ante cualquier irregularidad reportada. Esto demuestra el compromiso de la empresa con la ética y la transparencia."
            }
        ],
        "buttonText": "Reserva una reunión con nosotros"
    },
};

export const Completo: Story = {
    args: {
        "imgCabecera": "IICE_LandingCompliance_Etapa5.png",
        "imgBackground": "hielo3.png",
        "title": "¿Por qué mi empresa debería tener un canal de denuncias?",
        "claim": "Son diarios los casos que se suceden en los juzgados derivados de incumplimientos con consecuencias legales graves. Son situaciones muy desagradables que podían dar al traste con vuestro futuro profesional y personal. En un principio se trata de una exigencia legal, tanto a nivel europeo como nacional si tiene más de 50 trabajadores.\n\nDisponer de un canal de denuncias para delitos penales es la mejor demostración de voluntad decidida para favorecer la consolidación de una cultura ética y de cumplimiento.",
        "titleList": "5 Razones principales",
        "list": [
            {
                "icon": "fa-chart-line-up",
                "title": "Prevenir y detectar irregularidades",
                "pragma": "El canal de denuncias permite que los empleados, clientes, proveedores y otras partes interesadas informen sobre cualquier tipo de irregularidad o conducta inapropiada en la empresa. Esto ayuda a prevenir y detectar posibles problemas antes de que se conviertan en situaciones más graves."
            },
            {
                "icon": "fa-people-pants",
                "title": "Mejorar la cultura organizacional",
                "pragma": "El canal de denuncias promueve una cultura de transparencia y ética dentro de la empresa. Al fomentar la denuncia de conductas inapropiadas, se crea un ambiente más saludable para los empleados y se fortalece la confianza en la empresa."
            },
            {
                "icon": "fa-scale-balanced",
                "title": "Cumplir con la ley",
                "pragma": "En algunos países, existen regulaciones que obligan a las empresas a contar con canales de denuncia para asegurar el cumplimiento de las normativas. Un canal de denuncias adecuado puede ayudar a la empresa a cumplir con estas regulaciones."
            },
            {
                "icon": "fa-gavel",
                "title": "Reducir riesgos legales",
                "pragma": "Al tener un canal de denuncias, la empresa puede abordar y resolver los problemas antes de que se conviertan en situaciones más graves que puedan generar demandas y litigios legales."
            },
            {
                "icon": "fa-comments",
                "title": "Proteger la reputación de la empresa",
                "pragma": "Un canal de denuncias puede ayudar a la empresa a proteger su reputación al permitirle actuar de manera rápida y efectiva ante cualquier irregularidad reportada. Esto demuestra el compromiso de la empresa con la ética y la transparencia."
            }
        ],
        "buttonText": "Reserva una reunión con nosotros"
    },
};



