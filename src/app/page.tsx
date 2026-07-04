'use client';

import SmoothScroll from '@/components/effects/SmoothScroll';
import Header from '@/components/layout/Header';
import Hero from '@/components/hero/Hero';
import WhatIBuild from '@/components/sections/WhatIBuild';
import YieldReport from '@/components/sections/YieldReport';
import Manifesto from '@/components/sections/Manifesto';
import FabLog from '@/components/sections/FabLog';
import Qual from '@/components/sections/Qual';
import Traveler from '@/components/sections/Traveler';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main>
        <Hero />
        <WhatIBuild />
        <YieldReport />
        <Manifesto />
        <FabLog />
        <Qual />
        <Traveler />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
