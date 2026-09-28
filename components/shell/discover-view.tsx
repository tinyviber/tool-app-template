"use client"

import { SearchIcon } from "lucide-react"
import { site } from "@/data/site"
import { TOOL_CATEGORIES, type Tool } from "@/data/tools"
import { ToolCard } from "@/components/tools/tool-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type CategoryFilter = "All" | (typeof TOOL_CATEGORIES)[number]

export const CATEGORY_FILTERS: CategoryFilter[] = ["All", ...TOOL_CATEGORIES]

export function matchesQuery(tool: Tool, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return `${tool.name} ${tool.description} ${tool.category}`.toLowerCase().includes(q)
}

interface DiscoverViewProps {
  tools: Tool[]
  query: string
  category: CategoryFilter
  onQueryChange: (value: string) => void
  onCategoryChange: (category: CategoryFilter) => void
  onSelect: (id: string) => void
  onClearQuery: () => void
  searchRef: React.RefObject<HTMLInputElement | null>
}

export function DiscoverView({
  tools,
  query,
  category,
  onQueryChange,
  onCategoryChange,
  onSelect,
  onClearQuery,
  searchRef,
}: DiscoverViewProps) {
  const searched = tools.filter((tool) => matchesQuery(tool, query))
  const visible =
    category === "All" ? searched : searched.filter((tool) => tool.category === category)

  return (
    <div className="mx-auto flex w-full max-w-[880px] flex-col gap-5 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">
          {site.discoverTitle}
        </h1>
        <p className="text-muted-foreground">{site.description}</p>
      </div>

      <form
        role="search"
        className="relative"
        onSubmit={(event) => {
          event.preventDefault()
          const first = searched[0]
          if (first) onSelect(first.id)
        }}
      >
        <label htmlFor="tool-search" className="sr-only">
          Search tools
        </label>
        <SearchIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          ref={searchRef}
          id="tool-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") onClearQuery()
          }}
          placeholder="Search tools…"
          autoComplete="off"
          className="h-12 rounded-[10px] pl-10 text-[15px]"
        />
      </form>

      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
        {CATEGORY_FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => onCategoryChange(filter)}
            aria-pressed={category === filter}
            className={cn(
              "h-7.5 rounded-full border px-3 text-[13px] transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              category === filter
                ? "border-foreground bg-foreground font-medium text-background"
                : "border-border bg-card text-muted-foreground hover:border-input hover:text-foreground",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {query ? (
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {searched.length} result{searched.length === 1 ? "" : "s"} for{" "}
          <span className="font-medium text-foreground">{`"${query}"`}</span>
          {searched.length > 0 ? " · press Enter to open the first one" : null}
        </p>
      ) : null}

      {visible.length > 0 ? (
        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {visible.map((tool) => (
            <li key={tool.id} className="flex *:flex-1">
              <ToolCard tool={tool} onSelect={onSelect} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-[10px] border border-dashed p-9 text-center">
          <p className="text-sm font-medium">No tools match</p>
          <p className="text-sm text-muted-foreground">
            Try a different word or another category.
          </p>
          {query ? (
            <Button variant="outline" size="sm" onClick={onClearQuery}>
              Clear search
            </Button>
          ) : null}
        </div>
      )}
    </div>
  )
}
