'use client';
import FadeInView from '@/components/effects/FadeInView';

export default function Manifesto() {
  return (
    <section className="section-pad">
      <div className="shell">
        <FadeInView>
          <div className="bg-wash rounded-3xl px-8 py-14 md:px-16 md:py-20">
            <p className="font-mono text-xs text-volt mb-8">
              iter 1 · coverage 38% · keep going
            </p>

            <p className="font-display font-bold text-display-lg mb-8 max-w-3xl">
              Iteration one is always embarrassing.
              <br />
              <span className="text-volt">That&apos;s the point.</span>
            </p>

            <p className="text-body-lg text-muted max-w-2xl">
              The real winners aren&apos;t the ones trying to conquer
              everything in their path — they&apos;re the ones unafraid to look
              foolish in public. Every system I ship starts as a rough first
              pass that loops, measures itself honestly, and comes back better.
              I work the same way: build in the open, publish the failure modes
              with the wins, and let the iterations do the talking.
            </p>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
