'use client';
import { useEffect, useRef } from 'react';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let snapTimer: ReturnType<typeof setTimeout>;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let currentSectionIndex = 0;

    const init = async () => {
      const Lenis = (await import('lenis')).default;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const gsapModule = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsapModule.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      // Connect Lenis to ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      gsapModule.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });
      gsapModule.ticker.lagSmoothing(0);

      // Desktop: auto-snap to nearest section when scrolling stops
      if (window.innerWidth >= 768) {
        const sections = Array.from(
          document.querySelectorAll('main > *')
        ) as HTMLElement[];

        lenis.on('scroll', () => {
          clearTimeout(snapTimer);
          snapTimer = setTimeout(() => {
            const scrollY = window.scrollY;
            let nearestIndex = 0;
            let minDist = Infinity;

            sections.forEach((s, i) => {
              const dist = Math.abs(s.offsetTop - scrollY);
              if (dist < minDist) {
                minDist = dist;
                nearestIndex = i;
              }
            });

            if (minDist > 10) {
              currentSectionIndex = nearestIndex;
              lenis.scrollTo(sections[nearestIndex], { duration: 0.8 });
            } else {
              currentSectionIndex = nearestIndex;
            }
          }, 200);
        });
      }
    };

    init();

    return () => {
      clearTimeout(snapTimer);
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}
