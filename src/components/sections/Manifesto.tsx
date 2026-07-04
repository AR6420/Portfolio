'use client';
import FadeInView from '@/components/effects/FadeInView';

export default function Manifesto() {
  return (
    <section className="section-pad border-y border-line/60">
      <div className="shell max-w-4xl">
        <FadeInView>
          <p className="font-mono text-[0.7rem] tracking-wider2 uppercase text-defect mb-8">
            ✕ Defect notice
          </p>
        </FadeInView>

        <FadeInView delay={0.1}>
          <p className="font-display font-bold text-display-lg mb-8">
            Every wafer ships with dead dies.
            <br />
            <span className="text-copper">Mine are on the map.</span>
          </p>
        </FadeInView>

        <FadeInView delay={0.2}>
          <p className="text-body-lg text-muted max-w-2xl">
            The real winners aren&apos;t the ones trying to conquer everything
            in their path — they&apos;re the ones unafraid to look foolish in
            public. So I build in the open, break things loudly, and publish
            the failure modes along with the wins. Red-teaming models, shipping
            experiments, keeping the defect marks visible: that&apos;s the
            process working, not the process failing.
          </p>
        </FadeInView>
      </div>
    </section>
  );
}
