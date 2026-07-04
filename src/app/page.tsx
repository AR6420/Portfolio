'use client';

import SmoothScroll from '@/components/effects/SmoothScroll';
import { GameProvider } from '@/lib/game';
import LevelGate from '@/components/game/LevelGate';
import Hud from '@/components/game/Hud';
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
      <GameProvider>
        <Header />
        <main>
          <Hero />
          <LevelGate requires={null} hint="">
            <WhatIBuild />
          </LevelGate>
          <LevelGate
            requires="pipeline"
            hint="Assemble the pipeline above to unlock the numbers"
          >
            <TheNumbers />
          </LevelGate>
          <LevelGate
            requires="stats"
            hint="Run all four benchmarks to unlock the manifesto"
          >
            <Manifesto />
          </LevelGate>
          <LevelGate
            requires="ship"
            hint="Ship iteration one to unlock the work"
          >
            <SelectedWork />
          </LevelGate>
          <LevelGate
            requires="runs"
            hint="Replay all three runs to unlock credentials"
          >
            <CredentialsSection />
          </LevelGate>
          <LevelGate
            requires="verify"
            hint="Verify the credentials to unlock about"
          >
            <AboutSection />
          </LevelGate>
          <LevelGate
            requires="signoff"
            hint="Sign off as the human in the loop to unlock contact"
          >
            <Footer />
          </LevelGate>
        </main>
        <Hud />
      </GameProvider>
    </SmoothScroll>
  );
}
