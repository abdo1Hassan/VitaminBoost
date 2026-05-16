import type { Meta, StoryObj } from "@storybook/react";
import { Sparkles, Info, CheckCircle2, AlertTriangle, Trash2, Wand2, Heart, TrendingUp } from "lucide-react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Foundations / Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: (
      <>
        <Sparkles className="h-4 w-4" /> Save changes
      </>
    ),
    className: "rounded-full bg-primary shadow-glow transition-spring hover:scale-[1.03]",
  },
};

export const VariantMatrix: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button className="rounded-full bg-primary shadow-glow"><Sparkles className="h-4 w-4" /> Primary</Button>
      <Button variant="secondary" className="rounded-full">Secondary</Button>
      <Button variant="outline" className="rounded-full border-2">Outline</Button>
      <Button variant="ghost" className="rounded-full">Ghost</Button>
      <Button variant="link" className="text-primary">Link</Button>
    </div>
  ),
};

export const SemanticCTAs: Story = {
  name: "Semantic CTAs (8)",
  render: () => {
    const items = [
      { label: "Primary",      cls: "bg-primary text-primary-foreground shadow-glow", Icon: Sparkles },
      { label: "Info",         cls: "bg-info text-info-foreground",                   Icon: Info },
      { label: "Success",      cls: "bg-success text-success-foreground",             Icon: CheckCircle2 },
      { label: "Warning",      cls: "bg-warning text-warning-foreground",             Icon: AlertTriangle },
      { label: "Destructive",  cls: "bg-destructive text-destructive-foreground",     Icon: Trash2 },
      { label: "AI",           cls: "bg-ai text-ai-foreground shadow-ai-glow",        Icon: Wand2 },
      { label: "Pop",          cls: "bg-pop text-pop-foreground",                     Icon: Heart },
      { label: "Commercial",   cls: "bg-commercial text-commercial-foreground",       Icon: TrendingUp },
    ];
    return (
      <div className="grid max-w-2xl grid-cols-2 gap-3 md:grid-cols-4">
        {items.map(i => (
          <button key={i.label} className={`${i.cls} inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-spring hover:scale-[1.03]`}>
            <i.Icon className="h-4 w-4" /> {i.label}
          </button>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" className="rounded-full">Small</Button>
      <Button className="rounded-full">Default</Button>
      <Button size="lg" className="rounded-full">Large</Button>
      <Button size="icon" className="rounded-full" aria-label="Add">+</Button>
    </div>
  ),
};
