'use client';

import React, { useEffect, useState } from "react";
import ImageLogoCliente from "@/components/shared/ImageLogoCliente";
import { LogoType } from "@/libs/logovars";
import { Cliente } from "@/types/cliente";
import API_ENDPOINTS from "@/config/api";

type ClientsMuralProps = {
  scope: string;
  claim: string[];
};

const ClientsMuralSection: React.FC<ClientsMuralProps> = ({ scope, claim }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    fetch(`${API_ENDPOINTS.CLIENTES}?maxItems=100&scope=${scope}`)
      .then((res) => res.json())
      .then(setClientes)
      .catch(console.error);
  }, [scope]);

  const colors = ["#010d3d", "#797f98"];

  return (
    <section className="mx-auto  py-12 text-center overflow-hidden">
     <h3 className="max-w-3xl mx-auto w-full text-[30px] font-[900] text-gray-500 mb-10">
            {claim.map((text, i) => (
              <span key={i} style={{ color: colors[i % colors.length] }}>
                {text + " "}
              </span>
            ))}
      </h3>

      <div className="relative w-full overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center p-10">
          {clientes.map((cliente, idx) => (
            <a
              key={`${cliente.id_cliente}-${idx}`}
              href={cliente.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center px-[40px]"
            >
              <ImageLogoCliente
                logoName={cliente.logo}
                logoType={cliente.logoType}
                clienteName={cliente.description}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsMuralSection;