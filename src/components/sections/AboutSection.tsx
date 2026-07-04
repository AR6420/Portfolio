'use client';
import { ABOUT } from '@/lib/constants';
import FadeInView from '@/components/effects/FadeInView';
import SectionHeading from '@/components/ui/SectionHeading';

export default function AboutSection() {
  return (
    <section id="about" className="section-pad">
      <div className="shell">
        <SectionHeading kicker="About" title="The human in the loop." className="mb-14" />

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20">
          <FadeInView delay={0.1}>
            <p className="text-body-lg text-muted leading-relaxed">
              {ABOUT.bio}
            </p>
          </FadeInView>

          <div className="space-y-10">
            <FadeInView delay={0.2}>
              <div className="border-l-[3px] border-volt pl-6">
                <p className="text-sm font-semibold text-volt mb-2">
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
                <p className="text-sm font-medium text-signal mt-2">
                  ✓ {ABOUT.education.honor}
                </p>
              </div>
            </FadeInView>

            <FadeInView delay={0.3}>
              <div className="border-l-[3px] border-volt pl-6">
                <p className="text-sm font-semibold text-volt mb-2">
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
