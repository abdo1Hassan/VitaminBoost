# Vitamin Play — Design System workflow

**Source of truth:** this repo. **Mirror:** Figma library.
**One rule:** tokens & component APIs change in code first, never in Figma.

---

## 🗂 What lives where

| Concern | File | Owner |
|---|---|---|
| Color, type, spacing, radius, shadow, motion tokens | `tokens/tokens.json` | Eng + Design |
| Generated CSS variables (do not hand-edit) | `src/styles.generated.css`, `src/styles.generated.dark.css` | CI |
| Gradients, font-face, layered utilities | `src/styles.css` | Eng |
| React components | `src/components/ui/*`, `src/routes/index.tsx` | Eng |
| Brand fonts (woff2) | `public/fonts/*` | Eng |
| Visual contract (per-component stories) | `src/**/*.stories.tsx` + Storybook | Eng + Design |
| Figma library | Figma file "Vitamin Play / Components" | Design |

---

## 🔁 The loop

### Designer wants a new component
1. Open a GitHub Discussion / Issue with intent + Figma exploration link.
2. Engineer scaffolds the React component + a `*.stories.tsx` file.
3. PR review covers a11y, motion tokens, semantic colors (see `.github/skills/ui-ux-pro-max/skills.md`).
4. On merge → Storybook auto-deploys to GitHub Pages.
5. Designer rebuilds the Figma component to match the Storybook variants. Figma docs link back to the Storybook URL.

### Designer wants a token change (e.g. new green tint)
1. PR to `tokens/tokens.json` only.
2. CI runs `style-dictionary` → regenerates `src/styles.generated*.css`.
3. PR drift check fails if the regen wasn't committed → run `bun run tokens:build` locally.
4. On merge to `main` → `tokens-sync.yml` force-pushes `tokens/tokens.json` to the `figma-tokens` branch.
5. Tokens Studio plugin in Figma is configured to pull that branch → designer clicks "Pull" → Figma Variables update.

### Engineer ships a new color / size / motion
Same as above — edit `tokens/tokens.json`, run `bun run tokens:build`, commit both.

---

## 🛠 Local commands

```bash
bun install
bun run dev                       # local app at :3000
bun run tokens:build              # regenerate styles.generated*.css from tokens.json
bun run storybook                 # local component gallery at :6006
bun run build-storybook           # static build for CI
```

Add to `package.json` scripts:
```json
"tokens:build": "style-dictionary build --config tokens/style-dictionary.config.cjs",
"storybook": "storybook dev -p 6006",
"build-storybook": "storybook build"
```

Dev deps to install:
```bash
bun add -d style-dictionary @storybook/react-vite storybook @storybook/addon-essentials @storybook/addon-a11y
```

---

## 🎨 Figma setup (one-time, ~45 min)

1. **Create the library file** "Vitamin Play / Components".
2. Install plugin **"Tokens Studio for Figma"** (free).
3. In the plugin → Settings → Sync providers → **GitHub**:
   - Repo: `<org>/decathlon-playkit-main`
   - Branch: `figma-tokens`
   - File path: `tokens/tokens.json`
   - PAT: fine-grained, `contents: read`
4. Click **Pull** → all tokens land as Figma Variables, organized in `core / light / dark` sets.
5. Map Tokens Studio sets → Figma Modes:
   - `light` → Mode "Light"
   - `dark` → Mode "Dark"
   - `core` → applied to all modes
6. Build base components (Button, Card, Input, Badge, Avatar) using **only** these variables. Never enter a hex by hand.
7. Build the design-system specific components in this order (mirrors `src/routes/index.tsx`):

   | Order | Figma component | Mirrors |
   |---|---|---|
   | 1 | `Button / Primary, Secondary, Outline, Ghost, Link` × `sm/md/lg/icon` | `Button` variants |
   | 2 | `Button / Semantic` (8 variants: primary, info, success, warning, danger, ai, pop, commercial) | Semantic CTA grid |
   | 3 | `Button / Composite` (loading, split, icon-only, removable chip) | Composite patterns card |
   | 4 | `Segmented control` | Segmented + toggle group |
   | 5 | `Card / Stat, Agent, Integration, Ticket, Streak` | Cards & Artifacts |
   | 6 | `Toast / Success, Error, AI, Info` | Sonner toasts |
   | 7 | `EmptyState / Neutral, AI, Info` (icon · eyebrow · title · description · primary · secondary) | `EmptyState` component |
   | 8 | `DoDont` (slot-based, success/destructive border + caption) | `DoDont` component |
   | 9 | `Surface / z0–z3` + density (Comfortable / Cosy / Compact) | Layout guidelines |
   | 10 | App shell (60px rail · content · 140–320px aside) | App-shell pattern |

8. For each component, add a **Documentation** link pointing to its Storybook URL.

---

## ✅ Definition of Done (a component is "in the system")

- [ ] React component lives in `src/components/ui/*` or `src/routes/index.tsx`
- [ ] Has a `*.stories.tsx` with all variants (incl. dark mode)
- [ ] Uses only design tokens (no raw hex, no magic px outside the spacing scale)
- [ ] Passes a11y addon in Storybook (axe-core, 0 violations)
- [ ] Motion uses `--motion-fast/base/slow` only
- [ ] Mirrored in the Figma library with matching variant names
- [ ] Figma component's description links to the Storybook page

---

## 🚫 Anti-patterns

- ❌ Editing a Figma Variable directly. CI will overwrite it on next push.
- ❌ Adding a hex literal in a React component. Use `bg-primary`, never `bg-[#3643BA]`.
- ❌ Adding a 4th motion duration. The system has three. Pick one.
- ❌ Adding a Figma component that has no React counterpart. Code first, always.
