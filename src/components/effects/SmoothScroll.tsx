'use client';
import { useEffect } from 'react';
import { setLenis } from '@/lib/lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let rafId = 0;
    let destroyed = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let lenis: any = null;

    const init = async () => {
      const Lenis = (await import('lenis')).default;
      if (destroyed) return;

      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      setLenis(lenis);

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    init();

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        setLenis(null);
      }
    };
  }, []);

  return <>{children}</>;
}
