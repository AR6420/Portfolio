'use client';
import { useState } from 'react';
import FadeInView from '@/components/effects/FadeInView';
import SectionHeading from '@/components/ui/SectionHeading';
import { useGame } from '@/lib/game';

const CORRECT_ORDER = ['Ingest', 'Generate', 'Evaluate'];
const DISPLAY_ORDER = ['Generate', 'Evaluate', 'Ingest'];

function PipelineTask() {
  const { isDone, complete } = useGame();
  const done = isDone('pipeline');
  const [progress, setProgress] = useState<string[]>([]);
  const [shaking, setShaking] = useState(false);

  const click = (stage: string) => {
    if (done) return;
    if (stage === CORRECT_ORDER[progress.length]) {
      const next = [...progress, stage];
      setProgress(next);
      if (next.length === CORRECT_ORDER.length) complete('pipeline');
    } else {
      setShaking(true);
      setProgress([]);
      setTimeout(() => setShaking(false), 450);
    }
  };

  return (
    <div
      className={`mt-12 bg-wash rounded-2xl p-6 md:p-8 ${
        shaking ? 'animate-shake' : ''
      }`}
    >
      <p className="font-mono text-xs text-volt mb-1">
        iteration 1 · assemble the pipeline
      </p>
      <p className="text-sm text-muted mb-5">
        {done
          ? 'Pipeline assembled. The next iteration is unlocked.'
          : 'Every system I ship starts the same way. Click the stages in the order the data flows — get it wrong and the run resets.'}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        {DISPLAY_ORDER.map((stage) => {
          const idx = progress.indexOf(stage);
          const placed = done || idx !== -1;
          return (
            <button
              key={stage}
              onClick={() => click(stage)}
              disabled={done}
              className={`btn !py-2.5 !px-5 !text-sm ${
                placed
                  ? '!border-signal !text-signal cursor-default'
                  : ''
              }`}
            >
              {placed && <span aria-hidden>✓</span>}
              {stage}
            </button>
          );
        })}
        <span className="font-mono text-xs text-muted ml-1">
          {done
            ? '✓ ingest → generate → evaluate'
            : `${progress.length}/3 placed`}
        </span>
      </div>
    </div>
  );
}

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

        <FadeInView delay={0.2}>
          <PipelineTask />
        </FadeInView>
      </div>
    </section>
  );
}
