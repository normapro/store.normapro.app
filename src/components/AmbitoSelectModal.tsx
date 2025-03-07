import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

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

            <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
                <Dialog.Title className="text-lg font-bold text-center">Ver soluciones NormaPro</Dialog.Title>
                <p className="text-gray-600 text-center mb-4">¿En qué ámbito estás interesado?</p>

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
                className="mt-4 w-full bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800 transition"
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
