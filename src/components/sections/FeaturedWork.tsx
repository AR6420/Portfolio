'use client';
import { PROJECTS } from '@/lib/constants';
import FadeInView from '@/components/effects/FadeInView';
import PrismCard from '@/components/ui/PrismCard';
import PrismButton from '@/components/ui/PrismButton';
import TechTag from '@/components/ui/TechTag';
import { ExternalLink } from 'lucide-react';

export default function FeaturedWork() {
  return (
    <section className="min-h-screen flex items-center section-padding">
      <div className="section-container">
        <FadeInView>
          <h2 className="font-display text-fluid-heading font-bold text-center mb-16">
            Featured Work
          </h2>
        </FadeInView>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <FadeInView key={project.title} delay={i * 0.15}>
              <div className="group h-full">
                <PrismCard className="h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <span className="text-3xl mb-3 block">{project.icon}</span>
                      <h3 className="font-display text-xl font-semibold mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-secondary">{project.subtitle}</p>
                    </div>

                    <p className="text-sm text-secondary/80 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {project.impact.map((item) => (
                        <li
                          key={item}
                          className="text-sm text-white/70 flex items-start gap-2"
                        >
                          <span className="text-prism-cyan mt-1 text-xs">▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t) => (
                        <TechTag key={t} label={t} />
                      ))}
                    </div>

                    <div className="flex gap-3 mt-auto">
                      {project.links.github && (
                        <PrismButton
                          href={project.links.github}
                          variant="secondary"
                          external
                        >
                          GitHub <ExternalLink size={14} />
                        </PrismButton>
                      )}
                      {project.links.npm && (
                        <PrismButton
                          href={project.links.npm}
                          variant="secondary"
                          external
                        >
                          npm <ExternalLink size={14} />
                        </PrismButton>
                      )}
                      {project.links.kaggle && (
                        <PrismButton
                          href={project.links.kaggle}
                          variant="secondary"
                          external
                        >
                          Kaggle <ExternalLink size={14} />
                        </PrismButton>
                      )}
                    </div>
                  </div>
                </PrismCard>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
