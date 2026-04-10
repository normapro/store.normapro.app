'use client'

import React from 'react';
import Cookies from '@/components/Cookies'

const PoliticaCookies = () => {
    return (
        <section className="max-w-6xl mx-auto py-12 px-6 md:px-12 text-gray-600">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-700">Política de cookies (UE)</h1>
            {/* Fecha de actualización */}
            <p className="italic text-sm mb-8 text-gray-700">
                Esta política de cookies fue actualizada por última vez el octubre 14, 2024 y se aplica a los ciudadanos y residentes legales permanentes del Espacio Económico Europeo y Suiza.
            </p>

            <div className="space-y-8">
                {/* 1. Introducción */}
                <h2 className="text-2xl font-black text-gray-700">1. Introducción</h2>
                <p>
                    Nuestra web, <a href="https://normapro.es" className="text-blue-600 underline">https://normapro.es</a> (en adelante: «la web») utiliza cookies y otras tecnologías relacionadas (para mayor comodidad, todas las tecnologías se denominan «cookies»). Las cookies también son colocadas por terceros a los que hemos contratado. En el siguiente documento te informamos sobre el uso de cookies en nuestra web.
                </p>

                {/* 2. ¿Qué son las cookies? */}
                <h2 className="text-2xl font-black text-gray-700">2. ¿Qué son las cookies?</h2>
                <p>
                    Una cookie es un pequeño archivo que se envía junto con las páginas de esta web y que tu navegador almacena en el disco duro de su ordenador u otro dispositivo. La información almacenada puede ser devuelta a nuestros servidores o a los servidores de terceros apropiados durante una visita posterior.
                </p>

                {/* 3. ¿Qué son los scripts? */}
                <h2 className="text-2xl font-black text-gray-700">3. ¿Qué son los scripts?</h2>
                <p>
                    Un script es un fragmento de código de programa que se utiliza para hacer que nuestra web funcione correctamente y de forma interactiva. Este código se ejecuta en nuestro servidor o en tu dispositivo.
                </p>

                {/* 4. ¿Qué es una baliza web? */}
                <h2 className="text-2xl font-black text-gray-700">4. ¿Qué es una baliza web?</h2>
                <p>
                    Una baliza web (o una etiqueta de píxel) es una pequeña e invisible pieza de texto o imagen en una web que se utiliza para monitorear el tráfico en una web. Para ello, se almacenan varios datos sobre usted mediante estas balizas web.
                </p>

                {/* 5. Cookies */}
                <h2 className="text-2xl font-black text-gray-700">5. Cookies</h2>
                {/* 5.1 Cookies técnicas*/}
                <h3 className="font-bold">5.1 Cookies técnicas o funcionales</h3>
                <p>
                    Algunas cookies aseguran que ciertas partes de la web funcionen correctamente y que tus preferencias de usuario sigan recordándose. Al colocar cookies funcionales, te facilitamos la visita a nuestra web. De esta manera, no necesitas introducir repetidamente la misma información cuando visitas nuestra web y, por ejemplo, los artículos permanecen en tu cesta de la compra hasta que hayas pagado. Podemos colocar estas cookies sin tu consentimiento.
                </p>
                {/* 5.2 Cookies de estadísticas*/}
                <h3 className="font-bold">5.2 Cookies de estadísticas</h3>
                <p>
                    Utilizamos cookies estadísticas para optimizar la experiencia de la web para nuestros usuarios. Con estas cookies estadísticas obtenemos información sobre el uso de nuestra web. Te pedimos tu permiso para colocar cookies de estadísticas.
                </p>
                {/* 5.1 Cookies de marketing*/}
                <h3 className="font-bold">5.3 Cookies de marketing/seguimiento</h3>
                <p>
                    Las cookies de marketing/seguimiento son cookies, o cualquier otra forma de almacenamiento local, usadas para crear perfiles de usuario para mostrar publicidad o para hacer el seguimiento del usuario en esta web o en varias webs con fines de marketing similares.
                </p>

                {/* 6. Cookies usadas */}
                <h2 className="text-2xl font-black text-gray-700">6. Cookies usadas</h2>
                <Cookies />

                {/* 7. Consentimiento */}
                <h2 className="text-2xl font-black text-gray-700">7. Consentimiento</h2>
                <p>
                    Cuando visites nuestra web por primera vez, te mostraremos una ventana emergente con una explicación sobre las cookies. Tan pronto como hagas clic en «Guardar preferencias», aceptas que usemos las categorías de cookies y plugins que has seleccionado en la ventana emergente, tal y como se describe en esta política de cookies. Puedes desactivar el uso de cookies a través de tu navegador, pero, por favor, ten en cuenta que nuestra web puede dejar de funcionar correctamente.
                </p>

                {/* 8. Activación/desactivación y borrado de cookies */}
                <h2 className="text-2xl font-black text-gray-700">8. Activación/desactivación y borrado de cookies</h2>
                <p>
                    Puedes utilizar tu navegador de Internet para eliminar las cookies de forma automática o manual. También puedes especificar que ciertas cookies no pueden ser colocadas. Otra opción es cambiar los ajustes de tu navegador de Internet para que recibas un mensaje cada vez que se coloca una cookie. Para obtener más información sobre estas opciones, consulta las instrucciones de la sección «Ayuda» de tu navegador.
                </p>
                <p>
                    Ten en cuenta que nuestra web puede no funcionar correctamente si todas las cookies están desactivadas. Si borras las cookies de tu navegador, se volverán a colocar después de tu consentimiento cuando vuelvas a visitar nuestras webs.
                </p>

                {/* 9. Tus derechos con respecto a los datos personales */}
                <h2 className="text-2xl font-black text-gray-700">9. Tus derechos con respecto a los datos personales</h2>
                <p>
                    Tienes los siguientes derechos con respecto a tus datos personales:
                </p>
                <p>
                    Para ejercer estos derechos, por favor, contacta con nosotros. Por favor, consulta los detalles de contacto en la parte inferior de esta política de cookies. Si tienes alguna queja sobre cómo gestionamos tus datos, nos gustaría que nos la hicieras saber, pero también tienes derecho a enviar una queja a la autoridad supervisora (la autoridad de protección de datos).
                </p>

                {/* 10. Datos de contacto */}
                <h2 className="text-2xl font-black text-gray-700">10. Datos de contacto</h2>
                <p>
                    Para preguntas y/o comentarios sobre nuestra política de cookies y esta declaración, por favor, contacta con nosotros usando los siguientes datos de contacto:
                </p>
                <p>
                    NormaPro<br></br>
                    Carretera de Madrid, 13, km 332, 1º planta 23009 Jaén, España<br></br>
                    España<br></br>
                    Web: <a href='https://normapro.es' className='text-blue-600 underline'>https://normapro.es</a><br></br>
                    Correo electrónico: <a href="mailto:info@institutodeinnovacion.es" className="text-blue-500 underline">info@institutodeinnovacion.es</a><br></br>
                    Número de teléfono: 953190510<br></br>
                </p>
            </div>
        </section>
    );
};

export default PoliticaCookies;