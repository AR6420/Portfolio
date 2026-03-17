'use client';
import { useEffect, useRef } from 'react';

interface ScrollImplosionProps {
  children: React.ReactNode;
  ready?: boolean;
}

export default function ScrollImplosion({ children, ready = true }: ScrollImplosionProps) {
  const sectionRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (!ready) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ctx: any;

    const initGSAP = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Ensure we start at top
      window.scrollTo(0, 0);

      // Small delay to let layout settle after loading screen exit
      await new Promise((r) => setTimeout(r, 100));
      ScrollTrigger.refresh();

      const isMobile = window.innerWidth < 768;

      ctx = gsap.context(() => {
        const chars = sectionRef.current.querySelectorAll('.hero-char');
        const subtitle = sectionRef.current.querySelector('.hero-subtitle');
        const scrollIndicator = sectionRef.current.querySelector('.hero-scroll-indicator');

        // === Entrance animation ===
        const entranceTL = gsap.timeline();

        entranceTL.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.03,
          delay: 0.3,
          ease: 'power2.out',
        });

        entranceTL.to(
          subtitle,
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.2'
        );

        entranceTL.to(
          scrollIndicator,
          { opacity: 1, duration: 1 },
          '-=0.3'
        );

        // === Scroll scatter animation ===
        if (isMobile) {
          gsap.fromTo(
            [...Array.from(chars), subtitle, scrollIndicator],
            { opacity: 1, scale: 1 },
            {
              opacity: 0,
              scale: 0.8,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=100vh',
                pin: true,
                scrub: 1,
              },
            }
          );
        } else {
          const scatterTL = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=150vh',
              pin: true,
              scrub: 1,
            },
          });

          chars.forEach((char, i) => {
            const angle = (i / chars.length) * Math.PI * 2 + Math.random() * 0.5;
            const distance = 200 + Math.random() * 300;

            scatterTL.fromTo(
              char,
              { x: 0, y: 0, opacity: 1, scale: 1, rotation: 0 },
              {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: 0,
                scale: 0.3,
                rotation: (Math.random() - 0.5) * 180,
                duration: 1,
              },
              0
            );
          });

          if (subtitle) {
            scatterTL.fromTo(
              subtitle,
              { opacity: 1, y: 0 },
              { opacity: 0, y: -30, duration: 0.5 },
              0
            );
          }

          if (scrollIndicator) {
            scatterTL.fromTo(
              scrollIndicator,
              { opacity: 1 },
              { opacity: 0, duration: 0.3 },
              0
            );
          }
        }
      }, sectionRef);
    };

    initGSAP();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {children}
    </section>
  );
}
