"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ItemListFormacion } from "@/types/formacion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/pro-duotone-svg-icons";
import FormacionCard from "./formacionCard";

const MainFormacionSection = () => {
  const [formaciones, setFormacion] = useState<ItemListFormacion[]>([]);

  useEffect(() => {
    const fetchPacks = async () => {
      const response = await fetch("https://api.danubio.normapro.es/apps/store/formapro.php");
      const data = await response.json();
      const limitedData = data.slice(0, 4);
      setFormacion(limitedData);
    };

    fetchPacks();
  }, []);

  return (
    <div className="bg-[#f7c5d5]">
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-[#f9d7e3] rounded-xl w-full h-[460px] mt-10 mb-10 relative overflow-hidden">
          <h2 className="text-center text-[32px] font-black text-[#010D3D] mb-4 mt-4">Formación</h2>
          <p className="text-center text-[#010D3D] max-w-3xl mx-auto mb-6">
            Navegamos contigo hacia una evolución tecnológica accesible, segura y sin barreras.
          </p>

          <div className="flex justify-center mb-10">
            <Link
              href="/formacion"
              className="mt-4 bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] shadow-md text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 transition"
            >
              Explora nuestros cursos <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Link>
          </div>

          {/* Cards en fila, alineadas abajo y centradas */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-[6px] items-end">
            {formaciones.map((formacion) => (
              <FormacionCard key={formacion.id_curse} formacion={formacion} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainFormacionSection;
