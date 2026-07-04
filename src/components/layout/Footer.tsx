'use client';
import { PERSONAL } from '@/lib/constants';
import FadeInView from '@/components/effects/FadeInView';
import { Github, Linkedin, Mail, Download } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="tapeout" className="section-pad border-t border-line/60">
      <div className="shell">
        <FadeInView>
          <p className="eyebrow mb-8">Proc 06 · Tapeout</p>
        </FadeInView>

        <FadeInView delay={0.1}>
          <h2 className="font-display font-bold text-display-lg mb-6 max-w-3xl">
            Let&apos;s tape out something together.
          </h2>
        </FadeInView>

        <FadeInView delay={0.2}>
          <a
            href={`mailto:${PERSONAL.email}`}
            className="inline-block font-mono text-sm md:text-base text-copper hover:text-copper-bright transition-colors underline underline-offset-8 decoration-copper/40 mb-14"
          >
            {PERSONAL.email}
          </a>
        </FadeInView>

        <FadeInView delay={0.3}>
          <div className="flex flex-wrap gap-4 mb-20">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fab"
            >
              <Github size={15} /> GitHub
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fab"
            >
              <Linkedin size={15} /> LinkedIn
            </a>
            <a href={`mailto:${PERSONAL.email}`} className="btn-fab">
              <Mail size={15} /> Email
            </a>
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${PERSONAL.resumePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-fab btn-fab--primary"
            >
              <Download size={15} /> Resume
            </a>
          </div>
        </FadeInView>

        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[0.68rem] tracking-wider2 uppercase text-faint border-t border-line/60 pt-8">
          <p>© 2026 {PERSONAL.name}</p>
          <p>
            Fabbed with Next.js · Defects on the map ·{' '}
            <span className="text-copper">Shipped anyway</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
