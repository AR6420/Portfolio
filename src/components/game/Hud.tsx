'use client';
import { useGame } from '@/lib/game';

export default function Hud() {
  const { coverage, iter, total, finished, skipAll, reset } = useGame();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-md">
      <div className="flex items-center gap-4 bg-paper/90 backdrop-blur-md border border-hairline rounded-full px-5 py-2.5 shadow-[0_2px_16px_rgba(20,20,20,0.08)]">
        <span className="font-mono text-[0.7rem] text-muted whitespace-nowrap">
          iter{' '}
          <span className="text-ink font-medium">
            {iter}/{total}
          </span>
        </span>

        <div
          className="flex-1 h-1.5 rounded-full bg-hairline overflow-hidden"
          role="progressbar"
          aria-valuenow={coverage}
          aria-valuemin={38}
          aria-valuemax={99.4}
          aria-label="site coverage"
        >
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              finished ? 'bg-signal' : 'bg-volt'
            }`}
            style={{ width: `${((coverage - 38) / (99.4 - 38)) * 100}%` }}
          />
        </div>

        <span
          className={`font-mono text-[0.7rem] font-medium whitespace-nowrap ${
            finished ? 'text-signal' : 'text-volt'
          }`}
        >
          {coverage.toFixed(1)}%{finished ? ' ✓' : ''}
        </span>

        {finished ? (
          <button
            onClick={reset}
            className="font-mono text-[0.65rem] text-muted hover:text-volt transition-colors whitespace-nowrap"
          >
            replay
          </button>
        ) : (
          <button
            onClick={skipAll}
            className="font-mono text-[0.65rem] text-muted hover:text-volt transition-colors whitespace-nowrap"
            title="Unlock everything — no game, just the content"
          >
            recruiter mode
          </button>
        )}
      </div>
    </div>
  );
}
