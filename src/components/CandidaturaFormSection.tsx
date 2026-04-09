'use client';

import { FormEvent, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';

type CandidaturaFormData = {
  fullName: string;
  address: string;
  email: string;
  position: string;
  phone: string;
  experienceYears: string;
  message: string;
};

const initialFormData: CandidaturaFormData = {
  fullName: '',
  address: '',
  email: '',
  position: '',
  phone: '',
  experienceYears: '',
  message: '',
};

const CandidaturaFormSection = () => {
  const [formData, setFormData] = useState<CandidaturaFormData>(initialFormData);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSent, setIsSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { fullName, address, email, position, phone, experienceYears, message } = formData;
    const isValid =
      fullName.trim().length > 0 &&
      address.trim().length > 0 &&
      email.trim().length > 0 &&
      position.trim().length > 0 &&
      phone.trim().length > 0 &&
      experienceYears.trim().length > 0 &&
      message.trim().length > 0 &&
      !!cvFile;

    if (!isValid) return;

    // Simula envio local sin backend.
    setFormData(initialFormData);
    setCvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setIsSent(true);
  };

  return (
    <section className="w-full px-6 py-14 md:px-10">
      <div className="mx-auto max-w rounded-[24px] bg-[#E7E7F0] px-6 py-10 md:px-14 md:py-16">
        <h2 className="text-center text-3xl font-black text-[#010d3d] md:text-5xl">Formulario de Candidatura</h2>

        <form onSubmit={handleSubmit} className="mx-auto mt-12 w-full max-w-6xl p-2 md:p-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="cand-fullName" className="mb-2 block text-[15px] font-medium text-[#001B5D]">
                  Nombre completo
                </label>
                <input
                  id="cand-fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(event) => {
                    setFormData((prev) => ({ ...prev, fullName: event.target.value }));
                    setIsSent(false);
                  }}
                  placeholder="Nombre y apellidos"
                  className="w-full rounded-xl border border-[#C5CBD8] bg-white px-4 py-4 text-[15px] text-[#001B5D] outline-none placeholder:text-[#8A93AA] focus:ring-2 focus:ring-[#00B2E3]"
                />
              </div>

              <div>
                <label htmlFor="cand-address" className="mb-2 block text-[15px] font-medium text-[#001B5D]">
                  Direccion
                </label>
                <input
                  id="cand-address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={(event) => {
                    setFormData((prev) => ({ ...prev, address: event.target.value }));
                    setIsSent(false);
                  }}
                  placeholder="Direccion"
                  className="w-full rounded-xl border border-[#C5CBD8] bg-white px-4 py-4 text-[15px] text-[#001B5D] outline-none placeholder:text-[#8A93AA] focus:ring-2 focus:ring-[#00B2E3]"
                />
              </div>

              <div>
                <label htmlFor="cand-email" className="mb-2 block text-[15px] font-medium text-[#001B5D]">
                  Email
                </label>
                <input
                  id="cand-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(event) => {
                    setFormData((prev) => ({ ...prev, email: event.target.value }));
                    setIsSent(false);
                  }}
                  placeholder="Email"
                  className="w-full rounded-xl border border-[#C5CBD8] bg-white px-4 py-4 text-[15px] text-[#001B5D] outline-none placeholder:text-[#8A93AA] focus:ring-2 focus:ring-[#00B2E3]"
                />
              </div>

              <div>
                <label htmlFor="cand-position" className="mb-2 block text-[15px] font-medium text-[#001B5D]">
                  Puesto al que postula
                </label>
                <select
                  id="cand-position"
                  name="position"
                  required
                  value={formData.position}
                  onChange={(event) => {
                    setFormData((prev) => ({ ...prev, position: event.target.value }));
                    setIsSent(false);
                  }}
                  className="w-full rounded-xl border border-[#C5CBD8] bg-white px-4 py-4 text-[15px] text-[#001B5D] outline-none focus:ring-2 focus:ring-[#00B2E3]"
                >
                  <option value="" disabled>
                    Selecciona un puesto
                  </option>
                  <option value="Desarrollador(a) Senior Fullstack (Express, Angular, Node Js)"> Desarrollador(a) Senior Fullstack (Express, Angular, Node Js) </option>
                  <option value="Consultor(a) NormaPro">Consultor(a) NormaPro</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Desarrollador(a) Junior "> Desarrollador(a) Junior </option>
                </select>
              </div>

              <div>
                <label htmlFor="cand-phone" className="mb-2 block text-[15px] font-medium text-[#001B5D]">
                  Telefono
                </label>
                <input
                  id="cand-phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(event) => {
                    setFormData((prev) => ({ ...prev, phone: event.target.value }));
                    setIsSent(false);
                  }}
                  placeholder="Telefono"
                  className="w-full rounded-xl border border-[#C5CBD8] bg-white px-4 py-4 text-[15px] text-[#001B5D] outline-none placeholder:text-[#8A93AA] focus:ring-2 focus:ring-[#00B2E3]"
                />
              </div>

              <div>
                <label htmlFor="cand-experienceYears" className="mb-2 block text-[15px] font-medium text-[#001B5D]">
                  Experiencia laboral (en anos)
                </label>
                <input
                  id="cand-experienceYears"
                  name="experienceYears"
                  type="number"
                  min="0"
                  required
                  value={formData.experienceYears}
                  onChange={(event) => {
                    setFormData((prev) => ({ ...prev, experienceYears: event.target.value }));
                    setIsSent(false);
                  }}
                  placeholder="Anos de experiencia"
                  className="w-full rounded-xl border border-[#C5CBD8] bg-white px-4 py-4 text-[15px] text-[#001B5D] outline-none placeholder:text-[#8A93AA] focus:ring-2 focus:ring-[#00B2E3]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="cand-message" className="mb-2 block text-[15px] font-medium text-[#001B5D]">
                Mensaje
              </label>
              <textarea
                id="cand-message"
                name="message"
                required
                value={formData.message}
                onChange={(event) => {
                  setFormData((prev) => ({ ...prev, message: event.target.value }));
                  setIsSent(false);
                }}
                placeholder="Explica brevemente por que eres la persona idonea para este puesto. Puedes hablar de tu experiencia, conocimientos, habilidades, titulaciones o proyectos en los que hayas trabajado."
                className="h-full min-h-[260px] w-full rounded-xl border border-[#C5CBD8] bg-white px-4 py-4 text-[15px] text-[#001B5D] outline-none placeholder:text-[#8A93AA] focus:ring-2 focus:ring-[#00B2E3]"
              />
            </div>
          </div>

          <div className="mt-20 flex flex-col items-center gap-4">
            <input
              ref={fileInputRef}
              id="cand-cv"
              name="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              required
              className="hidden"
              onChange={(event) => {
                const selectedFile = event.target.files?.[0] || null;
                setCvFile(selectedFile);
                setIsSent(false);
              }}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-3 rounded-2xl border border-[#001B5D] px-10 py-4 text-[15px] font-extrabold text-[#001B5D] transition hover:bg-[#E7E7F0]  bg-white"
            >
              <FontAwesomeIcon icon={faPaperclip} />
              Adjuntar CV
            </button>

            {cvFile && <p className="text-[15px] text-[#001B5D]">Archivo: {cvFile.name}</p>}

            <button
              type="submit"
              className="rounded-2xl bg-[#001B5D] px-10 py-4 text-[15px] font-extrabold text-white transition hover:opacity-90"
            >
              Enviar candidatura
            </button>

            {isSent && (
              <p className="text-[20px] text-[#001B5D]">
                <span className="mr-2 font-black text-[#119F3B]">✓</span>
                La candidatura se ha enviado correctamente.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default CandidaturaFormSection;
