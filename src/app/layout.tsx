import type { ReactNode } from 'react';
import '@/styles/globals.css';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';

import Providers from '@/components/Providers';
import Navbar from '@/components/Layout/Navbar';
import { Toaster } from '@/components/UI/Toast';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={cn('bg-white text-slate-900 antialiased', inter.className)}>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 antialiased">
        <Providers>
          {children}
          <Toaster position="bottom-center" />
          {/* @ts-expect-error Server Component */}
          <Navbar />
        </Providers>

        <div className="h-40 md:hidden" />
      </body>
    </html>
  );
}
