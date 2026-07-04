'use client';
import { PROJECTS } from '@/lib/constants';
import FadeInView from '@/components/effects/FadeInView';
import SectionHeading from '@/components/ui/SectionHeading';

const LINK_LABELS: Record<string, string> = {
  github: 'GitHub',
  npm: 'npm',
  kaggle: 'Kaggle',
};

export default function SelectedWork() {
  return (
    <section id="work" className="section-pad">
      <div className="shell">
        <SectionHeading
          kicker="Selected work"
          title="Shipped, measured, still looping."
          className="mb-16"
        />

        <div>
          {PROJECTS.map((project, i) => (
            <FadeInView key={project.title} delay={i * 0.08}>
              <article
                className={`group grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 py-14 ${
                  i > 0 ? 'border-t border-hairline' : ''
                }`}
              >
                <div>
                  <h3 className="font-display font-bold text-display-md mb-3">
                    <span className="sweep">{project.title}</span>
                  </h3>
                  <p className="text-sm font-medium text-volt mb-6">
                    {project.subtitle}
                  </p>
                  <p className="text-muted leading-relaxed max-w-xl">
                    {project.description}
                  </p>
                </div>

                <div className="lg:pt-2 lg:pl-10">
                  <ul className="space-y-3 mb-8">
                    {project.impact.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="text-signal font-bold mt-0.5 shrink-0">
                          ✓
                        </span>
                        <span className="text-[0.95rem] text-ink/85">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map((t) => (
                      <span key={t} className="chip">
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
                          className="link-volt text-sm font-medium"
                        >
                          {LINK_LABELS[key] ?? key} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
