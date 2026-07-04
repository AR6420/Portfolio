import FadeInView from '@/components/effects/FadeInView';

interface SectionHeadingProps {
  kicker: string;
  title: string;
  className?: string;
}

export default function SectionHeading({
  kicker,
  title,
  className = '',
}: SectionHeadingProps) {
  return (
    <FadeInView className={className}>
      <p className="kicker mb-4">{kicker}</p>
      <h2 className="font-display font-bold text-display-lg max-w-3xl">
        {title}
      </h2>
    </FadeInView>
  );
}
