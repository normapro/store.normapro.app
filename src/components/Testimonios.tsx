interface Testimonio {
    autor: string;
    cargo: string;
    empresa: string;
    mensaje: string;
    logo?: string;
  }
  
  interface Props {
    testimonios: Testimonio[];
  }
  
  const Testimonios = ({ testimonios }: Props) => {
    if (!testimonios.length) return <p className="text-center text-gray-500">Próximamente testimonios...</p>;
  
    return (
      <div className="space-y-4">
        {testimonios.map((t, index) => (
          <div key={index} className="p-4 bg-white shadow rounded-lg">
            <p className="italic">"{t.mensaje}"</p>
            <p className="mt-2 font-bold">{t.autor}</p>
            <p className="text-sm">{t.cargo} - {t.empresa}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Testimonios;
  