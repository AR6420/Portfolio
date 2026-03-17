'use client';
import { PERSONAL } from '@/lib/constants';
import PrismButton from '@/components/ui/PrismButton';
import FadeInView from '@/components/effects/FadeInView';
import { Github, Linkedin, Mail, Download } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="min-h-screen flex items-center section-padding">
      <div className="section-container text-center">
        {/* Prismatic divider */}
        <div className="w-full h-[1px] bg-prism-gradient-horizontal opacity-30 mb-16" />

        <FadeInView>
          <h2 className="font-display text-fluid-heading font-bold mb-8">
            Let&apos;s Build Something
          </h2>
        </FadeInView>

        <FadeInView delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <PrismButton href={PERSONAL.github} variant="secondary" external>
              <Github size={18} /> GitHub
            </PrismButton>
            <PrismButton href={PERSONAL.linkedin} variant="secondary" external>
              <Linkedin size={18} /> LinkedIn
            </PrismButton>
            <PrismButton
              href={`mailto:${PERSONAL.email}`}
              variant="secondary"
            >
              <Mail size={18} /> Email
            </PrismButton>
            <PrismButton href={PERSONAL.resumePath} variant="primary">
              <Download size={18} /> Resume
            </PrismButton>
          </div>
        </FadeInView>

        <div className="text-xs text-tertiary space-y-1">
          <p>&copy; 2025 {PERSONAL.name}</p>
          <p>Built with Next.js &amp; Three.js</p>
        </div>
      </div>
    </footer>
  );
}
