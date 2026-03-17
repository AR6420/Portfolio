'use client';
import { useScroll, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

export function useScrollProgress(): {
  ref: React.RefObject<HTMLDivElement>;
  progress: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null!);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return { ref, progress: scrollYProgress };
}
