# Decathlon Playkit Design System

This is the Decathlon Playkit design system, with GitHub as the source of truth for all design tokens and components. Figma is a downstream mirror, and all tokens are managed in code.

## Features
- **Design tokens**: All color, type, spacing, radius, shadow, and motion tokens are defined in `tokens/tokens.json` (Tokens Studio format).
- **Style Dictionary v4**: Generates CSS variables from tokens for both light and dark themes.
- **Self-hosted Decathlon fonts**: OTF → WOFF2, loaded from `public/fonts/` and applied via CSS.
- **Storybook v9**: Live documentation for all UI components.
- **GitHub Actions**: Automated token sync and Storybook deploy workflows.
- **Robust workflow**: GitHub is the only source of truth for tokens and components. Designers sync from code to Figma.

## Workflow
1. **Edit tokens** in `tokens/tokens.json` (Tokens Studio format).
2. **Build tokens**: `npm run tokens:build` generates `src/styles.generated.css` and `src/styles.generated.dark.css`.
3. **Import generated CSS** in `src/styles.css` for live use.
4. **Develop components** in `src/components/ui/` and document in Storybook.
5. **Sync tokens to Figma**: Use the GitHub Actions workflow (`.github/workflows/tokens-sync.yml`).
6. **Deploy Storybook**: Use the workflow (`.github/workflows/storybook.yml`).

## Scripts
- `npm run tokens:build` — Build CSS variables from tokens.
- `npm run storybook` — Start Storybook locally.
- `npm run build-storybook` — Build Storybook static site.

## Project Structure
- `tokens/tokens.json` — Design tokens (Tokens Studio format)
- `tokens/build.mjs` — Style Dictionary build script
- `src/styles.generated.css`, `src/styles.generated.dark.css` — Generated CSS
- `src/styles.css` — Main stylesheet (imports generated CSS)
- `public/fonts/` — Decathlon font files
- `.github/workflows/` — CI workflows
- `.storybook/` — Storybook config
- `src/components/ui/` — UI components

## How to Use
- **Engineers**: Edit tokens in code, run build, commit, and push. All tokens/components are source-of-truth in GitHub.
- **Designers**: Sync tokens from GitHub to Figma using the plugin and follow the runbook in `DESIGN-SYSTEM.md`.

---

For full workflow and onboarding, see `DESIGN-SYSTEM.md`.
