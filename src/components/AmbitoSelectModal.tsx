import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface AmbitoSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  ambitos: { id_ambito: number; slug: string; description: string }[];
  onSelectAmbito: (slug: string) => void;
}

const AmbitoSelectModal = ({ isOpen, onClose, ambitos, onSelectAmbito }: AmbitoSelectModalProps) => {
  const [selectedAmbito, setSelectedAmbito] = useState<string>("");

  const handleBuscar = () => {
    if (selectedAmbito) {
      onSelectAmbito(selectedAmbito);
      onClose();
    }
  };

  return (
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
            
            {/* 🔹 Fondo translúcido con desenfoque */}
            <div className="fixed inset-0 bg-gray-900 bg-opacity-30 backdrop-blur-sm backdrop-custom" />

            <div className="fixed inset-0 flex items-center justify-center p-4 text-[#010D3D]">
            <Dialog.Panel className="relative bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
                <button type="button" onClick={onClose} aria-label="Cerrar" className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"><FontAwesomeIcon icon={faXmark} /></button>
                <Dialog.Title className="text-lg font-bold text-center">Ver soluciones NormaPro</Dialog.Title>
                <p className="text-center mb-4">¿En qué ámbito estás interesado?</p>

                <select
                value={selectedAmbito}
                onChange={(e) => setSelectedAmbito(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                >
                <option value="">Selecciona uno</option>
                {ambitos.map((ambito) => (
                    <option key={ambito.id_ambito} value={ambito.slug}>
                    {ambito.description}
                    </option>
                ))}
                </select>

                <button
                onClick={handleBuscar}
                disabled={!selectedAmbito}
                className={`mt-4 w-full text-white p-2 rounded-lg transition ${selectedAmbito ? "bg-[#010D3D] hover:bg-blue-800" : "bg-slate-300 cursor-not-allowed"}`}
                >
                Buscar
                </button>
            </Dialog.Panel>
            </div>
        </Dialog>
        </Transition>

  );
};

export default AmbitoSelectModal;
