'use client';
import React from "react";
import API_ENDPOINTS from "@/config/api";
import HoneypotField from "@/components/shared/HoneypotField";
import { EMPRESA } from "@/libs/empresa";

type FormularioProps = {
  onClose: () => void;
  zIndexClass?: string;
  interes?: { tipo: string; texto: string; sector?: string }; // Producto o sector desde el que se abre
};

type FormState = {
  nombre: string;
  apellidos: string;
  empresa: string;
  cargo: string;
  consulta: string;
  n_empleados: string;
  telefono: string;
  email: string;
  acepta_marketing: boolean;
  acepta_contacto: boolean;
  acepta_politica: boolean;
};

const Formulario: React.FC<FormularioProps> = ({ onClose, zIndexClass, interes }) => {
  const [form, setForm] = React.useState<FormState>({
    nombre: "",
    apellidos: "",
    empresa: "",
    cargo: "",
    consulta: "",
    n_empleados: "",
    telefono: "",
    email: "",
    acepta_marketing: false,
    acepta_contacto: false,
    acepta_politica: false,
  });
  const [website, setWebsite] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState<string | null>(null);
  const [isSent, setIsSent] = React.useState(false);

  // Escape cierra la ventana
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const onTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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

    if (!form.nombre.trim() || !form.apellidos.trim()) {
      setSubmitMessage("Escribe tu nombre y tus apellidos.");
      return;
    }

    if (form.consulta.trim().length < 10) {
      setSubmitMessage("Cuéntanos tu consulta (mínimo 10 caracteres).");
      return;
    }

    if (!form.acepta_politica) {
      setSubmitMessage("Debes aceptar la política de privacidad.");
      return;
    }

    if (!form.acepta_contacto) {
      setSubmitMessage("Necesitamos tu permiso para contactarte.");
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
        body: JSON.stringify({
          ...form,
          origen_ruta,
          website,
          interes: interes?.texto,
          interes_tipo: interes?.tipo ?? "general",
          interes_sector: interes?.sector,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        const apiMessage =
          typeof errorBody?.error === "string"
            ? errorBody.error
            : "No se pudo enviar el formulario";
        throw new Error(apiMessage);
      }

      setSubmitMessage(`¡Gracias, ${form.nombre.trim()}! Hemos recibido tu consulta. Te contactaremos en breve.`);
      setIsSent(true);
      setForm({
        nombre: "",
        apellidos: "",
        empresa: "",
        cargo: "",
        consulta: "",
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
      className={`fixed inset-0 ${zIndexClass || "z-50"} flex items-start justify-center overflow-y-auto bg-black/70 p-3 sm:items-center sm:p-4`}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="formulario-titulo"
        className="my-2 w-full max-w-4xl max-h-[95vh] overflow-hidden rounded-3xl bg-[#f4f5f7] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Título */}
        <div className="sticky top-0 z-10 flex items-start justify-between bg-[#f4f5f7] p-5 pb-4 sm:p-8 sm:pb-4">
          <div>
            <h2 id="formulario-titulo" className="mb-2 text-left text-xl font-extrabold text-gray-800 sm:text-2xl">
              Reserva una sesión estratégica con nosotros
            </h2>
            <p className="mb-1 text-left text-sm font-bold text-gray-800 sm:text-base">
              Llámanos ahora al{" "}
              <a href={EMPRESA.telefonoHref} className="underline">
                {EMPRESA.telefono}
              </a>
            </p>
            <p className="max-w-2xl text-left text-sm text-gray-600 sm:text-base">
              O rellena este formulario y nos pondremos en contacto contigo para
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
          <HoneypotField value={website} onChange={setWebsite} />
          {interes && (
            <p className="mb-6 rounded-lg bg-white px-4 py-3 text-sm text-gray-700">
              Estás consultando por: <strong>{interes.texto}</strong>
              {interes.sector && <> · Sector: <strong>{interes.sector}</strong></>}
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="formulario-nombre" className="block text-sm font-semibold mb-2">
                Nombre *
              </label>
              <input
                id="formulario-nombre"
                name="nombre"
                type="text"
                maxLength={80}
                autoComplete="given-name"
                placeholder="Introduce tu nombre"
                value={form.nombre}
                onChange={onTextChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div>
              <label htmlFor="formulario-apellidos" className="block text-sm font-semibold mb-2">
                Apellidos *
              </label>
              <input
                id="formulario-apellidos"
                name="apellidos"
                type="text"
                maxLength={120}
                autoComplete="family-name"
                placeholder="Introduce tus apellidos"
                value={form.apellidos}
                onChange={onTextChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div>
              <label htmlFor="formulario-empresa" className="block text-sm font-semibold mb-2">
                Empresa *
              </label>
              <input
                id="formulario-empresa"
                name="empresa"
                type="text"
                maxLength={150}
                autoComplete="organization"
                placeholder="Nombre de tu empresa"
                value={form.empresa}
                onChange={onTextChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div>
              <label htmlFor="formulario-cargo" className="block text-sm font-semibold mb-2">
                Cargo en la empresa
              </label>
              <select
                id="formulario-cargo"
                name="cargo"
                autoComplete="organization-title"
                value={form.cargo}
                onChange={onTextChange}
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              >
                <option value="">Selecciona tu cargo</option>
                <option value="Dirección general / Gerencia / CEO">Dirección general / Gerencia / CEO</option>
                <option value="Dirección de área">Dirección de área (RR. HH., Operaciones, Finanzas, IT…)</option>
                <option value="Responsable de departamento">Responsable o jefe de departamento</option>
                <option value="Técnico / Especialista">Técnico / Especialista</option>
                <option value="Administración">Administración</option>
                <option value="Consultor externo">Consultor o asesor externo</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div>
              <label htmlFor="formulario-n_empleados" className="block text-sm font-semibold mb-2">
                Número de empleados
              </label>
              <select
                id="formulario-n_empleados"
                name="n_empleados"
                value={form.n_empleados}
                onChange={onTextChange}
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              >
                <option value="">Selecciona un rango</option>
                <option value="1-9">1-9 empleados</option>
                <option value="10-49">10-49 empleados</option>
                <option value="50-249">50-249 empleados</option>
                <option value="250-499">250-499 empleados</option>
                <option value="500-999">500-999 empleados</option>
                <option value="1000+">1.000 o más empleados</option>
              </select>
            </div>
            <div>
              <label htmlFor="formulario-telefono" className="block text-sm font-semibold mb-2">
                Teléfono
              </label>
              <input
                id="formulario-telefono"
                name="telefono"
                type="tel"
                maxLength={20}
                autoComplete="tel"
                placeholder="Introduce tu teléfono"
                value={form.telefono}
                onChange={onTextChange}
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="formulario-email" className="block text-sm font-semibold mb-2">
                Email *
              </label>
              <input
                id="formulario-email"
                name="email"
                type="email"
                maxLength={254}
                autoComplete="email"
                placeholder="Introduce tu email"
                value={form.email}
                onChange={onTextChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="formulario-consulta" className="block text-sm font-semibold mb-2">
                Escribe tu consulta *
              </label>
              <textarea
                id="formulario-consulta"
                name="consulta"
                rows={3}
                maxLength={500}
                placeholder="Ej.: Queremos digitalizar las nóminas y las vacaciones de 40 empleados. ¿Qué incluye y cómo se implanta?"
                value={form.consulta}
                onChange={onTextChange}
                required
                className="w-full p-3 rounded-lg border border-gray-300 bg-white"
              />
              <p className="mt-1 text-right text-xs text-gray-500">{form.consulta.length}/500</p>
            </div>
          </div>

          <div className="mt-8 space-y-1 text-sm text-gray-700 font-semibold">
            <label className="flex gap-3 items-start">
              <input
                type="checkbox"
                name="acepta_politica"
                checked={form.acepta_politica}
                onChange={onCheckboxChange}
                className="mt-1"
              />
              <span>He leído y acepto la <a className="text-blue-600" href="https://store.normapro.es/politica-de-privacidad" target="_blank" rel="noopener noreferrer">política de privacidad</a> de NormaPro. *</span>
            </label>
            <label className="flex gap-3 items-start">
              <input
                type="checkbox"
                name="acepta_contacto"
                checked={form.acepta_contacto}
                onChange={onCheckboxChange}
                className="mt-1"
              />
              Acepto que algún miembro del equipo de NormaPro se ponga en contacto conmigo para acordar una reunión demostrativa. *
            </label>
            <label className="flex gap-3 items-start">
              <input
                type="checkbox"
                name="acepta_marketing"
                checked={form.acepta_marketing}
                onChange={onCheckboxChange}
                className="mt-1"
              />
              Quiero recibir mensajes promocionales de NormaPro sobre sus productos y servicios. Puedo darme de baja en cualquier momento desde el enlace que aparece al final de los correos.
            </label>
          </div>

          {submitMessage && (
            <p className={`mt-4 text-center text-sm font-semibold ${isSent ? "text-[#119F3B]" : "text-red-500"}`}>{submitMessage}</p>
          )}

          <div className="flex justify-center mt-8">
            {isSent ? (
              <button
                type="button"
                onClick={onClose}
                className="bg-[#0b1b4d] text-white font-semibold px-10 py-3 rounded-xl hover:bg-[#132a6e] transition"
              >
                Cerrar
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#0b1b4d] text-white font-semibold px-10 py-3 rounded-xl hover:bg-[#132a6e] transition"
              >
                {isSubmitting ? "Enviando..." : "Enviar consulta"}
              </button>
            )}
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