---
name: testing-tool-app-template
description: How to run and end-to-end test the tool-app-template Next.js app — dev server, routing model, tools data, theme persistence, and known quirks to probe.
---

# Testing tool-app-template

## Run it
- `pnpm dev` in the repo root → http://localhost:3000 (pnpm via corepack; blueprint installs deps).
- No auth, no backend, no external services. Everything is client-side.

## Architecture that matters for testing
- Single-page shell (`components/shell/app-shell.tsx`): discover view ↔ tool page switch on `?tool=<id>` query param via `history.pushState` + `popstate`. There is no `[slug]` route — browser back/forward IS the navigation contract; always test it.
- All tools/categories/copy live in `data/tools.ts` + `data/site.ts`. Tools not in `toolRegistry` (`components/tools/index.ts`) render a dashed "isn't built yet" slot and get a "soon" card tag.
- Theme: html `.dark` class, persisted in localStorage key `<sitename-lowercase-alnum>:theme` (currently `toolapp:theme`). Verify with `localStorage.getItem('toolapp:theme')`.
- Accent token `--primary` in `app/globals.css` (`#2563eb` light / `#3b82f6` dark); check computed style of a `button[type=submit]` for `rgb(37, 99, 235)`.

## Behaviors to exercise (golden paths)
- Discover: `/` focuses search (only when not typing & not on tool page), `Esc` clears, `Enter` opens first visible result (chip filter applies), chips filter the grid, empty state has "Clear search".
- Tool page order: back link → ToolHeader (trust line) → Input → Output → Examples → How it works → About → Related tools → FAQ; sections with no data are skipped.
- Example row click → fills the tool's primary input via `{input, nonce}` prop and smooth-scrolls to top.
- Expected values (for assertions): 10 km → `6.213712 mi`; text-cleaner `Hello    world!   ` → `Hello world!` with meta `12 chars · -6`.

## Known quirks to check on any search/nav change
- `Enter` and the result-count line both use `visible` (searched ∩ active chip) — keep them in sync with the grid if the filtering logic changes.
- After an example fills the input, the tool clears its previous output (text-cleaner/qr reset `output`/`encoded`); new tools with examples should do the same or the result meta goes stale.
- Category chip persists when returning to discover via the back link (by design — `goDiscover()` keeps it unless passed).

## Console/error checks
- `browser_console` only returns logs created by your script; for page errors rely on the Next.js dev log (stdout of `pnpm dev`) and the absence of the dev error overlay on screen.
