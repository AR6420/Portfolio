'use client';
import { useRef, useState } from 'react';
import FadeInView from '@/components/effects/FadeInView';
import { useGame } from '@/lib/game';

const HOLD_MS = 1200;

function ShipTask() {
  const { isDone, complete } = useGame();
  const done = isDone('ship');
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(0);
  const startRef = useRef(0);

  const cancel = () => {
    cancelAnimationFrame(rafRef.current);
    startRef.current = 0;
    if (!done) setProgress(0);
  };

  const holdStart = () => {
    if (done) return;
    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const p = Math.min((now - startRef.current) / HOLD_MS, 1);
      setProgress(p);
      if (p >= 1) {
        complete('ship');
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (done) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setProgress(1);
      complete('ship');
    }
  };

  return (
    <div className="mt-12">
      <p className="font-mono text-xs text-volt mb-4">
        iteration 3 · iteration one is scary — ship it anyway
      </p>
      <button
        onPointerDown={holdStart}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        onKeyDown={onKey}
        disabled={done}
        className={`relative overflow-hidden btn ${
          done ? '!border-signal !text-signal cursor-default' : '!border-ink'
        }`}
      >
        <span
          className="absolute inset-0 bg-signal/15 origin-left transition-none"
          style={{ transform: `scaleX(${done ? 1 : progress})` }}
          aria-hidden
        />
        <span className="relative">
          {done ? '✓ shipped — that took nerve' : 'hold to ship v1'}
        </span>
      </button>
      {!done && (
        <p className="font-mono text-[0.68rem] text-muted mt-3">
          press and hold — commitment isn&apos;t a single click
        </p>
      )}
    </div>
  );
}

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

            <ShipTask />
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
