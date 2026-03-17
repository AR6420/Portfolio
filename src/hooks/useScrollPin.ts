'use client';
import { useEffect, type RefObject } from 'react';

interface UseScrollPinOptions {
  ref: RefObject<HTMLDivElement | null>;
  enabled: boolean;
  end: string;
  scrub?: number;
  onSetup: (params: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gsap: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    timeline: any;
    section: HTMLDivElement;
  }) => void;
}

export function useScrollPin({ ref, enabled, end, scrub = 0.5, onSetup }: UseScrollPinOptions) {
  useEffect(() => {
    if (!enabled || !ref.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const section = ref.current;
      if (!section) return;

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end,
            pin: true,
            scrub,
          },
        });

        onSetup({ gsap, timeline: tl, section });
      }, section);

      ScrollTrigger.refresh();
    };

    init();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [enabled, ref, end, scrub, onSetup]);
}
