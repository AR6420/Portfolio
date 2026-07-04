'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { PERSONAL } from '@/lib/constants';
import { getLenis } from '@/lib/lenis';
import { useGame } from '@/lib/game';
import LoopHero from './LoopHero';

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const { finished } = useGame();

  const scrollToStart = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(finished ? '#work' : '#build');
    if (!target) return;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { offset: -72 });
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
    <section id="top" className="min-h-screen flex items-center pt-24 pb-12">
      <div className="shell w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-6 items-center">
          <div>
            <motion.p {...enter(0.1)} className="kicker mb-7">
              GenAI engineer at Tessolve Semiconductors
            </motion.p>

            <motion.h1
              {...enter(0.22)}
              className="font-display font-extrabold text-display-xl mb-7"
            >
              Adarsh
              <br />
              Balanolla
            </motion.h1>

            <motion.p
              {...enter(0.36)}
              className="text-body-lg text-muted max-w-xl mb-3"
            >
              I build AI agents and workflow automation that loop until the
              work is done — turning weeks of manual engineering into a day of
              waiting.
            </motion.p>

            <motion.p {...enter(0.46)} className="text-body-lg max-w-xl mb-10">
              First iterations look foolish.{' '}
              <span className="font-semibold text-volt">
                Converge anyway.
              </span>
            </motion.p>

            <motion.div {...enter(0.58)} className="flex flex-wrap items-center gap-4">
              <a
                href={finished ? '#work' : '#build'}
                onClick={scrollToStart}
                className="btn btn--primary"
              >
                {finished ? 'See the work ↓' : '▶ Start the run'}
              </a>
              <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${PERSONAL.resumePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Resume ↗
              </a>
              {!finished && (
                <span className="font-mono text-[0.68rem] text-muted basis-full sm:basis-auto">
                  this site is played, not scrolled — 6 iterations to converge
                </span>
              )}
            </motion.div>
          </div>

          <motion.div
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, scale: 0.97 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.9, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
                })}
          >
            <LoopHero />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
