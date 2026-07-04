'use client';
import { ABOUT } from '@/lib/constants';
import FadeInView from '@/components/effects/FadeInView';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Traveler() {
  return (
    <section id="traveler" className="section-pad">
      <div className="shell">
        <SectionHeading
          step="05"
          label="Traveler"
          title="About."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20">
          <FadeInView delay={0.1}>
            <p className="text-body-lg text-muted leading-relaxed">
              {ABOUT.bio}
            </p>
          </FadeInView>

          <div className="space-y-10">
            <FadeInView delay={0.2}>
              <div className="border-l-2 border-copper/60 pl-6">
                <p className="font-mono text-[0.7rem] tracking-wider2 uppercase text-copper mb-3">
                  Education
                </p>
                <p className="font-display font-semibold text-lg">
                  {ABOUT.education.university}
                </p>
                <p className="text-sm text-muted mt-1">
                  {ABOUT.education.degree}
                </p>
                <p className="text-sm text-muted">
                  Concentration: {ABOUT.education.concentration}
                </p>
                <p className="font-mono text-xs text-oxide-teal mt-3">
                  ✓ {ABOUT.education.honor}
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={0.3}>
              <div className="border-l-2 border-copper/60 pl-6">
                <p className="font-mono text-[0.7rem] tracking-wider2 uppercase text-copper mb-3">
                  Leadership
                </p>
                <p className="font-display font-semibold text-lg">
                  {ABOUT.leadership.role}
                </p>
                <p className="text-sm text-muted mt-1">
                  {ABOUT.leadership.organization}, {ABOUT.leadership.university}
                </p>
              </div>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}
