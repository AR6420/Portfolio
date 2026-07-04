'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { PERSONAL } from '@/lib/constants';
import { getLenis } from '@/lib/lenis';
import WaferHero from './WaferHero';

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const scrollToFab = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#fab');
    if (!target) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -64 });
    } else {
      (target as HTMLElement).scrollIntoView({ behavior: 'smooth' });
    }
  };

  const enter = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const },
        };

  return (
    <section id="top" className="min-h-screen flex items-center pt-24 pb-16">
      <div className="shell w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
          <div>
            <motion.p {...enter(0.1)} className="eyebrow mb-8">
              Tessolve Semiconductors · GenAI Engineer
            </motion.p>

            <motion.h1
              {...enter(0.25)}
              className="font-display font-extrabold text-display-xl mb-8"
            >
              Adarsh
              <br />
              Balanolla
            </motion.h1>

            <motion.p
              {...enter(0.4)}
              className="text-body-lg text-muted max-w-xl mb-4"
            >
              {PERSONAL.tagline}.
            </motion.p>

            <motion.p
              {...enter(0.5)}
              className="font-mono text-sm text-copper mb-10"
            >
              Yield is never 100%. I ship anyway.
            </motion.p>

            <motion.div {...enter(0.6)} className="flex flex-wrap gap-4">
              <a href="#fab" onClick={scrollToFab} className="btn-fab btn-fab--primary">
                View the fab log ↓
              </a>
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${PERSONAL.resumePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-fab"
              >
                Resume ↗
              </a>
            </motion.div>
          </div>

          <motion.div
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.96 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.9, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
                })}
          >
            <WaferHero />
          </motion.div>
        </div>

        <motion.div
          {...enter(1.2)}
          className="mt-16 font-mono text-[0.65rem] tracking-wider3 uppercase text-faint"
        >
          Scroll · Proc 01/06
        </motion.div>
      </div>
    </section>
  );
}
