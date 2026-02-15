import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CERBERUS | GLOBAL IMMUNE SYSTEM',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#050505] text-[#00FF41] font-mono selection:bg-[#00FF41] selection:text-black">
      <body>{children}</body>
    </html>
  );
}