import type { Metadata } from 'next';
import { spaceGrotesk, outfit, jetbrainsMono } from '@/styles/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Adarsh Balanolla - GenAI Engineer',
  description:
    'GenAI Engineer building AI Agents and Intelligent Systems that Accelerate Engineering Cycles. Specializing in multi-agent systems, RAG, and intelligent automation.',
  keywords: [
    'GenAI Engineer',
    'AI Agents',
    'Machine Learning',
    'Software Developer',
    'Adarsh Balanolla',
  ],
  authors: [{ name: 'Adarsh Balanolla' }],
  openGraph: {
    title: 'Adarsh Balanolla - GenAI Engineer',
    description:
      'Building AI Agents and Intelligent Systems that Accelerate Engineering Cycles.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${outfit.variable} ${jetbrainsMono.variable} font-body antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
