import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  ArrowRight, Sparkles, Bot, Play, Compass, Workflow, Network, Lock, Telescope, Users, ShieldCheck, LineChart, MessageSquare, Brain, Code2, Wand2, FileText, Star, Plus, LayoutGrid, BarChart3, GitBranch, Cpu, Database, Bell, Clock
} from "lucide-react";
import { Sun, Moon } from "lucide-react";

type Theme = "light" | "dark";
function useTheme(): [Theme, (t: Theme) => void, () => void] {
  const [theme, setThemeState] = useState<Theme>("light");
  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("vitamin-theme")) as Theme | null;
    const systemDark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial: Theme = stored ?? (systemDark ? "dark" : "light");
    setThemeState(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);
  const setTheme = (t: Theme) => {
    setThemeState(t);
    document.documentElement.classList.toggle("dark", t === "dark");
    try { localStorage.setItem("vitamin-theme", t); } catch {}
  };
  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");
  return [theme, setTheme, toggle];
}

function ThemeToggle({ mode, onChange, size = "default" }: { mode: Theme; onChange: (t: Theme) => void; size?: "sm" | "default" }) {
  const pad = size === "sm" ? "h-7 px-2.5 text-[11px]" : "h-8 px-3 text-xs";
  return (
    <div role="radiogroup" aria-label="Color theme" className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 shadow-xs">
      <button
        role="radio"
        aria-checked={mode === "light"}
        onClick={() => onChange("light")}
        className={`${pad} inline-flex items-center gap-1.5 rounded-full font-medium transition-soft ${mode === "light" ? "bg-foreground text-background shadow-soft" : "text-muted-foreground hover:text-foreground"}`}
      >
        <Sun className="h-3.5 w-3.5" /> Light
      </button>
      <button
        role="radio"
        aria-checked={mode === "dark"}
        onClick={() => onChange("dark")}
        className={`${pad} inline-flex items-center gap-1.5 rounded-full font-medium transition-soft ${mode === "dark" ? "bg-foreground text-background shadow-soft" : "text-muted-foreground hover:text-foreground"}`}
      >
        <Moon className="h-3.5 w-3.5" /> Dark
      </button>
    </div>
  );
}

function ExampleAgenticPlatform() {
    const [theme, setTheme] = useTheme();
  // Live ticker — rotating "agent activity" lines for the inspirational hero
  const tickerLines = [
    { who: "Onboarding Buddy", what: "guided 12 new joiners through SSO this morning" },
    { who: "Repo Sentinel", what: "auto-archived 47 stale repositories across the org" },
    { who: "Ticket Triage", what: "resolved 21 P3 incidents without human input" },
    { who: "Doc Synth", what: "summarised the May post-mortem for leadership" },
    { who: "Cost Sense", what: "spotted a $4.2k anomaly in cloud spend" },
  ];
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => (t + 1) % tickerLines.length), 3200);
    return () => clearInterval(id);
  }, [tickerLines.length]);

  const [selectedLayer, setSelectedLayer] = useState(0);

  // 5 layers — exploratory: select on hover/click, large detail panel reflects choice
  type Layer = {
    n: string; title: string; verb: string; tagline: string; desc: string; cta: string;
    iconClass: string; ringClass: string; Icon: typeof Compass; sample: string[];
    comingSoon?: boolean;
    noCodeCta?: string;
  };
  const layers: Layer[] = [
    {
      n: "01", title: "Discover", verb: "Find",
      tagline: "An internal marketplace for agents.",
      desc: "Browse, search and reuse the agents your colleagues already built. Every agent shows ratings, owners, scope and live usage.",
      cta: "Notify me when Agent Catalogue becomes available",
      iconClass: "bg-ai/10 text-ai",
      ringClass: "ring-ai/40",
      Icon: Compass,
      sample: ["Onboarding Buddy", "Repo Sentinel", "Cost Sense", "Doc Synth", "+ 38 more"],
      comingSoon: true,
    },
    {
      n: "02", title: "Build", verb: "Compose",
      tagline: "No-code & low-code agent builder.",
      desc: "Drag prompts, tools and policies onto a canvas. Test in a sandbox, version it, ship it. Code paths available when you need them.",
      cta: "Create an agent",
      noCodeCta: "Notify me when no-code builder is available",
      iconClass: "bg-primary/10 text-primary",
      ringClass: "ring-primary/40",
      Icon: Workflow,
      sample: ["Visual canvas", "Prompt library", "Tool registry", "Sandbox runs", "Version history"],
    },
    {
      n: "03", title: "Connect", verb: "Wire",
      tagline: "MCP & APIs into every system.",
      desc: "First-class connectors to Slack, GitHub, Okta, Datadog, Looker and your internal services. Bring your own MCP server.",
      cta: "Connect my agent",
      noCodeCta: "Notify me when no-code connectors are available",
      iconClass: "bg-accent/10 text-accent",
      ringClass: "ring-accent/40",
      Icon: Network,
      sample: ["Slack", "GitHub", "Okta", "Datadog", "MCP servers"],
    },
    {
      n: "04", title: "Govern",  verb: "Trust",
      tagline: "Registry, guardrails, audit trails.",
      desc: "Every agent is a tracked AI Project. Compliance reviews, access scopes, and prompt-level audit logs are non-negotiable defaults.",
      cta: "Secure my agent",
      noCodeCta: "Notify me when no-code governance is available",
      iconClass: "bg-warning/15 text-warning",
      ringClass: "ring-warning/40",
      Icon: Lock,
      sample: ["AI Project registry", "Risk score", "Access scopes", "PII guardrails", "Audit log"],
    },
    {
      n: "05", title: "Supervise", verb: "Improve",
      tagline: "Monitoring & continuous loop.",
      desc: "Token cost, latency, satisfaction, hallucination rate. Open feedback loop so every interaction makes your agent better.",
      cta: "Measure & improve",
      noCodeCta: "Notify me when no-code monitoring is available",
      iconClass: "bg-ext-purple/15 text-ext-purple",
      ringClass: "ring-ext-purple/40",
      Icon: Telescope,
      sample: ["Live latency", "CSAT", "Token spend", "Drift alerts", "Replay traces"],
    },
  ];

  const active = layers[selectedLayer];

  // Promotional carousel for coming-soon layers (Discover / Agent Catalogue)
  // Each slide owns its own visual Scene component for an "image-like" preview.
  const BrowseScene = ({ active }: { active: boolean }) => {
    const agents = [
      { Icon: Bot, tone: "bg-ai/15 text-ai", name: "Onboarding Buddy", meta: "People · 4.9★" },
      { Icon: ShieldCheck, tone: "bg-warning/15 text-warning", name: "Repo Sentinel", meta: "Platform · 4.8★" },
      { Icon: LineChart, tone: "bg-accent/15 text-accent", name: "Cost Sense", meta: "Finance · 4.7★" },
      { Icon: MessageSquare, tone: "bg-primary/15 text-primary", name: "Ticket Triage", meta: "Support · 4.6★" },
      { Icon: Workflow, tone: "bg-pop/15 text-pop", name: "Doc Synth", meta: "Knowledge · 4.9★" },
      { Icon: Database, tone: "bg-ext-purple/15 text-ext-purple", name: "Data Scout", meta: "Analytics · 4.5★" },
    ];
    return (
      <div className="w-full max-w-[340px] rounded-2xl border border-border bg-card p-3 shadow-soft"
           style={{ animation: active ? "pop-in 0.5s var(--ease-spring)" : "none" }}>
        {/* Search bar mock */}
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
          <Compass className="h-3.5 w-3.5 text-muted-foreground" />
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-2/3 animate-shimmer rounded-full bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
          </div>
          <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">48</span>
        </div>

        {/* Filter chips */}
        <div className="mt-2 flex gap-1.5">
          {["All", "Mine", "Trending"].map((f, i) => (
            <span
              key={f}
              className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${i === 0 ? "bg-foreground text-background" : "bg-muted/60 text-muted-foreground"}`}
              style={{ animation: active ? `fade-up var(--motion-base) var(--ease-spring) ${0.1 + i * 0.05}s both` : "none" }}
            >
              {f}
            </span>
          ))}
        </div>

        {/* Agent grid */}
        <div className="mt-2.5 grid grid-cols-2 gap-1.5">
          {agents.map((a, i) => (
            <div
              key={a.name}
              className="flex items-center gap-2 rounded-lg border border-border/60 bg-card px-2 py-1.5"
              style={{ animation: active ? `pop-in 0.5s var(--ease-spring) ${0.2 + i * 0.06}s both` : "none" }}
            >
              <div className={`${a.tone} flex h-7 w-7 shrink-0 items-center justify-center rounded-lg`}>
                <a.Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-[10px] font-bold leading-tight">{a.name}</p>
                <p className="truncate text-[8px] leading-tight text-muted-foreground">{a.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const TrustScene = ({ active }: { active: boolean }) => (
    <div className="w-full max-w-[320px] rounded-2xl border border-border bg-card p-4 shadow-soft"
         style={{ animation: active ? "pop-in 0.5s var(--ease-spring)" : "none" }}>
      <div className="flex items-center gap-3">
        <div className="bg-ai/15 text-ai animate-pulse-soft flex h-10 w-10 items-center justify-center rounded-xl">
          <Bot className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-display text-sm font-bold">Onboarding Buddy</p>
          <p className="text-[10px] text-muted-foreground">by People Tech · v2.4</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1">
        {[0, 1, 2, 3, 4].map(i => (
          <Star
            key={i}
            className="h-3.5 w-3.5 fill-pop text-pop"
            style={{ animation: active ? `pop-in 0.4s var(--ease-spring) ${0.15 + i * 0.1}s both` : "none" }}
          />
        ))}
        <span className="ml-1 text-[10px] font-semibold text-muted-foreground">4.9 · 312 uses</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5 text-center">
        {[
          { v: "12.4k", l: "runs" },
          { v: "98%", l: "csat" },
          { v: "0.2s", l: "p50" },
        ].map((s, i) => (
          <div key={s.l} className="rounded-lg bg-muted/50 px-1.5 py-1"
               style={{ animation: active ? `fade-up var(--motion-base) var(--ease-spring) ${0.4 + i * 0.08}s both` : "none" }}>
            <p className="font-display text-xs font-bold">{s.v}</p>
            <p className="text-[9px] uppercase tracking-wider text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const ReuseScene = ({ active }: { active: boolean }) => (
    <div className="relative flex w-full max-w-sm items-center justify-between gap-3">
      <div
        className="flex flex-col items-center gap-2"
        style={{ animation: active ? "pop-in 0.5s var(--ease-spring)" : "none" }}
      >
        <div className="bg-primary/15 text-primary flex h-14 w-14 items-center justify-center rounded-2xl shadow-soft">
          <Bot className="h-7 w-7" />
        </div>
        <p className="text-[10px] font-semibold">Original</p>
      </div>

      <div className="relative flex-1">
        <div className="h-px w-full bg-gradient-to-r from-primary/40 via-ai/40 to-pop/40" />
        <GitBranch
          className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-ai animate-pulse-soft"
        />
      </div>

      <div className="flex flex-col gap-2">
        {[
          { tone: "bg-ai/15 text-ai", label: "Variant A", delay: 0.25 },
          { tone: "bg-pop/15 text-pop", label: "Variant B", delay: 0.45 },
        ].map(v => (
          <div
            key={v.label}
            className="flex items-center gap-2"
            style={{ animation: active ? `fade-up var(--motion-base) var(--ease-spring) ${v.delay}s both` : "none" }}
          >
            <div className={`${v.tone} flex h-9 w-9 items-center justify-center rounded-xl`}>
              <Bot className="h-4 w-4" />
            </div>
            <p className="text-[10px] font-semibold">{v.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const InsightScene = ({ active }: { active: boolean }) => {
    const bars = [40, 65, 55, 80, 72, 95, 88];
    return (
      <div className="w-full max-w-[320px] rounded-2xl border border-border bg-card p-4 shadow-soft"
           style={{ animation: active ? "pop-in 0.5s var(--ease-spring)" : "none" }}>
        <div className="flex items-center justify-between">
          <p className="font-display text-xs font-bold">Trending this week</p>
          <span className="bg-accent/15 text-accent rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider">+18%</span>
        </div>
        <div className="mt-4 flex h-24 items-end gap-1.5">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-gradient-to-t from-accent/30 to-accent"
              style={{
                height: active ? `${h}%` : "10%",
                transition: `height 900ms var(--ease-spring) ${i * 0.06}s`,
              }}
            />
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
          <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
        </div>
      </div>
    );
  };

  const catalogueSlides = [
    {
      tag: "Browse",
      title: "A searchable catalogue of every agent",
      desc: "Filter by team, scope, capability or rating — find the right agent in seconds.",
      Icon: LayoutGrid,
      accent: "bg-ai/10 text-ai",
      Scene: BrowseScene,
    },
    {
      tag: "Trust",
      title: "Ratings, owners & live usage at a glance",
      desc: "See who built it, who relies on it, and how it's performing — before you adopt.",
      Icon: Star,
      accent: "bg-pop/10 text-pop",
      Scene: TrustScene,
    },
    {
      tag: "Reuse",
      title: "Fork & remix in one click",
      desc: "Start from a colleague's agent, tweak the prompt, and ship your variant the same day.",
      Icon: GitBranch,
      accent: "bg-primary/10 text-primary",
      Scene: ReuseScene,
    },
    {
      tag: "Insight",
      title: "Trending across Decathlon",
      desc: "Discover the most-used agents this week, by team and by domain.",
      Icon: BarChart3,
      accent: "bg-accent/10 text-accent",
      Scene: InsightScene,
    },
  ];
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    if (!active.comingSoon) return;
    const id = setInterval(() => setSlide(s => (s + 1) % catalogueSlides.length), 3800);
    return () => clearInterval(id);
  }, [active.comingSoon, catalogueSlides.length]);
  const current = catalogueSlides[slide];

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
        <div className="flex justify-end p-4">
            <ThemeToggle mode={theme} onChange={setTheme} />
        </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* HERO — inspirational, animated, informative                */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden bg-gradient-hero px-8 pb-16 pt-12 md:px-14 md:pb-20 md:pt-14">

        {/* Ambient drifting orbs */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 animate-drift rounded-full bg-ai/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 animate-drift rounded-full bg-pop/20 blur-3xl" style={{ animationDelay: "-6s" }} />
        <div className="pointer-events-none absolute inset-0 grid-dots opacity-20" />

        <div className="relative grid gap-10 md:grid-cols-[1.35fr_1fr] md:items-center">

          {/* Copy column */}
          <div>
            <Badge className="rounded-full bg-on-gradient-strong text-on-gradient hover:bg-on-gradient-strong">
              <Sparkles className="h-3 w-3" /> Agentic Platform Program
            </Badge>

            <h2 className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-on-gradient md:text-6xl">
              Agentic AI,
              <br />
              <span className="bg-gradient-to-r from-white via-white to-pop bg-clip-text text-transparent">
                powering every teammate.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-on-gradient-muted md:text-lg">
              Discover, build, connect and govern AI Agents in one platform —
              securely, transparently, and at the scale of Decathlon.
            </p>

            {/* Live ticker — informative + animated */}
            <div className="mt-7 flex max-w-xl items-center gap-3 rounded-full border border-on-gradient bg-on-gradient-soft px-4 py-2.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pop opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-pop" />
              </span>
              <span className="truncate text-sm text-on-gradient">
                <span className="font-semibold text-on-gradient">{tickerLines[tick].who}</span>
                <span className="ml-1 text-on-gradient-muted">{tickerLines[tick].what}</span>
              </span>
              <span className="ml-auto h-3 w-[2px] animate-type-stream bg-on-gradient-strong" />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="rounded-full bg-card text-foreground shadow-pop transition-spring hover:scale-[1.02]">
                    <Bot className="h-4 w-4" /> Explore Agents
                </Button>
                <Button size="lg" variant="outline" className="rounded-full border-2 border-on-gradient bg-transparent text-on-gradient hover:bg-on-gradient-soft hover:text-on-gradient">
                    <Play className="h-4 w-4" /> Watch the video
                </Button>
                <Button size="lg" variant="secondary" className="rounded-full bg-pop text-white shadow-pop transition-spring hover:scale-[1.02]">
                    Become an Agentic Embassedor
                </Button>
            </div>
          </div>

          {/* Animated orbit constellation — agents circling a brain */}
          <div className="relative mx-auto aspect-square w-full max-w-[360px]">
            {/* Outer orbit ring */}
            <div className="absolute inset-0 rounded-full border border-on-gradient" />
            <div className="absolute inset-[14%] rounded-full border border-on-gradient" />
            <div className="absolute inset-[28%] rounded-full border border-on-gradient" />

            {/* Outer orbit — 3 agents */}
            <div className="absolute inset-0 animate-orbit-slow">
              {[
                { Icon: Bot, label: "Buddy", angle: 0, tone: "bg-card text-ai" },
                { Icon: ShieldCheck, label: "Sentinel", angle: 120, tone: "bg-card text-warning" },
                { Icon: LineChart, label: "Cost Sense", angle: 240, tone: "bg-card text-accent" },
              ].map(a => (
                <div key={a.label}
                  className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                  style={{ transform: `rotate(${a.angle}deg) translateY(0)`, transformOrigin: "50% 50%" }}>
                  <div className="animate-counter-orbit-slow" style={{ transformOrigin: "center" }}>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${a.tone} shadow-pop`}>
                      <a.Icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Middle orbit — 2 agents, reverse */}
            <div className="absolute inset-[14%] animate-orbit-reverse">
              {[
                { Icon: Workflow, label: "Doc Synth", angle: 60, tone: "bg-card text-pop" },
                { Icon: MessageSquare, label: "Triage", angle: 240, tone: "bg-card text-primary" },
              ].map(a => (
                <div key={a.label}
                  className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                  style={{ transform: `rotate(${a.angle}deg) translateY(0)`, transformOrigin: "50% 50%" }}>
                  <div className="animate-counter-orbit-reverse" style={{ transformOrigin: "center" }}>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.tone} shadow-soft`}>
                      <a.Icon className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Center node — pulsing brain */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse-soft">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-ai shadow-ai-glow">
                  <Brain className="h-10 w-10 text-ai-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlight stats — informative anchor under the inspiration */}
        <div className="relative mt-12 grid gap-3 sm:grid-cols-3">
          {[
            { label: "Available agents", value: "48+", Icon: Bot },
            { label: "Active builders", value: "120+", Icon: Users },
            { label: "Governance coverage", value: "99.4%", Icon: ShieldCheck },
          ].map(h => (
            <div key={h.label} className="flex items-center gap-3 rounded-2xl border border-on-gradient bg-on-gradient-soft px-5 py-4 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-on-gradient-strong">
                <h.Icon className="h-5 w-5 text-on-gradient" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-on-gradient">{h.value}</p>
                <p className="text-xs text-on-gradient-muted">{h.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden border-t border-border bg-gradient-hero px-8 py-12 md:px-14 my-10">
  <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 animate-drift rounded-full bg-pop/20 blur-3xl" />
  <div className="relative flex flex-wrap items-end justify-between gap-6">
    <div>
      <p className="text-sm text-on-gradient-muted">Ready to represent?</p>
      <h3 className="mt-1 max-w-lg font-display text-3xl font-bold leading-tight text-on-gradient">
        Become an Agentic Ambassador today.
      </h3>
    </div>
    <div className="flex gap-3">
      <Button className="rounded-full bg-pop text-white shadow-pop transition-spring hover:scale-[1.02]">
        Become an Agentic Ambassador
      </Button>
    </div>
  </div>
</div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* 5 LAYERS — exploratory, informative                        */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-12 md:px-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-pop">Platform capabilities</p>
            <h3 className="mt-2 font-display text-3xl font-bold leading-tight">5 layers, end to end.</h3>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              From the first prompt to production-scale monitoring. Click a layer to explore what's inside.
            </p>
          </div>
          <div className="hidden text-right md:block">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Now exploring</p>
            <p className="mt-1 font-display text-lg font-bold">{active.n} · {active.title}</p>
          </div>
        </div>

        {/* Step rail — clickable, with progress meter underneath */}
        <div className="mt-8 grid gap-2 md:grid-cols-5">
          {layers.map((l, i) => {
            const isActive = i === selectedLayer;
            return (
              <button
                key={l.n}
                onClick={() => setSelectedLayer(i)}
                aria-pressed={isActive}
                className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-spring ${
                  isActive
                    ? `border-transparent bg-card shadow-pop ring-2 ${l.ringClass}`
                    : "border-border bg-card/60 hover:bg-card hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-widest text-muted-foreground">{l.n}</span>
                  <div className={`${l.iconClass} flex h-8 w-8 items-center justify-center rounded-lg transition-spring ${isActive ? "scale-110" : ""}`}>
                    <l.Icon className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 flex min-h-[24px] flex-wrap items-center gap-x-2 gap-y-1">
                  <p className="font-display font-bold leading-tight">{l.title}</p>
                  {l.comingSoon && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-warning">
                      <Clock className="h-2.5 w-2.5" /> Soon
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs leading-snug text-muted-foreground line-clamp-1">{l.tagline}</p>

                {/* Active indicator */}
                <div className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-ai transition-transform duration-300 ${isActive ? "scale-x-100" : ""}`} />
              </button>
            );
          })}
        </div>

        {/* Detail panel — reflects active layer */}
        <div className="mt-6 grid gap-8 rounded-3xl border border-dashed border-border bg-card/40 p-6 md:grid-cols-[1.2fr_1fr] md:p-8">
          <div className="flex flex-col">
            <div className="flex items-start gap-3">
              <div className={`${active.iconClass} flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl`}>
                <active.Icon className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Layer {active.n}</p>
                  {active.comingSoon && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-warning">
                      <Clock className="h-3 w-3" /> Coming soon
                    </span>
                  )}
                </div>
                <p className="mt-1 font-display text-2xl font-bold leading-tight">{active.title}</p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              {active.desc}
            </p>

            {active.comingSoon && (
              <>
                <p className="mt-3 max-w-md text-xs italic leading-relaxed text-muted-foreground">
                  The Agent Catalogue is on its way. Get notified the moment it goes live.
                </p>

                <ul className="mt-5 max-w-md space-y-2.5">
                  {[
                    { Icon: Compass, label: "Search & filter every agent in the org" },
                    { Icon: Star, label: "Live ratings, owners, and usage stats" },
                    { Icon: GitBranch, label: "Fork & remix to make it your own" },
                    { Icon: BarChart3, label: "Weekly trending across teams" },
                  ].map(f => (
                    <li key={f.label} className="flex items-center gap-2.5 text-xs text-muted-foreground">
                      <span className="bg-ai/10 text-ai flex h-6 w-6 shrink-0 items-center justify-center rounded-md">
                        <f.Icon className="h-3 w-3" />
                      </span>
                      <span>{f.label}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
              {active.comingSoon ? (
                <Button
                  variant="outline"
                  className="rounded-full border-border bg-card text-foreground shadow-soft transition-spring hover:bg-muted/40 hover:scale-[1.02]"
                >
                  <Bell className="text-warning" />
                  {active.cta}
                </Button>
              ) : (
                <>
                  <Button className="rounded-full bg-primary shadow-glow transition-spring hover:scale-[1.02]">
                    <Code2 />
                    {active.cta}
                    <ArrowRight />
                  </Button>
                  {active.noCodeCta && (
                    <Button
                      variant="outline"
                      className="rounded-full border-border bg-card text-foreground shadow-soft transition-spring hover:bg-muted/40 hover:scale-[1.02]"
                    >
                      <Bell className="text-warning" />
                      {active.noCodeCta}
                    </Button>
                  )}
                </>
              )}
              <Button variant="link" className="rounded-full px-2 text-sm text-muted-foreground hover:text-foreground">
                Learn more
              </Button>
            </div>
          </div>

          {/* Right column — sneak peek + sample chips */}
          <div className="flex flex-col gap-6">
            {active.comingSoon && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">A sneak peek</p>

                <div className="relative mt-3 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-muted/40 shadow-soft">
                  {/* Ambient animated orbs */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 animate-drift rounded-full bg-ai/20 blur-3xl" />
                  <div className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 animate-drift rounded-full bg-pop/20 blur-3xl" style={{ animationDelay: "-4s" }} />
                  <div className="pointer-events-none absolute inset-0 grid-dots opacity-30" />

                  {/* Stage — fixed height, slides crossfade */}
                  <div className="relative h-64">
                    {catalogueSlides.map((s, i) => {
                      const isActive = i === slide;
                      return (
                        <div
                          key={i}
                          aria-hidden={!isActive}
                          className="absolute inset-0 flex items-center justify-center p-6 transition-all duration-[1100ms] ease-[var(--ease-out-soft)]"
                          style={{
                            opacity: isActive ? 1 : 0,
                            transform: isActive ? "scale(1)" : "scale(0.96)",
                            filter: isActive ? "blur(0px)" : "blur(6px)",
                            pointerEvents: isActive ? "auto" : "none",
                          }}
                        >
                          <s.Scene active={isActive} />
                        </div>
                      );
                    })}
                  </div>

                  {/* Caption strip — also crossfades */}
                  <div className="relative border-t border-border bg-card/80 px-5 py-4 backdrop-blur-sm">
                    <div className="relative h-12">
                      {catalogueSlides.map((s, i) => {
                        const isActive = i === slide;
                        return (
                          <div
                            key={i}
                            className="absolute inset-0 flex items-start gap-3 transition-all duration-700 ease-[var(--ease-out-soft)]"
                            style={{
                              opacity: isActive ? 1 : 0,
                              transform: isActive ? "translateY(0)" : "translateY(6px)",
                            }}
                          >
                            <span className={`${s.accent} mt-0.5 inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider`}>
                              {s.tag}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="font-display text-sm font-bold leading-snug">{s.title}</p>
                              <p className="mt-0.5 truncate text-xs leading-snug text-muted-foreground">{s.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Dots */}
                    <div className="mt-3 flex items-center justify-center gap-1.5">
                      {catalogueSlides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSlide(i)}
                          aria-label={`Show preview ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all duration-500 ${i === slide ? "w-6 bg-foreground" : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Inside this layer</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {active.sample.map(s => {
                  const isCounter = s.startsWith("+");
                  return (
                    <span
                      key={s}
                      className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium leading-none ${
                        isCounter
                          ? "border border-dashed border-border text-muted-foreground"
                          : active.iconClass
                      }`}
                    >
                      {s}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* PICK YOUR PATH — micro CTA, two pathways                   */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="border-t border-border px-8 py-12 md:px-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-pop">Choose your path</p>
          <h3 className="mt-2 font-display text-3xl font-bold">Where do you start?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Two doorways into the same platform. Pick the one that matches how you build.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {/* Developer path */}
          <a href="#" className="group relative block overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 p-7 transition-spring hover:-translate-y-1 hover:border-primary/40 hover:shadow-pop">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-2xl transition-spring group-hover:bg-primary/25" />
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">Path A</span>
                <span className="h-px flex-1 bg-primary/20" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">For developers</span>
              </div>

              <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-on-gradient shadow-glow">
                <Code2 className="h-6 w-6" />
              </div>

              <p className="mt-5 font-display text-xl font-bold">Build with code skills</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                APIs, SDKs and full control. Integrate agents into your pipelines and ship to production with confidence.
              </p>

              {/* Pathway preview */}
              <ol className="mt-5 space-y-2 text-xs text-muted-foreground">
                {["Install SDK", "Define agent + tools", "Deploy via CI", "Monitor in console"].map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Access developer hub
                <ArrowRight className="h-3.5 w-3.5 transition-spring group-hover:translate-x-1" />
              </div>
            </div>
          </a>

          {/* Teammate path — coming soon */}
          <button
            type="button"
            aria-disabled="true"
            className="group relative block overflow-hidden rounded-3xl border-2 border-dashed border-ai/30 bg-ai/[0.03] p-7 text-left transition-spring hover:border-ai/50"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ai/10 blur-2xl" />

            {/* Diagonal "Coming soon" ribbon */}
            <div className="pointer-events-none absolute -right-12 top-6 rotate-45 bg-warning/90 px-12 py-1 text-[10px] font-bold uppercase tracking-widest text-warning-foreground shadow-soft">
              Coming soon
            </div>

            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-ai/70">Path B</span>
                <span className="h-px flex-1 bg-ai/15" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">For all teammates</span>
              </div>

              <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-ai/20 text-ai">
                <Wand2 className="h-6 w-6" />
              </div>

              <div className="mt-5 flex items-center gap-2">
                <p className="font-display text-xl font-bold text-muted-foreground">Build without code</p>
                <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-warning">
                  <Clock className="h-3 w-3" /> Soon
                </span>
              </div>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground/80">
                Visual agent builder, prompt templates, and guided flows. From idea to working agent in an afternoon.
              </p>

              <ol className="mt-5 space-y-2 text-xs text-muted-foreground/70">
                {["Pick a template", "Write the prompt", "Connect your tools", "Share with your team"].map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ai/10 text-[10px] font-bold text-ai/70">{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-semibold text-foreground shadow-soft transition-spring group-hover:scale-[1.02]">
                <Bell className="h-3.5 w-3.5 text-warning" />
                Notify me when it's available
              </div>
            </div>
          </button>
        </div>

        {/* Tertiary path hint */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Not sure which one is for you? <a href="#" className="font-semibold text-foreground underline-offset-4 hover:underline">Take the 60-second quiz</a>.
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* RESOURCES — calm, scannable                                */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="border-t border-border px-8 py-12 md:px-14">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-pop">Resources</p>
        <h3 className="mt-2 font-display text-2xl font-bold">Everything you need to get further.</h3>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            { title: "Technical Documentation", desc: "Architecture, APIs, and integration guides for developers.", Icon: FileText, tagClass: "bg-primary/10 text-primary", tag: "Docs" },
            { title: "Trainings & How-to Guides", desc: "Step-by-step walkthroughs from first prompt to production.", Icon: Play, tagClass: "bg-accent/15 text-accent", tag: "Tutorials" },
            { title: "Best Practices & Playbooks", desc: "Proven patterns to build reliable, secure agents.", Icon: Star, tagClass: "bg-ai/10 text-ai", tag: "Playbooks" },
            { title: "Support & Community", desc: "Connect with the team and other builders.", Icon: Users, tagClass: "bg-pop/10 text-pop", tag: "Community" },
          ].map(r => (
            <a key={r.title} href="#" className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-spring hover:-translate-y-0.5 hover:bg-muted/30 hover:shadow-soft">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${r.tagClass}`}>
                <r.Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{r.title}</p>
                  <span className={`${r.tagClass} rounded-full px-2 py-0.5 text-[10px] font-semibold`}>{r.tag}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-spring group-hover:translate-x-1 group-hover:text-foreground" />
            </a>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════ */}
      {/* CTA FOOTER                                                  */}
      {/* ════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-t border-border bg-gradient-hero px-8 py-12 md:px-14">
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 animate-drift rounded-full bg-pop/20 blur-3xl" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm text-on-gradient-muted">Ready to start?</p>
            <h3 className="mt-1 max-w-lg font-display text-3xl font-bold leading-tight text-on-gradient">
              Your first agent is one click away.
            </h3>
          </div>
          <div className="flex gap-3">
            <Button className="rounded-full bg-card text-foreground shadow-pop transition-spring hover:scale-[1.02]">
              <Bot className="h-4 w-4" /> Explore Agents
            </Button>
            <Button variant="outline" className="rounded-full border-2 border-on-gradient bg-transparent text-on-gradient hover:bg-on-gradient-soft hover:text-on-gradient">
              <Plus className="h-4 w-4" /> Create Agent
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/agentichub")({
  component: ExampleAgenticPlatform,
  head: () => ({
    title: "Agentic Hub Example | Decathlon Playkit",
    meta: [
      { name: "description", content: "Full-page example for the Agentic Hub in Decathlon Playkit." },
    ],
  }),
});