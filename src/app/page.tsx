'use client';

import SmoothScroll from '@/components/effects/SmoothScroll';
import Header from '@/components/layout/Header';
import Hero from '@/components/hero/Hero';
import WhatIBuild from '@/components/sections/WhatIBuild';
import TheNumbers from '@/components/sections/TheNumbers';
import Manifesto from '@/components/sections/Manifesto';
import SelectedWork from '@/components/sections/SelectedWork';
import CredentialsSection from '@/components/sections/CredentialsSection';
import AboutSection from '@/components/sections/AboutSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main>
        <Hero />
        <WhatIBuild />
        <TheNumbers />
        <Manifesto />
        <SelectedWork />
        <CredentialsSection />
        <AboutSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
