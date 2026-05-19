import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import FaqSection from "@/components/landings/FaqSection";

const meta: Meta<typeof FaqSection> = {
    title: "Landings/FaqSection",
    component: FaqSection,
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
        faqs: {
            description: "Array de preguntas frecuentes, cada una con su pregunta, respuesta y opcionalmente enlaces relacionados.",
            control: "object",
        },
    },
};

export default meta;
type Story = StoryObj<typeof FaqSection>;

export const Practico: Story = {
    args: {
        faqs: [
            {
                question: "¿Qué es un canal de denuncias para empresas y cómo funciona?",
                answer: [
                    "Un canal de denuncias para empresas es un sistema que permite a los empleados, clientes, proveedores u otras partes interesadas reportar cualquier tipo de irregularidad o conducta inapropiada dentro de la empresa, como fraude, acoso laboral, discriminación, incumplimiento de leyes o políticas internas, entre otros.\n\nEl canal de denuncias puede funcionar de diversas maneras, dependiendo de la empresa y de sus necesidades específicas. Generalmente, los canales de denuncias están disponibles en línea, mediante un formulario de denuncia en la página web de la empresa, o por medio de una línea telefónica o correo electrónico dedicados exclusivamente a la recepción de denuncias. Algunas empresas también pueden ofrecer un buzón de denuncias físico en las instalaciones de la empresa.\n\nUna vez que se recibe una denuncia, se debe analizar y evaluar de manera confidencial y objetiva para determinar si existe una violación a las políticas de la empresa o a las leyes aplicables. Si se encuentra que hay una conducta inapropiada o irregularidad, la empresa debe tomar medidas para abordar y resolver el problema.\n\nEs importante que sepas que el canal de denuncias NormaPro está respaldado por un proceso sólido y transparente que permite a la empresa investigar y abordar adecuadamente las denuncias reportadas."
                ]
            },
            {
                question: "¿Qué tipos de denuncias pueden reportarse a través del canal?",
                answer: [
                    "A través de un canal de denuncias para empresas, se pueden reportar diferentes tipos de denuncias. A continuación, te exponemos algunos a modo de ejemplo:\n\n",
                    "1. Fraude: ",
                    "por ejemplo, robo, malversación de fondos, falsificación de documentos, facturas falsas, entre otros.\n\n",
                    "2. Acoso laboral: ",
                    "como el hostigamiento, discriminación, abuso verbal o físico, intimidación, entre otros.\n\n",
                    "3. Violaciones de políticas internas: ",
                    "como el incumplimiento de políticas de seguridad de la información, políticas de recursos humanos, políticas de compras, entre otros.\n\n",
                    "4. Conflictos de interés: ",
                    "como situaciones en las que un empleado o funcionario de la empresa utiliza su posición en la empresa para beneficiarse a sí mismo o a terceros.\n\n",
                    "5. Incumplimiento de leyes y regulaciones: ",
                    "como el incumplimiento de regulaciones ambientales, regulaciones de salud y seguridad, regulaciones laborales, entre otros.\n\n",
                    "6. Corrupción: ",
                    "como el soborno, el cohecho, el tráfico de influencias, entre otros.\n\n",
                    "7. Otros tipos de denuncias: ",
                    "cualquier otro tipo de irregularidad o conducta inapropiada que viole las políticas de la empresa o las leyes aplicables.\n\nEs importante que el canal de denuncias esté diseñado para recibir denuncias de todo tipo, sin importar lo complejas que sean, y que el proceso de gestión de las denuncias sea transparente y confidencial. También es importante que los denunciantes se sientan seguros al reportar las irregularidades y que la empresa tome medidas efectivas para abordar y resolver los problemas reportados."
                ]
            },
            {
                question: "¿Quiénes pueden reportar una denuncia a través del canal de denuncias?",
                answer: [
                    "Cualquier persona puede reportar una denuncia a través del canal de denuncias para empresas, incluyendo empleados, clientes, proveedores, contratistas, accionistas y cualquier otra parte interesada. El objetivo es que cualquier persona que tenga información sobre una conducta inapropiada o irregularidad en la empresa pueda informarla de manera segura y confidencial.\nEs importante que el canal de denuncias esté diseñado para recibir denuncias de cualquier persona, sin importar su nivel jerárquico o posición en la empresa. Además, el canal debe garantizar la confidencialidad y protección de los denunciantes para evitar represalias o cualquier tipo de retaliación.\n\nEs común que los canales de denuncia permitan hacer las denuncias de forma anónima, para que los denunciantes se sientan más seguros al hacer su reporte. Sin embargo, es importante tener en cuenta que algunos reportes anónimos pueden ser más difíciles de investigar y corroborar, por lo que la empresa debe tener políticas y procedimientos adecuados para manejar estos casos."
                ]
            },
            {
                question: "¿Cómo se asegura la confidencialidad de las denuncias reportadas?",
                answer: [
                    "La confidencialidad es un aspecto clave en la gestión de un canal de denuncias para empresas, ya que garantiza que los denunciantes se sientan seguros y protegidos al hacer su reporte. Para asegurar la confidencialidad de las denuncias, se pueden implementar las siguientes medidas:\n\n",
                    "1. Canal seguro: ",
                    "La empresa debe asegurarse de que el canal de denuncias sea seguro y confidencial. Esto puede incluir el uso de tecnología de encriptación, sistemas de seguridad de la información, y cualquier otra medida de seguridad necesaria para proteger la privacidad de los denunciantes.\n\n",
                    "2. Política de confidencialidad: ",
                    "La empresa debe contar con una política de confidencialidad que establezca cómo se manejarán y protegerán los datos personales de los denunciantes y de los involucrados en la denuncia.\n\n",
                    "3. Anonimato: ",
                    "El canal de denuncias puede permitir hacer las denuncias de forma anónima, para que los denunciantes se sientan más seguros al hacer su reporte. Sin embargo, es importante tener en cuenta que algunos reportes anónimos pueden ser más difíciles de investigar y corroborar, por lo que la empresa debe tener políticas y procedimientos adecuados para manejar estos casos.\n\n",
                    "4. Acceso restringido: ",
                    "La información recibida a través del canal de denuncias debe ser de acceso restringido solo a las personas involucradas en el proceso de investigación y resolución de la denuncia. Esto puede incluir a los miembros del equipo de investigación, los miembros del comité de ética o cualquier otro grupo designado para manejar las denuncias.\n\n",
                    "5. Comunicación segura: ",
                    "La empresa debe asegurarse de que la comunicación con los denunciantes sea segura y confidencial. Esto puede incluir el uso de correos electrónicos seguros, mensajes cifrados, y cualquier otra medida de seguridad necesaria para proteger la privacidad de los denunciantes.\n\nEn resumen, la confidencialidad es fundamental en la gestión de un canal de denuncias para empresas. La empresa debe asegurarse de implementar medidas de seguridad adecuadas para garantizar la privacidad de los denunciantes y de los involucrados en la denuncia, y de tener políticas y procedimientos claros para manejar y proteger la información recibida a través del canal de denuncias."
                ]
            },
            {
                question: "¿Cómo se manejan las denuncias reportadas a través del canal?",
                answer: [
                    "El manejo de las denuncias reportadas a través del canal de denuncias puede variar dependiendo de la empresa y de la naturaleza de la denuncia. Sin embargo, en general, el proceso de manejo de las denuncias suele seguir los siguientes pasos:\n\n",
                    "1. Recepción de la denuncia: ",
                    "La denuncia es recibida a través del canal de denuncias y es registrada en un sistema para su posterior análisis.\n\n",
                    "2. Evaluación preliminar: ",
                    "Un equipo designado por la empresa evalúa la denuncia para determinar su relevancia, veracidad y gravedad. En algunos casos, se puede solicitar información adicional al denunciante para corroborar la denuncia.\n\n",
                    "3. Investigación: ",
                    "Si la denuncia es considerada relevante y veraz, se inicia una investigación para recopilar evidencias y corroborar la denuncia. La investigación puede ser realizada por un equipo interno o por un equipo externo, dependiendo de la naturaleza de la denuncia.\n\n",
                    "4. Análisis y resolución: ",
                    "Con base en los resultados de la investigación, se analiza la denuncia y se determina si se requiere tomar alguna acción. Si se determina que se ha cometido una conducta inapropiada, se toman medidas para corregirla y prevenir su repetición.\n\n",
                    "5. Informe y seguimiento: ",
                    "Se elabora un informe detallado sobre la denuncia, la investigación y la resolución adoptada, el cual se puede compartir con los denunciantes y otros interesados en la denuncia. Además, se realiza un seguimiento para garantizar que la resolución adoptada ha sido efectiva y que no se han presentado represalias contra el denunciante.\n\nEs importante que la empresa tenga políticas y procedimientos claros para manejar las denuncias reportadas a través del canal de denuncias, y que estos sean comunicados claramente a los empleados y otras partes interesadas en la empresa. De esta manera, se garantiza que las denuncias sean manejadas de manera efectiva, justa y transparente."
                ]
            },
            {
                question: "¿Cómo se resuelve una denuncia reportada a través del canal?",
                answer: [
                    "La resolución de una denuncia reportada a través del canal de denuncias depende de la naturaleza de la denuncia y de los resultados de la investigación correspondiente. En general, la resolución puede incluir las siguientes acciones:\n\n",
                    "1. Corrección de la conducta inapropiada: ",
                    "Si se determina que se ha cometido una conducta inapropiada, se toman medidas para corregirla. Esto puede incluir, por ejemplo, la imposición de sanciones disciplinarias o el establecimiento de medidas para prevenir que la conducta se repita.\n\n",
                    "2. Indemnización a las partes afectadas: ",
                    "Si se determina que una parte ha sufrido un perjuicio, se puede acordar una compensación o indemnización para compensar los daños sufridos.\n\n",
                    "3. Mejoras en los procesos y políticas de la empresa: ",
                    "Si se identifican fallas en los procesos o políticas de la empresa que hayan contribuido a la conducta inapropiada, se pueden establecer mejoras para prevenir su repetición.\n\nEs importante que la empresa tenga un protocolo claro y transparente para manejar las denuncias reportadas a través del canal de denuncias, de manera que se asegure que se tomen medidas efectivas y justas. Además, es esencial que se brinde seguimiento a las denuncias para garantizar que las acciones adoptadas hayan sido efectivas y que no se hayan presentado represalias contra el denunciante."
                ]
            },
            {
                question: "¿Cómo se informa al denunciante sobre el progreso de su denuncia?",
                answer: [
                    "Es importante que las empresas informen a los denunciantes sobre el progreso de su denuncia reportada a través del canal de denuncias para mantener la transparencia y generar confianza en el proceso. A continuación, se presentan algunas formas en que se puede informar al denunciante sobre el progreso de su denuncia a través de la Plataforma NormaPro:\n\n",
                    "Confirmación de la recepción de la denuncia: ",
                    "Después de que se ha recibido la denuncia a través del canal de denuncias, se debe enviar una confirmación al denunciante de que su denuncia ha sido recibida. Esto puede incluir información sobre el tiempo estimado que tomará el proceso de investigación.\n\n",
                    "Actualizaciones periódicas: ",
                    "A medida que la investigación avanza, se pueden enviar actualizaciones periódicas al denunciante sobre el progreso de su denuncia. Esto puede incluir información sobre la fase actual de la investigación y cualquier acción que se haya tomado.\n\n",
                    "Resultados finales: ",
                    "Después de que se ha concluido la investigación y se ha tomado una acción, se debe informar al denunciante sobre los resultados finales. Esto puede incluir información sobre las medidas que se han tomado en respuesta a la denuncia y cualquier seguimiento que se llevará a cabo. Es importante que la empresa mantenga la confidencialidad de la información durante todo el proceso y solo comparta la información relevante con el denunciante. A demás de deben establecer canales seguros y confidenciales para comunicarse con el denunciante, de manera que se garantice la privacidad y protección de su identidad."
                ]
            },
            {
                question: "¿Qué medidas han de tomar las empresas para prevenir represalias contra los denunciantes?",
                answer: [
                    "Las empresas pueden tomar una serie de medidas para prevenir represalias contra los denunciantes y garantizar que el proceso de denuncia sea seguro y efectivo. Algunas de estas medidas son las siguientes:\n\n",
                    "1. Establecer políticas claras: ",
                    "Es importante que la empresa tenga políticas claras que prohíban las represalias contra los denunciantes y establezcan sanciones en caso de que se produzcan. Estas políticas deben ser comunicadas a todos los empleados de la empresa.\n\n",
                    "2. Capacitación: ",
                    "La capacitación de los empleados es fundamental para prevenir represalias contra los denunciantes. Todos los empleados deben recibir capacitación sobre los riesgos de represalias y cómo evitarlas.\n\n",
                    "3. Protección de la identidad del denunciante: ",
                    "Es esencial que la identidad del denunciante se mantenga en confidencialidad durante todo el proceso de denuncia. La empresa puede tomar medidas para garantizar que la información sobre la identidad del denunciante se mantenga segura y no se divulgue.\n\n",
                    "4. Seguimiento de las denuncias: ",
                    "La empresa debe llevar un registro de todas las denuncias reportadas a través del canal de denuncias y realizar un seguimiento de cada una de ellas para asegurarse de que no haya represalias contra el denunciante.\n\n",
                    "5. Fomentar una cultura ética y de transparencia: ",
                    "Es importante que la empresa fomente una cultura ética y de transparencia para prevenir las represalias. Esto puede incluir el establecimiento de valores éticos, la comunicación abierta y la creación de un ambiente de trabajo donde se alienta a los empleados a reportar cualquier conducta inapropiada sin temor a represalias.\n\nEn general, es importante que la empresa tome medidas efectivas para prevenir las represalias contra los denunciantes y proteger su seguridad y privacidad durante todo el proceso de denuncia."
                ]
            },
            {
                question: "¿Cómo se garantiza la integridad del canal de denuncias?",
                answer: [
                    "Para garantizar la integridad del canal de denuncias, es importante que la empresa tome medidas para asegurar que el proceso de denuncia sea confiable, seguro y efectivo. Algunas de estas medidas son las siguientes:\n\n",
                    "1. Protección de la confidencialidad: ",
                    "La empresa debe tomar medidas para garantizar la confidencialidad de las denuncias reportadas a través del canal de denuncias. Esto puede incluir el uso de tecnología de encriptación, el establecimiento de protocolos claros para el manejo de la información y la restricción del acceso a la información solo a personal autorizado.\n\n",
                    "2. Selección de proveedores confiables: ",
                    "Si la empresa utiliza un proveedor externo para la implementación del canal de denuncias, es importante que se seleccione un proveedor confiable y de buena reputación. El proveedor debe cumplir con los estándares de seguridad y privacidad y tener una política clara para el manejo de la información.\n\n",
                    "3. Capacitación y comunicación: ",
                    "Es importante que la empresa capacite a todos los empleados sobre el proceso de denuncia y las políticas y procedimientos relacionados con el canal de denuncias. También es fundamental que la empresa comunique de manera clara y efectiva la existencia del canal de denuncias a todos los empleados y otros interesados.\n\n",
                    "4. Monitoreo y seguimiento: ",
                    "La empresa debe llevar un registro de todas las denuncias reportadas a través del canal de denuncias y hacer un seguimiento de cada una de ellas para asegurarse de que se toman medidas efectivas para resolver la denuncia. Además, es importante que la empresa realice auditorías periódicas del canal de denuncias para detectar cualquier problema o vulnerabilidad.\n\n",
                    "5. Evaluación continua: ",
                    "La empresa debe realizar una evaluación continua del canal de denuncias para asegurarse de que el proceso sea efectivo y que se estén implementando medidas para prevenir y abordar las denuncias de manera oportuna y eficaz.\n\nEn general, es importante que la empresa tome medidas para garantizar la integridad del canal de denuncias y promover una cultura ética y de transparencia."
                ]
            },
            {
                question: "¿Cómo establecer en mi empresa una política de canal de denuncias de Compliance penal?",
                answer: [
                    "Para establecer una política de canal de denuncias de Compliance penal en tu empresa, puedes follow los siguientes pasos:\n\n",
                    "Designar a una persona responsable: ",
                    "Lo primero que debes hacer es designar a una persona responsable para gestionar el canal de denuncias. Esta persona debe tener conocimientos y experiencia en Compliance penal y debe ser alguien en quien los empleados confíen y se sientan cómodos al informar.\n\n",
                    "Establecer un procedimiento claro: ",
                    "Debes establecer un procedimiento claro para el canal de denuncias, detallando cómo los empleados pueden presentar sus denuncias, quién las recibirá, cómo se investigarán y cómo se tomarán medidas.\n\n",
                    "Informar a los empleados: ",
                    "Debes informar a todos los empleados de la existencia del canal de denuncias, cómo pueden usarlo y que se garantiza la confidencialidad. Esto debe ser parte de la capacitación en Compliance penal y también debe estar disponible en un documento escrito.\n\n",
                    "Establecer un medio seguro para las denuncias: ",
                    "Debes establecer un medio seguro y confidencial para que los empleados presenten sus denuncias, como una línea telefónica anónima, una dirección de correo electrónico o un formulario en línea.\n\n",
                    "Investigar y tomar medidas: ",
                    "Debes investigar todas las denuncias presentadas y tomar medidas si es necesario, incluyendo medidas disciplinarias contra los infractores. Es importante mantener al denunciante informado del progreso de la investigación y de cualquier acción tomada.\n\n",
                    "Evaluar y mejorar: ",
                    "Debes evaluar regularmente el funcionamiento del canal de denuncias y hacer mejoras según sea necesario. Esto puede incluir encuestas de satisfacción de los empleados y análisis de datos de denuncias para identificar patrones o áreas problemáticas.\n\nAl establecer una política de canal de denuncias de compliance penal, estás demostrando un compromiso con la integridad y la ética en tu empresa. Esto puede mejorar la confianza de los empleados y aumentar la eficacia en la prevención y detección de conductas delictivas."
                ]
            }
        ]
    },
};

export const Completo: Story = {
    args: {
        faqs: [
            {
                question: "¿Cómo se adapta el Programa de Modelado y Digitalización de NormaPro BPM Suite a las necesidades específicas de mi negocio?",
                answer: [
                    "El Programa de Modelado y Digitalización de NormaPro BPM Suite está diseñado para adaptarse a las necesidades  únicas y específicas de cada negocio. Comenzamos con un análisis exhaustivo de tus procesos actuales para entender tus  desafíos y objetivos. A partir de ahí, personalizamos cada aspecto del programa, desde la selección de las herramientas  hasta la configuración y la implementación, asegurando que se alinee perfectamente con tus  operaciones y metas empresariales.\n\nNuestro enfoque flexible permite que el programa se ajuste a empresas de diferentes tamaños y sectores, garantizando  que cada solución no solo resuelva los problemas actuales, sino que también sea escalable y evolucione con tu negocio.\n\nAdemás, nuestra capacitación y soporte continuo aseguran que tu equipo aproveche al máximo todas las funcionalidades  del programa."
                ],
                link: [
                    "¿Estás interesado en descubrir cómo NormaPro BPM Suite puede transformar tu negocio?\n",
                    "Solicita una reunión con nosotros",
                    "para explorar una solución personalizada que impulse tu éxito empresarial. Estamos aquí para ayudarte a dar el próximo gran paso en la digitalización de tu negocio."
                ]
            },
            {
                question: "¿Qué tipo de procesos empresariales puedo optimizar con NormaPro BPM Suite?",
                answer: [
                    "Con NormaPro BPM Suite, tienes la capacidad de optimizar una amplia gama de procesos empresariales. Desde operaciones rutinarias como la gestión de pedidos y solicitudes de compra hasta procesos más complejos como la gestión de la calidad o contratación de personal NormaPro puede transformar y mejorar la eficiencia de prácticamente cualquier proceso de negocio.\n\nAdemás, nuestra solución es ideal para automatizar tareas repetitivas, reducir errores humanos y mejorar la toma de decisiones con análisis de datos en tiempo real. Ya sea que necesites agilizar procesos administrativos, de recursos humanos, o de producción, NormaPro BPM Suite se configura específicamente para satisfacer las necesidades únicas de tu empresa, asegurando que obtengas el máximo beneficio en términos de eficiencia y rendimiento."
                ],
                link: [
                    "¿Quieres saber más sobre cómo NormaPro BPM Suite puede revolucionar los procesos específicos de tu negocio?",
                    "Agenda una reunión con nosotros",
                    "para explorar las posibilidades y adaptar nuestras soluciones a tus necesidades."
                ]
            },
            {
                question: "¿Cuál es el tiempo estimado para implementar NormaPro BPM Suite en mi empresa?",
                answer: [
                    "El tiempo de implementación de NormaPro BPM Suite en tu empresa puede variar dependiendo de varios factores, como el tamaño de tu negocio, la complejidad de tus procesos actuales, y el nivel de personalización requerido. En general, el proceso puede tomar desde unos pocos días hasta varias semanas. Nuestro objetivo es garantizar una transición suave y eficiente, por lo que dedicamos el tiempo necesario para entender tus necesidades, configurar la solución a medida y asegurar una integración perfecta con tus procesos existentes.\n\nRecuerda, nuestro enfoque está en la calidad y la efectividad de la implementación, no solo en la rapidez. Queremos asegurarnos de que NormaPro BPM Suite aporte el máximo valor a tu empresa desde el primer día."
                ],
                link: [
                    "¿Listo para explorar cómo NormaPro BPM Suite puede integrarse en tu negocio? ",
                    "Programa una consulta personalizada",
                    "con nosotros para obtener una estimación más precisa del tiempo de implementación basada en tus necesidades específicas. Estamos aquí para ayudarte a dar ese paso crucial hacia la digitalización y la eficiencia."
                ]
            },
            {
                question: "¿Cuál es la curva de aprendizaje para los usuarios de NormaPro BPM Suite?",
                answer: [
                    "La curva de aprendizaje para los usuarios de NormaPro BPM Suite varía según el usuario, pero generalmente es rápida gracias a su interfaz intuitiva y fácil de usar. Nos esforzamos por hacer que el software sea accesible para todos, independientemente de su nivel de habilidad técnica.\n\nAdemás, ofrecemos una formación completa y recursos de soporte para asegurar que tu equipo se sienta cómodo y competente al usar el sistema. La mayoría de los usuarios logran una comprensión sólida de las funcionalidades básicas en tan solo unas horas y pueden empezar a ver mejoras en sus procesos casi de inmediato."
                ],
                link: [
                    "¿Interesado en saber más sobre cómo NormaPro BPM Suite puede encajar en tu equipo?",
                    "Contacta con nosotros para una sesión",
                    "de demostración y ve por ti mismo lo fácil que es empezar con nuestra solución. ¡Estamos aquí para apoyarte en cada paso del camino!"
                ]
            },
            {
                question: "¿Cómo se personaliza NormaPro BPM Suite para abordar necesidades específicas de mi negocio?",
                answer: [
                    "La personalización de NormaPro BPM Suite para tu negocio comienza con un análisis detallado de tus procesos actuales y objetivos específicos. Nos centramos en entender las particularidades de tu empresa para adaptar la solución de manera que se alinee perfectamente con tus necesidades. Esto incluye la configuración de flujos de trabajo, la integración con otras herramientas y sistemas que ya utilizas, y el ajuste de interfaces y funcionalidades para maximizar la eficiencia y la usabilidad.\n\nNuestro equipo trabaja estrechamente contigo para asegurar que cada aspecto del sistema refleje y mejore la forma en que operas, proporcionando una solución verdaderamente a medida."
                ],
                link: [
                    "¿Quieres ver cómo NormaPro BPM Suite puede adaptarse específicamente a tu empresa?",
                    "Programa una consulta personalizada",
                    "con nosotros para discutir tus necesidades y ver una demostración de cómo nuestra solución puede transformar tus procesos de negocio.\n\n¡Estamos aquí para ayudarte a diseñar la solución perfecta para ti!."
                ]
            },
            {
                question: "¿Qué tipo de soporte y mantenimiento ofrece NormaPro tras la implementación del sistema?",
                answer: [
                    "Tras la implementación de NormaPro BPM Suite, ofrecemos un soporte integral y continuado para asegurar que tu sistema funcione sin problemas y se mantenga actualizado. Esto incluye asistencia técnica para cualquier consulta o problema que puedas tener, así como actualizaciones regulares para mejorar la funcionalidad y la seguridad del sistema.\n\nNuestro equipo de soporte está siempre disponible para ayudarte a resolver rápidamente cualquier incidencia y para proporcionar mantenimiento preventivo, asegurando así la máxima eficiencia y tiempo de actividad de tu sistema."
                ],
                link: [
                    "¿Quieres saber más sobre nuestro compromiso con el soporte y mantenimiento post-implementación?",
                    "Contacta con nosotros",
                    "para obtener más información y descubre cómo nuestro equipo puede proporcionarte la tranquilidad y el apoyo continuo que necesitas para tu negocio. ¡Tu éxito con NormaPro BPM Suite es nuestra prioridad!"
                ]
            },
            {
                question: "¿Cómo mide NormaPro BPM Suite el retorno de la inversión para mi empresa?",
                answer: [
                    "NormaPro BPM Suite mide el retorno de la inversión (ROI) de tu empresa a través de un conjunto de métricas clave de rendimiento y análisis en profundidad. Esto incluye la evaluación de mejoras en la eficiencia operativa, la reducción de costos, el aumento de la productividad, y la mejora en la toma de decisiones basada en datos.\n\nProporcionamos herramientas de seguimiento y reportes que te permiten ver de manera clara y cuantificable cómo NormaPro impacta positivamente en tu negocio. Además, trabajamos contigo para establecer objetivos específicos y medir el progreso hacia esos objetivos, garantizando una visión clara del valor agregado por nuestra solución."
                ],
                link: [
                    "¿Estás Interesado en entender mejor cómo NormaPro BPM Suite puede proporcionar un retorno de inversión significativo en tu negocio?",
                    "Agenda una consulta con nuestro equipo",
                    "para obtener una evaluación personalizada de cómo nuestra solución puede beneficiar específicamente a tu empresa. ¡Descubre el verdadero potencial de tus procesos con NormaPro!"
                ]
            },
            {
                question: "¿Cuáles son las opciones de licenciamiento y precios de NormaPro BPM Suite?",
                answer: [
                    "Las opciones de licenciamiento y precios de NormaPro BPM Suite están diseñadas para ser flexibles y adaptarse a las necesidades de cada empresa, independientemente de su tamaño o sector. Ofrecemos una variedad de opciones de licenciamiento, desde soluciones básicas hasta paquetes empresariales completos, permitiéndote elegir el nivel de servicio que mejor se ajusta a tus necesidades y presupuesto.\n\nPara proporcionar una información precisa sobre precios, consideramos factores como el número de usuarios, el grado de personalización requerido y las características específicas que necesitas."
                ],
                link: [
                    "¿Quieres conocer las opciones de licenciamiento y precios que mejor se ajustan a tu empresa?",
                    "Solicita una cotización personalizada",
                    "y descubre cómo NormaPro BPM Suite puede ofrecerte una solución rentable y de alto valor para la digitalización de tus procesos de negocio.\n\n¡Estamos aquí para proporcionarte la mejor solución al mejor precio!"
                ]
            },
            {
                question: "¿Cómo ayuda NormaPro BPM Suite a mejorar la eficiencia y reducir los costos operativos?",
                answer: [
                    "NormaPro BPM Suite mejora la eficiencia y reduce los costos operativos al automatizar y optimizar los procesos empresariales. Con nuestras herramientas de modelado y digitalización, puedes eliminar tareas repetitivas y manuales, reducir errores humanos y acelerar los tiempos de procesamiento. Esto se traduce en un flujo de trabajo más ágil, una toma de decisiones basada en datos y, en última instancia, una reducción significativa en los costos operativos.\n\nAdemás, al proporcionar una visión clara y en tiempo real de tus procesos de negocio, NormaPro BPM Suite te permite identificar y abordar ineficiencias, lo que lleva a una mejora continua en todas las áreas de tu empresa."
                ],
                link: [
                    "¿Quieres ver cómo NormaPro BPM Suite puede transformar la eficiencia de tu negocio y reducir tus costos operativos?",
                    "Programa una demostración",
                    "con nosotros y descubre el potencial de optimización que NormaPro puede ofrecer a tu empresa.\n\n¡Da el primer paso hacia una operación más eficiente y rentable hoy mismo!"
                ]
            },
            {
                question: "¿Qué opciones de precios y paquetes están disponibles para NormaPro BPM Suite y cómo se determina el costo final para mi empresa?",
                answer: [
                    "En NormaPro, ofrecemos una variedad de opciones de precios y paquetes para adaptarnos a las necesidades y al presupuesto de cada empresa. Nuestros paquetes van desde soluciones básicas hasta ofertas más avanzadas y completas, lo que te permite seleccionar el nivel de servicio que mejor se ajusta a tus requisitos. El costo final de NormaPro BPM Suite para tu empresa se determina en base a varios factores, incluyendo el tamaño de tu organización, la complejidad de tus procesos, el número de usuarios y el grado de personalización requerido.\n\nNuestro enfoque es proporcionar un valor excepcional, asegurando que recibas una solución que no solo se ajuste a tus necesidades, sino que también ofrezca un retorno de la inversión significativo."
                ],
                link: [
                    "¿Tienes interés en conocer las opciones de precios específicas para tu empresa?",
                    "Contacta con nosotros",
                    "para obtener un presupuesto personalizado y descubre cómo NormaPro BPM Suite puede ofrecerte una solución eficiente y económica.\n\n¡Estamos aquí para trabajar contigo y encontrar la mejor opción para tu negocio!"
                ]
            }
        ]
    },
};



