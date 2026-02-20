'use client';

import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

type Questions = {
  question: string;
  answer: string;
    
}
type FaqProps = {
  faqs: Questions[];
}

const FaqSection: FC<FaqProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number|null>(null);
  
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
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="text-[#010d3d] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

  );
};

export default FaqSection;