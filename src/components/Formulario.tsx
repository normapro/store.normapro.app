'use client';
import React from "react";
import API_ENDPOINTS from "@/config/api";

type FormularioProps = {
  onClose: () => void;
};

type FormState = {
  nombre: string;
  apellidos: string;
  empresa: string;
  cargo: string;
  pais: string;
  n_empleados: string;
  telefono: string;
  email: string;
  acepta_marketing: boolean;
  acepta_contacto: boolean;
  acepta_politica: boolean;
};

const Formulario: React.FC<FormularioProps> = ({ onClose }) => {
  const [form, setForm] = React.useState<FormState>({
    nombre: "",
    apellidos: "",
    empresa: "",
    cargo: "",
    pais: "",
    n_empleados: "",
    telefono: "",
    email: "",
    acepta_marketing: false,
    acepta_contacto: false,
    acepta_politica: false,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState<string | null>(null);

  const onTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitMessage(null);

    if (!form.acepta_politica) {
      setSubmitMessage("Debes aceptar la política de privacidad.");
      return;
    }

    setIsSubmitting(true);
    try {
      const origen_ruta = `${window.location.pathname}${window.location.search}`;
      const response = await fetch(API_ENDPOINTS.LEADS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, origen_ruta }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const apiMessage =
          typeof errorBody?.error === "string"
            ? errorBody.error
            : "No se pudo enviar el formulario";
        throw new Error(apiMessage);
      }

      setSubmitMessage("Formulario enviado correctamente.");
      setForm({
        nombre: "",
        apellidos: "",
        empresa: "",
        cargo: "",
        pais: "",
        n_empleados: "",
        telefono: "",
        email: "",
        acepta_marketing: false,
        acepta_contacto: false,
        acepta_politica: false,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo enviar. Inténtalo de nuevo en unos minutos.";
      setSubmitMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <form
          onSubmit={handleSubmit}
          className="max-h-[75vh] overflow-y-auto rounded-b-3xl bg-[#e9eaee] p-5 text-left sm:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Nombre
              </label>
              <input
                name="nombre"
                type="text"
                placeholder="Introduce tu nombre"
                value={form.nombre}
                onChange={onTextChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Introduce tus apellidos
              </label>
              <input
                name="apellidos"
                type="text"
                placeholder="Nombre"
                value={form.apellidos}
                onChange={onTextChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Empresa
              </label>
              <input
                name="empresa"
                type="text"
                placeholder="Nombre de tu empresa"
                value={form.empresa}
                onChange={onTextChange}
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Cargo en la empresa
              </label>
              <input
                name="cargo"
                type="text"
                placeholder="Introduce tu cargo"
                value={form.cargo}
                onChange={onTextChange}
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                País
              </label>
              <input
                name="pais"
                type="text"
                placeholder="Introduce tu país"
                value={form.pais}
                onChange={onTextChange}
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Número de empleados
              </label>
              <select
                name="n_empleados"
                value={form.n_empleados}
                onChange={onTextChange}
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              >
                <option value="">Selecciona un rango</option>
                <option value="1-49 Empleados">1-49 Empleados</option>
                <option value="50-499 Empleados">50-499 Empleados</option>
                <option value="500-1499 Empleados">500-1499 Empleados</option>
                <option value="1500+">Más de 1500 Empleados</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Teléfono
              </label>
              <input
                name="telefono"
                type="text"
                placeholder="Introduce tu teléfono"
                value={form.telefono}
                onChange={onTextChange}
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Introduce tu email"
                value={form.email}
                onChange={onTextChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
          </div>

          <div className="mt-8 space-y-1 text-sm text-gray-700 font-semibold">
            <label className="flex gap-3 items-start">
              <input
                type="checkbox"
                name="acepta_marketing"
                checked={form.acepta_marketing}
                onChange={onCheckboxChange}
                className="mt-1"
              />
              Acepta recibir mensajes promocionales de NormaPro sobre sus productos y servicios. Puedes darte de baja en cualquier momento haciendo clic en el enlace que aparece en la parte inferior de nuestros correos electrónicos.
            </label>
            <label className="flex gap-3 items-start">
              <input
                type="checkbox"
                name="acepta_contacto"
                checked={form.acepta_contacto}
                onChange={onCheckboxChange}
                className="mt-1"
              />
              Acepta que algún miembro del equipo de NormaPro se ponga en contacto conmigo para acordar una reunión demostrativa.
            </label>
            <label className="flex gap-3 items-start">
              <input
                type="checkbox"
                name="acepta_politica"
                checked={form.acepta_politica}
                onChange={onCheckboxChange}
                className="mt-1"
              />
              Acepto la<a className="text-blue-600" href="https://store.normapro.es/politica-de-privacidad" target="_blank" rel="noopener noreferrer">política de privacidad</a>de NormaPro.
            </label>
          </div>

          {submitMessage && (
            <p className="mt-4 text-center text-sm text-[#0b1b4d]">{submitMessage}</p>
          )}

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#0b1b4d] text-white font-semibold px-10 py-3 rounded-xl hover:bg-[#132a6e] transition"
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
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