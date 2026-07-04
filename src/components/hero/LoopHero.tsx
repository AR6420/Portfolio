'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Chaos -> Loop -> Infinity, in four beats.
 * Act 1 ORCHESTRATE: agents appear scattered, tasks route across a tangled graph.
 * Act 2 LEARN: weak edges fade, nodes drift toward the ring.
 * Act 3 CONVERGE: the surviving loop runs laps; coverage climbs asymptotically,
 * dips included, and settles at 99.4% — never 100. The engineer takes the last bit.
 * Act 4 INFINITY: the ring morphs into a lemniscate and a particle stream flows
 * along it forever — converged, but the iteration never stops.
 * The cursor perturbs nearby agents; the system pulls itself back together.
 */

const INK = '20, 20, 20';
const VOLT = [108, 76, 244];
const SIGNAL = [11, 166, 120];
const ALARM = '224, 68, 46';
const HAIR = '216, 211, 200';

const NODE_COUNT = 12;
const ACT1_MS = 2400;
const ACT2_MS = 2200;
const LAP_MS = 3000;
const FINAL_COVERAGE = 99.4;
const MORPH_AFTER_MS = 1200; // pause after convergence flash before the ∞ morph
const MORPH_FADE_MS = 900;
const PARTICLE_COUNT = 42;
const PING_EVERY_MS = 1700;
const PING_LIFE_MS = 900;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function mix(a: number[], b: number[], f: number) {
  return `${a[0] + (b[0] - a[0]) * f | 0}, ${a[1] + (b[1] - a[1]) * f | 0}, ${
    a[2] + (b[2] - a[2]) * f | 0
  }`;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  homeX: number;
  homeY: number;
  slotAngle: number;
}

interface Edge {
  a: number;
  b: number;
  onRing: boolean;
}

export default function LoopHero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const iterRef = useRef<HTMLSpanElement>(null);
  const covRef = useRef<HTMLSpanElement>(null);
  const [converged, setConverged] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let size = 0;
    let cx = 0;
    let cy = 0;
    let ringR = 0;
    let nodeR = 0;
    let rafId = 0;
    let start = 0;
    let lastT = 0;
    let convergeT = 0;
    let lastPingT = 0;
    let lastCoverage = 0;
    let lastIter = 1;
    let lastSampleT = -1000;
    let convergedFlag = false;
    const pointer = { x: -9999, y: -9999, active: false };
    const history: { t: number; cov: number }[] = [];
    const pings: { node: number; born: number }[] = [];
    const particles: { s: number; speed: number }[] = [];

    const rng = mulberry32(42);
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const layout = () => {
      size = Math.min(wrap.clientWidth, wrap.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cx = size / 2;
      cy = size / 2;
      ringR = size * 0.34;
      nodeR = Math.max(4.5, size * 0.011);

      if (nodes.length === 0) {
        // Scatter agents, then assign ring slots by initial angle so the
        // drift in Act 2 unwinds without crossings
        const scattered = Array.from({ length: NODE_COUNT }, () => {
          const a = rng() * Math.PI * 2;
          const r = (0.12 + rng() * 0.75) * ringR * 1.25;
          return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
        });
        const order = scattered
          .map((p, i) => ({ i, angle: Math.atan2(p.y - cy, p.x - cx) }))
          .sort((p, q) => p.angle - q.angle);

        order.forEach(({ i }, slot) => {
          nodes[i] = {
            x: scattered[i].x,
            y: scattered[i].y,
            vx: 0,
            vy: 0,
            homeX: scattered[i].x,
            homeY: scattered[i].y,
            slotAngle: (slot / NODE_COUNT) * Math.PI * 2 - Math.PI / 2,
          };
          // Ring edges connect consecutive slots
          const next = order[(slot + 1) % NODE_COUNT].i;
          edges.push({ a: i, b: next, onRing: true });
        });

        // Tangle: extra random edges that will not survive Act 2
        for (let k = 0; k < 14; k++) {
          const a = Math.floor(rng() * NODE_COUNT);
          let b = Math.floor(rng() * NODE_COUNT);
          if (b === a) b = (b + 3) % NODE_COUNT;
          const exists = edges.some(
            (e) => (e.a === a && e.b === b) || (e.a === b && e.b === a)
          );
          if (!exists) edges.push({ a, b, onRing: false });
        }

        for (let k = 0; k < PARTICLE_COUNT; k++) {
          particles.push({
            s: (k / PARTICLE_COUNT) * Math.PI * 2,
            speed: 0.00045 * (0.8 + rng() * 0.5),
          });
        }
      }
    };

    const ringTarget = (n: Node): [number, number] => [
      cx + Math.cos(n.slotAngle) * ringR,
      cy + Math.sin(n.slotAngle) * ringR,
    ];

    // Lemniscate of Bernoulli, widened for presence
    const lemniscate = (s: number, breath = 1): [number, number] => {
      const a = ringR * 1.18 * breath;
      const d = 1 + Math.sin(s) * Math.sin(s);
      return [
        cx + (a * Math.cos(s)) / d,
        cy + (a * 1.25 * Math.sin(s) * Math.cos(s)) / d,
      ];
    };

    const infTarget = (n: Node): [number, number] => lemniscate(n.slotAngle);

    const morphT = () => (convergedFlag ? convergeT + MORPH_AFTER_MS : Infinity);

    const coverageAt = (t: number) => {
      // Deterministic noisy climb: 38 -> 99.4 with honest dips
      const total = ACT1_MS + ACT2_MS;
      if (t < total) {
        const p = t / total;
        const base = 38 + 46 * p;
        const dip = Math.sin(p * 19) * 4.5 * (1 - p);
        return Math.max(35, base + dip);
      }
      const laps = (t - total) / LAP_MS;
      return Math.min(
        FINAL_COVERAGE,
        84 + (FINAL_COVERAGE - 84) * (1 - Math.exp(-laps * 0.9))
      );
    };

    const applyPhysics = (
      target: (n: Node) => [number, number],
      strength: number
    ) => {
      for (const n of nodes) {
        const [tx, ty] = target(n);
        let ax = (tx - n.x) * strength;
        let ay = (ty - n.y) * strength;
        if (pointer.active && !reduceMotion) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < 110 && d > 0.01) {
            const push = ((110 - d) / 110) * 2.2;
            ax += (dx / d) * push;
            ay += (dy / d) * push;
          }
        }
        n.vx = (n.vx + ax) * 0.82;
        n.vy = (n.vy + ay) * 0.82;
        n.x += n.vx;
        n.y += n.vy;
      }
    };

    const drawNode = (n: Node, active: boolean, alpha = 1) => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, nodeR, 0, Math.PI * 2);
      ctx.fillStyle = active
        ? `rgba(${VOLT.join(',')}, ${alpha})`
        : `rgba(${INK}, ${alpha})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(n.x, n.y, nodeR + 3, 0, Math.PI * 2);
      ctx.strokeStyle = active
        ? `rgba(${VOLT.join(',')}, ${0.35 * alpha})`
        : `rgba(${INK}, ${0.12 * alpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    };

    const drawEdge = (e: Edge, alpha: number, volt = false) => {
      if (alpha <= 0.01) return;
      const a = nodes[e.a];
      const b = nodes[e.b];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = volt
        ? `rgba(${VOLT.join(',')}, ${alpha})`
        : `rgba(${HAIR}, ${alpha})`;
      ctx.lineWidth = volt ? 1.8 : 1.2;
      ctx.stroke();
    };

    const drawPulse = (lapT: number) => {
      const seg = (lapT % 1) * NODE_COUNT;
      const segIdx = Math.floor(seg);
      const segP = seg - segIdx;
      // Ring edges were pushed in slot order, so edges[0..NODE_COUNT-1] is the lap path
      const e = edges[segIdx % NODE_COUNT];
      const a = nodes[e.a];
      const b = nodes[e.b];

      for (let k = 1; k <= 6; k++) {
        const tp = segP - k * 0.12;
        if (tp < 0) continue;
        ctx.beginPath();
        ctx.arc(
          a.x + (b.x - a.x) * tp,
          a.y + (b.y - a.y) * tp,
          3.5 - k * 0.4,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(${VOLT.join(',')}, ${0.5 - k * 0.075})`;
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(
        a.x + (b.x - a.x) * segP,
        a.y + (b.y - a.y) * segP,
        4.5,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `rgb(${VOLT.join(',')})`;
      ctx.fill();
      return e.b;
    };

    const drawSparkline = () => {
      if (history.length < 2) return;
      const w = ringR * 0.95;
      const h = ringR * 0.26;
      const x0 = cx - w / 2;
      const y0 = cy - h / 2;
      const tMax = history[history.length - 1].t;

      ctx.beginPath();
      history.forEach((pt, i) => {
        const px = x0 + (pt.t / tMax) * w;
        const py = y0 + h - ((pt.cov - 35) / 65) * h;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.strokeStyle = `rgba(${VOLT.join(',')}, 0.6)`;
      ctx.lineWidth = 1.5;
      ctx.lineJoin = 'round';
      ctx.stroke();

      const last = history[history.length - 1];
      ctx.beginPath();
      ctx.arc(x0 + w, y0 + h - ((last.cov - 35) / 65) * h, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${VOLT.join(',')})`;
      ctx.fill();
    };

    const drawPings = (t: number) => {
      for (let i = pings.length - 1; i >= 0; i--) {
        const p = (t - pings[i].born) / PING_LIFE_MS;
        if (p >= 1) {
          pings.splice(i, 1);
          continue;
        }
        const n = nodes[pings[i].node];
        ctx.beginPath();
        ctx.arc(n.x, n.y, nodeR + 2 + p * 22, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${SIGNAL.join(',')}, ${0.45 * (1 - p)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    };

    // Act 4 — the ∞ stream. Smooth lemniscate path, comet particles flowing,
    // nodes riding the curve, green heartbeats.
    const drawInfinity = (t: number, dt: number, fadeIn: number) => {
      const breath = 1 + 0.015 * Math.sin(t / 1400);

      // Path
      ctx.beginPath();
      for (let i = 0; i <= 220; i++) {
        const [px, py] = lemniscate((i / 220) * Math.PI * 2, breath);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${VOLT.join(',')}, ${0.22 * fadeIn})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Particle stream with comet trails; right lobe drifts green, left stays volt
      for (const p of particles) {
        p.s = (p.s + p.speed * dt) % (Math.PI * 2);
        for (let k = 5; k >= 0; k--) {
          const s = p.s - k * 0.045;
          const [px, py] = lemniscate(s, breath);
          const lobe = (Math.cos(s) + 1) / 2;
          const col = mix(VOLT, SIGNAL, lobe * 0.8);
          const crossBoost =
            Math.abs(Math.cos(s)) < 0.12 ? 0.35 : 0; // flare at the crossover
          ctx.beginPath();
          ctx.arc(px, py, (3 - k * 0.38) * (1 + crossBoost), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col}, ${(0.5 - k * 0.07 + crossBoost) * fadeIn})`;
          ctx.fill();
        }
      }

      // Text: verdict above, promise below
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `600 ${Math.max(14, size * 0.036)}px monospace`;
      ctx.fillStyle = `rgba(${SIGNAL.join(',')}, ${fadeIn})`;
      ctx.fillText('99.4% ✓', cx, cy - ringR * 0.72);
      ctx.font = `400 ${Math.max(10, size * 0.021)}px monospace`;
      ctx.fillStyle = `rgba(${INK}, ${0.45 * fadeIn})`;
      ctx.fillText('iter ∞ — the loop never stops', cx, cy + ringR * 0.72);
    };

    const setReadout = (t: number) => {
      const cov = coverageAt(t);
      const total = ACT1_MS + ACT2_MS;
      const iter =
        t < total
          ? 1 + Math.floor((t / total) * 3)
          : 4 + Math.floor((t - total) / LAP_MS);

      if (Math.abs(cov - lastCoverage) > 0.05 && covRef.current) {
        covRef.current.textContent = `${cov.toFixed(1)}%`;
        lastCoverage = cov;
      }
      if (iter !== lastIter && iterRef.current && !convergedFlag) {
        iterRef.current.textContent = String(iter);
        lastIter = iter;
      }
      if (statusRef.current) {
        const status =
          t < ACT1_MS
            ? 'orchestrating agents…'
            : t < total
              ? 'pruning weak paths…'
              : cov >= FINAL_COVERAGE - 0.05
                ? 'converged'
                : 'converging…';
        if (statusRef.current.textContent !== status) {
          statusRef.current.textContent = status;
        }
        if (cov >= FINAL_COVERAGE - 0.05 && !convergedFlag) {
          convergedFlag = true;
          convergeT = t;
          setConverged(true);
          if (iterRef.current) iterRef.current.textContent = '∞';
        }
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, size, size);
      const dt = lastT ? Math.min(t - lastT, 50) : 16;
      lastT = t;

      // Sample coverage history for the live sparkline
      if (t - lastSampleT > 120 && !convergedFlag) {
        history.push({ t, cov: coverageAt(t) });
        if (history.length > 240) history.shift();
        lastSampleT = t;
      }

      if (t < ACT1_MS) {
        // Act 1 — tangled routing, pulses on random edges
        applyPhysics((n) => [n.homeX, n.homeY], 0.06);
        const appear = Math.min(1, t / 500);
        edges.forEach((e, i) => {
          const flash = Math.sin(t / 180 + i * 2.1);
          drawEdge(e, appear * (0.9 + flash * 0.1));
          if (!e.onRing && flash > 0.93) {
            const a = nodes[e.a];
            const b = nodes[e.b];
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${ALARM}, 0.6)`;
            ctx.lineWidth = 1.4;
            ctx.stroke();
          }
        });
        for (let k = 0; k < 3; k++) {
          const ei = Math.floor(((t / (300 + k * 140)) + k * 5) % edges.length);
          const e = edges[ei];
          const p = ((t / (300 + k * 140)) + k * 5) % 1;
          const a = nodes[e.a];
          const b = nodes[e.b];
          ctx.beginPath();
          ctx.arc(
            a.x + (b.x - a.x) * p,
            a.y + (b.y - a.y) * p,
            3.2,
            0,
            Math.PI * 2
          );
          ctx.fillStyle = `rgba(${VOLT.join(',')}, 0.9)`;
          ctx.fill();
        }
        nodes.forEach((n) => drawNode(n, false));
      } else if (t < ACT1_MS + ACT2_MS) {
        // Act 2 — weak edges fade, nodes drift to the ring
        const p = (t - ACT1_MS) / ACT2_MS;
        applyPhysics(ringTarget, 0.02 + p * 0.05);
        edges.forEach((e) => {
          if (e.onRing) {
            drawEdge(e, 0.9, p > 0.55);
          } else {
            drawEdge(e, Math.max(0, 1 - p * 1.6));
          }
        });
        nodes.forEach((n) => drawNode(n, false));
      } else if (t < morphT()) {
        // Act 3 — the loop runs laps until coverage converges
        applyPhysics(ringTarget, 0.08);
        edges.forEach((e) => {
          if (e.onRing) drawEdge(e, 0.9, true);
        });

        const lapT = (t - ACT1_MS - ACT2_MS) / LAP_MS;
        const arrive = drawPulse(lapT);
        nodes.forEach((n, i) => drawNode(n, i === arrive));

        drawSparkline();

        // Convergence flash: green ripple from center
        if (convergedFlag && t - convergeT < 800) {
          const p = (t - convergeT) / 800;
          ctx.beginPath();
          ctx.arc(cx, cy, p * ringR * 1.25, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${SIGNAL.join(',')}, ${0.4 * (1 - p)})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      } else {
        // Act 4 — morph into ∞ and stream forever
        const fadeIn = Math.min(1, (t - morphT()) / MORPH_FADE_MS);
        applyPhysics(infTarget, 0.05 + fadeIn * 0.04);

        // Old ring edges dissolve as the stream takes over
        if (fadeIn < 1) {
          edges.forEach((e) => {
            if (e.onRing) drawEdge(e, 0.9 * (1 - fadeIn), true);
          });
        }

        drawInfinity(t, dt, fadeIn);

        if (t - lastPingT > PING_EVERY_MS) {
          pings.push({
            node: Math.floor((t * 7919) / PING_EVERY_MS) % NODE_COUNT,
            born: t,
          });
          lastPingT = t;
        }
        drawPings(t);

        nodes.forEach((n) => drawNode(n, false));
      }
    };

    const tick = (now: number) => {
      if (!start) start = now;
      const t = now - start;
      draw(t);
      setReadout(t);
      rafId = requestAnimationFrame(tick);
    };

    layout();

    if (reduceMotion) {
      // Static final state: ∞ formed, converged
      convergedFlag = true;
      setConverged(true);
      nodes.forEach((n) => {
        const [tx, ty] = lemniscate(n.slotAngle);
        n.x = tx;
        n.y = ty;
      });
      ctx.beginPath();
      for (let i = 0; i <= 220; i++) {
        const [px, py] = lemniscate((i / 220) * Math.PI * 2);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${VOLT.join(',')}, 0.35)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      nodes.forEach((n) => drawNode(n, false));
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `600 ${Math.max(13, size * 0.032)}px monospace`;
      ctx.fillStyle = `rgb(${SIGNAL.join(',')})`;
      ctx.fillText('99.4% ✓', cx, cy - ringR * 0.72);
      if (covRef.current) covRef.current.textContent = '99.4%';
      if (iterRef.current) iterRef.current.textContent = '∞';
      if (statusRef.current) statusRef.current.textContent = 'converged';
    } else {
      rafId = requestAnimationFrame(tick);
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    if (!reduceMotion) {
      canvas.addEventListener('pointermove', onMove);
      canvas.addEventListener('pointerleave', onLeave);
    }

    const ro = new ResizeObserver(() => layout());
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={wrapRef}
        className="relative w-full max-w-[540px] aspect-square"
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>

      <div className="font-mono text-xs text-muted flex flex-wrap justify-center items-center gap-x-5 gap-y-1">
        <span>
          iter <span ref={iterRef} className="text-ink font-medium">1</span>
        </span>
        <span>
          coverage{' '}
          <span ref={covRef} className="text-volt font-medium">38.0%</span>
        </span>
        <span
          ref={statusRef}
          className={converged ? 'text-signal font-medium' : ''}
        >
          orchestrating agents…
        </span>
      </div>
    </div>
  );
}
