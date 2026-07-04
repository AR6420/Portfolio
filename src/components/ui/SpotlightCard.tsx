'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  alwaysGlow?: boolean;
}

/**
 * PrismCard skin + cursor-tracking violet spotlight
 * (pattern from 21st.dev easemize/spotlight-card, re-skinned for the
 * prismatic glass system; hue locked to --prism-violet).
 */
export default function SpotlightCard({
  children,
  className,
  hover = true,
  alwaysGlow = false,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, opacity: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const onMouseLeave = () => setSpot((s) => ({ ...s, opacity: 0 }));

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn('relative rounded-xl overflow-hidden', className)}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3 }}
    >
      {/* Prismatic border */}
      <div
        className={cn(
          'absolute inset-0 rounded-xl p-[2px] transition-opacity duration-500',
          hover && !alwaysGlow && 'opacity-30 group-hover:opacity-100',
          !hover && !alwaysGlow && 'opacity-0',
          alwaysGlow && 'opacity-100 animate-prism-rotate'
        )}
        style={{
          background:
            'conic-gradient(from var(--prism-angle, 0deg), #00f0ff, #4060ff, #8040ff, #c020e0, #ff2080, #00f0ff)',
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />
      {/* Card content */}
      <div className="relative glass rounded-xl p-6 h-full">
        {/* Cursor spotlight — violet glow following the pointer */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: spot.opacity,
            background: `radial-gradient(320px circle at ${spot.x}px ${spot.y}px, rgba(128, 64, 255, 0.28), transparent 70%)`,
          }}
        />
        <div className="relative">{children}</div>
      </div>
    </motion.div>
  );
}
