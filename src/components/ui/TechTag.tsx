import { cn } from '@/lib/utils';

interface TechTagProps {
  label: string;
  className?: string;
}

export default function TechTag({ label, className }: TechTagProps) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 text-xs font-mono border border-white/10 rounded-full text-white/60 hover:border-prism-violet/50 hover:text-white/80 transition-colors duration-300',
        className
      )}
    >
      {label}
    </span>
  );
}
