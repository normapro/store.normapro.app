"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

type PartnerTestimonial = {
    quote: string;
    name: string;
    details: string[];
};

type Props = {
    title: string;
    testimonials: PartnerTestimonial[];
};

const PartnersTestimonialsSection = ({ title, testimonials }: Props) => {
    return (
        <section className="w-full py-16 md:py-20">
            <div className="mx-auto w-full bg-[#F2F2F5] px-6 py-14 md:px-12 md:py-20">
                <div className="mx-auto max-w-5xl text-center">
                    <h2 className="text-2xl font-black text-[#010d3d] md:text-5xl">{title}</h2>
                </div>

                <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
                    {testimonials.map((testimonial) => (
                        <article key={`${testimonial.name}-${testimonial.quote.slice(0, 24)}`}>
                            <div className="relative rounded-3xl bg-white px-8 py-12 shadow-[0_10px_30px_rgba(1,13,61,0.08)] md:px-10 md:py-14">
                                <div className="absolute left-5 top-4 leading-none  " aria-hidden="true" >
                                    <FontAwesomeIcon icon={faQuoteLeft} size="3x" color="#E7E7F0" />
                                </div>
                                <p className="mx-auto max-w-md text-center text-[16px] font-bold italic leading-[1.45] text-[#010d3d] md:text-[18px] px-10">
                                    {testimonial.quote}
                                </p>
                                <div className="absolute bottom-3 right-6 leading-none text-[#C8CBD8]" aria-hidden="true">
                                    <FontAwesomeIcon icon={faQuoteRight} size="3x" color="#E7E7F0" />
                                </div>
                            </div>

                            <div className="mt-8 text-center text-[#010d3d]">
                                <p className="text-[16px] md:text-[20px]">{testimonial.name}</p>
                                {testimonial.details.map((detail, index) => (
                                    <p key={index} className="text-[16px] font-bold leading-tight md:text-[18px]">
                                        {detail}
                                    </p>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersTestimonialsSection;
