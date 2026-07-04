'use client';
import FadeInView from '@/components/effects/FadeInView';
import SectionHeading from '@/components/ui/SectionHeading';

export default function WhatIBuild() {
  return (
    <section id="build" className="section-pad">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-20">
          <SectionHeading
            kicker="What I build"
            title="Systems that iterate, so engineers don't have to."
          />

          <div className="space-y-6 lg:pt-14">
            <FadeInView delay={0.15}>
              <p className="text-body-lg text-muted">
                At Tessolve Semiconductors, I architected a multi-agent
                Generative AI platform used by hundreds of engineers to
                streamline semiconductor design workflows. The system
                integrates into existing EDA toolchains, enabling engineers to
                interact with AI-driven interfaces.
              </p>
            </FadeInView>

            <FadeInView delay={0.25}>
              <p className="text-body-lg text-muted">
                By augmenting the traditional design flow with AI, the platform
                converts manual, hours-long engineering tasks into instant
                AI-assisted interactions, enabling teams to focus on high-value
                design work.
              </p>
            </FadeInView>

            <FadeInView delay={0.35}>
              <p className="text-body-lg text-muted">
                My open-source work extends this philosophy — building
                frameworks that make AI agent orchestration accessible to every
                developer. The goal is always the same:{' '}
                <span className="text-ink font-medium">
                  measurable impact, not just technical novelty.
                </span>
              </p>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}
