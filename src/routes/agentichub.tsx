import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  ArrowRight, Sparkles, Bot, Play, Compass, Workflow, Network, Lock, Telescope, Users, ShieldCheck, LineChart, MessageSquare, Brain, Code2, Wand2, FileText, Star, Plus, LayoutGrid, BarChart3, GitBranch, Cpu, Database
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
  const layers = [
    {
      n: "01", title: "Discover", verb: "Find",
      tagline: "An internal marketplace for agents.",
      desc: "Browse, search and reuse the agents your colleagues already built. Every agent shows ratings, owners, scope and live usage.",
      cta: "Find an agent",
      iconClass: "bg-ai/10 text-ai",
      ringClass: "ring-ai/40",
      Icon: Compass,
      sample: ["Onboarding Buddy", "Repo Sentinel", "Cost Sense", "Doc Synth", "+ 38 more"],
    },
    {
      n: "02", title: "Build", verb: "Compose",
      tagline: "No-code & low-code agent builder.",
      desc: "Drag prompts, tools and policies onto a canvas. Test in a sandbox, version it, ship it. Code paths available when you need them.",
      cta: "Create an agent",
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
      iconClass: "bg-ext-purple/15 text-ext-purple",
      ringClass: "ring-ext-purple/40",
      Icon: Telescope,
      sample: ["Live latency", "CSAT", "Token spend", "Drift alerts", "Replay traces"],
    },
  ];

  const active = layers[selectedLayer];

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
                <p className="mt-3 font-display font-bold">{l.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{l.tagline}</p>

                {/* Active indicator */}
                <div className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-ai transition-transform duration-300 ${isActive ? "scale-x-100" : ""}`} />
              </button>
            );
          })}
        </div>

        {/* Detail panel — reflects active layer */}
        <div className="mt-6 grid gap-6 rounded-3xl border border-dashed border-border bg-card/40 p-6 md:grid-cols-[1.2fr_1fr] md:p-8">
          <div>
            <div className="flex items-center gap-3">
              <div className={`${active.iconClass} flex h-12 w-12 items-center justify-center rounded-2xl`}>
                <active.Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Layer {active.n}</p>
                <p className="font-display text-2xl font-bold leading-none">{active.title}</p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              {active.desc}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Button className="rounded-full bg-primary shadow-glow transition-spring hover:scale-[1.02]">
                {active.cta} <ArrowRight className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" className="rounded-full text-muted-foreground hover:text-foreground">
                Learn more
              </Button>
            </div>
          </div>

          {/* Sample chips — informative peek into the layer */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Inside this layer</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {active.sample.map(s => (
                <span key={s} className={`${active.iconClass} rounded-full px-3 py-1.5 text-xs font-medium`}>
                  {s}
                </span>
              ))}
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

          {/* Teammate path */}
          <a href="#" className="group relative block overflow-hidden rounded-3xl border border-ai/20 bg-ai/5 p-7 transition-spring hover:-translate-y-1 hover:border-ai/40 hover:shadow-ai-glow">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ai/20 blur-2xl transition-spring group-hover:bg-ai/30" />
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-ai">Path B</span>
                <span className="h-px flex-1 bg-ai/20" />
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">For all teammates</span>
              </div>

              <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-ai text-ai-foreground shadow-ai-glow">
                <Wand2 className="h-6 w-6" />
              </div>

              <p className="mt-5 font-display text-xl font-bold">Build without code</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Visual agent builder, prompt templates, and guided flows. From idea to working agent in an afternoon.
              </p>

              <ol className="mt-5 space-y-2 text-xs text-muted-foreground">
                {["Pick a template", "Write the prompt", "Connect your tools", "Share with your team"].map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ai/15 text-[10px] font-bold text-ai">{i + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ai">
                Get started — no code
                <ArrowRight className="h-3.5 w-3.5 transition-spring group-hover:translate-x-1" />
              </div>
            </div>
          </a>
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