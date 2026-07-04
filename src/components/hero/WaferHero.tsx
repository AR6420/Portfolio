'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Interactive wafer map. Dies are probe-tested in a serpentine scan on load;
 * a fixed ~6% fail and stay marked. The cursor acts as a probe head,
 * lighting nearby dies in thin-film interference colors.
 */

interface Die {
  x: number;
  y: number;
  angle: number;
  fail: boolean;
}

// Deterministic PRNG so the defect map (and yield number) is identical every visit
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Thin-film interference anchors: oxide teal -> oxide violet -> copper
const FILM: [number, number, number][] = [
  [127, 227, 212],
  [169, 149, 255],
  [224, 141, 87],
];

function filmColor(t: number): [number, number, number] {
  const scaled = (t % 1) * FILM.length;
  const i = Math.floor(scaled) % FILM.length;
  const j = (i + 1) % FILM.length;
  const f = scaled - Math.floor(scaled);
  return [
    FILM[i][0] + (FILM[j][0] - FILM[i][0]) * f,
    FILM[i][1] + (FILM[j][1] - FILM[i][1]) * f,
    FILM[i][2] + (FILM[j][2] - FILM[i][2]) * f,
  ];
}

const SCAN_MS = 2600;
const FAIL_RATE = 0.058;

export default function WaferHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const testedRef = useRef<HTMLSpanElement>(null);
  const yieldRef = useRef<HTMLSpanElement>(null);
  const [scanDone, setScanDone] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let dies: Die[] = [];
    let size = 0;
    let dieSize = 0;
    let rafId = 0;
    let start = 0;
    let done = false;
    const pointer = { x: -9999, y: -9999, active: false };

    const layout = () => {
      size = Math.min(wrap.clientWidth, wrap.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cx = size / 2;
      const cy = size / 2;
      const R = size / 2 - 10;
      const flatY = cy + R * 0.94;
      const pitch = size / 24;
      dieSize = pitch * 0.8;

      const rng = mulberry32(7);
      dies = [];
      const half = Math.ceil(size / pitch / 2);
      for (let row = -half; row <= half; row++) {
        const cols: Die[] = [];
        for (let col = -half; col <= half; col++) {
          const x = cx + col * pitch - dieSize / 2;
          const y = cy + row * pitch - dieSize / 2;
          const corners = [
            [x, y],
            [x + dieSize, y],
            [x, y + dieSize],
            [x + dieSize, y + dieSize],
          ];
          const fits = corners.every(
            ([px, py]) => Math.hypot(px - cx, py - cy) < R - 2
          );
          if (!fits || y + dieSize > flatY) continue;
          const angle = Math.atan2(y - cy, x - cx);
          cols.push({ x, y, angle, fail: rng() < FAIL_RATE });
        }
        if (row % 2 !== 0) cols.reverse(); // serpentine probe path
        dies.push(...cols);
      }
    };

    const draw = (scanned: number) => {
      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;
      const R = size / 2 - 10;

      // Wafer edge with bottom flat
      const flatAngle = Math.asin(0.94);
      ctx.beginPath();
      ctx.arc(cx, cy, R, flatAngle, Math.PI - flatAngle, true);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(239, 234, 243, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let i = 0; i < dies.length; i++) {
        const d = dies[i];
        const isScanned = i < scanned;
        const isProbe = i === scanned && !done;

        if (!isScanned && !isProbe) {
          ctx.fillStyle = 'rgba(239, 234, 243, 0.025)';
          ctx.fillRect(d.x, d.y, dieSize, dieSize);
          continue;
        }

        if (isProbe) {
          ctx.save();
          ctx.shadowColor = 'rgba(224, 141, 87, 0.9)';
          ctx.shadowBlur = 14;
          ctx.fillStyle = 'rgba(244, 169, 108, 0.95)';
          ctx.fillRect(d.x, d.y, dieSize, dieSize);
          ctx.restore();
          continue;
        }

        // Pointer proximity boost — probe-head glow follows the cursor
        let boost = 0;
        if (pointer.active) {
          const dist = Math.hypot(
            d.x + dieSize / 2 - pointer.x,
            d.y + dieSize / 2 - pointer.y
          );
          boost = Math.exp(-((dist / 85) ** 2));
        }

        if (d.fail) {
          ctx.fillStyle = `rgba(228, 97, 79, ${0.07 + boost * 0.15})`;
          ctx.fillRect(d.x, d.y, dieSize, dieSize);
          const inset = dieSize * 0.28;
          ctx.strokeStyle = `rgba(228, 97, 79, ${0.5 + boost * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(d.x + inset, d.y + inset);
          ctx.lineTo(d.x + dieSize - inset, d.y + dieSize - inset);
          ctx.moveTo(d.x + dieSize - inset, d.y + inset);
          ctx.lineTo(d.x + inset, d.y + dieSize - inset);
          ctx.stroke();
        } else {
          const t = (d.angle + Math.PI) / (2 * Math.PI);
          const [r, g, b] = filmColor(t);
          ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${
            0.24 + boost * 0.55
          })`;
          ctx.fillRect(d.x, d.y, dieSize, dieSize);
          ctx.strokeStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${
            0.18 + boost * 0.7
          })`;
          ctx.lineWidth = 1;
          ctx.strokeRect(d.x + 0.5, d.y + 0.5, dieSize - 1, dieSize - 1);
        }
      }
    };

    const updateReadout = (scanned: number) => {
      const testedDies = dies.slice(0, scanned);
      const fails = testedDies.filter((d) => d.fail).length;
      const pct =
        scanned > 0 ? (((scanned - fails) / scanned) * 100).toFixed(1) : '0.0';
      if (testedRef.current) {
        testedRef.current.textContent = `${scanned}/${dies.length}`;
      }
      if (yieldRef.current) {
        yieldRef.current.textContent = `${pct}%`;
      }
    };

    const finish = () => {
      done = true;
      draw(dies.length);
      updateReadout(dies.length);
      setScanDone(true);
    };

    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min((now - start) / SCAN_MS, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      const scanned = Math.floor(eased * dies.length);
      draw(scanned);
      updateReadout(scanned);
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    layout();

    if (reduceMotion) {
      finish();
    } else {
      rafId = requestAnimationFrame(tick);
    }

    let redrawQueued = false;
    const queueRedraw = () => {
      if (!done || redrawQueued) return;
      redrawQueued = true;
      requestAnimationFrame(() => {
        redrawQueued = false;
        draw(dies.length);
      });
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
      queueRedraw();
    };
    const onLeave = () => {
      pointer.active = false;
      queueRedraw();
    };

    if (!reduceMotion) {
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerleave', onLeave);
    }

    const ro = new ResizeObserver(() => {
      layout();
      if (done) {
        draw(dies.length);
        updateReadout(dies.length);
      }
    });
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        ref={wrapRef}
        className="relative w-full max-w-[520px] aspect-square"
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>

      <div className="font-mono text-[0.7rem] tracking-wider2 uppercase text-muted flex flex-wrap justify-center gap-x-6 gap-y-1">
        <span>
          Dies <span ref={testedRef} className="text-ink">0/0</span>
        </span>
        <span>
          Yield <span ref={yieldRef} className="text-copper">0.0%</span>
        </span>
        <span
          className={`transition-opacity duration-700 ${
            scanDone ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-defect">✕ defects kept</span> · shipped anyway
        </span>
      </div>
    </div>
  );
}
