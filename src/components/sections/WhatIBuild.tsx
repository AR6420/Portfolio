'use client';
import FadeInView from '@/components/effects/FadeInView';

export default function WhatIBuild() {
  return (
    <div className="section-container w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-20 items-start text-left">
        <FadeInView>
          <p className="font-display text-fluid-heading font-semibold leading-tight">
            I build{' '}
            <span className="text-prism">AI systems</span>{' '}
            that iterate, so{' '}
            <span className="text-prism">engineers</span>{' '}
            don&apos;t have to.
          </p>
        </FadeInView>

        <div className="space-y-6 lg:pt-2">
          <FadeInView delay={0.2}>
            <p className="text-fluid-body text-secondary">
              At Tessolve Semiconductors, I architected a multi-agent Generative AI platform
              used by hundreds of engineers to streamline semiconductor design workflows. The
              system integrates into existing EDA toolchains, enabling
              engineers to interact with AI-driven interfaces.
            </p>
          </FadeInView>

          <FadeInView delay={0.3}>
            <p className="text-fluid-body text-secondary">
              By augmenting the traditional design flow with AI, the platform converts manual,
              hours-long engineering tasks into instant AI-assisted interactions, enabling teams
              to focus on high-value design work.
            </p>
          </FadeInView>

          <FadeInView delay={0.4}>
            <p className="text-fluid-body text-secondary">
              My open-source work extends this philosophy - building frameworks that make
              AI agent orchestration accessible to every developer. The goal is always the
              same: measurable impact, not just technical novelty. First iterations always
              look foolish - <span className="text-prism">I converge anyway</span>.
            </p>
          </FadeInView>
        </div>
      </div>
    </div>
  );
}
