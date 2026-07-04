'use client';
import { useState, useEffect } from 'react';
import { STATS } from '@/lib/constants';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import FadeInView from '@/components/effects/FadeInView';

export default function ImpactStats() {
  const [npmDownloads, setNpmDownloads] = useState(1000);

  useEffect(() => {
    fetch('https://api.npmjs.org/downloads/point/2024-01-01:2026-12-31/hail-hydra-cc')
      .then((res) => res.json())
      .then((data) => {
        if (data.downloads) setNpmDownloads(data.downloads);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="w-full mt-16">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {STATS.map((stat, i) => (
            <FadeInView key={stat.label} delay={i * 0.1}>
              <div className="text-left">
                <div className="h-[3px] w-full bg-prism-gradient-horizontal opacity-70 mb-6" />
                <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                  <AnimatedCounter
                    value={i === 2 ? npmDownloads : stat.value}
                    suffix={stat.suffix}
                    delay={i * 200}
                  />
                </div>
                <p className="font-mono text-xs md:text-sm text-secondary tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </div>
  );
}
