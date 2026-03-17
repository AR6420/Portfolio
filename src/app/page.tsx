'use client';

import { useState, useCallback } from 'react';
import SmoothScroll from '@/components/effects/SmoothScroll';
import LoadingScreen from '@/components/ui/LoadingScreen';
import CustomCursor from '@/components/ui/CustomCursor';
import HeroShader from '@/components/hero/HeroShader';
import HeroText from '@/components/hero/HeroText';
import ScrollImplosion from '@/components/hero/ScrollImplosion';
import WhatIBuild from '@/components/sections/WhatIBuild';
import ImpactStats from '@/components/sections/ImpactStats';
import FeaturedWork from '@/components/sections/FeaturedWork';
import Credentials from '@/components/sections/Credentials';
import About from '@/components/sections/About';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const handleLoadingComplete = useCallback(() => setLoading(false), []);

  return (
    <SmoothScroll>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <CustomCursor />

      <main>
        <ScrollImplosion ready={!loading}>
          <HeroShader />
          <HeroText />
        </ScrollImplosion>

        <section className="min-h-screen flex flex-col items-center justify-center px-4">
          <WhatIBuild />
          <ImpactStats />
        </section>

        <FeaturedWork />
        <Credentials />
        <About />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
