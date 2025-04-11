"use client";

import { useEffect, useState } from "react";

const HeroUserCount = () => {
  const [users, setUsers] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.danubio.normapro.es/apps/store/users.php")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.users) {
          // Formateamos el número con puntos
          const formatted = Number(data.users).toLocaleString("es-ES");
          setUsers(formatted);
        }
      })
      .catch(() => setUsers("26.000")); // fallback por si falla
  }, []);

  return (
    <div className="bg-white w-full text-center py-10 z-50 relative">
      <p className="text-[15px] font-extrabold text-[#010D3D60]">
        Únete a los {users ?? "..."} usuarios que ya confían en NormaPro
      </p>
    </div>
  );
};

export default HeroUserCount;