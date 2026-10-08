"use client";

import * as React from "react";
import { useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  GraduationCap,
  Code2,
  Cpu,
  Database,
  CircuitBoard,
  Terminal,
  GitBranch,
  Briefcase,
  Trophy,
  Ruler,
  Crosshair,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { CursorTracker } from "@/components/blueprint/cursor-tracker";
import {
  BlueprintCard,
  DimensionLine,
  RedlineNote,
  SectionTitle,
  TechnicalStamp,
  CoordinateLabel,
} from "@/components/blueprint/primitives";
import { useInView } from "@/components/blueprint/use-in-view";

/* ============================ DATA ============================ */

const PROFILE = {
  name: "Md. Farhad Hossain Ovi",
  handle: "obsfusc8",
  role: "STATISTICS UNDERGRAD · DATA STORYTELLER · ARDUINO TINKERER",
  location: "Sylhet, Bangladesh",
  email: "contact.farhad.h.ovi@gmail.com",
  linkedin: "https://www.linkedin.com/in/ovi-aka-obsfusc8/",
  github: "https://github.com/obsfusc8",
  education: "BSc. in Statistics — Shahjalal University of Science & Technology",
  year: "Junior Year",
  bio: "Statistics undergrad at SUST who believes data tells stories — and sometimes those stories involve a broken sensor, a suspiciously behaving dataset, and a lot of debugging. Academic world: probability, regression, time-series. Experimental world: Python notebooks and Arduino boards. Interested in data-for-good, robotics competitions, and conversations with people building things that are slightly ambitious and occasionally held together by creativity.",
};

const LANGUAGES = ["C", "C++", "Python", "R", "MySQL", "Arduino"];
const SOFTWARE = ["SPSS", "STATA", "Excel"];
const TECH = [
  { label: "Git", icon: GitBranch },
  { label: "Linux", icon: Terminal },
];

const PROJECTS = [
  {
    no: "01",
    name: "Bangladesh Conflict & Demonstration Dynamics",
    span: "2010 — 2026",
    tag: "CONFLICT ANALYTICS",
    desc: "A 16-year geospatial and time-series study of demonstrations, unrest, and conflict events across Bangladesh — mapping how protest dynamics shift over time and region.",
    stack: ["Python", "R", "Time-Series", "Geospatial"],
    href: "https://github.com/obsfusc8/Bangladesh---Conflict-Events-Analysis",
    redline: "16 years of unrest, plotted on one sheet",
  },
  {
    no: "02",
    name: "Will the 2026 National Pay Scale Push Inflation Up?",
    span: "FORECAST",
    tag: "MACRO FORECAST",
    desc: "A modelling exercise tying the 2026 national pay scale revision to CPI inflation trajectories — does a wage bump ripple into prices, or soak into productivity?",
    stack: ["R", "Regression", "Forecasting"],
    href: "https://github.com/obsfusc8/bd-payscale-inflation",
    redline: "wages up → prices up? model says…",
  },
  {
    no: "03",
    name: "Sylhet Rail–Road GIS Analysis",
    span: "GIS",
    tag: "SPATIAL MAPPING",
    desc: "GIS mapping of Sylhet's rail and road network — analysing connectivity, gaps, and the spatial logic of how the region moves.",
    stack: ["GIS", "Python", "Spatial Analysis"],
    href: "https://github.com/obsfusc8/sylhet-rail-road-gis-analysis",
    redline: "where the tracks meet (and don't)",
  },
  {
    no: "04",
    name: "desk-buddy-showcase",
    span: "SHOWCASE",
    tag: "HARDWARE DEMO",
    desc: "A showcase build for a desk companion project — the kind of thing that sits on a workbench and occasionally blinks back at you.",
    stack: ["Arduino", "Embedded", "Showcase"],
    href: "https://github.com/obsfusc8/desk-buddy-showcase",
    redline: "it lives on the desk now",
  },
  {
    no: "05",
    name: "ESP32 Smart Hub — Bluetooth Home Automation",
    span: "IoT",
    tag: "HOME AUTOMATION",
    desc: "A Bluetooth-based home automation controller built on the ESP32 — lights, appliances, and a hub that talks to all of them over the air.",
    stack: ["ESP32", "Bluetooth", "C++", "IoT"],
    href: "https://github.com/obsfusc8/Smart-Home-Controller",
    redline: "one hub to rule the lights",
  },
];

const EXPERIENCE = [
  {
    no: "EXP-01",
    role: "Senior Executive Officer",
    org: "Earth's Ant",
    period: "Oct 2021 — Jan 2024",
    duration: "2 yr 4 mo",
    note: "Operations & executive function across the organisation's day-to-day machinery.",
    coords: "x:040, y:008",
  },
  {
    no: "EXP-02",
    role: "Assistant Treasurer",
    org: "RoboSUST",
    period: "Jun 2025 — Jun 2026",
    duration: "1 yr",
    note: "Started as Assistant Secretary of Project & Planning, then moved into the Assistant Treasurer role — budgets, planning, and a robotics club that builds slightly ambitious things.",
    coords: "x:040, y:182",
  },
];

const ACHIEVEMENTS = [
  {
    no: "ACH-01",
    title: "6th Position — The Doomsday Protocol",
    sub: "Science Hackathon 2026 · SUST Science Arena",
    stamp: "PLACED",
  },
  {
    no: "ACH-02",
    title: "Finalist — IPESphere",
    sub: "National Business Case Competition",
    stamp: "FINALIST",
  },
];

/* ============================ SCAN LINE ============================ */

function ScanLine() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[55] overflow-hidden" aria-hidden>
      <div
        className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#00ffff]/30 to-transparent"
        style={{ animation: "bp-scan 9s linear infinite" }}
      />
    </div>
  );
}

/* ============================ NAV ============================ */

function Nav() {
  const links = [
    { href: "#subject", label: "SUBJECT" },
    { href: "#stack", label: "STACK" },
    { href: "#works", label: "WORKS" },
    { href: "#history", label: "HISTORY" },
    { href: "#honors", label: "HONORS" },
    { href: "#contact", label: "CONTACT" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-[rgba(255,255,255,0.8)] bg-[#003366]/95 backdrop-blur-sm">
      {/* top dimension strip */}
      <div className="border-b border-[rgba(255,255,255,0.2)] bp-font-mono text-[10px] tracking-widest bp-text-faint">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1">
          <span>SHEET 01 / 01 · SCALE 1:1 · UNIT px</span>
          <span className="hidden sm:inline">DRAFT — REV.A · NOT FOR CONSTRUCTION</span>
          <span className="bp-cyan bp-blink">● REC</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <a href="#top" className="group flex items-center gap-2.5">
          <Crosshair className="h-5 w-5 text-[#00ffff]" strokeWidth={1.4} />
          <span className="bp-font-mono text-sm font-bold uppercase tracking-[0.2em] bp-text-line">
            M.F.H. OVI
          </span>
          <span className="hidden bp-font-mono text-[10px] tracking-widest bp-text-dim md:inline">
            / obsfusc8
          </span>
        </a>
        <nav className="hidden items-center gap-1 bp-font-mono text-[11px] tracking-widest md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="border border-transparent px-2.5 py-1 bp-text-dim transition-colors hover:border-[rgba(255,255,255,0.8)] hover:bg-[rgba(0,255,255,0.08)] hover:text-[#00ffff]"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 border border-[rgba(255,255,255,0.8)] px-2.5 py-1 bp-font-mono text-[11px] tracking-widest bp-text-line transition-colors hover:bg-[#00ffff] hover:text-[#003366]"
        >
          <Github className="h-3.5 w-3.5" strokeWidth={1.6} />
          <span className="hidden sm:inline">SOURCE</span>
        </a>
      </div>
    </header>
  );
}

/* ============================ HERO ============================ */

function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section id="top" ref={ref} className="relative mx-auto max-w-7xl px-4 pt-10 pb-16 sm:pt-16 sm:pb-24">
      {/* corner register marks */}
      <RegisterMark className="left-2 top-2" />
      <RegisterMark className="right-2 top-2" />

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left: title block */}
        <div className="lg:col-span-8">
          {/* tiny spec line */}
          <div className="mb-4 flex flex-wrap items-center gap-2 bp-font-mono text-[10px] tracking-widest bp-text-dim">
            <span className="bp-cyan">●</span>
            <span>FILE: portfolio.ovi.revA</span>
            <span className="bp-text-faint">·</span>
            <span>ORIGIN: 24.8947°N, 91.8687°E</span>
            <span className="bp-text-faint">·</span>
            <span className="bp-text-faint">SYLHET, BD</span>
          </div>

          <h1
            className="bp-font-mono text-[clamp(2.2rem,7vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-tight bp-text-line"
            style={inView ? { animation: "bp-fade-up 0.7s ease forwards" } : { opacity: 0 }}
          >
            Md. Farhad
            <br />
            Hossain Ovi
          </h1>

          {/* role underline */}
          <div className="mt-4 flex items-center gap-3">
            <div className="h-px w-8 bg-[#ff3333]" />
            <p className="bp-font-mono text-[11px] tracking-[0.28em] bp-red sm:text-xs">
              {PROFILE.role}
            </p>
          </div>

          <p className="mt-7 max-w-2xl bp-font-architects text-[17px] leading-relaxed bp-text-line sm:text-[19px]">
            {PROFILE.bio}
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#works"
              className="group flex items-center gap-2 border border-[#ff3333] bg-[#ff3333]/10 px-4 py-2.5 bp-font-mono text-xs font-bold uppercase tracking-widest bp-red transition-colors hover:bg-[#ff3333] hover:text-white"
            >
              <span>View Works</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              className="flex items-center gap-2 border border-[rgba(255,255,255,0.8)] px-4 py-2.5 bp-font-mono text-xs font-bold uppercase tracking-widest bp-text-line transition-colors hover:bg-[#00ffff] hover:text-[#003366]"
            >
              <Mail className="h-3.5 w-3.5" strokeWidth={1.8} />
              <span>Contact</span>
            </a>
            <div className="hidden items-center gap-2 bp-font-mono text-[10px] tracking-widest bp-text-faint sm:flex">
              <CoordinateLabel x={0} y={0} /> hover anywhere →
            </div>
          </div>
        </div>

        {/* Right: spec sheet card */}
        <div className="lg:col-span-4">
          <BlueprintCard coords="x:580,y:040" serial="SPEC-001" className="h-full">
            <div className="border-b border-[rgba(255,255,255,0.2)] px-4 py-2.5 bp-font-mono text-[10px] tracking-widest bp-cyan">
              ◣ SUBJECT SPECIFICATION
            </div>
            <dl className="divide-y divide-[rgba(255,255,255,0.15)] bp-font-mono text-[11px]">
              <SpecRow k="NAME" v="Md. Farhad Hossain Ovi" />
              <SpecRow k="HANDLE" v="@obsfusc8" />
              <SpecRow k="LOCATION" v="Sylhet, Bangladesh" />
              <SpecRow k="DISCIPLINE" v="Statistics" />
              <SpecRow k="INSTITUTE" v="SUST" />
              <SpecRow k="YEAR" v="Junior · BSc" />
              <SpecRow k="FOCUS" v="Prob · Regression · TS" />
              <SpecRow k="BUILD" v="data + hardware" />
            </dl>
            <div className="border-t border-[rgba(255,255,255,0.2)] px-4 py-2 bp-font-mono text-[10px] tracking-widest bp-text-faint">
              STATUS: <span className="bp-cyan">ACTIVE</span> · LAST EDIT: NOW
            </div>
          </BlueprintCard>
          <div className="mt-3 flex justify-end">
            <RedlineNote flip>subject is wired, not wired-up</RedlineNote>
          </div>
        </div>
      </div>

      {/* bottom dimension */}
      <div className="mt-12">
        <DimensionLine label="<--- 1200px VIEWPORT GRID --->" />
      </div>
    </section>
  );
}

function SpecRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-2 px-4 py-2">
      <dt className="bp-text-dim">{k}</dt>
      <dd className="bp-text-line">{v}</dd>
    </div>
  );
}

function RegisterMark({ className }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute z-20 block h-5 w-5 ${className ?? ""}`}
      aria-hidden
    >
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#00ffff]/60" />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-[#00ffff]/60" />
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00ffff]" />
    </span>
  );
}

/* ============================ ABOUT / STACK ============================ */

function About() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <section id="subject" ref={ref} className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20">
      <SectionTitle
        index="§ 01"
        title="The Subject"
        subtitle="A STATISTICS UNDERGRAD WHO BELIEVES DATA TELLS STORIES"
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        {/* Bio block */}
        <BlueprintCard coords="x:000,y:000" serial="BIO-01" className="lg:col-span-7 p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[#00ffff]" strokeWidth={1.6} />
            <h3 className="bp-font-mono text-xs font-bold uppercase tracking-widest bp-text-line">
              Education
            </h3>
          </div>
          <p className="bp-font-architects text-[17px] leading-relaxed bp-text-line sm:text-[19px]">
            {PROFILE.education}
          </p>
          <p className="mt-1 bp-font-mono text-[11px] tracking-widest bp-cyan">
            {PROFILE.year.toUpperCase()}
          </p>
          <div className="mt-5 border-t border-[rgba(255,255,255,0.15)] pt-4">
            <p className="bp-font-architects text-[15px] leading-relaxed bp-text-dim sm:text-[16px]">
              The academic world revolves around probability, regression, and time-series. The
              experimental world lives somewhere between Python notebooks and Arduino boards —
              data-for-good, robotics, and conversations with people building slightly ambitious
              things, occasionally held together by creativity.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <TechnicalStamp label="DATA-FOR-GOOD" accent="cyan" />
            <TechnicalStamp label="ROBOTICS" />
            <TechnicalStamp label="HACKATHON-READY" accent="red" />
          </div>
        </BlueprintCard>

        {/* Stack block */}
        <div id="stack" className="lg:col-span-5">
          <BlueprintCard coords="x:580,y:000" serial="STK-01" className="h-full p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Code2 className="h-4 w-4 text-[#00ffff]" strokeWidth={1.6} />
              <h3 className="bp-font-mono text-xs font-bold uppercase tracking-widest bp-text-line">
                Technical Stack
              </h3>
            </div>

            <StackRow icon={CircuitBoard} label="LANGUAGES" items={LANGUAGES} />
            <StackRow icon={Database} label="SOFTWARE" items={SOFTWARE} />
            <StackRow
              icon={Cpu}
              label="TECHNOLOGIES"
              items={TECH.map((t) => t.label)}
            />

            {/* little radial mini-chart of focus areas */}
            <div className="mt-5 border-t border-[rgba(255,255,255,0.15)] pt-4">
              <p className="mb-3 bp-font-mono text-[10px] tracking-widest bp-text-dim">
                FOCUS DISTRIBUTION
              </p>
              <FocusBars />
            </div>
          </BlueprintCard>
        </div>
      </div>
    </section>
  );
}

function StackRow({
  icon: Icon,
  label,
  items,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  items: string[];
}) {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center gap-2 bp-font-mono text-[10px] tracking-widest bp-text-dim">
        <Icon className="h-3.5 w-3.5 text-[#00ffff]" strokeWidth={1.6} />
        <span>{label}</span>
        <div className="h-px flex-1 bg-[rgba(255,255,255,0.15)]" />
        <span className="bp-text-faint">{items.length} ITEMS</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((it) => (
          <span
            key={it}
            className="border border-[rgba(255,255,255,0.8)] bg-[rgba(0,255,255,0.06)] px-2 py-1 bp-font-mono text-[11px] tracking-wider bp-text-line transition-colors hover:border-[#00ffff] hover:text-[#00ffff]"
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

function FocusBars() {
  const data = [
    { label: "Probability & Regression", pct: 88 },
    { label: "Time-Series", pct: 72 },
    { label: "Python Notebooks", pct: 80 },
    { label: "Arduino / Embedded", pct: 64 },
  ];
  return (
    <ul className="space-y-2.5 bp-font-mono text-[10px] tracking-widest">
      {data.map((d, i) => (
        <li key={d.label}>
          <div className="mb-1 flex items-center justify-between">
            <span className="bp-text-dim">{d.label.toUpperCase()}</span>
            <span className="bp-cyan">{d.pct}%</span>
          </div>
          <div className="relative h-2 w-full border border-[rgba(255,255,255,0.25)] bg-[rgba(0,0,0,0.2)]">
            <div
              className="h-full bg-[#00ffff]/70"
              style={{ width: `${d.pct}%`, transition: "width 1.2s ease" }}
            />
            {/* tick marks */}
            <div className="absolute inset-0 flex justify-between">
              {Array.from({ length: 9 }).map((_, k) => (
                <span key={k} className="h-full w-px bg-[rgba(0,0,0,0.4)]" />
              ))}
            </div>
          </div>
          <span className="mt-0.5 block bp-text-faint">x:{i * 140},y:{80 + i * 28}</span>
        </li>
      ))}
    </ul>
  );
}

/* ============================ PROJECTS ============================ */

function Projects() {
  return (
    <section id="works" className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20">
      <SectionTitle
        index="§ 02"
        title="Built Works"
        subtitle="05 PROJECTS · DRAWN TO SCALE · NOT ALWAYS TO PLAN"
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.no} p={p} featured={i === 0} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  p,
  featured,
}: {
  p: (typeof PROJECTS)[number];
  featured?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <BlueprintCard
      ref={ref}
      coords={`x:${(Number(p.no) - 1) * 240},y:000`}
      serial={`PRJ-${p.no}`}
      className={`group flex flex-col p-5 transition-colors hover:border-[#00ffff] sm:p-6 ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      {/* header row */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="bp-font-mono text-3xl font-bold leading-none bp-cyan sm:text-4xl">
            {p.no}
          </span>
          <div>
            <h3 className="bp-font-mono text-base font-bold uppercase leading-tight tracking-wide bp-text-line sm:text-lg">
              {p.name}
            </h3>
            <span className="bp-font-mono text-[10px] tracking-widest bp-text-dim">
              {p.tag} · {p.span}
            </span>
          </div>
        </div>
        <TechnicalStamp label={featured ? "FEATURED" : "BUILT"} accent={featured ? "red" : "line"} />
      </div>

      {/* divider */}
      <div className="mb-4">
        <DimensionLine label={`<--- ${featured ? "FULL WIDTH" : "HALF"} --->`} />
      </div>

      {/* description */}
      <p className="flex-1 bp-font-architects text-[15px] leading-relaxed bp-text-line sm:text-[16px]">
        {p.desc}
      </p>

      {/* stack chips */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <span
            key={s}
            className="border border-[rgba(255,255,255,0.25)] px-1.5 py-0.5 bp-font-mono text-[10px] tracking-wider bp-text-dim"
          >
            {s}
          </span>
        ))}
      </div>

      {/* footer row */}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[rgba(255,255,255,0.15)] pt-3">
        <span className="bp-font-mono text-[10px] tracking-widest bp-text-faint">
          REPO: github.com/obsfusc8
        </span>
        <a
          href={p.href}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 border border-[rgba(255,255,255,0.8)] px-2.5 py-1 bp-font-mono text-[10px] font-bold uppercase tracking-widest bp-text-line transition-colors hover:bg-[#00ffff] hover:text-[#003366]"
        >
          <Github className="h-3 w-3" strokeWidth={1.8} />
          <span>OPEN</span>
          <ExternalLink className="h-3 w-3" strokeWidth={1.8} />
        </a>
      </div>

      {/* redline margin note */}
      <div className="mt-3">
        <RedlineNote>{p.redline}</RedlineNote>
      </div>
    </BlueprintCard>
  );
}

/* ============================ EXPERIENCE ============================ */

function Experience() {
  return (
    <section id="history" className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20">
      <SectionTitle
        index="§ 03"
        title="Work History"
        subtitle="02 ROLES · TIMELINE DRAWN LEFT → RIGHT"
      />

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {EXPERIENCE.map((e) => (
          <BlueprintCard key={e.no} coords={e.coords} serial={e.no} className="p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[rgba(255,255,255,0.8)] bg-[rgba(0,255,255,0.06)]">
                <Briefcase className="h-5 w-5 text-[#00ffff]" strokeWidth={1.6} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="bp-font-mono text-base font-bold uppercase tracking-wide bp-text-line">
                  {e.role}
                </h3>
                <p className="bp-font-mono text-[11px] tracking-widest bp-cyan">
                  {e.org}
                </p>
              </div>
            </div>

            {/* period strip */}
            <div className="mt-4 border-y border-[rgba(255,255,255,0.15)] py-2 bp-font-mono text-[10px] tracking-widest bp-text-dim">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3" strokeWidth={1.6} />
                  {e.period}
                </span>
                <span className="bp-text-faint">DURATION: {e.duration}</span>
              </div>
            </div>

            <p className="mt-4 bp-font-architects text-[15px] leading-relaxed bp-text-line sm:text-[16px]">
              {e.note}
            </p>

            {/* mini timeline bar */}
            <div className="mt-5">
              <div className="mb-1.5 flex items-center justify-between bp-font-mono text-[9px] tracking-widest bp-text-faint">
                <span>START</span>
                <span>NOW</span>
              </div>
              <div className="relative h-2 w-full border border-[rgba(255,255,255,0.25)] bg-[rgba(0,0,0,0.25)]">
                <div className="h-full w-full bg-[#00ffff]/40" />
                <span className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 border border-[#00ffff] bg-[#003366]" />
                <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 border border-[#ff3333] bg-[#003366] bp-pulse-red" />
              </div>
            </div>
          </BlueprintCard>
        ))}
      </div>
    </section>
  );
}

/* ============================ ACHIEVEMENTS ============================ */

function Achievements() {
  return (
    <section id="honors" className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20">
      <SectionTitle
        index="§ 04"
        title="Honors & Stamps"
        subtitle="02 AWARDS · APPROVED WITH RED INK"
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {ACHIEVEMENTS.map((a) => (
          <BlueprintCard key={a.no} coords="x:000,y:000" serial={a.no} className="p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#ff3333] bg-[#ff3333]/10 bp-pulse-red">
                <Trophy className="h-6 w-6 text-[#ff3333]" strokeWidth={1.6} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="bp-font-mono text-base font-bold uppercase leading-tight tracking-wide bp-text-line sm:text-lg">
                  {a.title}
                </h3>
                <p className="mt-1 bp-font-architects text-[14px] bp-text-dim sm:text-[15px]">
                  {a.sub}
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-[rgba(255,255,255,0.15)] pt-3">
              <span className="bp-font-mono text-[10px] tracking-widest bp-text-faint">
                VERIFIED · REDLINE
              </span>
              <TechnicalStamp label={a.stamp} accent="red" />
            </div>
          </BlueprintCard>
        ))}
      </div>
    </section>
  );
}

/* ============================ CONTACT / TITLE BLOCK ============================ */

function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <footer id="contact" className="mt-auto border-t border-[rgba(255,255,255,0.8)] bg-[#002a52]">
      {/* dimension strip */}
      <div className="border-b border-[rgba(255,255,255,0.2)] bp-font-mono text-[10px] tracking-widest bp-text-faint">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1">
          <span>END OF SHEET</span>
          <span className="hidden sm:inline">TOTAL PAGES: 01</span>
          <span>● DRAWN BY: M.F.H. OVI</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* contact column */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 bp-font-mono text-[11px] tracking-widest bp-cyan">
              <Ruler className="h-3.5 w-3.5" strokeWidth={1.6} />
              <span>§ 05 · LINES OF COMMUNICATION</span>
            </div>
            <h2 className="mt-3 bp-font-mono text-2xl font-bold uppercase tracking-[0.15em] bp-text-line sm:text-4xl">
              Let&rsquo;s build
              <br />
              something.
            </h2>
            <p className="mt-3 max-w-md bp-font-architects text-[16px] leading-relaxed bp-text-dim sm:text-[17px]">
              Conversations welcome with people building things that are slightly ambitious and
              occasionally held together by creativity.
            </p>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              <ContactLink
                href={`mailto:${PROFILE.email}`}
                icon={Mail}
                label="EMAIL"
                value={PROFILE.email}
                onCopy={copy}
                copied={copied}
              />
              <ContactLink
                href={PROFILE.github}
                icon={Github}
                label="GITHUB"
                value="github.com/obsfusc8"
              />
              <ContactLink
                href={PROFILE.linkedin}
                icon={Linkedin}
                label="LINKEDIN"
                value="in/ovi-aka-obsfusc8"
              />
              <ContactLink
                href="#top"
                icon={MapPin}
                label="BASE"
                value="Sylhet, Bangladesh"
              />
            </div>
          </div>

          {/* title block — like a real blueprint sheet */}
          <div className="lg:col-span-5">
            <div className="border border-[rgba(255,255,255,0.8)]">
              {/* banner */}
              <div className="border-b border-[rgba(255,255,255,0.8)] bg-[rgba(0,255,255,0.08)] px-4 py-2 bp-font-mono text-[10px] font-bold tracking-widest bp-cyan">
                ◣ TITLE BLOCK · SHEET 01 OF 01
              </div>
              <table className="w-full bp-font-mono text-[10px] tracking-widest">
                <tbody className="divide-y divide-[rgba(255,255,255,0.15)]">
                  <TitleRow k="PROJECT" v="PORTFOLIO" />
                  <TitleRow k="DRAWING TITLE" v="M.F.H. OVI · MASTER PLAN" />
                  <TitleRow k="DRAWN BY" v="obsfusc8" />
                  <TitleRow k="CHECKED" v="—" />
                  <TitleRow k="SCALE" v="1:1 @ 20PX GRID" />
                  <TitleRow k="UNIT" v="PIXEL (px)" />
                  <TitleRow k="DATE" v="REV.A" />
                  <TitleRow k="STATUS" v="ACTIVE" cyan />
                  <TitleRow k="DISCIPLINE" v="STATISTICS + HARDWARE" />
                </tbody>
              </table>
              {/* footer of title block */}
              <div className="grid grid-cols-3 border-t border-[rgba(255,255,255,0.8)] bp-font-mono text-[9px] tracking-widest bp-text-faint">
                <div className="border-r border-[rgba(255,255,255,0.2)] px-3 py-2">
                  <div className="bp-text-faint">REV</div>
                  <div className="bp-text-line">A</div>
                </div>
                <div className="border-r border-[rgba(255,255,255,0.2)] px-3 py-2">
                  <div className="bp-text-faint">SHEET</div>
                  <div className="bp-text-line">01</div>
                </div>
                <div className="px-3 py-2">
                  <div className="bp-text-faint">OF</div>
                  <div className="bp-text-line">01</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* signature line */}
        <div className="mt-12">
          <DimensionLine label="<--- END OF DRAWING · 2026 --->" />
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-3 bp-font-mono text-[10px] tracking-widest bp-text-faint sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} MD. FARHAD HOSSAIN OVI · ALL LINES RESERVED</span>
          <span className="flex items-center gap-2">
            <span className="bp-cyan bp-blink">●</span>
            DRAFTED ON THE 20PX MASTER GRID · SYLHET
          </span>
        </div>
      </div>
    </footer>
  );
}

function TitleRow({ k, v, cyan }: { k: string; v: string; cyan?: boolean }) {
  return (
    <tr>
      <td className="w-1/2 border-r border-[rgba(255,255,255,0.15)] px-3 py-1.5 bp-text-faint">
        {k}
      </td>
      <td className={`px-3 py-1.5 ${cyan ? "bp-cyan" : "bp-text-line"}`}>{v}</td>
    </tr>
  );
}

function ContactLink({
  href,
  icon: Icon,
  label,
  value,
  onCopy,
  copied,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  onCopy?: () => void;
  copied?: boolean;
}) {
  return (
    <div className="group flex items-center gap-3 border border-[rgba(255,255,255,0.8)] p-2.5 transition-colors hover:border-[#00ffff] hover:bg-[rgba(0,255,255,0.06)]">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[rgba(255,255,255,0.25)]">
        <Icon className="h-4 w-4 text-[#00ffff]" strokeWidth={1.6} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="bp-font-mono text-[9px] tracking-widest bp-text-faint">{label}</div>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className="block truncate bp-font-mono text-[11px] tracking-wide bp-text-line group-hover:text-[#00ffff]"
        >
          {value}
        </a>
      </div>
      {onCopy && (
        <button
          onClick={onCopy}
          className="border border-[rgba(255,255,255,0.4)] px-2 py-1 bp-font-mono text-[9px] tracking-widest bp-text-dim transition-colors hover:border-[#00ffff] hover:text-[#00ffff]"
        >
          {copied ? "COPIED ✓" : "COPY"}
        </button>
      )}
    </div>
  );
}

/* ============================ PAGE ============================ */

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#003366] bp-grid-coarse">
      <CursorTracker />
      <ScanLine />
      <Nav />
      <main className="flex-1">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Achievements />
      </main>
      <Contact />
    </div>
  );
}
