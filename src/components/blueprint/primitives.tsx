"use client";

import * as React from "react";

/**
 * BlueprintCard — the wireframe container.
 * Thin white outline + crosshair intersections at the corners.
 * Aligns strictly to the master grid.
 */
export function BlueprintCard({
  children,
  className,
  coords,
  serial,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  coords?: string;
  serial?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children">) {
  return (
    <div
      className={`relative border border-[rgba(255,255,255,0.8)] bg-[rgba(0,42,82,0.55)] backdrop-blur-[1px] bp-fade-up ${className ?? ""}`}
      style={{ animationDelay: "0.1s" }}
      {...props}
    >
      {/* Crosshair corner markers — drafting intersections */}
      <CornerCrosshair className="-left-[5px] -top-[5px]" />
      <CornerCrosshair className="-right-[5px] -top-[5px]" />
      <CornerCrosshair className="-left-[5px] -bottom-[5px]" />
      <CornerCrosshair className="-right-[5px] -bottom-[5px]" />

      {/* Top-left coordinate tag */}
      {coords && (
        <div className="absolute -top-[18px] left-3 z-10 bg-[#003366] px-1.5 text-[10px] leading-none tracking-widest bp-text-faint bp-font-mono">
          {coords}
        </div>
      )}
      {/* Top-right serial tag */}
      {serial && (
        <div className="absolute -top-[18px] right-3 z-10 bg-[#003366] px-1.5 text-[10px] leading-none tracking-widest bp-text-dim bp-font-mono">
          {serial}
        </div>
      )}
      {children}
    </div>
  );
}

function CornerCrosshair({ className }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute z-10 block h-[9px] w-[9px] ${className ?? ""}`}
      aria-hidden
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[rgba(255,255,255,0.85)]" />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-[rgba(255,255,255,0.85)]" />
    </span>
  );
}

/**
 * DimensionLine — a divider with measurement arrows at each end.
 * e.g.  <--- 1200px --->
 */
export function DimensionLine({
  label,
  className,
  vertical = false,
}: {
  label?: string;
  className?: string;
  vertical?: boolean;
}) {
  if (vertical) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center ${className ?? ""}`}
        style={{ width: "1px" }}
      >
        {/* arrow top */}
        <svg width="16" height="10" viewBox="0 0 16 10" className="-mb-px">
          <path d="M8 10 L8 0 M4 4 L8 0 L12 4" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
        </svg>
        <div className="flex-1 w-px bg-[rgba(255,255,255,0.8)]" />
        {label && (
          <span className="absolute left-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#003366] px-1 text-[10px] tracking-widest bp-text-dim bp-font-mono">
            {label}
          </span>
        )}
        <svg width="16" height="10" viewBox="0 0 16 10" className="-mt-px">
          <path d="M8 0 L8 10 M4 6 L8 10 L12 6" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
        </svg>
      </div>
    );
  }
  return (
    <div className={`relative flex items-center justify-center ${className ?? ""}`}>
      {/* arrow left */}
      <svg width="10" height="16" viewBox="0 0 10 16" className="-mr-px shrink-0">
        <path d="M10 8 L0 8 M4 4 L0 8 L4 12" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
      </svg>
      <div className="h-px flex-1 bg-[rgba(255,255,255,0.8)]" />
      {label && (
        <span className="mx-2 whitespace-nowrap bg-[#003366] px-1.5 text-[10px] tracking-widest bp-text-dim bp-font-mono">
          {label}
        </span>
      )}
      <svg width="10" height="16" viewBox="0 0 10 16" className="-ml-px shrink-0">
        <path d="M0 8 L10 8 M6 4 L10 8 L6 12" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
      </svg>
    </div>
  );
}

/**
 * CoordinateLabel — a floating x:/y: tag pinned to an element.
 */
export function CoordinateLabel({
  x,
  y,
  className,
}: {
  x: number;
  y: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 bg-[#003366] px-1 text-[10px] tracking-widest bp-cyan bp-font-mono ${className ?? ""}`}
    >
      x:{x},y:{y}
    </span>
  );
}

/**
 * RedlineNote — a hand-written "margin comment" in Architects Daughter,
 * with a leader line pointing toward the subject.
 */
export function RedlineNote({
  children,
  className,
  flip = false,
}: {
  children: React.ReactNode;
  className?: string;
  flip?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-2 bp-font-architects bp-red ${flip ? "flex-row-reverse" : ""} ${className ?? ""}`}
      style={{ fontSize: "15px", lineHeight: 1.25 }}
    >
      <svg width="34" height="24" viewBox="0 0 34 24" className="mt-1 shrink-0">
        <path
          d="M2 22 C 10 18, 20 10, 30 4"
          fill="none"
          stroke="#ff3333"
          strokeWidth="1.4"
          strokeDasharray="3 3"
        />
        <path d="M30 4 L 26 6 M30 4 L 30 9" stroke="#ff3333" strokeWidth="1.4" fill="none" />
      </svg>
      <span className="italic">{children}</span>
    </div>
  );
}

/**
 * SectionTitle — block caps heading with a serial number.
 */
export function SectionTitle({
  index,
  title,
  subtitle,
  className,
}: {
  index: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="flex items-baseline gap-3">
        <span className="bp-cyan bp-font-mono text-[11px] tracking-[0.3em]">
          [ {index} ]
        </span>
        <h2 className="bp-font-mono text-2xl font-bold uppercase tracking-[0.18em] bp-text-line sm:text-3xl">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="mt-1 pl-1 text-[12px] tracking-widest bp-text-dim bp-font-mono">
          {subtitle}
        </p>
      )}
      <div className="mt-3 h-px w-full bg-[rgba(255,255,255,0.8)]" />
      <div className="mt-[3px] h-px w-full bg-[rgba(255,255,255,0.2)]" />
    </div>
  );
}

/**
 * TechnicalStamp — looks like an "APPROVED" / "RECEIVED" stamp box.
 */
export function TechnicalStamp({
  label,
  className,
  accent = "line",
}: {
  label: string;
  className?: string;
  accent?: "line" | "cyan" | "red";
}) {
  const color =
    accent === "cyan"
      ? "bp-border-cyan bp-cyan"
      : accent === "red"
        ? "bp-border-red bp-red"
        : "bp-border-line bp-text-line";
  return (
    <span
      className={`inline-flex items-center gap-1 border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] bp-font-mono ${color} ${className ?? ""}`}
    >
      {label}
    </span>
  );
}
