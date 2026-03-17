'use client';

const name = 'ADARSH BALANOLLA';

export default function HeroText() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
      {/* Name */}
      <h1 className="font-display font-bold text-fluid-display mb-6">
        {name.split('').map((char, i) => (
          <span
            key={i}
            className="hero-char"
            style={{
              opacity: 0,
              display: char === ' ' ? 'inline' : 'inline-block',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>

      {/* Subtitle */}
      <p
        className="hero-subtitle font-body text-fluid-body text-secondary max-w-2xl"
        style={{ opacity: 0 }}
      >
        GenAI Engineer - Building AI Agents and Intelligent Systems that Accelerate Engineering Cycles
      </p>

      {/* Scroll indicator */}
      <div
        className="hero-scroll-indicator absolute bottom-8 flex flex-col items-center gap-3"
        style={{ opacity: 0 }}
      >
        <span className="text-xs font-mono text-white/40 tracking-[0.3em] uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </div>
  );
}
