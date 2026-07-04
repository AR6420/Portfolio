'use client';
import { CERTIFICATIONS } from '@/lib/constants';
import FadeInView from '@/components/effects/FadeInView';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Qual() {
  const featured = CERTIFICATIONS.find((c) => c.featured);
  const rest = CERTIFICATIONS.filter((c) => !c.featured);

  return (
    <section id="qual" className="section-pad">
      <div className="shell">
        <SectionHeading
          step="04"
          label="Qual"
          title="Credentials."
          className="mb-16"
        />

        {featured && (
          <FadeInView>
            <a
              href={featured.link}
              target="_blank"
              rel="noopener noreferrer"
              className="reticle group block border border-copper/40 bg-surface/40 hover:bg-surface/80 transition-colors p-7 md:p-10 mb-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <p className="font-mono text-[0.7rem] tracking-wider2 uppercase text-copper mb-4">
                    Qual record · Featured
                  </p>
                  <h3 className="font-display font-bold text-display-md mb-3">
                    {featured.title}
                  </h3>
                  <p className="font-mono text-xs text-muted">
                    {featured.issuer}
                  </p>
                </div>
                {featured.badge && (
                  <div className="text-right">
                    <span className="inline-block font-mono text-[0.7rem] tracking-wider2 uppercase bg-copper text-substrate font-semibold px-3 py-1.5">
                      {featured.badge}
                    </span>
                    {featured.badgeDetail && (
                      <p className="font-mono text-xs text-copper mt-2">
                        {featured.badgeDetail}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <p className="font-mono text-[0.7rem] tracking-wider2 uppercase text-faint group-hover:text-copper transition-colors mt-8">
                Verify credential ↗
              </p>
            </a>
          </FadeInView>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((cert, i) => (
            <FadeInView key={cert.title} delay={0.1 + i * 0.1}>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="reticle group block h-full border border-line/70 bg-surface/40 hover:bg-surface/80 transition-colors p-7"
              >
                <p className="font-mono text-[0.7rem] tracking-wider2 uppercase text-muted mb-4">
                  Qual record
                </p>
                <h3 className="font-display font-semibold text-xl mb-3 leading-snug">
                  {cert.title}
                </h3>
                <p className="font-mono text-xs text-muted">{cert.issuer}</p>
                <p className="font-mono text-[0.7rem] tracking-wider2 uppercase text-faint group-hover:text-copper transition-colors mt-6">
                  Verify credential ↗
                </p>
              </a>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
