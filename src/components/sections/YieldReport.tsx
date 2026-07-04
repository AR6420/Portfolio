'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { STATS } from '@/lib/constants';
import FadeInView from '@/components/effects/FadeInView';
import SectionHeading from '@/components/ui/SectionHeading';

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

export default function YieldReport() {
  const gridRef = useRef<HTMLDivElement>(null!);
  const inView = useInView(gridRef, { once: true, margin: '-80px' });
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

  return (
    <section id="yield" className="section-pad">
      <div className="shell">
        <SectionHeading
          step="02"
          label="Yield"
          title="Measured, not promised."
          className="mb-16"
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line"
        >
          {STATS.map((stat, i) => (
            <FadeInView key={stat.label} delay={i * 0.1} className="bg-substrate">
              <div className="py-10 px-6 border-t-2 border-copper/70">
                <div className="font-display font-bold text-display-md mb-3 text-ink">
                  <CountUp
                    value={i === 2 ? npmDownloads : stat.value}
                    suffix={stat.suffix}
                    start={inView}
                  />
                </div>
                <p className="font-mono text-[0.7rem] tracking-wider2 uppercase text-muted">
                  {stat.label}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
