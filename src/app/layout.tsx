import type { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import { plusJakarta } from '@/fonts/plusJakarta';
import type { PropsWithChildren } from 'react';

import '@/styles/global.scss';

export const metadata: Metadata = {
  title: "USENSE | Gif search engine",
};

const RootLayout = ({ children, }: Readonly<PropsWithChildren>) => {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}

export default RootLayout;