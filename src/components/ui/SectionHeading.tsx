import FadeInView from '@/components/effects/FadeInView';

interface SectionHeadingProps {
  step: string;
  label: string;
  title: string;
  className?: string;
}

export default function SectionHeading({
  step,
  label,
  title,
  className = '',
}: SectionHeadingProps) {
  return (
    <FadeInView className={className}>
      <p className="eyebrow mb-5">
        Proc {step} · {label}
      </p>
      <h2 className="font-display font-bold text-display-lg">{title}</h2>
    </FadeInView>
  );
}
