import type { Metadata } from "next";
import { pageMetadata } from "@/libs/seo";
import Cookies from '@/components/Cookies'
import CookieSettingsLink from "@/components/cookies/CookieSettingsLink";
import { EMPRESA, DIRECCION_COMPLETA } from "@/libs/empresa";

export const metadata: Metadata = pageMetadata({ title: "Política de cookies (UE)", path: "/politica-de-cookies-ue" });

const PoliticaCookies = () => {
    return (
        <section className="max-w-6xl mx-auto py-12 px-6 md:px-12 text-[#010d3d]">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">Política de cookies (UE)</h1>
            {/* Fecha de actualización */}
            <p className="italic text-sm mb-8">
                Esta política de cookies se actualizó por última vez el 23 de octubre de 2026 y se aplica a los ciudadanos y residentes legales permanentes del Espacio Económico Europeo y Suiza.
            </p>

            <div className="space-y-8">
                {/* 1. Introducción */}
                <h2 className="text-2xl font-black">1. Introducción</h2>
                <p>
                    Nuestra web, <a href="https://www.normapro.es" className="text-blue-600 underline">https://www.normapro.es</a> (en adelante: «la web»), utiliza cookies y otras tecnologías relacionadas, como el almacenamiento de sesión del navegador (para mayor comodidad, todas las tecnologías se denominan «cookies»). Algunas cookies las instalan servicios de terceros que usamos en la web. En este documento te informamos sobre el uso de cookies en nuestra web.
                </p>

                {/* 2. ¿Qué son las cookies? */}
                <h2 className="text-2xl font-black">2. ¿Qué son las cookies?</h2>
                <p>
                    Una cookie es un pequeño archivo que se envía junto con las páginas de esta web y que tu navegador almacena en tu ordenador u otro dispositivo. La información almacenada puede ser devuelta a nuestros servidores o a los servidores de terceros durante una visita posterior. El almacenamiento de sesión (sessionStorage) es un espacio similar del navegador que se borra automáticamente al cerrar la pestaña.
                </p>

                {/* 3. ¿Qué son los scripts? */}
                <h2 className="text-2xl font-black">3. ¿Qué son los scripts?</h2>
                <p>
                    Un script es un fragmento de código de programa que se utiliza para hacer que nuestra web funcione correctamente y de forma interactiva. Este código se ejecuta en nuestro servidor o en tu dispositivo.
                </p>

                {/* 4. Cookies */}
                <h2 className="text-2xl font-black">4. Tipos de cookies que usamos</h2>
                {/* 4.1 Cookies necesarias*/}
                <h3 className="font-bold">4.1 Cookies técnicas o necesarias</h3>
                <p>
                    Permiten que la web funcione y recuerdan tus preferencias: guardan tu elección sobre las cookies y mantienen la conversación con el asistente virtual mientras navegas. Son propias, no se comparten con terceros y no requieren tu consentimiento.
                </p>
                {/* 4.2 Cookies de estadísticas*/}
                <h3 className="font-bold">4.2 Cookies de estadísticas</h3>
                <p>
                    Usamos Google Analytics para obtener estadísticas anónimas sobre el uso de la web y mejorarla. Solo se instalan si las aceptas.
                </p>
                {/* 4.3 Contenido de terceros*/}
                <h3 className="font-bold">4.3 Contenido de terceros</h3>
                <p>
                    Algunas páginas incluyen vídeos de YouTube y mapas de Google Maps. Estos servicios instalan sus propias cookies, por lo que solo se cargan si aceptas el contenido de terceros. Mientras tanto, en su lugar verás un aviso para cargarlos.
                </p>
                {/* 4.4 Cookies de marketing*/}
                <h3 className="font-bold">4.4 Cookies de marketing o seguimiento</h3>
                <p>
                    No utilizamos cookies de marketing ni de publicidad.
                </p>

                {/* 5. Cookies usadas */}
                <h2 className="text-2xl font-black">5. Cookies usadas</h2>
                <Cookies />

                {/* 6. Consentimiento */}
                <h2 className="text-2xl font-black">6. Consentimiento</h2>
                <p>
                    Cuando visitas nuestra web por primera vez, te mostramos un aviso sobre las cookies en el que puedes aceptarlas todas, rechazarlas todas o elegir qué categorías permites. Las cookies de estadísticas y el contenido de terceros solo se activan si das tu consentimiento. Guardamos tu elección durante 6 meses; pasado ese tiempo te la volveremos a pedir.
                </p>
                <p>
                    Puedes cambiar o retirar tu consentimiento en cualquier momento desde el enlace «Configurar cookies» del pie de página o desde aquí:{" "}
                    <CookieSettingsLink className="text-blue-600 underline font-semibold" />.
                </p>

                {/* 7. Activación/desactivación y borrado de cookies */}
                <h2 className="text-2xl font-black">7. Activación, desactivación y borrado de cookies</h2>
                <p>
                    También puedes utilizar tu navegador de Internet para eliminar las cookies de forma automática o manual, o para impedir que se instalen determinadas cookies. Para obtener más información sobre estas opciones, consulta la sección «Ayuda» de tu navegador.
                </p>
                <p>
                    Ten en cuenta que, si bloqueas las cookies necesarias, algunas funciones de la web, como el asistente virtual, pueden no funcionar correctamente. Si borras las cookies de tu navegador, te volveremos a pedir el consentimiento en tu próxima visita.
                </p>

                {/* 8. Tus derechos con respecto a los datos personales */}
                <h2 className="text-2xl font-black">8. Tus derechos con respecto a los datos personales</h2>
                <p>
                    Tienes derecho a acceder a tus datos personales, rectificarlos, suprimirlos, oponerte a su tratamiento, solicitar su limitación y su portabilidad, y a retirar tu consentimiento en cualquier momento. Consulta los detalles en nuestra <a href="/politica-de-privacidad" className="text-blue-600 underline">política de privacidad</a>.
                </p>
                <p>
                    Para ejercer estos derechos, contacta con nosotros usando los datos del apartado siguiente. Si tienes alguna queja sobre cómo gestionamos tus datos, nos gustaría que nos la hicieras saber, pero también tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
                </p>

                {/* 9. Datos de contacto */}
                <h2 className="text-2xl font-black">9. Datos de contacto</h2>
                <p>
                    Para preguntas o comentarios sobre nuestra política de cookies, contacta con nosotros:
                </p>
                <p>
                    {EMPRESA.razonSocial} (CIF {EMPRESA.cif})<br></br>
                    {DIRECCION_COMPLETA}<br></br>
                    Web: <a href="https://www.normapro.es" className="text-blue-600 underline">https://www.normapro.es</a><br></br>
                    Correo electrónico: <a href={`mailto:${EMPRESA.email}`} className="text-blue-500 underline">{EMPRESA.email}</a><br></br>
                    Teléfono: <a href={EMPRESA.telefonoHref} className="underline">{EMPRESA.telefono}</a><br></br>
                </p>
            </div>
        </section>
    );
};

export default PoliticaCookies;
