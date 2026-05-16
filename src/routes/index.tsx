import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowRight, Sparkles, Zap, Search, Bell, Github, Slack,
  CheckCircle2, AlertTriangle, Info, ChevronLeft, ChevronRight,
  Bot, Activity, LayoutGrid, Settings, Users, BarChart3, Plus,
  Heart, Star, Play, Command, ScanLine, Wand2, Brain, FileText,
  TrendingUp, Clock, Cpu, Database, GitBranch, ShieldCheck,
  ThumbsUp, ThumbsDown, RefreshCw, MoreHorizontal, Filter,
  Compass, Workflow, LineChart, Code2, Network, MessageSquare,
  Lock, Telescope, Sun, Moon, Copy, Check, ChevronDown, Loader2,
  Trash2, Save, Send, Download, X, Inbox, SearchX
} from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

/* ───────────────────── THEME ───────────────────── */
type Theme = "light" | "dark";

function useTheme(): [Theme, (t: Theme) => void, () => void] {
  const [theme, setThemeState] = useState<Theme>("light");

  // Load persisted or system preference once
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

/** Local-scope theme wrapper — adds `dark` class to a subtree without touching <html> */
function ThemeScope({ mode, children, className = "" }: { mode: Theme; children: React.ReactNode; className?: string }) {
  return (
    <div className={`${mode === "dark" ? "dark" : ""} ${className}`}>
      <div className="bg-background text-foreground">{children}</div>
    </div>
  );
}

/** Compact segmented light/dark toggle for individual examples */
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

/* ───────────────────── CODE PEEK ───────────────────── */
/* Reusable "show code + copy" affordance for any building block */
function CodePeek({ code, label = "View code" }: { code: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {}
  };

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground transition-soft hover:text-foreground"
        >
          <Code2 className="h-3 w-3" />
          {label}
          <ChevronDown className={`h-3 w-3 transition-spring ${open ? "rotate-180" : ""}`} />
        </button>
        <button
          onClick={onCopy}
          aria-label="Copy code to clipboard"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground transition-soft hover:text-foreground"
        >
          {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {open && (
        <pre className="mt-3 max-h-72 overflow-auto rounded-xl border border-border bg-foreground/95 p-4 text-[11px] leading-relaxed text-background">
          <code className="font-mono">{code}</code>
        </pre>
      )}
    </div>
  );
}

/* ───────────────────── DO / DON'T ───────────────────── */
/* Side-by-side counter-examples. Teaches by contrast. */
function DoDont({
  doLabel = "Do",
  dontLabel = "Don't",
  doText,
  dontText,
  doSlot,
  dontSlot,
  className = "",
}: {
  doLabel?: string;
  dontLabel?: string;
  doText: string;
  dontText: string;
  doSlot: React.ReactNode;
  dontSlot: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mt-6 grid gap-4 md:grid-cols-2 ${className}`}>
      <div className="rounded-2xl border border-success/30 bg-success/5 p-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-success/20 text-success-foreground">
            <Check className="h-3.5 w-3.5" />
          </span>
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-success-foreground">{doLabel}</p>
        </div>
        <div className="mt-4 flex min-h-[88px] items-center justify-center rounded-xl border border-success/20 bg-card p-4">
          {doSlot}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{doText}</p>
      </div>
      <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-destructive/20 text-destructive-foreground">
            <X className="h-3.5 w-3.5" />
          </span>
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-destructive-foreground">{dontLabel}</p>
        </div>
        <div className="mt-4 flex min-h-[88px] items-center justify-center rounded-xl border border-destructive/20 bg-card p-4">
          {dontSlot}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{dontText}</p>
      </div>
    </div>
  );
}

/* ───────────────────── EMPTY STATE ───────────────────── */
/* Friendly first-touch surface for zero-data screens */
function EmptyState({
  icon: Icon,
  tone = "neutral",
  eyebrow,
  title,
  description,
  primary,
  secondary,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone?: "neutral" | "ai" | "info";
  eyebrow?: string;
  title: string;
  description: string;
  primary?: { label: string; onClick?: () => void };
  secondary?: { label: string; onClick?: () => void };
}) {
  const toneMap: Record<string, { bg: string; ring: string; text: string }> = {
    neutral: { bg: "bg-muted/60", ring: "ring-border", text: "text-muted-foreground" },
    ai:      { bg: "bg-ai/10",    ring: "ring-ai/30",  text: "text-ai" },
    info:    { bg: "bg-info/10",  ring: "ring-info/30", text: "text-info-foreground" },
  };
  const t = toneMap[tone];
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-10 text-center">
      <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl ${t.bg} ring-1 ${t.ring}`}>
        <Icon className={`h-7 w-7 ${t.text}`} />
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-pop animate-pop-in" />
      </div>
      {eyebrow && <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{eyebrow}</p>}
      <h4 className="mt-2 font-display text-lg font-bold">{title}</h4>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {(primary || secondary) && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {primary && (
            <button onClick={primary.onClick} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-spring hover:scale-[1.03]">
              <Sparkles className="h-3.5 w-3.5" /> {primary.label}
            </button>
          )}
          {secondary && (
            <button onClick={secondary.onClick} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition-soft hover:bg-muted/60">
              {secondary.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: DesignSystem,
  head: () => ({
    meta: [
      { title: "Vitamin Play — Decathlon Internal Design System" },
      { name: "description", content: "A playful, distinct design system for Decathlon's internal dashboards and AI service desks." },
    ],
  }),
});

function DesignSystem() {
  // Tailwind safelist for dynamically-built tone classes
  // bg-warning/10 bg-success/10 bg-info/10 bg-destructive/10 bg-ai/10 bg-accent/10 bg-primary/10
  const [theme, setTheme] = useTheme();

  return (
    <div className="min-h-screen">
      <TopBar theme={theme} setTheme={setTheme} />
      <main id="main-content" className="mx-auto max-w-[1400px] px-6 pb-32 pt-10 md:px-10">
        <Hero />
        <SectionDivider id="foundations" eyebrow="01" title="Foundations" subtitle="Color, type & motion tokens" />
        <Foundations />
        <SectionDivider id="usage" eyebrow="02" title="Color Usage" subtitle="60 neutral · 30 brand · 10 accent" />
        <ColorUsage />
        <SectionDivider id="buttons" eyebrow="03" title="Buttons & Inputs" subtitle="Tap, type, toggle, scan" />
        <ButtonsAndInputs />
        <SectionDivider id="cards" eyebrow="04" title="Cards & Artifacts" subtitle="Modular surfaces with personality" />
        <CardsAndArtifacts />
        <SectionDivider id="ai" eyebrow="05" title="AI Building Blocks" subtitle="Prompt, response, confidence, feedback" />
        <AIComponents />
        <SectionDivider id="dashboard" eyebrow="06" title="Dashboard Widgets" subtitle="KPIs, tables & data viz" />
        <DashboardWidgets />
        <SectionDivider id="carousel" eyebrow="07" title="Carousel" subtitle="Horizontal storytelling" />
        <CarouselDemo />
        <SectionDivider id="feedback" eyebrow="08" title="Feedback" subtitle="Status, alerts & toasts" />
        <FeedbackDemo />
        <EmptyStateAndToasts />
        <SectionDivider id="layout" eyebrow="09" title="Layout Guidelines" subtitle="The 12-col playful grid" />
        <LayoutGuidelines />
        <SectionDivider id="motion" eyebrow="10" title="Motion & Interaction" subtitle="Spring, soft, snappy" />
        <MotionGuidelines />
        <SectionDivider id="examples" eyebrow="11" title="Example Surfaces" subtitle="Putting it together" />
        <ExamplePages />
        <Footer />
      </main>
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}

/* ───────────────────── TOP BAR ───────────────────── */
function TopBar({ theme, setTheme }: { theme: Theme; setTheme: (t: Theme) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3 md:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero shadow-glow">
            <Sparkles className="h-5 w-5 text-on-gradient" />
          </div>
          <div>
            <p className="font-display text-sm font-bold leading-none">Vitamin Play</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Decathlon · Internal DS
            </p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <a href="#foundations" className="transition-soft hover:text-foreground">Foundations</a>
          <a href="#buttons" className="transition-soft hover:text-foreground">Components</a>
          <a href="#layout" className="transition-soft hover:text-foreground">Layout</a>
          <a href="#motion" className="transition-soft hover:text-foreground">Motion</a>
          <a href="#examples" className="transition-soft hover:text-foreground">Examples</a>
        </nav>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="hidden border-accent/40 bg-accent/10 text-accent-foreground md:inline-flex">
            v0.1 · beta
          </Badge>
          <ThemeToggle mode={theme} onChange={setTheme} size="sm" />
          <Button size="sm" variant="default" className="rounded-full">
            Get the kit <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

/* ───────────────────── HERO ───────────────────── */
function Hero() {
  return (
    <section className="relative mt-6 overflow-hidden rounded-[2rem] border border-border bg-surface p-10 shadow-soft md:p-16">
      <div className="absolute inset-0 grid-dots opacity-60" />
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-hero blur-3xl opacity-30" />
      <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-gradient-pop blur-3xl opacity-25" />

      <div className="relative grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div>
          <Badge className="mb-6 rounded-full bg-ai/10 text-ai hover:bg-ai/15">
            <Wand2 className="h-3 w-3" /> Vitamin Play · for internal & AI tools
          </Badge>
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
            Internal tools that feel{" "}
            <span className="text-primary">familiar</span>,
            with{" "}
            <span className="bg-gradient-ai bg-clip-text text-transparent">AI that earns trust</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            A Decathlon-aligned design system for dashboards & AI service desks —
            same Vitamin DNA, dialled up for data density, agents and quick scans.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="rounded-full bg-primary px-7 shadow-glow transition-spring hover:scale-[1.02]">
              Browse components <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-2 px-7">
              <Play className="h-4 w-4" /> Watch the tour
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="animate-float rounded-2xl border border-border bg-card p-5 shadow-pop">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-ai">
                <Bot className="h-5 w-5 text-on-gradient" />
              </div>
              <div>
                <p className="text-sm font-semibold">Service desk uptime</p>
                <p className="text-xs text-muted-foreground">last 30 days</p>
              </div>
              <Badge className="ml-auto bg-success/15 text-success-foreground hover:bg-success/15">99.94%</Badge>
            </div>
            <div className="mt-5 flex items-end gap-1.5">
              {[40,55,48,70,62,80,72,88,75,92,85,96,90,99].map((h, i) => (
                <div key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-primary to-accent transition-spring hover:scale-y-110"
                  style={{ height: `${h}px` }} />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Mar 1</span><span>Today</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card px-4 py-3 shadow-soft">
            <div className="flex items-center gap-2">
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
              </div>
              <span className="text-xs font-medium">3 agents live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── SECTION DIVIDER ───────────────────── */
function SectionDivider({ id, eyebrow, title, subtitle }: { id: string; eyebrow: string; title: string; subtitle: string }) {
  return (
    <div id={id} className="mt-24 mb-8 flex items-end justify-between gap-6 border-b border-dashed border-border pb-4">
      <div>
        <span className="text-xs font-semibold uppercase tracking-widest text-pop">— {eyebrow}</span>
        <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

/* ───────────────────── FOUNDATIONS ───────────────────── */
function Foundations() {
  type Token = { name: string; label: string; className: string; note?: string };
  const groups: { title: string; items: Token[] }[] = [
    {
      title: "Brand & action",
      items: [
        { name: "primary", label: "Decathlon Blue", className: "bg-primary", note: "Primary actions only" },
        { name: "ai", label: "AI Violet", className: "bg-ai", note: "AI-generated surfaces" },
      ],
    },
    {
      title: "Accent & commercial",
      items: [
        { name: "accent", label: "Feature Green", className: "bg-accent", note: "Features & sustainability" },
        { name: "commercial", label: "Promo Red", className: "bg-commercial", note: "Discounts only" },
        { name: "pop", label: "Pop Pink", className: "bg-pop", note: "Micro delight" },
      ],
    },
    {
      title: "Status",
      items: [
        { name: "success", label: "Success", className: "bg-success" },
        { name: "warning", label: "Warning", className: "bg-warning" },
        { name: "destructive", label: "Error", className: "bg-destructive" },
        { name: "info", label: "Info", className: "bg-info" },
      ],
    },
    {
      title: "Extended (categorization)",
      items: [
        { name: "ext-purple", label: "Purple", className: "bg-ext-purple" },
        { name: "ext-cyan", label: "Cyan", className: "bg-ext-cyan" },
        { name: "ext-pink", label: "Pink", className: "bg-ext-pink" },
        { name: "ext-yellow", label: "Yellow", className: "bg-ext-yellow" },
      ],
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="p-6 lg:col-span-2">
        <h3 className="font-display text-lg font-bold">Color tokens</h3>
        <p className="mt-1 text-sm text-muted-foreground">Semantic — never use raw hex in components. Brand blue is for primary actions, green for features, AI violet for anything generated.</p>
        <div className="mt-5 space-y-5">
          {groups.map(g => (
            <div key={g.title}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{g.title}</p>
              <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {g.items.map(t => (
                  <div key={t.name} className="group cursor-pointer">
                    <div className={`${t.className} aspect-square rounded-xl shadow-soft transition-spring group-hover:-translate-y-1 group-hover:shadow-pop`} />
                    <p className="mt-2 text-xs font-semibold">{t.label}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">--{t.name}</p>
                    {t.note && <p className="text-[10px] text-muted-foreground/80 italic">{t.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="font-display text-lg font-bold">Typography</h3>
        <p className="mt-1 text-sm text-muted-foreground">Display & sans, paired with monospaced labels.</p>
        <div className="mt-5 space-y-4">
          <div>
            <p className="font-display text-4xl font-bold leading-none">Aa</p>
            <p className="mt-1 text-xs text-muted-foreground">Space Grotesk · Display</p>
          </div>
          <div>
            <p className="font-sans text-2xl">Aa</p>
            <p className="mt-1 text-xs text-muted-foreground">DM Sans · Body</p>
          </div>
          <div>
            <p className="font-mono text-xl">Aa</p>
            <p className="mt-1 text-xs text-muted-foreground">JetBrains · Mono</p>
          </div>
        </div>
      </Card>
      <Card className="p-6 lg:col-span-3">
        <h3 className="font-display text-lg font-bold">Radius & Elevation</h3>
        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-5">
          {[
            { r: "rounded-md", s: "shadow-xs", l: "Subtle" },
            { r: "rounded-lg", s: "shadow-sm", l: "Card" },
            { r: "rounded-xl", s: "shadow-soft", l: "Lift" },
            { r: "rounded-2xl", s: "shadow-pop", l: "Pop" },
            { r: "rounded-full", s: "shadow-glow", l: "Glow" },
          ].map((s) => (
            <div key={s.l} className={`${s.r} ${s.s} flex aspect-[4/3] items-center justify-center bg-card`}>
              <span className="text-xs font-semibold">{s.l}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ───────────────────── BUTTONS + INPUTS ───────────────────── */
function ButtonsAndInputs() {
  const [on, setOn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [segment, setSegment] = useState<"day" | "week" | "month">("week");

  const semanticCtas = [
    { label: "Primary", className: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow", Icon: Sparkles, note: "The one big action on a screen" },
    { label: "Info CTA", className: "bg-info text-info-foreground hover:bg-info/90", Icon: Info, note: "Neutral confirmations / learn more" },
    { label: "Success CTA", className: "bg-success text-success-foreground hover:bg-success/90", Icon: CheckCircle2, note: "Confirm a positive outcome" },
    { label: "Warning CTA", className: "bg-warning text-warning-foreground hover:bg-warning/90", Icon: AlertTriangle, note: "Caution — reversible" },
    { label: "Danger CTA", className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", Icon: Trash2, note: "Destructive — irreversible" },
    { label: "AI CTA", className: "bg-ai text-ai-foreground hover:bg-ai/90 shadow-ai-glow", Icon: Wand2, note: "Anything AI-generated or agent-driven" },
    { label: "Pop CTA", className: "bg-pop text-pop-foreground hover:bg-pop/90", Icon: Heart, note: "Micro-delight moments only" },
    { label: "Commercial CTA", className: "bg-commercial text-commercial-foreground hover:bg-commercial/90", Icon: TrendingUp, note: "Promo / discount only" },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-12">

      {/* ── Variant + size matrix ── */}
      <Card className="p-6 lg:col-span-7">
        <h3 className="font-display text-lg font-bold">Variant & size matrix</h3>
        <p className="mt-1 text-sm text-muted-foreground">The base library — variants × sizes. Pair with semantic CTAs below.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button className="rounded-full bg-primary shadow-glow transition-spring hover:scale-[1.03]">
            <Sparkles className="h-4 w-4" /> Primary
          </Button>
          <Button variant="secondary" className="rounded-full">Secondary</Button>
          <Button variant="outline" className="rounded-full border-2">Outline</Button>
          <Button variant="ghost" className="rounded-full">Ghost</Button>
          <Button variant="link" className="text-primary">Link</Button>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button size="sm" className="rounded-full">Small</Button>
          <Button className="rounded-full">Default</Button>
          <Button size="lg" className="rounded-full">Large</Button>
          <Button size="icon" className="rounded-full" aria-label="Add"><Plus /></Button>
        </div>
        <CodePeek
          label="React + Tailwind"
          code={`<Button className="rounded-full bg-primary shadow-glow transition-spring hover:scale-[1.03]">
  <Sparkles className="h-4 w-4" /> Primary
</Button>`}
        />
      </Card>

      {/* ── Inputs ── */}
      <Card className="p-6 lg:col-span-5">
        <h3 className="font-display text-lg font-bold">Inputs</h3>
        <p className="mt-1 text-sm text-muted-foreground">Quiet by default, focus ring earns attention.</p>
        <div className="mt-5 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search the catalogue…" className="rounded-full border-2 pl-10" />
          </div>
          <Input placeholder="user@decathlon.com" className="rounded-xl border-2" />
          <div className="flex items-center justify-between rounded-xl border-2 border-border bg-muted/40 p-4">
            <div>
              <p className="text-sm font-semibold">Auto-rotate Copilot licences</p>
              <p className="text-xs text-muted-foreground">Reclaim after 30 days inactive</p>
            </div>
            <Switch checked={on} onCheckedChange={setOn} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge className="bg-success/15 text-success-foreground hover:bg-success/15">Active</Badge>
            <Badge className="bg-pop/15 text-pop hover:bg-pop/15">New</Badge>
          </div>
        </div>
      </Card>

      {/* ── Semantic CTAs ── */}
      <Card className="p-6 lg:col-span-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold">Semantic CTAs</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Color carries meaning. Use one semantic per surface — never stack two saturated CTAs side by side.
            </p>
          </div>
          <Badge variant="outline" className="font-mono text-[10px]">8 semantics</Badge>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {semanticCtas.map(c => (
            <div key={c.label} className="rounded-2xl border border-border bg-card/50 p-4">
              <button className={`${c.className} inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-spring hover:scale-[1.03]`}>
                <c.Icon className="h-4 w-4" /> {c.label}
              </button>
              <p className="mt-3 text-[11px] text-muted-foreground">{c.note}</p>
            </div>
          ))}
        </div>
        <CodePeek
          label="Semantic CTA pattern"
          code={`// Each CTA = semantic token + same hover physics
<button className="bg-info text-info-foreground hover:bg-info/90 rounded-full px-4 py-2 transition-spring hover:scale-[1.03]">
  <Info className="h-4 w-4" /> Info CTA
</button>`}
        />
        <DoDont
          doText="One primary action + a calm outline secondary. The eye knows where to land."
          dontText="Two saturated CTAs compete for attention. Users hesitate; click-through drops."
          doSlot={
            <div className="flex flex-wrap items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow">
                <Sparkles className="h-4 w-4" /> Save changes
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-card px-4 py-2 text-sm font-semibold">
                Cancel
              </button>
            </div>
          }
          dontSlot={
            <div className="flex flex-wrap items-center gap-2">
              <button className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                Save changes
              </button>
              <button className="inline-flex items-center gap-2 rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground">
                Delete account
              </button>
            </div>
          }
        />
      </Card>

      {/* ── Composite buttons ── */}
      <Card className="p-6 lg:col-span-7">
        <h3 className="font-display text-lg font-bold">Composite patterns</h3>
        <p className="mt-1 text-sm text-muted-foreground">Loading, split, icon-with-label, ghost-link — patterns over primitives.</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {/* Loading */}
          <div className="rounded-2xl border border-border bg-card/50 p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Loading state</p>
            <button
              disabled={loading}
              onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1500); }}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-spring hover:scale-[1.02] disabled:cursor-wait disabled:opacity-80"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {loading ? "Saving…" : "Save changes"}
            </button>
            <p className="mt-3 text-[11px] text-muted-foreground">Disable + swap icon. Never lock the whole page.</p>
          </div>

          {/* Split */}
          <div className="rounded-2xl border border-border bg-card/50 p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Split button</p>
            <div className="mt-3 inline-flex overflow-hidden rounded-full border border-border shadow-sm">
              <button className="flex items-center gap-2 bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-soft hover:bg-primary/90">
                <Send className="h-3.5 w-3.5" /> Deploy
              </button>
              <button aria-label="More deploy options" className="border-l border-primary-foreground/20 bg-primary px-2.5 text-primary-foreground transition-soft hover:bg-primary/90">
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">Primary action + adjacent options menu.</p>
          </div>

          {/* Icon-only */}
          <div className="rounded-2xl border border-border bg-card/50 p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Icon-only · with tooltip</p>
            <div className="mt-3 flex items-center gap-2">
              {[
                { Icon: Download, label: "Download" },
                { Icon: Settings, label: "Settings" },
                { Icon: Trash2, label: "Delete", danger: true },
              ].map(b => (
                <button key={b.label} aria-label={b.label} title={b.label}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card transition-spring hover:scale-110 ${b.danger ? "text-destructive hover:border-destructive/40 hover:bg-destructive/10" : "hover:bg-muted/60"}`}>
                  <b.Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">Always pair with aria-label + native title.</p>
          </div>

          {/* Dismissible chip */}
          <div className="rounded-2xl border border-border bg-card/50 p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Removable chip</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["squad-checkout", "incident", "today"].map(t => (
                <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs font-medium">
                  {t}
                  <button aria-label={`Remove ${t}`} className="rounded-full p-0.5 text-muted-foreground transition-soft hover:bg-foreground/10 hover:text-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">Filters & tag inputs.</p>
          </div>
        </div>
      </Card>

      {/* ── Segmented + toggle group ── */}
      <Card className="p-6 lg:col-span-5">
        <h3 className="font-display text-lg font-bold">Segmented control</h3>
        <p className="mt-1 text-sm text-muted-foreground">Pick one from a small set — replaces radio groups in toolbars.</p>

        <div role="radiogroup" aria-label="Time range" className="mt-5 inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 shadow-xs">
          {(["day", "week", "month"] as const).map(s => (
            <button
              key={s}
              role="radio"
              aria-checked={segment === s}
              onClick={() => setSegment(s)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-soft ${segment === s ? "bg-foreground text-background shadow-soft" : "text-muted-foreground hover:text-foreground"}`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Toggle group · icon set</p>
          <div className="mt-3 inline-flex overflow-hidden rounded-xl border border-border">
            {[LayoutGrid, BarChart3, LineChart].map((Icn, i) => (
              <button key={i} aria-label={`View ${i}`}
                className={`flex h-9 w-10 items-center justify-center border-l border-border first:border-l-0 transition-soft ${i === 0 ? "bg-muted text-foreground" : "bg-card text-muted-foreground hover:bg-muted/60 hover:text-foreground"}`}>
                <Icn className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <CodePeek
          label="Segmented control"
          code={`<div role="radiogroup" className="inline-flex rounded-full border border-border bg-card p-1">
  {options.map(o => (
    <button role="radio" aria-checked={value === o}
      className={\`rounded-full px-4 py-1.5 text-xs font-semibold \${value === o ? "bg-foreground text-background" : "text-muted-foreground"}\`}>
      {o}
    </button>
  ))}
</div>`}
        />
      </Card>
    </div>
  );
}

/* ───────────────────── CARDS & ARTIFACTS ───────────────────── */
function CardsAndArtifacts() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Stat artifact */}
      <Card className="overflow-hidden p-6 transition-spring hover:-translate-y-1 hover:shadow-pop">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">MTTR</span>
          <Badge className="bg-success/15 text-success-foreground hover:bg-success/15">−18%</Badge>
        </div>
        <p className="mt-4 font-display text-5xl font-bold">2.4<span className="text-xl text-muted-foreground">h</span></p>
        <Progress value={72} className="mt-4" />
        <p className="mt-2 text-xs text-muted-foreground">72% of SLA target</p>
      </Card>

      {/* Agent artifact */}
      <Card className="relative overflow-hidden p-6">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-gradient-pop opacity-15" />
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pop/10">
            <Bot className="h-5 w-5 text-pop" />
          </div>
          <div>
            <p className="font-semibold">Onboarding Buddy</p>
            <p className="text-xs text-muted-foreground">AI agent · GPT-4o</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Walks new joiners through GitHub, Slack & VPN in under 5 minutes.
        </p>
        <div className="mt-5 flex items-center gap-2">
          <Avatar className="h-7 w-7 border-2 border-card"><AvatarFallback className="bg-primary text-primary-foreground text-xs">AH</AvatarFallback></Avatar>
          <Avatar className="h-7 w-7 -ml-3 border-2 border-card"><AvatarFallback className="bg-accent text-accent-foreground text-xs">JM</AvatarFallback></Avatar>
          <Avatar className="h-7 w-7 -ml-3 border-2 border-card"><AvatarFallback className="bg-pop text-pop-foreground text-xs">+12</AvatarFallback></Avatar>
          <span className="ml-2 text-xs text-muted-foreground">used today</span>
          <Button size="sm" variant="ghost" className="ml-auto rounded-full">Open <ArrowRight className="h-3 w-3" /></Button>
        </div>
      </Card>

      {/* Integration artifact */}
      <Card className="p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Integrations</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { icon: Github, label: "GitHub", color: "bg-foreground text-background" },
            { icon: Slack, label: "Slack", color: "bg-pop/10 text-pop" },
            { icon: Bell, label: "Alerts", color: "bg-warning/15 text-warning-foreground" },
            { icon: Activity, label: "Datadog", color: "bg-info/15 text-info-foreground" },
            { icon: Users, label: "Okta", color: "bg-primary/10 text-primary" },
            { icon: BarChart3, label: "Looker", color: "bg-accent/20 text-accent-foreground" },
          ].map((i) => (
            <div key={i.label} className={`${i.color} aspect-square rounded-2xl p-3 transition-spring hover:scale-105 cursor-pointer`}>
              <i.icon className="h-5 w-5" />
              <p className="mt-auto pt-3 text-xs font-semibold">{i.label}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Ticket artifact */}
      <Card className="p-6 md:col-span-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Ticket #4821</p>
            <h4 className="mt-1 font-display text-lg font-bold">Copilot licence stuck on provisioning</h4>
          </div>
          <Badge className="bg-warning/15 text-warning-foreground hover:bg-warning/15">Investigating</Badge>
        </div>
        <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
          <Avatar className="h-7 w-7"><AvatarFallback className="bg-primary text-primary-foreground text-xs">AH</AvatarFallback></Avatar>
          <span>Abdo H. opened this 12 min ago</span>
          <span className="ml-auto font-mono text-xs">SLA · 1h 48m</span>
        </div>
        <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/40 p-4 text-sm">
          Buddy suggests: <span className="font-medium text-foreground">Re-trigger SCIM sync, then verify Okta group membership.</span>
          <div className="mt-3 flex gap-2">
            <Button size="sm" className="rounded-full">Apply fix</Button>
            <Button size="sm" variant="outline" className="rounded-full">Escalate</Button>
          </div>
        </div>
      </Card>

      {/* Streak / fun artifact */}
      <Card className="bg-gradient-hero p-6 text-on-gradient">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-current" />
          <p className="font-mono text-xs uppercase tracking-wider opacity-80">Team streak</p>
        </div>
        <p className="mt-4 font-display text-5xl font-bold">14 days</p>
        <p className="mt-1 text-sm opacity-90">zero P1 incidents — keep it going</p>
        <div className="mt-5 flex gap-1">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="h-8 flex-1 rounded-sm bg-white/30" style={{ opacity: 0.3 + (i / 14) * 0.7 }} />
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ───────────────────── CAROUSEL ───────────────────── */
function CarouselDemo() {
  const [idx, setIdx] = useState(0);
  const items = [
    { title: "Self-Service", desc: "GitHub, Slack, Okta in one place", icon: LayoutGrid, gradient: "bg-gradient-hero" },
    { title: "AI Copilots", desc: "12 agents, infinite uses", icon: Bot, gradient: "bg-gradient-pop" },
    { title: "Tech Radar", desc: "What we adopt, trial, hold", icon: Activity, gradient: "bg-gradient-hero" },
    { title: "Capability Map", desc: "Squads → systems → KPIs", icon: BarChart3, gradient: "bg-gradient-pop" },
    { title: "Settings Hub", desc: "Themes, metrics, prefs", icon: Settings, gradient: "bg-gradient-hero" },
  ];
  return (
    <Card className="overflow-hidden p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-bold">Featured tools</h3>
          <p className="text-sm text-muted-foreground">Snap-scroll, draggable, keyboard-nav.</p>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="outline" className="rounded-full" aria-label="Previous slide" onClick={() => setIdx(Math.max(0, idx - 1))}>
            <ChevronLeft />
          </Button>
          <Button size="icon" variant="outline" className="rounded-full" aria-label="Next slide" onClick={() => setIdx(Math.min(items.length - 1, idx + 1))}>
            <ChevronRight />
          </Button>
        </div>
      </div>
      <div className="flex gap-4 overflow-hidden">
        {items.map((it, i) => (
          <div key={i}
            className="min-w-[280px] flex-1 transition-spring"
            style={{ transform: `translateX(-${idx * 296}px)` }}>
            <div className="group cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-5 transition-spring hover:-translate-y-1 hover:shadow-pop">
              <div className={`${it.gradient} mb-4 flex h-32 items-center justify-center rounded-xl`}>
                <it.icon className="h-12 w-12 text-on-gradient transition-spring group-hover:scale-110" />
              </div>
              <p className="font-display font-bold">{it.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-center gap-1.5">
        {items.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-3 rounded-full transition-soft ${i === idx ? "w-8 bg-primary" : "w-3 bg-border"}`} />
        ))}
      </div>
    </Card>
  );
}

/* ───────────────────── FEEDBACK ───────────────────── */
function FeedbackDemo() {
  const items = [
    { Icon: CheckCircle2, borderClass: "border-success/30", bgClass: "bg-success/10", iconBgClass: "bg-success/20", iconTextClass: "text-success-foreground", title: "Provisioned", msg: "Your Copilot seat is active. Welcome aboard!" },
    { Icon: Info, borderClass: "border-info/30", bgClass: "bg-info/10", iconBgClass: "bg-info/20", iconTextClass: "text-info-foreground", title: "Heads up", msg: "Scheduled maintenance Friday 22:00 CET." },
    { Icon: AlertTriangle, borderClass: "border-warning/30", bgClass: "bg-warning/10", iconBgClass: "bg-warning/20", iconTextClass: "text-warning-foreground", title: "Almost there", msg: "Licence usage at 87% — review allocation." },
    { Icon: Bell, borderClass: "border-destructive/30", bgClass: "bg-destructive/10", iconBgClass: "bg-destructive/20", iconTextClass: "text-destructive-foreground", title: "Action needed", msg: "Okta group missing — escalate to platform team." },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((a) => (
        <div key={a.title}
          className={`flex items-start gap-4 rounded-2xl border ${a.borderClass} ${a.bgClass} p-5`}>
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${a.iconBgClass}`}>
            <a.Icon className={`h-5 w-5 ${a.iconTextClass}`} />
          </div>
          <div>
            <p className="font-semibold">{a.title}</p>
            <p className="text-sm text-muted-foreground">{a.msg}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────── EMPTY STATES + TOASTS ───────────────────── */
function EmptyStateAndToasts() {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-12">
      <Card className="p-6 lg:col-span-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold">Empty states</h3>
            <p className="mt-1 text-sm text-muted-foreground">Zero-data screens are first impressions — never a blank canvas.</p>
          </div>
          <Badge variant="outline" className="font-mono text-[10px]">no data ≠ no design</Badge>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <EmptyState
            icon={Inbox}
            tone="neutral"
            eyebrow="Tickets"
            title="Inbox zero — for real"
            description="No open tickets today. Spin up an AI agent or import from Jira to get going."
            primary={{ label: "Create agent", onClick: () => toast.success("Agent draft started") }}
            secondary={{ label: "Import from Jira" }}
          />
          <EmptyState
            icon={SearchX}
            tone="info"
            eyebrow="Search"
            title="No matches for “copilot”"
            description="Try a broader query or browse the catalogue by squad, system, or tag."
            primary={{ label: "Clear filters", onClick: () => toast("Filters cleared") }}
            secondary={{ label: "Browse catalogue" }}
          />
        </div>

        <CodePeek
          label="EmptyState"
          code={`<EmptyState
  icon={Inbox}
  tone="neutral"
  eyebrow="Tickets"
  title="Inbox zero — for real"
  description="No open tickets today. Spin up an AI agent."
  primary={{ label: "Create agent", onClick: () => {} }}
  secondary={{ label: "Import from Jira" }}
/>`}
        />
      </Card>

      <Card className="p-6 lg:col-span-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold">Toasts</h3>
            <p className="mt-1 text-sm text-muted-foreground">Bottom-right, auto-dismiss, semantic color. Stack max 3.</p>
          </div>
          <Badge variant="outline" className="font-mono text-[10px]">sonner</Badge>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => toast.success("Saved", { description: "Settings synced across 3 devices." })}
            className="inline-flex items-center gap-2 rounded-full bg-success px-4 py-2 text-sm font-semibold text-success-foreground transition-spring hover:scale-[1.03]"
          >
            <CheckCircle2 className="h-4 w-4" /> Success
          </button>
          <button
            onClick={() =>
              toast.error("Couldn't save", {
                description: "Retry in a moment.",
                action: { label: "Retry", onClick: () => toast("Retrying…") },
              })
            }
            className="inline-flex items-center gap-2 rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground transition-spring hover:scale-[1.03]"
          >
            <AlertTriangle className="h-4 w-4" /> Error
          </button>
          <button
            onClick={() =>
              toast("Buddy is thinking…", {
                description: "Drafting a fix for ticket #4821.",
                icon: <Wand2 className="h-4 w-4 text-ai" />,
              })
            }
            className="inline-flex items-center gap-2 rounded-full bg-ai px-4 py-2 text-sm font-semibold text-ai-foreground shadow-ai-glow transition-spring hover:scale-[1.03]"
          >
            <Wand2 className="h-4 w-4" /> AI
          </button>
          <button
            onClick={() => toast.info("Heads up", { description: "Scheduled maintenance Friday 22:00 CET." })}
            className="inline-flex items-center gap-2 rounded-full bg-info px-4 py-2 text-sm font-semibold text-info-foreground transition-spring hover:scale-[1.03]"
          >
            <Info className="h-4 w-4" /> Info
          </button>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/40 p-4 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground">Toast rules</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>One thought per toast. Description ≤ 80 chars.</li>
            <li>Errors get an action (Retry / Undo).</li>
            <li>Never block — always dismissible, never modal.</li>
          </ul>
        </div>

        <CodePeek
          label="Toast call"
          code={`import { toast } from "sonner";

toast.success("Saved", {
  description: "Settings synced across 3 devices.",
});`}
        />
      </Card>
    </div>
  );
}

/* ───────────────────── LAYOUT ───────────────────── */
function LayoutGuidelines() {
  return (
    <div className="grid gap-6 lg:grid-cols-12">

      {/* ── 12-column grid ── */}
      <Card className="p-6 lg:col-span-7">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold">12-column fluid grid</h3>
            <p className="mt-1 text-sm text-muted-foreground">8px base · 24px gutter · max content 1400px.</p>
          </div>
          <Badge variant="outline" className="font-mono text-[10px]">grid · 12</Badge>
        </div>
        <div className="mt-5 grid grid-cols-12 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-20 rounded-md bg-primary/10" />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-12 gap-2 text-[10px] font-mono text-muted-foreground">
          <div className="col-span-3 rounded bg-muted px-2 py-1">col-span-3 · nav</div>
          <div className="col-span-6 rounded bg-muted px-2 py-1">col-span-6 · main</div>
          <div className="col-span-3 rounded bg-muted px-2 py-1">col-span-3 · aside</div>
        </div>
        <CodePeek
          label="Grid recipe"
          code={`<main className="mx-auto max-w-[1400px] px-6 md:px-10">
  <div className="grid grid-cols-12 gap-6">
    <aside className="col-span-12 lg:col-span-3">…</aside>
    <section className="col-span-12 lg:col-span-6">…</section>
    <aside className="col-span-12 lg:col-span-3">…</aside>
  </div>
</main>`}
        />
      </Card>

      {/* ── Surface hierarchy + density ── */}
      <Card className="p-6 lg:col-span-5">
        <h3 className="font-display text-lg font-bold">Surface & elevation</h3>
        <p className="mt-1 text-sm text-muted-foreground">Background → Surface → Card → Pop. Shadows replace borders as you climb.</p>
        <div className="mt-5 space-y-3">
          <div className="rounded-xl bg-background p-4 text-xs">background · z0</div>
          <div className="rounded-xl bg-surface p-4 text-xs shadow-xs">surface · z1</div>
          <div className="rounded-xl bg-card p-4 text-xs shadow-soft">card · z2</div>
          <div className="rounded-xl bg-card p-4 text-xs shadow-pop">card · z3 (modal, popover)</div>
        </div>

        <div className="mt-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Density modes</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { l: "Comfortable", v: "p-6 · gap-6", note: "Marketing & landing" },
              { l: "Cosy", v: "p-4 · gap-4", note: "Default app shell" },
              { l: "Compact", v: "p-2 · gap-2", note: "Data tables, dashboards" },
            ].map(d => (
              <div key={d.l} className="rounded-lg border border-border p-3">
                <p className="text-xs font-semibold">{d.l}</p>
                <p className="mt-1 font-mono text-[10px] text-muted-foreground">{d.v}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">{d.note}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* ── App shell pattern ── */}
      <Card className="p-6 lg:col-span-6">
        <h3 className="font-display text-lg font-bold">App-shell layout</h3>
        <p className="mt-1 text-sm text-muted-foreground">Persistent left nav, sticky top bar, optional right aside.</p>
        <div className="mt-5 overflow-hidden rounded-2xl border border-border">
          <div className="flex h-7 items-center gap-2 border-b border-border bg-muted/60 px-3">
            <span className="h-2 w-2 rounded-full bg-destructive/60" />
            <span className="h-2 w-2 rounded-full bg-warning/70" />
            <span className="h-2 w-2 rounded-full bg-success/60" />
            <span className="ml-2 font-mono text-[10px] text-muted-foreground">app · 1440 × 900</span>
          </div>
          <div className="grid grid-cols-[60px_1fr_140px] bg-card">
            <div className="flex flex-col items-center gap-2 border-r border-border bg-muted/30 py-3">
              {[LayoutGrid, Bot, BarChart3, Settings].map((I, i) => (
                <div key={i} className={`flex h-8 w-8 items-center justify-center rounded-lg ${i === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>
                  <I className="h-3.5 w-3.5" />
                </div>
              ))}
            </div>
            <div className="space-y-2 p-3">
              <div className="h-3 w-1/3 rounded bg-foreground/20" />
              <div className="grid grid-cols-3 gap-2">
                <div className="h-16 rounded bg-primary/10" />
                <div className="h-16 rounded bg-accent/15" />
                <div className="h-16 rounded bg-ai/10" />
              </div>
              <div className="h-20 rounded bg-muted/60" />
            </div>
            <div className="space-y-2 border-l border-border bg-muted/20 p-3">
              <div className="h-2.5 w-3/4 rounded bg-foreground/20" />
              <div className="h-2 w-1/2 rounded bg-foreground/10" />
              <div className="h-10 rounded bg-pop/15" />
              <div className="h-2 w-2/3 rounded bg-foreground/10" />
            </div>
          </div>
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">60px rail · fluid content · 140–320px aside. Aside collapses below <code className="font-mono">lg</code>.</p>
      </Card>

      {/* ── Editorial split / golden ratio ── */}
      <Card className="p-6 lg:col-span-6">
        <h3 className="font-display text-lg font-bold">Editorial layouts</h3>
        <p className="mt-1 text-sm text-muted-foreground">For hero, marketing, and detail pages. Asymmetry beats 50/50.</p>

        <div className="mt-5 space-y-3">
          <div className="grid grid-cols-[1.618fr_1fr] gap-3">
            <div className="rounded-xl bg-primary/10 p-3 text-[10px] font-mono text-primary">copy · 61.8%</div>
            <div className="rounded-xl bg-accent/15 p-3 text-[10px] font-mono text-accent">visual · 38.2%</div>
          </div>
          <p className="text-[11px] text-muted-foreground">Golden ratio · marketing heroes</p>

          <div className="grid grid-cols-[1.35fr_1fr] gap-3">
            <div className="rounded-xl bg-ai/10 p-3 text-[10px] font-mono text-ai">narrative · 57%</div>
            <div className="rounded-xl bg-pop/10 p-3 text-[10px] font-mono text-pop">artifact · 43%</div>
          </div>
          <p className="text-[11px] text-muted-foreground">1.35 : 1 · AI surfaces</p>

          <div className="grid grid-cols-[1fr_2fr_1fr] gap-3">
            <div className="rounded-xl bg-muted p-3 text-[10px] font-mono text-muted-foreground">meta</div>
            <div className="rounded-xl bg-foreground/5 p-3 text-[10px] font-mono">main</div>
            <div className="rounded-xl bg-muted p-3 text-[10px] font-mono text-muted-foreground">aside</div>
          </div>
          <p className="text-[11px] text-muted-foreground">1 : 2 : 1 · article / detail pages</p>
        </div>
      </Card>

      {/* ── Breakpoints ── */}
      <Card className="p-6 lg:col-span-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-bold">Breakpoint scale</h3>
            <p className="mt-1 text-sm text-muted-foreground">Mobile-first. Reach for <code className="font-mono">md</code> and <code className="font-mono">lg</code> for layout shifts; reserve <code className="font-mono">xl/2xl</code> for marketing pages.</p>
          </div>
          <Badge variant="outline" className="font-mono text-[10px]">5 stops</Badge>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
          {[
            { l: "sm", w: "≥ 640px", use: "Single col" },
            { l: "md", w: "≥ 768px", use: "Two-col split" },
            { l: "lg", w: "≥ 1024px", use: "App shell" },
            { l: "xl", w: "≥ 1280px", use: "12-col rich" },
            { l: "2xl", w: "≥ 1536px", use: "Max width" },
          ].map(b => (
            <div key={b.l} className="rounded-xl border border-border bg-card p-4">
              <p className="font-mono text-xs font-bold text-primary">{b.l}</p>
              <p className="mt-1 font-mono text-[10px] text-muted-foreground">{b.w}</p>
              <p className="mt-2 text-xs">{b.use}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* ── Spacing rhythm ── */}
      <Card className="p-6 lg:col-span-12">
        <h3 className="font-display text-lg font-bold">Spacing rhythm</h3>
        <p className="mt-1 text-sm text-muted-foreground">4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 · stick to the scale, never improvise.</p>
        <div className="mt-5 flex items-end gap-2">
          {[4, 8, 12, 16, 24, 32, 48, 64].map(s => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className="rounded bg-primary/15" style={{ width: s, height: s }} />
              <span className="font-mono text-[10px] text-muted-foreground">{s}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Do / Don't — color balance */}
      <div className="lg:col-span-12">
        <DoDont
          doText="60% neutral surfaces / 30% brand containers / 10% accent moments. Brand pops because it's rare."
          dontText="Paint the page brand-blue and brand fatigue sets in. Nothing stands out anymore."
          doSlot={
            <div className="grid w-full grid-cols-12 gap-1.5">
              <div className="col-span-7 h-16 rounded-md bg-muted/60" />
              <div className="col-span-3 h-16 rounded-md bg-primary/15" />
              <div className="col-span-2 h-16 rounded-md bg-pop" />
            </div>
          }
          dontSlot={
            <div className="grid w-full grid-cols-12 gap-1.5">
              <div className="col-span-12 h-16 rounded-md bg-primary" />
            </div>
          }
        />
      </div>
    </div>
  );
}

/* ───────────────────── MOTION ───────────────────── */
function MotionGuidelines() {
  // 1 — Shake on error
  const [shake, setShake] = useState(0);
  // 2 — Ripple click
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const r = { id: Date.now() + Math.random(), x: e.clientX - rect.left, y: e.clientY - rect.top };
    setRipples(p => [...p, r]);
    setTimeout(() => setRipples(p => p.filter(x => x.id !== r.id)), 700);
  };
  // 3 — Stagger reveal — replay by remounting children with key
  const [staggerKey, setStaggerKey] = useState(0);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Existing 3 demos */}
      <Card className="p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-pop">Spring</p>
        <h4 className="mt-2 font-display text-xl font-bold">Hover lift</h4>
        <p className="mt-1 text-sm text-muted-foreground">Cards rise 4px with a soft ease — physical, alive.</p>
        <div className="mt-6 flex h-32 items-center justify-center rounded-xl bg-muted/40">
          <div className="h-16 w-16 rounded-2xl bg-gradient-hero shadow-glow transition-spring hover:-translate-y-2 hover:scale-110" />
        </div>
        <code className="mt-3 block font-mono text-[10px] text-muted-foreground">cubic-bezier(.22,1,.36,1) · 300ms</code>
        <CodePeek
          label="Tailwind"
          code={`<div className="transition-spring hover:-translate-y-2 hover:scale-110" />`}
        />
      </Card>

      <Card className="p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-pop">Soft</p>
        <h4 className="mt-2 font-display text-xl font-bold">Float</h4>
        <p className="mt-1 text-sm text-muted-foreground">Idle bobbing on hero artifacts only.</p>
        <div className="mt-6 flex h-32 items-center justify-center rounded-xl bg-muted/40">
          <div className="animate-float h-16 w-16 rounded-2xl bg-gradient-pop" />
        </div>
        <code className="mt-3 block font-mono text-[10px] text-muted-foreground">4s ease-in-out infinite</code>
        <CodePeek label="Class" code={`<div className="animate-float" />`} />
      </Card>

      <Card className="p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-pop">Snappy</p>
        <h4 className="mt-2 font-display text-xl font-bold">Pop in</h4>
        <p className="mt-1 text-sm text-muted-foreground">Toasts & badges enter with character.</p>
        <div className="mt-6 flex h-32 items-center justify-center rounded-xl bg-muted/40">
          <Badge key="pop-badge" className="animate-pop-in bg-pop text-pop-foreground">
            <Heart className="h-3 w-3 fill-current" /> Nice work
          </Badge>
        </div>
        <code className="mt-3 block font-mono text-[10px] text-muted-foreground">spring · 400ms</code>
        <CodePeek label="Class" code={`<Badge className="animate-pop-in">…</Badge>`} />
      </Card>

      {/* ── 5 NEW MOTION INTERACTIONS ── */}

      {/* 1 — Shake on error */}
      <Card className="p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-destructive">Error</p>
        <h4 className="mt-2 font-display text-xl font-bold">Shake to reject</h4>
        <p className="mt-1 text-sm text-muted-foreground">Wrong code, wrong field — the input pushes back briefly.</p>
        <div className="mt-6 flex h-32 items-center justify-center rounded-xl bg-muted/40">
          <div className="flex items-center gap-3">
            <Input
              key={shake}
              defaultValue="••••"
              className={`w-24 rounded-xl border-2 text-center font-mono ${shake ? "animate-shake-x border-destructive/60 text-destructive" : ""}`}
            />
            <Button size="sm" variant="destructive" className="rounded-full" onClick={() => setShake(s => s + 1)}>
              <X className="h-3.5 w-3.5" /> Reject
            </Button>
          </div>
        </div>
        <code className="mt-3 block font-mono text-[10px] text-muted-foreground">shake-x · --motion-slow (450ms)</code>
        <CodePeek
          label="Class"
          code={`// Trigger by toggling a key + class
<Input className={isInvalid ? "animate-shake-x border-destructive" : ""} />`}
        />
      </Card>

      {/* 2 — Magnetic hover */}
      <Card className="p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-primary">Magnetic</p>
        <h4 className="mt-2 font-display text-xl font-bold">Pull on hover</h4>
        <p className="mt-1 text-sm text-muted-foreground">CTAs subtly attract the cursor — luxury without being loud.</p>
        <div className="mt-6 flex h-32 items-center justify-center rounded-xl bg-muted/40">
          <button className="magnetic inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            <Sparkles className="h-4 w-4" /> Hover me
          </button>
        </div>
        <code className="mt-3 block font-mono text-[10px] text-muted-foreground">.magnetic · --motion-base · scale 1.04 + glow</code>
        <CodePeek label="Class" code={`<button className="magnetic …">Hover me</button>`} />
      </Card>

      {/* 3 — Tilt 3D */}
      <Card className="p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-ai">3D</p>
        <h4 className="mt-2 font-display text-xl font-bold">Tilt card</h4>
        <p className="mt-1 text-sm text-muted-foreground">Hero artifacts get a small parallax tilt on hover — perspective makes them physical.</p>
        <div className="mt-6 flex h-32 items-center justify-center rounded-xl bg-muted/40">
          <div className="tilt-3d h-20 w-28 rounded-2xl bg-gradient-ai shadow-ai-glow" />
        </div>
        <code className="mt-3 block font-mono text-[10px] text-muted-foreground">.tilt-3d · --motion-base · rotateX 8° rotateY -8°</code>
        <CodePeek label="Class" code={`<Card className="tilt-3d">…</Card>`} />
      </Card>

      {/* 4 — Ripple click */}
      <Card className="p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-pop">Tap</p>
        <h4 className="mt-2 font-display text-xl font-bold">Ink ripple</h4>
        <p className="mt-1 text-sm text-muted-foreground">A radial ink lift confirms the click landed.</p>
        <div className="mt-6 flex h-32 items-center justify-center rounded-xl bg-muted/40">
          <button
            onClick={addRipple}
            className="relative overflow-hidden rounded-full bg-pop px-6 py-2.5 text-sm font-semibold text-pop-foreground transition-spring hover:scale-[1.02]"
          >
            <span className="relative z-10 inline-flex items-center gap-2"><Send className="h-4 w-4" /> Tap me</span>
            {ripples.map(r => (
              <span key={r.id} className="ripple h-6 w-6" style={{ left: r.x - 12, top: r.y - 12 }} />
            ))}
          </button>
        </div>
        <code className="mt-3 block font-mono text-[10px] text-muted-foreground">.ripple · --motion-slow · scale 0→4</code>
        <CodePeek
          label="Pattern"
          code={`// On click, push {id,x,y} into ripples state,
// render <span className="ripple" /> at that offset.`}
        />
      </Card>

      {/* 5 — Stagger reveal */}
      <Card className="p-6">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">Reveal</p>
        <h4 className="mt-2 font-display text-xl font-bold">Stagger in</h4>
        <p className="mt-1 text-sm text-muted-foreground">List items fade up one by one — perfect for filtered results.</p>
        <div className="mt-6 flex h-32 items-center justify-center rounded-xl bg-muted/40">
          <div key={staggerKey} className="stagger-children flex flex-col gap-1.5">
            {["Onboarding Buddy", "Repo Sentinel", "Cost Sense", "Doc Synth"].map(t => (
              <div key={t} className="rounded-md bg-card px-3 py-1.5 text-xs font-medium shadow-xs">{t}</div>
            ))}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <code className="block font-mono text-[10px] text-muted-foreground">fade-up · --motion-base · 70ms step</code>
          <Button size="sm" variant="ghost" className="rounded-full" onClick={() => setStaggerKey(k => k + 1)}>
            <RefreshCw className="h-3 w-3" /> Replay
          </Button>
        </div>
        <CodePeek label="Class" code={`<ul className="stagger-children">{items.map(…)}</ul>`} />
      </Card>

      {/* Do / Don't — motion */}
      <div className="md:col-span-3">
        <DoDont
          doText="One element animates on its trigger. Confirms intent, then settles."
          dontText="Everything moves all the time — distracting, slow, and tanks reduced-motion."
          doSlot={
            <div className="flex items-center gap-3">
              <button className="magnetic inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                <Sparkles className="h-4 w-4" /> Hover me
              </button>
              <span className="text-[11px] text-muted-foreground">only the button reacts</span>
            </div>
          }
          dontSlot={
            <div className="flex items-center gap-3">
              <div className="animate-float h-10 w-10 rounded-lg bg-pop" />
              <div className="animate-pulse h-10 w-10 rounded-lg bg-ai" />
              <div className="animate-bounce h-10 w-10 rounded-lg bg-primary" />
              <div className="animate-spin h-10 w-10 rounded-lg bg-accent" />
            </div>
          }
        />
      </div>

      {/* Principles */}
      <Card className="p-6 md:col-span-3">
        <h4 className="font-display text-lg font-bold">Interaction principles</h4>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          {[
            { n: "01", t: "Reactive, not loud", d: "Only the touched element animates. Never page-wide." },
            { n: "02", t: "Confirm with motion", d: "Saved? Pop a tiny badge. Failed? Shake the field." },
            { n: "03", t: "Respect reduced motion", d: "All animations gate on prefers-reduced-motion." },
            { n: "04", t: "Speed under 400ms", d: "Anything longer feels broken in dashboards." },
          ].map(p => (
            <div key={p.n} className="rounded-xl border border-dashed border-border p-4">
              <span className="font-mono text-xs text-pop">{p.n}</span>
              <p className="mt-1 font-semibold">{p.t}</p>
              <p className="mt-1 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ───────────────────── EXAMPLES ───────────────────── */
function ExamplePages() {
  const [exampleTheme, setExampleTheme] = useState<Theme>("light");
  // Sync with global on mount so preview matches header
  useEffect(() => {
    if (typeof document !== "undefined") {
      setExampleTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    }
  }, []);

  return (
    <Tabs defaultValue="desk" className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabsList className="rounded-full bg-muted p-1">
          <TabsTrigger value="desk" className="rounded-full">AI Service Desk</TabsTrigger>
          <TabsTrigger value="dash" className="rounded-full">Self-Service Dashboard</TabsTrigger>
          <TabsTrigger value="hub" className="rounded-full">Tools Hub</TabsTrigger>
          <TabsTrigger value="receipt" className="rounded-full">Agentic Platform</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Preview</span>
          <ThemeToggle mode={exampleTheme} onChange={setExampleTheme} size="sm" />
        </div>
      </div>

      <TabsContent value="desk" className="mt-6">
        <ThemeScope mode={exampleTheme} className="overflow-hidden rounded-3xl">
          <ExampleServiceDesk />
        </ThemeScope>
      </TabsContent>
      <TabsContent value="dash" className="mt-6">
        <ThemeScope mode={exampleTheme} className="overflow-hidden rounded-3xl">
          <ExampleDashboard />
        </ThemeScope>
      </TabsContent>
      <TabsContent value="hub" className="mt-6">
        <ThemeScope mode={exampleTheme} className="overflow-hidden rounded-3xl">
          <ExampleHub />
        </ThemeScope>
      </TabsContent>
      <TabsContent value="receipt" className="mt-6">
        <ThemeScope mode={exampleTheme} className="overflow-hidden rounded-3xl">
          <ExampleAgenticPlatform />
        </ThemeScope>
      </TabsContent>
    </Tabs>
  );
}

function ExampleServiceDesk() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-soft">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-border bg-muted/30 p-5">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-hero" />
            <span className="font-display font-bold">Decathlon</span>
          </div>
          <nav className="mt-6 space-y-1 text-sm">
            {[
              { l: "Dashboard", i: LayoutGrid, active: false },
              { l: "Service Desk", i: Bot, active: true },
              { l: "Self Services", i: Zap, active: false },
              { l: "Tech Radar", i: Activity, active: false },
              { l: "Capability Map", i: BarChart3, active: false },
              { l: "Settings", i: Settings, active: false },
            ].map(n => (
              <button key={n.l} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-soft ${n.active ? "bg-primary text-primary-foreground shadow-glow" : "hover:bg-card"}`} aria-current={n.active ? "page" : undefined}>
                <n.i className="h-4 w-4" /> {n.l}
              </button>
            ))}
          </nav>
        </aside>
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">AI Service Desk / Copilot</p>
              <h3 className="mt-2 font-display text-3xl font-bold">Hi Abdo, how can Buddy help?</h3>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-success/15 text-success-foreground hover:bg-success/15">3 agents live</Badge>
              <Avatar><AvatarFallback className="bg-pop text-pop-foreground">AH</AvatarFallback></Avatar>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-ai">
                <Bot className="h-5 w-5 text-on-gradient" />
              </div>
              <div className="flex-1">
                <p className="text-sm">Hey! I can manage your Copilot licence, reset SSO, or open a P2 ticket. What's up?</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Renew my licence", "Reset SSO", "Open ticket", "Show usage"].map(s => (
                    <Button key={s} size="sm" variant="outline" className="rounded-full">{s}</Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-dashed border-primary/30 bg-primary/5 p-3">
              <Input placeholder="Ask anything…" className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { l: "Active licence", v: "GitHub Copilot", s: "renewed Mar 14" },
              { l: "Tickets open", v: "2", s: "1 in progress" },
              { l: "Saved hours", v: "47h", s: "this quarter" },
            ].map(s => (
              <div key={s.l} className="rounded-xl bg-card p-4">
                <p className="font-mono text-xs uppercase text-muted-foreground">{s.l}</p>
                <p className="mt-2 font-display text-2xl font-bold">{s.v}</p>
                <p className="text-xs text-muted-foreground">{s.s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExampleDashboard() {
  return (
    <div className="rounded-3xl border border-border bg-surface p-8 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Self Services / Overview</p>
          <h3 className="mt-2 font-display text-3xl font-bold">Good morning, Squad Atlas</h3>
        </div>
        <Button className="rounded-full bg-primary shadow-glow"><Plus /> New request</Button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {[
          { l: "Open requests", v: 12, badgeClass: "bg-primary/10 text-primary" },
          { l: "Resolved today", v: 38, badgeClass: "bg-success/15 text-success-foreground" },
          { l: "AI auto-fixed", v: 21, badgeClass: "bg-pop/10 text-pop" },
          { l: "Avg. wait", v: "4m", badgeClass: "bg-accent/20 text-accent-foreground" },
        ].map(s => (
          <div key={s.l} className="rounded-2xl bg-card p-5 shadow-soft transition-spring hover:-translate-y-1">
            <div className={`${s.badgeClass} mb-3 inline-flex rounded-lg px-2 py-1 text-[10px] font-bold uppercase tracking-wider`}>live</div>
            <p className="font-display text-3xl font-bold">{s.v}</p>
            <p className="text-xs text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl bg-card p-6 lg:col-span-2">
          <p className="font-display font-bold">Resolution velocity</p>
          <div className="mt-5 flex items-end gap-2">
            {[60,75,55,90,72,85,95,80,100,88,92,98].map((h,i)=>(
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-primary to-accent" style={{ height: h*1.4 }}/>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-gradient-hero p-6 text-on-gradient">
          <Sparkles className="h-6 w-6" />
          <p className="mt-3 font-display text-xl font-bold leading-tight">Buddy resolved 21 tickets without you lifting a finger.</p>
          <Button variant="secondary" size="sm" className="mt-4 rounded-full">See breakdown</Button>
        </div>
      </div>
    </div>
  );
}

function ExampleHub() {
  const tools = [
    { l: "GitHub Tools", c: "bg-foreground text-background", i: Github },
    { l: "Slack Admin", c: "bg-pop/15 text-pop", i: Slack },
    { l: "Identity", c: "bg-primary/10 text-primary", i: Users },
    { l: "Observability", c: "bg-info/15 text-info-foreground", i: Activity },
    { l: "Reporting", c: "bg-accent/25 text-accent-foreground", i: BarChart3 },
    { l: "Settings", c: "bg-muted text-foreground", i: Settings },
  ];
  return (
    <div className="rounded-3xl border border-border bg-surface p-8 shadow-soft">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Self Services / GitHub Tools</p>
        <h3 className="mt-2 font-display text-3xl font-bold">Pick your tool</h3>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {tools.map(t => (
          <button key={t.l} className="group rounded-2xl border border-border bg-card p-6 text-left transition-spring hover:-translate-y-1 hover:shadow-pop">
            <div className={`${t.c} inline-flex h-12 w-12 items-center justify-center rounded-xl transition-spring group-hover:scale-110`}>
              <t.i className="h-6 w-6" />
            </div>
            <p className="mt-4 font-display font-bold">{t.l}</p>
            <p className="mt-1 text-sm text-muted-foreground">Manage, audit & provision in one click.</p>
            <div className="mt-4 flex items-center text-xs font-semibold text-primary">
              Open <ArrowRight className="ml-1 h-3 w-3 transition-spring group-hover:translate-x-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────── AGENTIC PLATFORM HUB ───────────────────── */
function ExampleAgenticPlatform() {
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

/* ───────────────────── COLOR USAGE (60/30/10) ───────────────────── */
function ColorUsage() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
      <Card className="p-6">
        <h3 className="font-display text-lg font-bold">The 60 / 30 / 10 rule</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Neutrals dominate. Brand & AI guide attention. Commercial & extended accents are seasoning, never the meal.
        </p>
        <div className="mt-6 flex h-14 overflow-hidden rounded-xl border border-border">
          <div className="flex flex-1 basis-[60%] items-center justify-center bg-muted text-xs font-semibold">
            60% · Neutrals & quiet
          </div>
          <div className="flex basis-[30%] items-center justify-center bg-primary text-xs font-semibold text-primary-foreground">
            30% · Brand & AI
          </div>
          <div className="flex basis-[10%] items-center justify-center bg-commercial text-[10px] font-semibold text-commercial-foreground">
            10%
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            { t: "Do", body: "Use brand blue only for primary CTAs and signature moments.", tone: "success" },
            { t: "Do", body: "Use quiet/extended tints for large category containers.", tone: "success" },
            { t: "Don't", body: "Don't paint full backgrounds in brand blue or commercial red.", tone: "destructive" },
          ].map(r => (
            <div key={r.body} className={`rounded-xl border-l-4 p-3 text-xs ${r.tone === "success" ? "border-l-success bg-success/5" : "border-l-destructive bg-destructive/5"}`}>
              <p className="font-semibold">{r.t}</p>
              <p className="mt-1 text-muted-foreground">{r.body}</p>
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="font-display text-lg font-bold">Categorization</h3>
        <p className="mt-1 text-sm text-muted-foreground">Extended quiet tints for chips & containers — never as page backgrounds.</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          {[
            { l: "Identity", c: "bg-ext-purple/15 text-ext-purple", icon: ShieldCheck },
            { l: "Data", c: "bg-ext-cyan/15 text-ext-cyan", icon: Database },
            { l: "Apps", c: "bg-ext-pink/15 text-ext-pink", icon: LayoutGrid },
            { l: "Insights", c: "bg-ext-yellow/20 text-warning-foreground", icon: BarChart3 },
            { l: "Source code", c: "bg-foreground/8 text-foreground", icon: GitBranch },
            { l: "Compute", c: "bg-primary/10 text-primary", icon: Cpu },
          ].map(t => (
            <div key={t.l} className={`${t.c} flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition-spring hover:scale-[1.02]`}>
              <t.icon className="h-3.5 w-3.5" /> {t.l}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ───────────────────── AI BUILDING BLOCKS ───────────────────── */
function AIComponents() {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Prompt input */}
      <Card className="p-6 lg:col-span-7">
        <div className="mb-4 flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-ai" />
          <p className="text-xs font-medium uppercase tracking-widest text-ai">Prompt input</p>
        </div>
        <div className="rounded-2xl border border-ai/30 bg-ai/5 p-4 shadow-ai-glow">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-ai">
              <Brain className="h-4 w-4 text-ai-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm">
                Show me last week's failed deploys grouped by squad
                <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-[2px] bg-ai animate-caret" />
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Group by service", "Add error type", "Last 30 days", "Export CSV"].map(s => (
                  <button key={s} className="rounded-full border border-ai/30 bg-card px-3 py-1 text-[11px] font-medium text-ai transition-spring hover:scale-105 hover:bg-ai/10">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="font-mono">⌘K to summon · ↵ to send</span>
          <span>Powered by Buddy · GPT-4o</span>
        </div>
      </Card>

      {/* AI confidence */}
      <Card className="p-6 lg:col-span-5">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">AI confidence</p>
        <p className="mt-2 font-display text-3xl font-bold">High <span className="text-ai">·</span> 92%</p>
        <p className="mt-1 text-sm text-muted-foreground">Buddy is confident enough to auto-apply. Below 70% it'll ask first.</p>
        <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full animate-ai-shimmer" style={{ width: "92%" }} />
        </div>
        <div className="mt-3 flex justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          <span>Ask</span><span>Suggest</span><span>Auto-apply</span>
        </div>
      </Card>

      {/* Streaming response */}
      <Card className="p-6 lg:col-span-7">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-ai">
              <Bot className="h-4 w-4 text-ai-foreground" />
            </div>
            <p className="font-semibold text-sm">Buddy · streaming</p>
          </div>
          <Badge className="bg-ai/10 text-ai hover:bg-ai/15"><Sparkles className="h-3 w-3" /> Generated</Badge>
        </div>
        <div className="rounded-xl border border-dashed border-ai/30 bg-ai/5 p-4 text-sm leading-relaxed">
          I found <strong className="text-ai">3 failed deploys</strong> this week, all from <strong>squad-checkout</strong>.
          Two were missing env vars, one timed out.
          <span className="ml-1 inline-block h-3.5 w-[2px] translate-y-[1px] bg-ai animate-caret" />
        </div>
        <div className="mt-3 flex items-center gap-1">
          <p className="text-xs text-muted-foreground">Was this helpful?</p>
          <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full" aria-label="Helpful"><ThumbsUp className="h-3.5 w-3.5" /></Button>
          <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full" aria-label="Not helpful"><ThumbsDown className="h-3.5 w-3.5" /></Button>
          <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full" aria-label="Regenerate"><RefreshCw className="h-3.5 w-3.5" /></Button>
          <span className="ml-auto font-mono text-[10px] text-muted-foreground">312 tokens · 0.4s</span>
        </div>
      </Card>

      {/* Citations / Sources */}
      <Card className="p-6 lg:col-span-5">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Sources cited</p>
        <p className="mt-2 text-sm text-muted-foreground">Every AI answer links the data it leaned on.</p>
        <div className="mt-4 space-y-2">
          {[
            { i: GitBranch, l: "deploys.prod log · Mar 12", iconClass: "bg-ext-purple/15 text-ext-purple" },
            { i: FileText, l: "runbook/checkout.md", iconClass: "bg-ext-cyan/15 text-ext-cyan" },
            { i: Database, l: "incidents · 7d window", iconClass: "bg-primary/15 text-primary" },
          ].map(s => (
            <div key={s.l} className="flex items-center gap-3 rounded-lg border border-border p-2.5 transition-spring hover:bg-muted/50">
              <div className={`flex h-7 w-7 items-center justify-center rounded-md ${s.iconClass}`}>
                <s.i className="h-3.5 w-3.5" />
              </div>
              <span className="flex-1 truncate text-sm">{s.l}</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          ))}
        </div>
      </Card>

      {/* Command bar / scan input — Vitamin "Scan or Search" pattern */}
      <Card className="p-6 lg:col-span-12">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Command bar · ⌘K</p>
          <Badge variant="outline" className="font-mono text-[10px]">universal entry</Badge>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border-2 border-border bg-background p-3 transition-spring focus-within:border-primary focus-within:shadow-glow">
          <ScanLine className="h-5 w-5 text-primary" />
          <Input placeholder="Scan or search for an intervention, product, user, ticket…" className="border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0" />
          <kbd className="hidden rounded-md border border-border bg-muted px-2 py-1 font-mono text-[10px] sm:inline-block">⌘ K</kbd>
          <Button size="sm" className="rounded-full">
            <Wand2 className="h-3.5 w-3.5" /> Ask Buddy
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {[
            { l: "Tickets", c: "bg-primary/10 text-primary" },
            { l: "People", c: "bg-ext-purple/15 text-ext-purple" },
            { l: "Apps", c: "bg-ext-pink/15 text-ext-pink" },
            { l: "Runbooks", c: "bg-ext-cyan/15 text-ext-cyan" },
            { l: "AI flows", c: "bg-ai/10 text-ai" },
          ].map(c => (
            <span key={c.l} className={`${c.c} rounded-full px-2.5 py-1 font-medium`}>{c.l}</span>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ───────────────────── DASHBOARD WIDGETS ───────────────────── */
function DashboardWidgets() {
  const toneClasses: Record<string, string> = {
    warning: "bg-warning/15 text-warning hover:bg-warning/15",
    success: "bg-success/15 text-success hover:bg-success/15",
    info: "bg-info/15 text-info hover:bg-info/15",
    ai: "bg-ai/15 text-ai hover:bg-ai/15",
  };
  const rows = [
    { id: "INC-4821", title: "Copilot licence stuck", squad: "Platform", status: "Investigating", tone: "warning", ai: true },
    { id: "INC-4820", title: "SSO group sync delay", squad: "Identity", status: "Resolved", tone: "success", ai: true },
    { id: "INC-4815", title: "Datadog alert noisy", squad: "Observability", status: "Triage", tone: "info", ai: false },
    { id: "INC-4811", title: "Repo archive request", squad: "DevX", status: "Auto-fixed", tone: "ai", ai: true },
  ];
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* KPI strip */}
      <div className="lg:col-span-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { l: "Tickets / day", v: "238", d: "+12% vs last wk", icon: TrendingUp, iconClass: "bg-primary/10 text-primary" },
          { l: "AI auto-resolve", v: "41%", d: "+9pp", icon: Wand2, iconClass: "bg-ai/10 text-ai" },
          { l: "MTTR", v: "2.4h", d: "−18%", icon: Clock, iconClass: "bg-accent/20 text-accent" },
          { l: "CSAT", v: "4.7", d: "of 5", icon: Star, iconClass: "bg-warning/10 text-warning" },
        ].map(k => (
          <Card key={k.l} className="p-5 transition-spring hover:-translate-y-1 hover:shadow-pop">
            <div className="flex items-start justify-between">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{k.l}</p>
              <div className={`${k.iconClass} flex h-8 w-8 items-center justify-center rounded-lg`}>
                <k.icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 font-display text-3xl font-bold">{k.v}</p>
            <p className="mt-1 text-xs text-muted-foreground">{k.d}</p>
          </Card>
        ))}
      </div>

      {/* Data table */}
      <Card className="p-0 lg:col-span-8 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border p-5">
          <div>
            <h3 className="font-display text-lg font-bold">Live tickets</h3>
            <p className="text-xs text-muted-foreground">AI auto-fix is on — Buddy resolves low-risk items.</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="rounded-full"><Filter className="h-3.5 w-3.5" /> Filter</Button>
            <Button size="sm" variant="ghost" className="rounded-full"><MoreHorizontal /></Button>
          </div>
        </div>
        <table className="w-full text-sm">
          <caption className="sr-only">Live incident tickets</caption>
          <thead>
            <tr className="bg-muted/40 text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <th scope="col" className="px-5 py-2.5 font-medium">ID</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Issue</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Squad</th>
              <th scope="col" className="px-3 py-2.5 font-medium">Status</th>
              <th scope="col" className="px-5 py-2.5 font-medium text-right">AI</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-t border-border transition-soft hover:bg-muted/30">
                <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{r.id}</td>
                <td className="px-3 py-3 font-medium">{r.title}</td>
                <td className="px-3 py-3 text-muted-foreground">{r.squad}</td>
                <td className="px-3 py-3">
                  <Badge className={toneClasses[r.tone]}>{r.status}</Badge>
                </td>
                <td className="px-5 py-3 text-right">
                  {r.ai ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-ai/10 px-2 py-1 text-[10px] font-bold text-ai">
                      <Sparkles className="h-3 w-3" /> AI
                    </span>
                  ) : <span className="text-xs text-muted-foreground">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Distribution chart */}
      <Card className="p-6 lg:col-span-4">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Resolution mix</p>
        <p className="mt-1 font-display text-lg font-bold">By owner · last 7d</p>
        <div className="mt-5 space-y-3">
          {[
            { l: "Buddy (AI)", v: 41, c: "bg-ai" },
            { l: "Platform", v: 28, c: "bg-primary" },
            { l: "Identity", v: 17, c: "bg-ext-purple" },
            { l: "DevX", v: 14, c: "bg-accent" },
          ].map(s => (
            <div key={s.l}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium">{s.l}</span>
                <span className="font-mono text-muted-foreground">{s.v}%</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                <div className={`${s.c} h-full rounded-full transition-spring`} style={{ width: `${s.v}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-xl border border-dashed border-ai/30 bg-ai/5 p-3 text-xs">
          <p className="flex items-center gap-1.5 font-semibold text-ai"><Sparkles className="h-3 w-3" /> Buddy says</p>
          <p className="mt-1 text-muted-foreground">AI handled most "stuck licence" tickets. Want me to publish a runbook?</p>
        </div>
      </Card>
    </div>
  );
}

/* ───────────────────── FOOTER ───────────────────── */
function Footer() {
  return (
    <footer className="mt-24 rounded-3xl border border-border bg-gradient-hero p-10 text-on-gradient">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest opacity-80">Vitamin Play · v0.1</p>
          <h3 className="mt-2 font-display text-3xl font-bold">Built for internal teams that ship daily.</h3>
        </div>
        <Button variant="secondary" size="lg" className="rounded-full">
          Contribute on GitHub <Github className="h-4 w-4" />
        </Button>
      </div>
    </footer>
  );
}
