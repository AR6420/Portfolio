'use client';
import { PERSONAL } from '@/lib/constants';
import FadeInView from '@/components/effects/FadeInView';
import { Github, Linkedin, Mail, Download } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="section-pad border-t border-hairline">
      <div className="shell">
        <FadeInView>
          <p className="kicker mb-7">One more iteration?</p>
        </FadeInView>

        <FadeInView delay={0.1}>
          <h2 className="font-display font-bold text-display-lg mb-6 max-w-3xl">
            Let&apos;s converge on something good.
          </h2>
        </FadeInView>

        <FadeInView delay={0.2}>
          <a
            href={`mailto:${PERSONAL.email}`}
            className="link-volt inline-block font-display font-semibold text-xl md:text-2xl mb-14"
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
              className="btn"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href={`mailto:${PERSONAL.email}`} className="btn">
              <Mail size={16} /> Email
            </a>
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${PERSONAL.resumePath}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              <Download size={16} /> Resume
            </a>
          </div>
        </FadeInView>

        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted border-t border-hairline pt-8">
          <p>© 2026 {PERSONAL.name}</p>
          <p className="font-mono text-xs">
            built with Next.js · shipped at iter{' '}
            <span className="text-signal">10/20</span> · budget intact
          </p>
        </div>
      </div>
    </footer>
  );
}
