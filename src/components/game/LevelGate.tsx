'use client';
import { Lock } from 'lucide-react';
import { useGame, type LevelId } from '@/lib/game';

interface LevelGateProps {
  requires: LevelId | null;
  hint: string;
  children: React.ReactNode;
}

export default function LevelGate({ requires, hint, children }: LevelGateProps) {
  const { isUnlocked } = useGame();
  const unlocked = isUnlocked(requires);

  if (unlocked) return <>{children}</>;

  return (
    <div className="relative">
      <div
        className="pointer-events-none select-none blur-md opacity-30 max-h-[420px] overflow-hidden"
        aria-hidden="true"
      >
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center bg-paper/80 backdrop-blur-sm rounded-2xl border border-hairline px-8 py-6">
          <Lock size={18} className="mx-auto mb-3 text-muted" aria-hidden />
          <p className="font-mono text-xs text-muted mb-1">
            iteration locked
          </p>
          <p className="text-sm font-medium text-ink">{hint}</p>
        </div>
      </div>
    </div>
  );
}
