'use client';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PrismButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
  external?: boolean;
}

export default function PrismButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className,
  external = false,
}: PrismButtonProps) {
  const baseClasses = cn(
    'relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-display text-sm font-medium tracking-wide transition-all duration-300',
    variant === 'primary' &&
      'bg-prism-gradient text-white hover:shadow-[0_0_40px_rgba(128,64,255,0.5)]',
    variant === 'secondary' &&
      'border border-white/10 text-white/80 hover:border-white/50 hover:text-white',
    className
  );

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        data-cursor-hover
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={baseClasses}
      data-cursor-hover
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
