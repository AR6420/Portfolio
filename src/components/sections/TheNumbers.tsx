'use client';
import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { STATS } from '@/lib/constants';
import FadeInView from '@/components/effects/FadeInView';
import SectionHeading from '@/components/ui/SectionHeading';
import { useGame } from '@/lib/game';

function CountUp({
  value,
  suffix,
  start,
}: {
  value: number;
  suffix: string;
  start: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const decimals = value % 1 !== 0 ? 2 : 0;

  useEffect(() => {
    if (!start) return;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    let rafId = 0;
    let t0 = 0;
    const duration = 1400;
    const tick = (now: number) => {
      if (!t0) t0 = now;
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [start, value, reduceMotion]);

  return (
    <span>
      {display.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default function TheNumbers() {
  const { isDone, complete } = useGame();
  const done = isDone('stats');
  const [ran, setRan] = useState<Set<number>>(new Set());
  const [npmDownloads, setNpmDownloads] = useState(1000);

  useEffect(() => {
    fetch(
      'https://api.npmjs.org/downloads/point/2024-01-01:2026-12-31/hail-hydra-cc'
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.downloads) setNpmDownloads(data.downloads);
      })
      .catch(() => {});
  }, []);

  const run = (i: number) => {
    if (done || ran.has(i)) return;
    const next = new Set(ran);
    next.add(i);
    setRan(next);
    if (next.size === STATS.length) complete('stats');
  };

  return (
    <section id="numbers" className="section-pad">
      <div className="shell">
        <SectionHeading
          kicker="Measured, not promised"
          title="What the loops delivered."
          className="mb-6"
        />

        <FadeInView delay={0.1}>
          <p className="font-mono text-xs text-volt mb-14">
            iteration 2 · run the benchmarks —{' '}
            {done
              ? '✓ all four passed'
              : `click each benchmark to run it (${ran.size}/4)`}
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {STATS.map((stat, i) => {
            const isRun = done || ran.has(i);
            return (
              <FadeInView key={stat.label} delay={i * 0.1}>
                <button
                  onClick={() => run(i)}
                  disabled={isRun}
                  className={`w-full text-left border-t-[3px] pt-6 transition-colors ${
                    isRun
                      ? 'border-signal cursor-default'
                      : 'border-ink hover:border-volt cursor-pointer'
                  }`}
                >
                  <div className="font-display font-bold text-display-md mb-2">
                    {isRun ? (
                      <CountUp
                        value={i === 2 ? npmDownloads : stat.value}
                        suffix={stat.suffix}
                        start
                      />
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </div>
                  <p className="text-sm text-muted">{stat.label}</p>
                  <p
                    className={`font-mono text-[0.68rem] mt-2 ${
                      isRun ? 'text-signal' : 'text-volt'
                    }`}
                  >
                    {isRun ? '✓ pass' : '▸ run benchmark'}
                  </p>
                </button>
              </FadeInView>
            );
          })}
        </div>
      </div>
    </section>
  );
}
