---
colors:
  primary: "#2563eb"        # light theme accent — the ONLY hue; rebrand here
  primaryDark: "#3b82f6"
  accentTintLight: "oklch(0.955 0.015 258)"
  accentTintDark: "oklch(0.25 0.03 262)"
  accentForegroundLight: "#1e40af"
  accentForegroundDark: "#93c5fd"
  surface: "white / oklch(0.25 0.006 286) dark"
  ink: "near-black / near-white dark"
  muted: "oklch(0.55 ...) mid-gray — helper copy, icons"
typography:
  fontFamily: "Inter; JetBrains Mono for code/inputs"
  hero: "text-3xl font-semibold tracking-tight"
  sectionTitle: "text-[17px] font-semibold"
  body: "text-[15px]"
  helper: "text-[13px] text-muted-foreground"
rounded: "0.625rem base; cards 10px; inputs/buttons ~md"
spacing:
  page: "max-w-[1120px] px-5"
  toolPage: "max-w-[720px] centered"
  sectionGap: "gap-10"
components:
  entityCard: "surface bg, 1px --border, 10px radius, 16px pad, title+2-line desc"
  toolPanel: "surface bg, 1px --border, 10px radius — groups related inputs"
  chip: "pill; selected = inverted fg/bg"
---

# Design

This template ships a **tool-site shell**: a discover page, one page per tool,
and a fixed below-the-fold content structure for SEO. It is domain-agnostic —
rename it in `data/site.ts`, replace the demo rows in `data/tools.ts`, and the
rules below still apply.

Goal: look like a trustworthy utility that has existed for ten years — quiet,
readable, and useful — not a launch-day landing page.

## Principles

1. **The tool is the hero.** A visitor must be able to use it above the fold
   on a laptop without scrolling. No hero banners, illustrations, or
   marketing copy above the workspace.
2. **Restraint over decoration.** One accent hue on a neutral base. No
   gradients, no glassmorphism, no colored icon tiles, no decorative
   animations, no shadows as a grouping device.
3. **One page, one primary action.** Each tool has exactly one submit
   control. Everything else is secondary (ghost buttons, links, chips).
4. **Never invent social proof.** No usage counters, "X used today", fake
   percentages, or trending badges — they are dishonest on a small site and
   read as noise. Grouping and labels carry the hierarchy instead.
5. **Mobile-first.** The same single column scales up; the discover grid
   goes from one column to two at `sm`, never denser.

## Colors

- Neutral gray scale for surface, ink, borders, and muted text — the bulk of
  every screen.
- Exactly **one accent** (`--primary`) for: primary buttons, links, the brand
  mark, focus rings, and selected states. Dark theme swaps to the lighter
  variant (`--primary` dark) for contrast.
- `--accent` is only the accent *tint* (chip hover, subtle highlights), paired
  with `--accent-foreground`.
- Semantic colors exist in the tokens (`destructive`, `chart-*`) but are not
  decorative accents — destructive red means "this deletes/errors".

### Do's and Don'ts

- DO change the brand by editing `--primary` (light + dark) and the accent
  tint pair — nothing else references hue.
- DON'T introduce a second accent hue per section or category.
- DON'T put icons on colored square/rounded tiles.

## Typography

- Inter for UI; JetBrains Mono for code-ish inputs, outputs, and results.
- One hero scale (`text-3xl font-semibold`) used for the discover H1 and
  every tool name — not marketing superlatives.
- Helper text is `text-[13px] text-muted-foreground`; section titles are
  `text-[17px] font-semibold`. Anything smaller than 12px is a smell.

## Layout

- App chrome: header (brand + `Tools` nav + theme toggle), centered content
  (`max-w-[1120px]`), footer note. No sidebar — tools don't need navigation
  chrome competing with the task.
- Tool pages narrow to `max-w-[720px]`: back link → H1 + one-line
  description + trust line → input panel → output/result, all above the
  fold where possible.
- Group with **borders and whitespace**, not shadows or tinted panels.
- Fixed below-the-fold sequence on tool pages (in this order):
  Examples → How it works → Explainer → Related tools → FAQ.
  Sections that have no data are skipped; the order never changes.

## Components

- **Entity card** (`ToolCard`) — for listable entities only (a tool is an
  entity; a feature bullet or a FAQ answer is not). Surface background,
  1px `--border`, 10px radius, 16px padding, 14.5px semibold title, two-line
  muted description, chevron that fades in on hover. Hover shifts the
  border stronger and the surface barely warmer — no lift, no shadow.
- **Tool panel** (`ToolPanel`) — bordered surface grouping a related set of
  inputs; not a Card. Titles are labels, not marketing copy.
- **Chips** (`CategoryFilter`) — pill buttons for filtering; the selected
  chip inverts to `bg-foreground text-background`.
- **Search** — one big input on the discover page (`/` to focus, `Esc` to
  clear, `Enter` opens the first result). No header search box.
- Icons (`lucide-react`) are functional and monochrome — always
  `text-muted-foreground` or inheriting the control color.

## States and accessibility

- Every control needs hover, focus-visible (`ring-ring/50`), disabled, and
  — where it applies — loading, error, and empty states.
- Tool panels announce errors via `FieldError`; empty outputs show a
  placeholder, not a broken frame.
- Full keyboard reachability: chips are real buttons with `aria-pressed`,
  FAQ uses a disclosure pattern, cards are focusable buttons.
- Dark theme is first-class; verify both.

## Content

- Voice: direct, plain, slightly dry. Verbs on buttons ("Clean text"), nouns
  on sections ("How it works"), no exclamation marks, no "supercharge".
- The trust line (`site.trustItems`) states facts the site actually
  guarantees — keep it honest when rebranding.
- Demo tools exist to demonstrate the patterns (entity card, panel,
  examples → input wiring, FAQ). Replace them per site; keep the shape.
