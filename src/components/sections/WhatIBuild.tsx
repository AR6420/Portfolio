'use client';
import FadeInView from '@/components/effects/FadeInView';

export default function WhatIBuild() {
  return (
    <div className="section-container max-w-3xl text-center">
      <FadeInView>
        <p className="font-display text-fluid-heading font-semibold leading-relaxed mb-8">
          I build{' '}
          <span className="text-prism">AI systems</span>{' '}
          that Accelerate{' '}
          <span className="text-prism">engineering workflows</span>
          .
        </p>
      </FadeInView>

      <FadeInView delay={0.2}>
        <p className="text-fluid-body text-secondary mb-6">
          At Tessolve Semiconductors, I architected a multi-agent Generative AI platform
          used by hundreds of engineers to streamline semiconductor design workflows. The
          system integrates into existing EDA toolchains, enabling
          engineers to interact with AI-driven interfaces.
        </p>
      </FadeInView>

      <FadeInView delay={0.3}>
        <p className="text-fluid-body text-secondary mb-6">
          By augmenting the traditional design flow with AI, the platform converts manual,
          hours-long engineering tasks into instant AI-assisted interactions, enabling teams
          to focus on high-value design work.
        </p>
      </FadeInView>

      <FadeInView delay={0.4}>
        <p className="text-fluid-body text-secondary">
          My open-source work extends this philosophy - building frameworks that make
          AI agent orchestration accessible to every developer. The goal is always the
          same: measurable impact, not just technical novelty.
        </p>
      </FadeInView>
    </div>
  );
}
