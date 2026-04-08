type PartnerProgram = {
    title: string;
    description: string;
};

type Props = {
    title: string;
    description: string;
    programs: PartnerProgram[];
};

const PartnersProgramsSection = ({ title, description, programs }: Props) => {
    return (
        <section className="w-full py-16 md:py-20">
            <div className="mx-auto w-full rounded-[32px] bg-[#E7E7F0] px-6 py-14 md:px-12 md:py-20">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-2xl font-black text-[#010d3d] md:text-5xl">{title}</h2>
                    <p className="mx-auto mt-10  max-w-2xl text-lg leading-relaxed text-[#010d3d] md:text-[27px] md:leading-[1.25]">{description}</p>
                </div>

                <div className="mt-20 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-8 justify-items-center mb-25">
                    {programs.map((program) => (
                        <article key={program.title} className="rounded-3xl bg-white px-7 py-8 shadow-[0_8px_24px_rgba(1,13,61,0.08)] max-w-md w-full">
                            <h3 className="text-[20px] font-black leading-tight text-[#010d3d] md:text-[16px]">{program.title}</h3>
                            <p className="mt-4 text-[18px] leading-[1.35] text-[#010d3d] md:text-[20px]">{program.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersProgramsSection;
