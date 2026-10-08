"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CursorTracker — a crosshair follows the cursor across the drafting sheet,
 * showing live X/Y coordinates in a small cyan label.
 * Hidden on touch devices (no fine pointer).
 */
export function CursorTracker() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [enabled, setEnabled] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse)
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);

    const onMove = (e: MouseEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setPos({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
      });
    };
    const onLeave = () => setPos(null);

    if (mq.matches) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onLeave);
    }

    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled || !pos) return null;

  return (
    <div
      className="pointer-events-none fixed z-[60] bp-font-mono"
      style={{ left: pos.x, top: pos.y, transform: "translate(0, 0)" }}
      aria-hidden
    >
      {/* vertical line spanning viewport at cursor X */}
      <span className="fixed left-0 top-0 h-screen w-px -translate-x-1/2 bg-[rgba(255,255,255,0.18)]" style={{ left: pos.x }} />
      {/* horizontal line spanning viewport at cursor Y */}
      <span className="fixed left-0 top-0 w-screen h-px -translate-y-1/2 bg-[rgba(255,255,255,0.18)]" style={{ top: pos.y }} />
      {/* center crosshair */}
      <span className="absolute left-1/2 top-1/2 block h-6 w-6 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white" />
        <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-white" />
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-[#0a0a0a]" />
      </span>
      {/* coordinate label */}
      <span className="absolute left-5 top-5 whitespace-nowrap bg-[#0a0a0a] px-1.5 py-0.5 text-[10px] tracking-widest bp-cyan bp-font-mono">
        x:{pos.x},y:{pos.y}
      </span>
    </div>
  );
}
