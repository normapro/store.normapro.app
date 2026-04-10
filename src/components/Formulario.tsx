'use client';
import React from "react";

type FormularioProps = {
  onClose: () => void;
};

const Formulario: React.FC<FormularioProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-4xl bg-[#f4f5f7] rounded-3xl shadow-2xl">
        {/* Título */}
        <div className="flex justify-between items-start p-8 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-2 text-left">
              Reserva una sesión estratégica con nosotros
            </h2>
            <p className="text-gray-600 max-w-2xl text-left">
              Rellena este formulario y nos pondremos en contacto contigo para
              hacerte una demostración gratuita y sin compromiso.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-3xl text-black"
          >
            ✕
          </button>
        </div>

        {/* Formulario */}
        <form className="bg-[#e9eaee] p-8 rounded-b-3xl text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Introduce tu nombre"
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Introduce tus apellidos
              </label>
              <input
                type="text"
                placeholder="Nombre"
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Empresa
              </label>
              <input
                type="text"
                placeholder="Nombre de tu empresa"
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Cargo en la empresa
              </label>
              <input
                type="text"
                placeholder="Introduce tu cargo"
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                País
              </label>
              <input
                type="text"
                placeholder="Introduce tu país"
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Número de empleados
              </label>
              <select className="w-full p-3 rounded-lg border border-gray-300 bg-white">
                <option>Selecciona un rango</option>
                <option>1-49 Empleados</option>
                <option>50-499 Empleados</option>
                <option>500-1499 Empleados</option>
                <option>Más de 1500 Empleados</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Teléfono
              </label>
              <input
                type="text"
                placeholder="Introduce tu teléfono"
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Introduce tu email"
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
          </div>

          <div className="mt-8 space-y-1 text-sm text-gray-700 font-semibold">
            <label className="flex gap-3 items-start">
              <input type="checkbox" className="mt-1" />
              Acepta recibir mensajes promocionales de NormaPro sobre sus productos y servicios. Puedes darte de baja en cualquier momento haciendo clic en el enlace que aparece en la parte inferior de nuestros correos electrónicos.
            </label>
            <label className="flex gap-3 items-start">
              <input type="checkbox" className="mt-1" />
              Acepta que algún miembro del equipo de NormaPro se ponga en contacto conmigo para acordar una reunión demostrativa.
            </label>
            <label className="flex gap-3 items-start">
              <input type="checkbox" className="mt-1" />
              Acepto la<a className="text-blue-600">política de privacidad</a>de NormaPro.
            </label>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-[#0b1b4d] text-white font-semibold px-10 py-3 rounded-xl hover:bg-[#132a6e] transition"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;