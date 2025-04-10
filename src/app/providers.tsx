// app/providers.tsx
'use client';

import { useEffect, useState } from 'react';
import { DefaultSeo } from 'next-seo';
import SEO from '@/libs/seo.config';

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && <DefaultSeo {...SEO} />}
      {children}
    </>
  );
}
