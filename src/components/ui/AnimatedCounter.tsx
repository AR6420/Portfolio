'use client';
import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  delay?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  delay = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null!);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const [display, setDisplay] = useState('0');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        motionValue.set(value);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, delay, motionValue]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (v: number) => {
      if (value % 1 !== 0) {
        setDisplay(v.toFixed(2));
      } else {
        setDisplay(Math.round(v).toLocaleString());
      }
      if (Math.abs(v - value) < 0.5) {
        setDone(true);
      }
    });
    return unsubscribe;
  }, [spring, value]);

  return (
    <span ref={ref} className={className}>
      <span className={done ? 'text-prism' : ''}>{display}</span>
      <span className={done ? 'text-prism' : ''}>{suffix}</span>
    </span>
  );
}
