'use client';
import { ABOUT } from '@/lib/constants';
import FadeInView from '@/components/effects/FadeInView';

export default function About() {
  return (
    <section className="min-h-screen flex items-center section-padding">
      <div className="section-container">
        <FadeInView>
          <h2 className="font-display text-fluid-heading font-bold text-center mb-16">
            About
          </h2>
        </FadeInView>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Bio */}
          <FadeInView delay={0.1}>
            <p className="text-fluid-body text-secondary leading-relaxed">
              {ABOUT.bio}
            </p>
          </FadeInView>

          {/* Education + Leadership */}
          <div className="space-y-8">
            <FadeInView delay={0.2}>
              <div>
                <h3 className="font-display text-lg font-semibold mb-3 text-white/90">
                  Education
                </h3>
                <div className="glass rounded-lg p-4">
                  <p className="font-display text-sm font-medium">
                    {ABOUT.education.university}
                  </p>
                  <p className="text-sm text-secondary mt-1">
                    {ABOUT.education.degree}
                  </p>
                  <p className="text-sm text-secondary">
                    Concentration: {ABOUT.education.concentration}
                  </p>
                  <p className="text-sm text-prism-cyan mt-2">
                    {ABOUT.education.honor}
                  </p>
                </div>
              </div>
            </FadeInView>

            <FadeInView delay={0.3}>
              <div>
                <h3 className="font-display text-lg font-semibold mb-3 text-white/90">
                  Leadership
                </h3>
                <div className="glass rounded-lg p-4">
                  <p className="font-display text-sm font-medium">
                    {ABOUT.leadership.role}
                  </p>
                  <p className="text-sm text-secondary mt-1">
                    {ABOUT.leadership.organization}, {ABOUT.leadership.university}
                  </p>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>
      </div>
    </section>
  );
}
