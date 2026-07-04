import type { Metadata } from 'next';
import { bricolage, instrumentSans, plexMono } from '@/styles/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Adarsh Balanolla — GenAI Engineer',
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
    title: 'Adarsh Balanolla — GenAI Engineer',
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
    <html lang="en">
      <body
        className={`${bricolage.variable} ${instrumentSans.variable} ${plexMono.variable} font-body antialiased bg-paper text-ink`}
      >
        {children}
      </body>
    </html>
  );
}
