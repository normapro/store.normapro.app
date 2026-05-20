import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RegaloSection from "@/components/landings/RegaloSection";

const meta: Meta<typeof RegaloSection> = {
    title: "Landings/RegaloSection",
    component: RegaloSection,
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
        imageBackground: {
            description: "URL de la imagen de fondo decorativa que se posiciona detrás de la imagen de cabecera.",
            control: "text",
        },
        image: {
            description: "URL de la imagen principal de cabecera de la seccion.",
            control: "text",
        },
        title: {
            description: "Título superior o categoría de tamaño pequeño colocada al inicio de la sección.",
            control: "text",
        },
        subtitle: {
            description: "Subtítulo de gran tamaño y peso visual que actúa como el encabezado principal.",
            control: "text",
        },
        claim: {
            description: "Texto destacado en color gris que enfatiza el mensaje principal debajo del subtítulo.",
            control: "text",
        },
        titleSection: {
            description: "Título interno ubicado dentro del contenedor o cuadro gris.",
            control: "text",
        },
        claimSection: {
            description: "Cuerpo de texto o contenido principal renderizado dentro del cuadro gris, con soporte para saltos de línea.",
            control: "text",
        },
        pragma: {
            description: "Texto de cierre en negrita que se posiciona justo antes del botón de acción.",
            control: "text",
        },
        buttonText: {
            description: "Texto que se mostrará dentro del botón de llamada a la acción para abrir el formulario.",
            control: "text",
        },
    },
};

export default meta;
type Story = StoryObj<typeof RegaloSection>;

export const Practico: Story = {
    args: {
        "image": "IICE_LandingCompliance_regalo.svg",
        "imageBackground": "hielo4.png",
        "title": "Para ello te proponemos una opción aún mejor:",
        "subtitle": "Puedes concertar una sesión",
        "claim": "En la que te haremos una demo de cómo funciona el canal y podrás mantener una sesión con un experto.",
        "titleSection": "Un regalo único que vas a apreciar enormemente.",
        "claimSection": "Te informaremos de todos los pormenores de la normativa del canal de denuncias, te aconsejaremos, de forma totalmente gratuita, sobre la solución que más se ajusta a las necesidades específicas de tu empresa.\n\n¿Cuanto tiempo deberías invertir en conocer por tu cuenta todos los requisitos que esta nueva normativa y cómo han de aplicarse en tu empresa? bastantes horas seguro, y probablemente te cueste mucho trabajo encontrar el momento para hacerlo, con lo que el riesgo de incumplimiento iría en aumento con las sanciones tan elevadas que esta Ley determina.\n\nEsta opción está a tu entera disposición y te servirá para conocer el canal de denuncias avanzado NormaPro por dentro y a nuestros consultores sin compromiso alguno. incluso podrás si así lo deseas hablar con alguno de nuestros clientes para preguntarle dudas y que te orienten para saber si esto es realmente lo que te interesa.",
        "pragma": "Ahora, si quieres aprovechar este regalo y conocer más de cerca este canal de denuncias avanzado que te aportará tranquilidad y que te ayudará a poner a tu empresa en la vanguardia de la ética y la transparencia a la vez que en la transformación digital haz clic en el botón y reserva una sesión con nosotros.",
        "buttonText": "Reserva una reunión con nosotros"
    },
};

export const Completo: Story = {
    args: {
        "image": "IICE_LandingCompliance_regalo.svg",
        "imageBackground": "hielo4.png",
        "title": "Para ello te proponemos una opción aún mejor:",
        "subtitle": "Puedes concertar una sesión",
        "claim": "En la que podremos explicarte con todo detalle todo el método y hacerte una demo de cómo funciona la plataforma.",
        "titleSection": "Un regalo único que vas a apreciar enormemente.",
        "claimSection": "Te recomendamos esta opción ya que el consultor que te atienda te va a ofrecer realizar, de forma totalmente gratuita, un mapa de evidencias legales por cada tipo de centro de trabajo de los que tu empresa disponga. ¿No te parece un magnífico regalo? Podrás comprobar que en el mismo día puedes conseguir un inventario de un altísimo porcentaje de la normativa que aplica a tu empresa y una propuesta muy elaborada de las principales evidencias de cumplimiento que legalmente estás obligado a tener actualizadas.\n\n¿Cuánto tardaría tu equipo en disponer de esta información? Muchas jornadas ¿verdad?, probablemente nunca encuentren el momento para hacerlo y el riesgo irá en aumento. Para ello, nosotros tenemos a todo un departamento pendiente de las novedades de estos alcances regulatorios y analizando cada norma para capturar esas evidencias de las que necesitas disponer para ayudarte y servirte de apoyo a la hora de conocer los riesgos legales. Y ahora estamos dispuestos a entregarte gratuitamente ese mapa que te va a ofrecer una visión del cumplimiento como antes nunca habías tenido.\n\nEsta opción está a tu entera disposición y te servirá para conocer el método por dentro y a nuestros consultores sin compromiso alguno. Incluso podrás, si así lo deseas, hablar con alguno de nuestros clientes para preguntarle dudas y que te orienten para saber si esto realmente es para ti.",
        "pragma": "Ahora, si quieres aprovechar este regalo y conocer más de cerca este Modelo avanzado que te aportará tranquilidad y que te ayudará a poner a tu empresa en la vanguardia del cumplimiento normativo y la transformación digital haz clic en el botón y reserva una sesión con nosotros.",
        "buttonText": "Reserva una reunión con nosotros"
    },
};



