import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DesgraneSection from "@/components/landings/DesgraneSection";

const meta: Meta<typeof DesgraneSection> = {
    title: "Landings/DesgraneSection",
    component: DesgraneSection,
    tags: ["autodocs"],
    parameters: {
        layout: "fullscreen",
        docs: {
            description: {
                component:
                    "Seccion de video reutilizable para landings. Permite combinar niveles de video, destacados y boton de accion.",
            },
        },
    },
    argTypes: {
        title: {
            control: "text",
            description: "Titulo de la seccion de desgrane.",
        },
        claim: {
            control: "text",
            description: "Claim para mostrar en la seccion de desgrane.",
        },
        pragma: {
            control: "text",
            description: "Pragma para mostrar en la seccion de desgrane.",
        },
        listTitle: {
            control: "text",
            description: "Titulo para la lista de items en la seccion de desgrane.",
        },
        list: {
            control: "object",
            description: "Lista de objetos con texto de cada item a mostrar en formato lista en la seccion de desgrane.",
        },
    },
};



export default meta;
type Story = StoryObj<typeof DesgraneSection>;

export const Practico: Story = {
    args: {
        title: "¿Aún no lo tienes claro?",
        claim: "Queremos ayudarte a recorrer todo el camino hasta que tu sistema de cumplimiento alcance la madurez aconsejándote en cada decisión que debas tomar, ayudándote a resolver cada duda que puedas tener y asesorándote en todo aquello que puedas necesitar y, sobre todo, animándote a llegar hasta el final hasta ver cómo tu empresa o departamento alcanza el máximo nivel posible de grado de cumplimiento gracias al método avanzado NormaPro.",
        pragma: "Todo este proceso te puede costar un mínimo de 6.000 € dependiendo del tamaño de tu organización.",
        listTitle: "Te desgranamos 1 a 1 el valor real de todo lo que te hemos contado:",
        list: [
            {
                image: "IICE_NormaPro2.png",
                title: "La Plataforma digital NormaPro",
                claim: "Con todas las aplicaciones que necesitas para automatizar todos los procesos eliminando costes por tareas improductivas. Seguro que has pedido presupuestos para implementar una aplicación tipo ERP y sabrás que para una pequeña o mediana empresa el coste del desarrollo supera los 9.000 € más licencias de 50 a 100 € por usuario y mes para uso indefinido. Por supuesto, estas cifras se disparan para una empresa de mayor envergadura, además de que casi siempre aparecen costos ocultos o inesperados una vez que el proyecto ya está en marcha."
            },
            {
                image: "IICE_LandingCompliance_Bitacora.svg",
                title: "El programa de consultoría",
                claim: "El programa de consultoría de 6 etapas que incluyen 21 módulos con cuestionarios, asistido por la Plataforma Bitácora de NormaPro con plantillas y contenidos técnicos en continua renovación por lo que tiene un valor incalculable."
            },
            {
                image: "IICE_LandingCompliance_Expertos.png",
                title: "El cuadro de expertos",
                claim: "Un cuadro de expertos en cada materia según los alcances normativos seleccionados para hacerles llegar cuantas consultas creáis necesarias valorado en más de 3.000 € por año. Te recordamos que el acceso es ilimitado."
            },
            {
                image: "IICE_Academia_FormaPro.png",
                title: "Acceso a la Academia FormaPro",
                claim: "En la que vamos añadiendo cursos de los contenidos más interesantes de las normas vigentes, así como para aprender a manejar con soltura todas las herramientas de la Plataforma Digital NormaPro. Gracias a los cursos podrás formarte tanto tú como todo tu equipo y sacar el mayor partido para ayudar a la transformación digital de vuestros procesos. Piensa que cada curso tiene un coste medio por alumno de 150 € y disponemos de decenas de ellos para que podáis acceder de forma ilimitada a todos ellos."
            }
        ]
    },
};

export const Completo: Story = {
    args: {
        title: "¿Aún no lo tienes claro?",
        claim: "Queremos ayudarte a recorrer todo el camino hasta que tu sistema de cumplimiento alcance la madurez aconsejándote en cada decisión que debas tomar, ayudándote a resolver cada duda que puedas tener y asesorándote en todo aquello que puedas necesitar y, sobre todo, animándote a llegar hasta el final hasta ver cómo tu empresa o departamento alcanza el máximo nivel posible de grado de cumplimiento gracias al método avanzado NormaPro.",
        pragma: "Todo este proceso te puede costar un mínimo de 6.000 € dependiendo del tamaño de tu organización.",
        listTitle: "Te desgranamos 1 a 1 el valor real de todo lo que te hemos contado:",
        list: [
            {
                image: "IICE_NormaPro2.png",
                title: "La Plataforma digital NormaPro",
                claim: "Con todas las aplicaciones que necesitas para automatizar todos los procesos eliminando costes por tareas improductivas. Seguro que has pedido presupuestos para implementar una aplicación tipo ERP y sabrás que para una pequeña o mediana empresa el coste del desarrollo supera los 9.000 € más licencias de 50 a 100 € por usuario y mes para uso indefinido. Por supuesto, estas cifras se disparan para una empresa de mayor envergadura, además de que casi siempre aparecen costos ocultos o inesperados una vez que el proyecto ya está en marcha."
            },
            {
                image: "IICE_LandingCompliance_Bitacora.svg",
                title: "El programa de consultoría",
                claim: "El programa de consultoría de 6 etapas que incluyen 21 módulos con cuestionarios, asistido por la Plataforma Bitácora de NormaPro con plantillas y contenidos técnicos en continua renovación por lo que tiene un valor incalculable."
            },
            {
                image: "IICE_LandingCompliance_Expertos.png",
                title: "El cuadro de expertos",
                claim: "Un cuadro de expertos en cada materia según los alcances normativos seleccionados para hacerles llegar cuantas consultas creáis necesarias valorado en más de 3.000 € por año. Te recordamos que el acceso es ilimitado."
            },
            {
                image: "IICE_Academia_FormaPro.png",
                title: "Acceso a la Academia FormaPro",
                claim: "En la que vamos añadiendo cursos de los contenidos más interesantes de las normas vigentes, así como para aprender a manejar con soltura todas las herramientas de la Plataforma Digital NormaPro. Gracias a los cursos podrás formarte tanto tú como todo tu equipo y sacar el mayor partido para ayudar a la transformación digital de vuestros procesos. Piensa que cada curso tiene un coste medio por alumno de 150 € y disponemos de decenas de ellos para que podáis acceder de forma ilimitada a todos ellos."
            }
        ]
    },
};