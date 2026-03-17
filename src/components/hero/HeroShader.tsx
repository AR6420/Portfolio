'use client';
import dynamic from 'next/dynamic';

const ShaderAnimation = dynamic(
  () => import('@/components/ui/shader-animation').then((mod) => mod.ShaderAnimation),
  { ssr: false }
);

export default function HeroShader() {
  return (
    <div className="absolute inset-0">
      <ShaderAnimation />
    </div>
  );
}
