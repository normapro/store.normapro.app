'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { INVENTARIO_COOKIES } from '@/libs/cookiesInventario';

// Tabla de cookies por tecnología. Los datos salen del inventario de src/libs/cookiesInventario.ts.
const Cookies = () => {
  const [abierto, setAbierto] = useState<string | null>(null);

  return (
    <div className="max-w-6xl mx-auto my-10 space-y-1">
      {INVENTARIO_COOKIES.map((tec) => (
        <div key={tec.id}>

          {/* Botón Acordeón */}
          <button
            onClick={() => setAbierto(abierto === tec.id ? null : tec.id)}
            aria-expanded={abierto === tec.id}
            className="w-full flex items-center justify-between p-2 bg-[#f5f5f5] text-left"
          >
            <span className="text-gray-800 font-extrabold text-xl">{tec.nombre}</span>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm truncate max-w-[120px] sm:max-w-xs">{tec.categoria}</span>
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
                  <p className="text-gray-600">Usamos {tec.nombre} para {tec.uso}.</p>
                </div>
                <div>
                  <h4 className="text-base font-black text-gray-800">Titular y datos compartidos</h4>
                  <p className="text-gray-600">
                    {tec.titular}{' '}
                    {tec.linkPrivacidad && (
                      <span>
                        Más información en la{' '}
                        <a href={tec.linkPrivacidad} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                          política de privacidad de {tec.nombre}{' '}
                          <FontAwesomeIcon icon={faExternalLinkAlt} className="text-[10px] text-gray-600" />
                        </a>
                        .
                      </span>
                    )}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-300">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-gray-300 bg-[#fbfbfb]">
                        <th className="p-3 border-r border-gray-300 font-black text-gray-800">Nombre</th>
                        <th className="p-3 border-r border-gray-300 font-black text-gray-800">Tipo</th>
                        <th className="p-3 border-r border-gray-300 font-black text-gray-800">Caducidad</th>
                        <th className="p-3 font-black text-gray-800">Función</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tec.cookies.map((cookie) => (
                        <tr key={cookie.nombre} className="border-b border-gray-300 last:border-0">
                          <td className="p-3 border-r border-gray-300 font-medium text-gray-600">{cookie.nombre}</td>
                          <td className="p-3 text-gray-600 border-r border-gray-300">{cookie.tipo}</td>
                          <td className="p-3 text-gray-600 border-r border-gray-300">{cookie.caducidad}</td>
                          <td className="p-3 text-gray-600">{cookie.funcion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Cookies;
