'use client';
import { ABOUT } from '@/lib/constants';
import FadeInView from '@/components/effects/FadeInView';
import SectionHeading from '@/components/ui/SectionHeading';
import { useGame } from '@/lib/game';

function SignoffTask() {
  const { isDone, complete } = useGame();
  const done = isDone('signoff');

  return (
    <div className="mt-12 bg-wash rounded-2xl p-6 md:p-8">
      <p className="font-mono text-xs text-volt mb-1">
        iteration 6 · human sign-off
      </p>
      <p className="text-sm text-muted mb-5">
        {done
          ? 'Signed off. The run is ready to converge — one section left.'
          : 'Every automated pipeline I build ends the same way: a human approves the result. Your turn.'}
      </p>
      <button
        onClick={() => complete('signoff')}
        disabled={done}
        className={`btn ${
          done ? '!border-signal !text-signal cursor-default' : ''
        }`}
      >
        {done ? '✓ signed off — human in the loop' : 'sign off as the human in the loop'}
      </button>
    </div>
  );
}

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

        <FadeInView delay={0.2}>
          <SignoffTask />
        </FadeInView>
      </div>
    </section>
  );
}
