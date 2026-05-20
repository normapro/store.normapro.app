import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import OpcionesSeleccionesSection from "@/components/landings/OpcionesSeleccionesSection";

const meta: Meta<typeof OpcionesSeleccionesSection> = {
    title: "Landings/OpcionesSeleccionesSection",
    component: OpcionesSeleccionesSection,
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
        intro: {
            description: "Texto introductorio opcional que se muestra justo debajo del título principal.",
            control: "text",
        },
        leftTitle: {
            description: "Título de la columna izquierda de la comparativa.",
            control: "text",
        },
        leftItems: {
            description: "Lista de elementos para la columna izquierda. Puede ser un array de strings o de objetos con la estructura { title?, claim? }.",
            control: "object",
        },
        rightTitle: {
            description: "Título de la columna derecha de la comparativa.",
            control: "text",
        },
        rightItems: {
            description: "Lista de elementos para la columna derecha. Puede ser un array de strings o de objetos con la estructura { title?, claim? }.",
            control: "object",
        },
        paragraphs: {
            description: "Lista de párrafos de texto explicativos adicionales colocados después de los bloques comparativos.",
            control: "object",
        },
        buttonText: {
            description: "Texto que se mostrará dentro del botón de llamada a la acción.",
            control: "text",
        },
        imgBackground: {
            description: "URL de la imagen a mostrar al final de la seccion.",
            control: "text",
        },

    },
};

export default meta;
type Story = StoryObj<typeof OpcionesSeleccionesSection>;

export const Practico: Story = {
    args: {
        "title": "Llevamos más de veinte años aportando tranquilidad a empresarios y directivos y ahora queremos hacer lo mismo contigo",
        "intro": "En grandes empresas como Robert Bosch, Calidad Pascual, Asisa, Grupo Fuertes, Acciona Agua, el grupo Coren o Macrosoft entre otras se están gestionando y monitorizando miles de evidencias de cumplimiento disponiendo de cuadros de mando que combinan información de todos sus departamentos y centros de forma selectiva.",
        "leftTitle": "Todo esto les permite",
        "leftItems": [
            "Obtener una visión pormenorizada de la marcha y evolución de su negocio",
            "Evaluar los riesgos de sanción económica y penales",
            "Medir la evolución del grado de cumplimiento en tiempo real a nivel de compañía"
        ],
        "rightTitle": "Y todo ello seleccionado por",
        "rightItems": [
            "Alcances normativos",
            "Centros de trabajo",
            "Departamentos",
            "Empleado"
        ],
        "paragraphs": [
            "Gracias a esto han podido actuar a tiempo para anular o disminuir los riesgos y ganar en tranquilidad.",
            "Además, tienen perfectamente inventariada y controlada desde un mismo lugar toda la información y documentación relativa a sus instalaciones y equipos de trabajo, los empleados, así como los contratos y los proveedores.",
            "No hay semana en la que no nos contacte algún empresario o directivo para pedirnos consejo sobre cómo tener control sobre su Sistema de gestión de Compliance penal sin que suponga un coste extra para su empresa. Son personas conscientes del riesgo que están asumiendo y les preocupa o ya han puesto en marcha algún tipo de mecanismo de control pero no termina de funcionar o les genera un sobre esfuerzo inasumible.",
            "Y tú seguramente has llegado leyendo hasta aquí porque buscas lo mismo.",
            "Quedarse con los brazos cruzados no es una opción. Con una guía clara y certera, una plataforma digital y la ayuda de consultores expertos el camino se vislumbra seguro y sencillo."
        ],
        "buttonText": "Reserva una reunión con nosotros",
        "imgBackground": "hielo7.png"
    },
};

export const Completo: Story = {
    args: {
        "title": "Llevamos más de veinte años aportando tranquilidad a empresarios y directivos y ahora queremos hacer lo mismo contigo",
        "intro": "En grandes empresas como Robert Bosch, Calidad Pascual, Asisa, Grupo Fuertes, Acciona Agua, el grupo Coren o Macrosoft entre otras se están gestionando y monitorizando miles de evidencias de cumplimiento disponiendo de cuadros de mando que combinan información de todos sus departamentos y centros de forma selectiva.",
        "leftTitle": "Todo esto les permite",
        "leftItems": [
            "Obtener una visión pormenorizada de la marcha y evolución de su negocio",
            "Evaluar los riesgos de sanción económica y penales",
            "Medir la evolución del grado de cumplimiento en tiempo real a nivel de compañía"
        ],
        "rightTitle": "Y todo ello seleccionado por",
        "rightItems": [
            "Alcances normativos",
            "Centros de trabajo",
            "Departamentos",
            "Empleado"
        ],
        "paragraphs": [
            "Gracias a esto han podido actuar a tiempo para anular o disminuir los riesgos y ganar en tranquilidad.",
            "Además, tienen perfectamente inventariada y controlada desde un mismo lugar toda la información y documentación relativa a sus instalaciones y equipos de trabajo, los empleados, así como los contratos y los proveedores.",
            "No hay semana en la que no nos contacte algún empresario o directivo para pedirnos consejo sobre cómo tener control sobre su Sistema de gestión de Compliance penal sin que suponga un coste extra para su empresa. Son personas conscientes del riesgo que están asumiendo y les preocupa o ya han puesto en marcha algún tipo de mecanismo de control pero no termina de funcionar o les genera un sobre esfuerzo inasumible.",
            "Y tú seguramente has llegado leyendo hasta aquí porque buscas lo mismo.",
            "Quedarse con los brazos cruzados no es una opción. Con una guía clara y certera, una plataforma digital y la ayuda de consultores expertos el camino se vislumbra seguro y sencillo."
        ],
        "buttonText": "Reserva una reunión con nosotros",
        "imgBackground": "hielo7.png"
    },
};



