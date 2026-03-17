'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PrismCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  alwaysGlow?: boolean;
}

export default function PrismCard({
  children,
  className,
  hover = true,
  alwaysGlow = false,
}: PrismCardProps) {
  return (
    <motion.div
      className={cn(
        'relative rounded-xl overflow-hidden',
        className
      )}
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
        {children}
      </div>
    </motion.div>
  );
}
