'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

/**
 * The site is played as a convergence run. Each section is one iteration:
 * clear its task and the next section unlocks. Coverage climbs with every
 * completed level and converges at 99.4% — the viewer takes the last bit.
 * "Recruiter mode" unlocks everything instantly; the game is pacing,
 * never a hostage-taker.
 */

export type LevelId =
  | 'pipeline'
  | 'stats'
  | 'ship'
  | 'runs'
  | 'verify'
  | 'signoff';

export const LEVEL_ORDER: LevelId[] = [
  'pipeline',
  'stats',
  'ship',
  'runs',
  'verify',
  'signoff',
];

// Coverage after N completed levels; starts where the hero loop starts
const COVERAGE_STEPS = [38.0, 52.4, 65.1, 76.8, 86.5, 94.2, 99.4];

const STORAGE_KEY = 'convergence-run-v1';

interface GameContextValue {
  completed: Set<LevelId>;
  isUnlocked: (requires: LevelId | null) => boolean;
  isDone: (id: LevelId) => boolean;
  complete: (id: LevelId) => void;
  skipAll: () => void;
  reset: () => void;
  coverage: number;
  iter: number;
  total: number;
  finished: boolean;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [completed, setCompleted] = useState<Set<LevelId>>(new Set());
  // State, not a ref: the save effect must skip the commit in which the
  // load effect runs, or it writes the initial empty set over saved progress
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ids = JSON.parse(raw) as LevelId[];
        setCompleted(new Set(ids.filter((id) => LEVEL_ORDER.includes(id))));
      }
    } catch {
      // corrupted storage — start fresh
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completed)));
    } catch {
      // storage unavailable — game still works, just won't persist
    }
  }, [completed, loaded]);

  const complete = useCallback((id: LevelId) => {
    setCompleted((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const skipAll = useCallback(() => {
    setCompleted(new Set(LEVEL_ORDER));
  }, []);

  const reset = useCallback(() => {
    setCompleted(new Set());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const isUnlocked = useCallback(
    (requires: LevelId | null) => requires === null || completed.has(requires),
    [completed]
  );

  const isDone = useCallback((id: LevelId) => completed.has(id), [completed]);

  const iter = completed.size;
  const value: GameContextValue = {
    completed,
    isUnlocked,
    isDone,
    complete,
    skipAll,
    reset,
    coverage: COVERAGE_STEPS[Math.min(iter, COVERAGE_STEPS.length - 1)],
    iter,
    total: LEVEL_ORDER.length,
    finished: iter >= LEVEL_ORDER.length,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside GameProvider');
  return ctx;
}
