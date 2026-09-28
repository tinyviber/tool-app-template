# Tool-app template — agent notes

Single-app Next.js template for standalone "tool" sites: one page per tool,
a discover grid, fixed below-the-fold help/SEO sections.

## Invariants

- **Read `DESIGN.md` first.** It defines the tokens, the entity-card spec,
  and the fixed section order — follow it instead of inventing styling.
- **Domain-agnostic.** Brand, tagline, trust line, and footer copy come from
  `data/site.ts`; tool entries come from `data/tools.ts`. Never hardcode a
  site name or tool copy into components.
- A tool is an entity → `ToolCard`. Feature bullets, steps, and FAQ items
  are not cards. Group with borders + whitespace, never shadows.
- Tool pages: `max-w-[720px]`, no sidebar, tool panel above the fold, then
  Examples → How it works → Explainer → Related → FAQ (skip empty sections).
- No fake social proof (usage counts, trending %, "used today") — ever.
- Demo tools are examples; unimplemented ids render a dashed "not built yet"
  slot and a `soon` tag.

## Working here

- `pnpm dev` / `pnpm build` (Node ≥20; no lint/test scripts configured —
  `pnpm exec tsc --noEmit` is the static check).
- Tool UI lives in `components/tools/<id>.tsx`; register the component in
  `components/tools/index.ts` (`toolRegistry`) keyed by the data `id`.
- Tools receive `ToolComponentProps` (`example` fires when the visitor
  clicks an example below the fold — wire it to the primary input).
- Copy-out sites: change `data/site.ts`, replace `data/tools.ts` rows, add
  or drop components in `toolRegistry`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
