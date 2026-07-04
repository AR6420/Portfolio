'use client';
import { useState } from 'react';
import { CERTIFICATIONS } from '@/lib/constants';
import FadeInView from '@/components/effects/FadeInView';
import SectionHeading from '@/components/ui/SectionHeading';
import { useGame } from '@/lib/game';

function VerifyStamp({
  stamped,
  onStamp,
}: {
  stamped: boolean;
  onStamp: () => void;
}) {
  return (
    <button
      onClick={onStamp}
      disabled={stamped}
      className={`absolute top-5 right-5 z-10 font-mono text-[0.68rem] rounded-full px-3 py-1.5 border transition-colors ${
        stamped
          ? 'border-signal text-signal bg-signal/5 cursor-default animate-stamp'
          : 'border-hairline text-muted hover:border-volt hover:text-volt'
      }`}
    >
      {stamped ? '✓ verified' : 'verify'}
    </button>
  );
}

export default function CredentialsSection() {
  const { isDone, complete } = useGame();
  const done = isDone('verify');
  const [stamped, setStamped] = useState<Set<number>>(new Set());

  const featured = CERTIFICATIONS.find((c) => c.featured);
  const rest = CERTIFICATIONS.filter((c) => !c.featured);
  const ordered = featured ? [featured, ...rest] : rest;

  const stamp = (i: number) => {
    if (done || stamped.has(i)) return;
    const next = new Set(stamped);
    next.add(i);
    setStamped(next);
    if (next.size === ordered.length) complete('verify');
  };

  const isStamped = (i: number) => done || stamped.has(i);

  return (
    <section id="credentials" className="section-pad">
      <div className="shell">
        <SectionHeading
          kicker="Credentials"
          title="Verified, not self-declared."
          className="mb-6"
        />

        <FadeInView delay={0.1}>
          <p className="font-mono text-xs text-volt mb-14">
            iteration 5 · stamp the quals —{' '}
            {done
              ? '✓ all three verified'
              : `verify each credential (${stamped.size}/3)`}
          </p>
        </FadeInView>

        {featured && (
          <FadeInView>
            <div className="relative rounded-3xl border-2 border-ink p-8 md:p-12 mb-6 hover:border-volt transition-colors">
              <VerifyStamp stamped={isStamped(0)} onStamp={() => stamp(0)} />
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="max-w-2xl">
                  <p className="font-mono text-xs text-signal mb-5">featured</p>
                  <h3 className="font-display font-bold text-display-md mb-3">
                    {featured.title}
                  </h3>
                  <p className="text-sm text-muted">{featured.issuer}</p>
                </div>
                {featured.badge && (
                  <div className="text-left sm:text-right sm:pr-24">
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
              <a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                className="link-volt inline-block text-sm font-medium mt-8"
              >
                View credential ↗
              </a>
            </div>
          </FadeInView>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((cert, i) => (
            <FadeInView key={cert.title} delay={0.1 + i * 0.1}>
              <div className="relative h-full rounded-3xl border border-hairline p-8 hover:border-volt transition-colors">
                <VerifyStamp
                  stamped={isStamped(i + 1)}
                  onStamp={() => stamp(i + 1)}
                />
                <h3 className="font-display font-semibold text-xl mb-2 leading-snug pr-20">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted">{cert.issuer}</p>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-volt inline-block text-sm font-medium mt-6"
                >
                  View credential ↗
                </a>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
