'use client';

import React, { useEffect, useState } from "react";
import ImageLogoCliente from "@/components/shared/ImageLogoCliente";
import { LogoType } from "@/libs/logovars";
import API_ENDPOINTS from "@/config/api";

type Cliente = {
  id_cliente: number;
  description: string;
  url: string;
  logo: string;
  logoType: LogoType;
};

type ClientCarouselProps = {
  scope: string;
  claim: string;
};

const getClientesFromPayload = (payload: unknown): Cliente[] => {
  if (Array.isArray(payload)) return payload as Cliente[];
  if (payload && typeof payload === "object") {
    const data = (payload as { data?: unknown; items?: unknown }).data;
    const items = (payload as { data?: unknown; items?: unknown }).items;
    if (Array.isArray(data)) return data as Cliente[];
    if (Array.isArray(items)) return items as Cliente[];
  }
  return [];
};

const ClientCarousel: React.FC<ClientCarouselProps> = ({ scope, claim }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const loadClientes = async () => {
      try {
        const res = await fetch(`${API_ENDPOINTS.CLIENTES}?maxItems=100&scope=${scope}`);
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
        const payload = await res.json();
        setClientes(getClientesFromPayload(payload));
      } catch (error) {
        console.error("Error al cargar clientes:", error);
        setClientes([]);
      }
    };

    loadClientes();
  }, [scope]);

  const logos = Array(5).fill(clientes).flat();

  return (
    <section className="mx-auto  py-12 text-center overflow-hidden">
      <h3 className="text-gray-500 mb-6 font-semibold text-lg">{claim}</h3>

      <div className="relative w-full overflow-hidden">
        <div className="flex w-[200%] animate-slide">
          {logos.map((cliente, idx) => (
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

export default ClientCarousel;
