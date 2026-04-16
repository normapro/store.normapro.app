import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faExternalLinkAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import API_ENDPOINTS from '@/config/api';

const Cookies = () => {
  const [datos, setDatos] = useState<any[]>([]);
  const [abierto, setAbierto] = useState<number | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(API_ENDPOINTS.COOKIES)
      .then(res => res.json())
      .then(data => {
        setDatos(data);
        setCargando(false);
      })
      .catch(err => {
        console.error(err);
        setCargando(false);
      });
  }, []);

  if (cargando) return (
    <div className="flex justify-center p-10 text-[#010d3d]">
      <FontAwesomeIcon icon={faSpinner} spin className="text-2xl mr-2" />
      <span>Cargando...</span>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto my-10 space-y-1">
      {datos.map((tec) => (
        <div key={tec.id}>

          {/* Botón Acordeón */}
          <button
            onClick={() => setAbierto(abierto === tec.id ? null : tec.id)}
            className="w-full flex items-center justify-between p-2 bg-[#f5f5f5] text-left"
          >
            <span className="text-gray-800 font-extrabold text-xl">{tec.nombre}</span>
            <div className="flex items-center gap-4">
              <span className="text-sm">{tec.etiquetas.join(', ')}</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`transition-transform ${abierto === tec.id ? 'rotate-180' : ''}`}
              />
            </div>
          </button>

          {/* Contenido */}
          {abierto === tec.id && (
            <div className="p-8 bg-[#fbfbfb] border-t border-gray-50 space-y-10">
              <div className="grid md:grid-cols-2 gap-10 text-sm">
                <div>
                  <h4 className="text-base font-black text-gray-800">Uso</h4>
                  {tec.uso && (<p className="text-gray-600">
                    Usamos {tec.nombre} para {tec.uso}. {tec.link_uso && <a href={tec.link_uso} className="text-blue-500 underline">Read more about {tec.nombre} <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px] text-gray-600" /></a>}
                  </p>)}
                </div>
                <div>
                  <h4 className="text-base font-black text-gray-800">Compartir datos</h4>
                  <p className="text-gray-600">
                    {tec.compartir_datos} {tec.link_compartir_datos && <span>Para más información, por favor, lee la <a href={tec.link_compartir_datos} className="text-blue-500 underline">política de privacidad de {tec.nombre}</a></span>}
                  </p>
                </div>
              </div>

              {tec.tablas.map((tabla: any, idx: number) => (
                <div key={idx} className="bg-white border border-gray-300">
                  <h5 className="p-3 font-black text-gray-800 border-b border-gray-300 pb-1">{tabla.titulo_categoria}</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-gray-300 bg-[#fbfbfb]">
                          <th className="p-3 border-r border-gray-300 font-black text-gray-800">Nombre</th>
                          <th className="p-3 border-r border-gray-300 font-black text-gray-800">Caducidad</th>
                          <th className="p-3 font-black text-gray-800">Función</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tabla.cookies.map((cookie: any, cIdx: number) => (
                          <tr key={cIdx} className="border-b border-gray-300 last:border-0">
                            <td className="p-3 border-r border-gray-300 font-medium">
                              {cookie.link_nombre ? (
                                <a
                                  href={cookie.link_nombre}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-blue-500 underline inline-flex items-center gap-1"
                                >
                                  {cookie.nombre}
                                  <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px] text-gray-600" />
                                </a>
                              ) : (
                                <span className="text-gray-600">
                                  {cookie.nombre}
                                </span>
                              )}
                            </td>
                            <td className="p-3 text-gray-600 border-r border-gray-300">{cookie.caducidad}</td>
                            <td className="p-3 text-gray-600">{cookie.funcion}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Cookies;