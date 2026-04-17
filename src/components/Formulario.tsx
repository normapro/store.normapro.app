'use client';
import React from "react";

type FormularioProps = {
  onClose: () => void;
};

const Formulario: React.FC<FormularioProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-3 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="my-2 w-full max-w-4xl max-h-[95vh] overflow-hidden rounded-3xl bg-[#f4f5f7] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Título */}
        <div className="sticky top-0 z-10 flex items-start justify-between bg-[#f4f5f7] p-5 pb-4 sm:p-8 sm:pb-4">
          <div>
            <h2 className="mb-2 text-left text-xl font-extrabold text-gray-800 sm:text-2xl">
              Reserva una sesión estratégica con nosotros
            </h2>
            <p className="max-w-2xl text-left text-sm text-gray-600 sm:text-base">
              Rellena este formulario y nos pondremos en contacto contigo para
              hacerte una demostración gratuita y sin compromiso.
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-3 rounded-full px-3 py-1 text-3xl leading-none text-black hover:bg-black/10"
            aria-label="Cerrar formulario"
          >
            ✕
          </button>
        </div>

        {/* Formulario */}
        <form className="max-h-[75vh] overflow-y-auto rounded-b-3xl bg-[#e9eaee] p-5 text-left sm:p-8">
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

          <div className="mt-4 flex justify-center sm:hidden">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#0b1b4d] px-8 py-2 font-semibold text-[#0b1b4d]"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Formulario;