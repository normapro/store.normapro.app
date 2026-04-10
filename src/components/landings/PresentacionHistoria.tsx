import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

type PresentacionHistoriaProps = {
    logo: string;
    clienteNombre: string;
    nombre: string;
    descripcion: string;
};

const PresentacionHistoria = ({ logo, clienteNombre, nombre, descripcion }: PresentacionHistoriaProps) => {
    return (
        <section className="bg-[#f2f2f5] min-h-[600px] flex flex-col items-center justify-between py-10 px-8">
            
            {/* Logo */}
            <div className="w-full max-w-7xl flex justify-start">
                <div className="bg-white p-4 shadow-sm">
                    <img 
                        src={`/logos/${logo}`} 
                        alt={`Logo de ${clienteNombre}`} 
                        className="h-10 md:h-12 w-auto object-contain"
                    />
                </div>
            </div>

            {/* Texto */}
            <div className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl">
                <h1 className="text-[#010d3d] text-4xl md:text-6xl font-black mb-8 tracking-tight">
                    {nombre}
                </h1>
                
                <p className="text-[#010d3d] text-xl md:text-3xl font-black leading-tight max-w-3xl">
                    {descripcion}
                </p>
            </div>

            {/* Icono*/}
            <div className="mt-8 mb-4">
                <div className="bg-[#717689] w-12 h-12 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon 
                        icon={faChevronDown} 
                        className="text-white text-xl" 
                    />
                </div>
            </div>
            
        </section>
    );
};

export default PresentacionHistoria;