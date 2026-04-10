'use client';

import { FC } from 'react';

type HighlightItem = {
  title: string;
  content: string;
};

type HighlightData = {
  title?: string;
  items?: HighlightItem[];
  footerTop?: string;
  footerBottom?: string;
};

type Props = {
  data?: HighlightData;
};

const hasText = (value?: string) => Boolean(value && value.trim().length > 0);

const EtapasMiddleHighlight: FC<Props> = ({ data }) => {
  if (!data) return null;

  const hasItems = Boolean(
    data.items?.some((item) => hasText(item.title) || hasText(item.content))
  );
  const hasBody = hasText(data.title) || hasItems;
  const hasFooter = hasText(data.footerTop) || hasText(data.footerBottom);

  if (!hasBody && !hasFooter) return null;

  return (
    <div className="w-full mb-12">
      {hasBody && (
        <div className="w-full px-2 md:px-0">
          <div className="max-w-4xl mx-auto bg-[#efeff2] rounded-[14px] px-5 md:px-10 py-10 md:py-12 flex flex-col gap-8">
            <div className="flex items-start justify-center">
              {hasText(data.title) && (
                <h4 className="text-[#010d3d] text-xl md:text-[23px] leading-tight font-black text-center">
                  {data.title}
                </h4>
              )}
            </div>

            <div className="space-y-8 text-[#010d3d] max-w-3xl mx-auto w-full">
              {data.items?.map((item, index) => {
                if (!hasText(item.title) && !hasText(item.content)) return null;

                return (
                  <div key={`${item.title}-${index}`}>
                    {hasText(item.title) && (
                      <p className="text-[20px] leading-tight font-bold mb-1 text-left">
                        {index + 1}. {item.title}
                      </p>
                    )}
                    {hasText(item.content) && (
                      <p className="text-[18px] leading-relaxed whitespace-pre-line text-left">{item.content}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {hasFooter && (
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]  py-10 px-6 md:px-12 text-center">
          <div className="max-w-4xl mx-auto text-[#010d3d]">
            {hasText(data.footerTop) && (
              <p className="text-[20px] md:text-[18px] leading-tight  mb-6 whitespace-pre-line">
                {data.footerTop}
              </p>
            )}
            {hasText(data.footerBottom) && (
              <p className="text-[20px] md:text-[18px] leading-tight whitespace-pre-line">
                {data.footerBottom}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EtapasMiddleHighlight;
