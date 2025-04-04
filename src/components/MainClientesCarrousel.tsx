"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const API_BASE_URL = "https://api.normapro.app"; // Asegúrate de usar la URL correcta

const MainClienteCarrousel = () => {
  const [clientes, setClientes] = useState<{ id_cliente: number; description: string; logo: string }[]>([]);
  const [userCount, setUserCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const [clientesRes, countRes] = await Promise.all([
          fetch(`${API_BASE_URL}/v1/store/clientes`).then((res) => res.json()),
          fetch(`${API_BASE_URL}/v1/store/usersCount`).then((res) => res.json()),
        ]);

        setClientes(clientesRes);
        setUserCount(countRes.count);
      } catch (error) {
        console.error("Error al obtener los datos", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClientes();
  }, []);

  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {isLoading ? (
          <p className="text-gray-500">Cargando...</p>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-gray-600">
              Únete a + {userCount.toLocaleString()} usuarios que ya confían en NormaPro
            </h2>

            {/* Carrusel de Clientes */}
            <div className="mt-8 flex items-center justify-center overflow-hidden">
              <div className="flex space-x-10 animate-scroll">
                {clientes.map((cliente) => (
                  <div key={cliente.id_cliente} className="flex-shrink-0">
                    <Image
                      src={`/clientes/${cliente.logo}`}
                      alt={cliente.description}
                      width={150}
                      height={100}
                      className="h-auto max-w-[150px] object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MainClienteCarrousel;
