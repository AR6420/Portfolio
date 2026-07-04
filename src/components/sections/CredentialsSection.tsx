'use client';
import { CERTIFICATIONS } from '@/lib/constants';
import FadeInView from '@/components/effects/FadeInView';
import SectionHeading from '@/components/ui/SectionHeading';

export default function CredentialsSection() {
  const featured = CERTIFICATIONS.find((c) => c.featured);
  const rest = CERTIFICATIONS.filter((c) => !c.featured);

  return (
    <section id="credentials" className="section-pad">
      <div className="shell">
        <SectionHeading
          kicker="Credentials"
          title="Verified, not self-declared."
          className="mb-14"
        />

        {featured && (
          <FadeInView>
            <a
              href={featured.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-3xl border-2 border-ink p-8 md:p-12 mb-6 hover:border-volt transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <p className="font-mono text-xs text-signal mb-5">
                    ✓ verified · featured
                  </p>
                  <h3 className="font-display font-bold text-display-md mb-3 group-hover:text-volt transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-muted">{featured.issuer}</p>
                </div>
                {featured.badge && (
                  <div className="text-left sm:text-right">
                    <span className="inline-block text-sm font-semibold bg-volt text-white rounded-full px-4 py-1.5">
                      {featured.badge}
                    </span>
                    {featured.badgeDetail && (
                      <p className="text-sm font-medium text-volt mt-2">
                        {featured.badgeDetail}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <p className="link-volt inline-block text-sm font-medium mt-8">
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
                className="group block h-full rounded-3xl border border-hairline p-8 hover:border-volt transition-colors"
              >
                <p className="font-mono text-xs text-signal mb-4">✓ verified</p>
                <h3 className="font-display font-semibold text-xl mb-2 leading-snug group-hover:text-volt transition-colors">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted">{cert.issuer}</p>
                <p className="link-volt inline-block text-sm font-medium mt-6">
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
