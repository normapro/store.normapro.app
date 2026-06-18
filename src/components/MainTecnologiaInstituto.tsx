const heroImages = [
    {
        src: "head_img1@2x.png",
        size: "w-[250px] md:w-[300px] lg:w-[450px] xl:w-[650px]",
        z: "z-[10]",
        offsetY: "translate-y-[20px]",
        fadeInOrder: 3,
    },
    {
        src: "head_img2@2x.png",
        size: "w-[350px] md:w-[400px] lg:w-[550px] xl:w-[670px]",
        z: "z-[20]",
        offsetY: "translate-y-[10px]",
        fadeInOrder: 2,
    },
    {
        src: "head_img3@2x.png",
        size: "w-[500px] md:w-[550px] lg:w-[600px] xl:w-[700px]",
        z: "z-[30]",
        offsetY: "translate-y-0", // imagen del centro
        fadeInOrder: 1,
    },
    {
        src: "head_img4@2x.png",
        size: "w-[350px] md:w-[400px] lg:w-[550px] xl:w-[670px]",
        z: "z-[20]",
        offsetY: "translate-y-[10px]",
        fadeInOrder: 2,
    },
    {
        src: "head_img5@2x.png",
        size: "w-[250px] md:w-[300px] lg:w-[450px] xl:w-[650px]",
        z: "z-[10]",
        offsetY: "translate-y-[20px]",
        fadeInOrder: 3,
    },
];


const MainTecnologiaInstituto = () => {
    return (
        <div className="w-full bg-[#010d3d]">
            <section
                className="max-w-7xl mx-auto flex flex-col items-center text-center text-[#010D3D] overflow-hidden relative rounded-2xl"
                style={{ background: "linear-gradient(135deg, #7fd8f1 0%, #abe6e1 100%)" }}
            >
                {/* Contenido superior centrado */}
                <div className="flex flex-col items-center px-4 pt-16 pb-8 max-w-2xl mx-auto">
                    {/* Logo pingüino */}
                    <img
                        src="/iconopinguino@2x.png"
                        alt="Logo NormaPro"
                        className="w-20 h-20 rounded-2xl mb-6"
                    />

                    {/* Título */}
                    <h1 className="text-4xl md:text-5xl font-black text-[#010D3D]">
                        Tecnología NormaPro
                    </h1>

                    {/* Subtítulo */}
                    <p className="text-base md:text-lg mt-4 text-[#010D3D]">
                        Navegamos contigo hacia una evolución tecnológica accesible, segura y sin barreras.
                    </p>

                    {/* CTA */}
                    <a
                        href="https://store.normapro.es/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 bg-gradient-to-r from-[#00b2e3] to-[#cca1dd] text-white text-base px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-md"
                    >
                        Conoce más
                    </a>
                </div>

                {/* Composición de imágenes */}
                <div className="bottom-20 flex justify-center items-end gap-8 z-20">
                    {heroImages.map((img, i) => (
                        <img
                            key={img.src}
                            src={`/main/${img.src}`}
                            alt={`Hero ${i + 1}`}
                            className={`${img.size} ${img.z} ${img.offsetY} fade-in-up mx-[-280]`}
                            style={{
                                animationDelay: `${img.fadeInOrder * 0.2}s`,
                            }}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MainTecnologiaInstituto;