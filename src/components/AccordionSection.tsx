'use client';

import { ReactNode, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export type AccordionItem = {
  title: string;
  content: ReactNode | string;
};

type Props = {
  title: string;
  items: AccordionItem[];
  interpretHtmlStrings?: boolean;
  defaultOpenIndex?: number | null;
};

const AccordionSection = ({
  title,
  items,
  interpretHtmlStrings = false,
  defaultOpenIndex = 0,
}: Props) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <section className="w-full bg-[#f1f1f7  ] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="text-2xl font-black text-[#797F98] md:text-[30px]">{title}</h2>

        <div className="mt-10 border-t border-[#797F98]">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <article key={`${item.title}-${index}`} className="border-b border-[#AAB3C8]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-xl font-black text-[#010d3d] md:text-[30px]">{item.title}</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-lg text-[#010d3d] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-8' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden text-[#010d3d]">
                    {interpretHtmlStrings && typeof item.content === 'string' ? (
                      <div
                        className="prose prose-lg max-w-none text-[#010d3d]"
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    ) : (
                      <div className="text-lg leading-relaxed md:text-[16px] md:leading-[1.4]">{item.content}</div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AccordionSection;
