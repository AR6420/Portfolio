'use client';
import { CERTIFICATIONS } from '@/lib/constants';
import FadeInView from '@/components/effects/FadeInView';
import PrismCard from '@/components/ui/PrismCard';
import { ExternalLink, Award } from 'lucide-react';

export default function Credentials() {
  return (
    <section className="min-h-screen flex items-center section-padding">
      <div className="section-container">
        <FadeInView>
          <h2 className="font-display text-fluid-heading font-bold text-center mb-16">
            Credentials
          </h2>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {CERTIFICATIONS.map((cert, i) => (
            <FadeInView key={cert.title} delay={i * 0.15}>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full group"
                data-cursor-hover
              >
                <PrismCard
                  className="h-full"
                  alwaysGlow={cert.featured}
                >
                  <div className="flex flex-col items-center text-center h-full">
                    <Award
                      className="mb-4 text-prism-cyan"
                      size={32}
                    />
                    <h3 className="font-display text-sm font-semibold mb-2 leading-tight">
                      {cert.title}
                    </h3>
                    {cert.badge && (
                      <div className="mb-2">
                        <span className="inline-block px-3 py-1 text-xs font-mono bg-prism-gradient text-white rounded-full">
                          {cert.badge}
                        </span>
                        {cert.badgeDetail && (
                          <p className="text-xs text-prism-cyan mt-1">
                            {cert.badgeDetail}
                          </p>
                        )}
                      </div>
                    )}
                    <p className="text-xs text-secondary mt-auto">{cert.issuer}</p>
                    <ExternalLink
                      size={14}
                      className="mt-3 text-white/20 group-hover:text-white/60 transition-colors"
                    />
                  </div>
                </PrismCard>
              </a>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
