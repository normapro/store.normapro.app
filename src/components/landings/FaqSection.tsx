'use client';

import React, { FC, useState } from 'react';
import Formulario from "@/components/Formulario";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

type Questions = {
  question: string;
  answer: string[];
  link?: string[];
}
type FaqProps = {
  faqs: Questions[];
}

const FaqSection: FC<FaqProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number|null>(null);
  const [openModal, setOpenModal] = useState(false);
  const weights = ["semibold","bold"];
  
  return (
    <section className="w-full py-24 bg-[#F8F9FB]">
      <div className="mx-auto px-20">
        <h2 className="text-2xl md:text-3xl font-black text-[#010d3d] mb-12">
          No te quedes con dudas
        </h2>
        
        <div className="space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div key={index} className="border-b border-gray-200">
                <button
                  className="w-full py-6 flex justify-between items-center text-left font-extrabold focus:outline-none group"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-[#010d3d]">
                    {faq.question}
                  </span>
                  <FontAwesomeIcon icon={faChevronDown} className={`text-[#010d3d] ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                  <p className="text-[#010d3d] leading-relaxed whitespace-pre-line">
                    {faq.answer.map((text, i) => (
                      <span key={i} style={{ fontWeight: weights[i % weights.length] }}>
                        {text + " "}
                      </span>
                    ))}
                  </p>

                  {faq.link && (
                    <div className="mt-4">
                      {faq.link.map((text, i) => {
                        const isLink = i % 2 !== 0;
                        const Tag = isLink ? 'a' : 'span';
                        return (
                          <Tag
                            key={i}
                            onClick={
                              isLink
                                ? (e) => {
                                  e.preventDefault();
                                  setOpenModal(true);
                                }
                                : undefined
                            }
                            style={{
                              fontWeight: weights[i % weights.length],
                              textDecoration: isLink ? 'underline' : 'none'
                            }}
                          >
                            {text + " "}
                          </Tag>
                        );
                      })}
                    </div>
                  )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Formulario contacto */}
      {openModal && (
        <Formulario onClose={() => setOpenModal(false)} />
      )}
    </section>
  );
};

export default FaqSection;