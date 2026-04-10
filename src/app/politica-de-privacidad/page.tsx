import React from 'react';

const AvisoLegal = () => {
    return (
        <section className="max-w-7xl mx-auto bg-white min-h-screen py-16 px-6 md:px-12 lg:px-24 text-[#010d3d]">
            {/* Título principal */}
            <header className="mb-6">
                <h1 className="text-4xl md:text-6xl font-black mb-4">
                    Política de privacidad
                </h1>
                {/* Línea de separación */}
                <div className="h-[2px] w-full bg-[#010d3d]"></div>
            </header>

            {/* Texto */}
            <div className="space-y-6 text-sm md:text-base">
                {/* Introducción */}
                <p>
                    Instituto de innovación, ciencia y empresa, S.L., ubicado en Carretera de Madrid, 13, km 332, 1º planta 23009 Jaén, España, con C.I.F B23726953, con teléfono de contacto 953190510 y correo electrónico{" "}
                    <a href="mailto:info@institutodeinnovacion.es" className="text-blue-500 underline">
                        info@institutodeinnovacion.es
                    </a>
                    ,  es el responsable del tratamiento de los datos personales que el usuario facilita y le informa que estos datos serán tratados de conformidad con lo dispuesto en las normativas vigentes en protección de datos personales, el Reglamento (UE) 2016/679 de 27 de abril de 2016 (GDPR), por lo que se le facilita la siguiente información del tratamiento:
                </p>

                <ul className="list-disc ml-6 space-y-2">
                    <li>
                        <span className="font-bold">Fin del tratamiento:</span> gestionar los servicios y productos que la empresa ofrece, tanto la información que ofrecemos en la web, como responder a las consultas y sugerencias que nos planteen. En caso de rellenar el formulario para probar una demo, esa información la usaremos también con fines comerciales.
                    </li>

                    <li>
                        Remisión de comunicaciones comerciales vía email y/o teléfono de los usuarios que lo soliciten. Las comunicaciones serán realizadas por el responsable y relacionadas siempre sobre sus productos y servicios.
                    </li>

                    <li>
                        Respecto a la publicación de datos personales en redes sociales que puede compartir esta web, se podrán tratar los datos personales con la idea de contestar a comentarios o cuestiones que los usuarios nos trasladen. La política de privacidad es la marcada por las entidades responsables de esos sitios. No nos hacemos responsables de la información personal que cada usuario pueda publicar.
                    </li>

                    <li>
                        <span className="font-bold">Criterios de conservación de los datos:</span> se conservarán mientras exista una relación con usted tanto, como por los servicios ofertados o bien, por la existencia de alguna obligación legal.
                    </li>
                    <li>
                        <span className="font-bold">Legitimación:</span> consentimiento expreso por parte del usuario marcando la casilla correspondiente, a través de los distintos formularios de recogida de datos. En su caso, los datos del usuario serán tratados conforme a las finalidades expuestas hasta se oponga o revoque su consentimiento.
                    </li>
                    <li>
                        <span className="font-bold">Destinatarios:</span> no se van a destinar sus datos a ningún tercero para su tratamiento salvo obligaciones legales.
                    </li>
                </ul>

                {/* Derechos */}
                <p className="font-bold">Derechos que asisten al Usuario:</p>
                <ul className="list-disc ml-6 space-y-2">
                    <li>
                        <span className="font-bold">Derecho a retirar el consentimiento en cualquier momento. Derecho a oponerse y a la portabilidad de los datos personales.</span> Se establece como derecho del interesado a recibir todos aquellos datos personales que le incumban y que haya facilitado a un responsable, siempre y cuando el tratamiento este basado en el consentimiento o sea necesario para la ejecución de un contrato y el mismo se efectué por medios automatizados.
                    </li>
                    <li>
                        <span className="font-bold">Derecho de acceso:</span> El interesado tendrá derecho a solicitar y obtener gratuitamente la información de sus datos de carácter personal sometidos a tratamiento, el origen de dichos datos, así como, las comunicaciones realizadas o que se prevén hacer de los mismos. Cuando el interesado presente la solicitud por medios electrónicos, y a menos que este solicite que se facilite de otro modo, la información se facilitará en un formato electrónico de uso común. El derecho a obtener copia no afectará negativamente a los derechos y libertades de otros.
                    </li>
                    <li>
                        <span className="font-bold">Derecho de rectificación y supresión:</span> el responsable del tratamiento tendrá la obligación de hacer efectivo el derecho de rectificación o supresión del interesado en el plazo de diez días. Serán rectificados o suprimidos en su caso, los datos de carácter personal cuyo tratamiento no se ajuste a lo dispuesto en la ley y en particular, cuando tales datos resulten inexactos e incompletos, tendrá derecho a obtener sin dilación indebida, la rectificación de los datos personales inexactos que le conciernan. El interesado tendrá derecho a que se completen los datos personales que sean incompletos, inclusive mediante una declaración adicional.
                    </li>
                    <li>
                        <span className="font-bold">Derecho a la limitación del tratamiento:</span> el interesado tendrá derecho a obtener del responsable del tratamiento la limitación del tratamiento de los datos. Cuando el tratamiento de datos personales se haya limitado, solo podrán ser objeto de tratamiento para su conservación, con el consentimiento del interesado, para la formulación, el ejercicio o la defensa de reclamaciones, con miras a la protección de los derechos de otra persona física o jurídica o por razones de interés público. Todo interesado que haya obtenido la limitación del tratamiento será informado por el responsable antes del levantamiento de dicha limitación.
                    </li>
                    <li>
                        <span className="font-bold">Derecho de oposición:</span> el interesado tendrá derecho a oponerse en cualquier momento, por motivos relacionados con su situación particular, a que datos personales que le conciernan (interés público e interés legítimo) sean objeto de tratamiento, incluida la elaboración de perfiles sobre la base de dichas disposiciones. El responsable dejará de tratar los datos personales, salvo que acredite motivos legítimos imperiosos para el tratamiento que prevalezcan sobre los intereses, los derechos y las libertades del interesado, o para la formulación, el ejercicio o la defensa de reclamaciones.
                    </li>
                    <li>
                        Derecho a presentar una reclamación ante la Autoridad de control  si no ha obtenido satisfacción en el ejercicio de sus derechos, en este caso, ante la Agencia Española de protección de datos{" "}
                        <a href='http://www.agpd.es' className='text-blue-500 underline'>http://www.agpd.es</a>
                    </li>
                </ul>

                {/* Datos de contacto */}
                <p className="font-bold">Datos de contacto para ejercer sus derechos:</p>
                <ul className="list-disc ml-6 space-y-2">
                    <li>
                        Dirección postal: carretera de Madrid, 13, km 332, 1º planta 23009 Jaén.
                    </li>
                    <li>
                        Dirección electrónica:{" "}
                        <a href="mailto:info@institutodeinnovacion.es" className="text-blue-500 underline">
                            info@institutodeinnovacion.es
                        </a>
                    </li>
                </ul>

                {/* Carácter de la información */}
                <h2 className="font-bold">
                    2. CARÁCTER OBLIGATORIO O FACULTATIVO DE LA INFORMACIÓN FACILITADA POR EL USUARIO.
                </h2>
                <p>
                    Los Usuarios, mediante la marcación de las casillas correspondientes y entrada de datos en los campos, de los formulario de contacto o presentados en formularios de descarga, aceptan expresamente y de forma libre e inequívoca, que sus datos son necesarios para atender su petición, por parte del prestador, siendo voluntaria la inclusión de datos en los campos restantes.
                </p>
                <p>
                    El Usuario garantiza que los datos personales facilitados al responsable son veraces y se hace responsable de comunicar cualquier modificación de los mismos.
                </p>
                <p>
                    El responsable informa y garantiza expresamente a los usuarios que sus datos personales no serán cedidos en ningún caso a terceros, y que siempre que realizara algún tipo de cesión de datos personales, se pedirá previamente el consentimiento expreso, informado e inequívoco por parte los Usuarios.
                </p>
                <p>
                    Todos los datos solicitados a través del sitio web son obligatorios, ya que son necesarios para la prestación de un servicio óptimo al usuario.
                </p>
                <p>
                    En caso de que no sean facilitados todos los datos, no se garantiza que la información y servicios facilitados sean completamente ajustados a sus necesidades.
                </p>
            </div>
        </section>
    );
};

export default AvisoLegal;