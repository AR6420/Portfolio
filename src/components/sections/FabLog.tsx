'use client';
import { PROJECTS } from '@/lib/constants';
import FadeInView from '@/components/effects/FadeInView';
import SectionHeading from '@/components/ui/SectionHeading';

const LINK_LABELS: Record<string, string> = {
  github: 'GitHub',
  npm: 'npm',
  kaggle: 'Kaggle',
};

export default function FabLog() {
  return (
    <section id="fab" className="section-pad">
      <div className="shell">
        <SectionHeading
          step="03"
          label="Fab"
          title="Featured work."
          className="mb-16"
        />

        <div className="space-y-6">
          {PROJECTS.map((project, i) => (
            <FadeInView key={project.title} delay={i * 0.1}>
              <article className="reticle group border border-line/70 bg-surface/40 hover:bg-surface/80 transition-colors p-7 md:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8">
                  <div>
                    <p className="font-mono text-[0.7rem] tracking-wider2 uppercase text-copper mb-4">
                      Lot {String(i + 1).padStart(3, '0')}
                    </p>
                    <h3 className="font-display font-bold text-display-md mb-2">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-muted mb-6">
                      {project.subtitle}
                    </p>
                    <p className="text-muted leading-relaxed max-w-xl">
                      {project.description}
                    </p>
                  </div>

                  <div className="lg:pt-10">
                    <ul className="space-y-3 mb-8">
                      {project.impact.map((item) => (
                        <li
                          key={item}
                          className="font-mono text-[0.78rem] text-ink/80 flex items-start gap-3"
                        >
                          <span className="text-oxide-teal shrink-0">
                            ✓ PASS
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[0.68rem] tracking-wide uppercase text-muted border border-line px-2.5 py-1"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {Object.entries(project.links).length > 0 && (
                      <div className="flex flex-wrap gap-6">
                        {Object.entries(project.links).map(([key, url]) => (
                          <a
                            key={key}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs tracking-wider2 uppercase text-copper hover:text-copper-bright transition-colors underline underline-offset-4 decoration-copper/40 hover:decoration-copper-bright"
                          >
                            {LINK_LABELS[key] ?? key} ↗
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
