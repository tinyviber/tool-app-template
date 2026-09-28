"use client"

import { TOOL_CATEGORIES, type TrendingTool } from "@/data/trends"
import { ToolCard } from "@/components/tools/tool-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingStrip } from "./trending-strip"

export type CategoryFilter = "All" | (typeof TOOL_CATEGORIES)[number]

export const CATEGORY_FILTERS: CategoryFilter[] = ["All", ...TOOL_CATEGORIES]

export function matchesQuery(tool: TrendingTool, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return `${tool.name} ${tool.description} ${tool.category}`.toLowerCase().includes(q)
}

interface DiscoverViewProps {
  tools: TrendingTool[]
  query: string
  category: CategoryFilter
  onCategoryChange: (category: CategoryFilter) => void
  onSelect: (id: string) => void
  onClearQuery: () => void
}

export function DiscoverView({
  tools,
  query,
  category,
  onCategoryChange,
  onSelect,
  onClearQuery,
}: DiscoverViewProps) {
  const searched = tools.filter((tool) => matchesQuery(tool, query))
  const trending = tools
    .filter((tool) => tool.trending)
    .sort((a, b) => b.usageCount - a.usageCount)
    .slice(0, 8)

  const countFor = (filter: CategoryFilter) =>
    filter === "All" ? searched.length : searched.filter((tool) => tool.category === filter).length

  return (
    <div className="flex flex-col gap-6">
      {query ? (
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {searched.length} result{searched.length === 1 ? "" : "s"} for{" "}
          <span className="font-medium text-foreground">{`"${query}"`}</span>
          {searched.length > 0 ? " · press Enter to open the first one" : null}
        </p>
      ) : (
        <TrendingStrip tools={trending} onSelect={onSelect} />
      )}

      <section aria-labelledby="all-tools-heading" className="flex flex-col gap-3">
        <h2 id="all-tools-heading" className="sr-only">
          All tools
        </h2>
        <Tabs
          value={category}
          onValueChange={(value) => onCategoryChange(value as CategoryFilter)}
          className="gap-3"
        >
          <div className="scrollbar-none -mx-4 overflow-x-auto border-b px-4">
            <TabsList variant="line" className="h-9">
              {CATEGORY_FILTERS.map((filter) => (
                <TabsTrigger key={filter} value={filter} className="flex-none px-2">
                  {filter}
                  <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                    {countFor(filter)}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {CATEGORY_FILTERS.map((filter) => {
            const visible =
              filter === "All" ? searched : searched.filter((tool) => tool.category === filter)
            return (
              <TabsContent key={filter} value={filter}>
                {visible.length > 0 ? (
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {visible.map((tool) => (
                      <li key={tool.id} className="flex *:flex-1">
                        <ToolCard tool={tool} onSelect={onSelect} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed p-8 text-center">
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
              </TabsContent>
            )
          })}
        </Tabs>
      </section>
    </div>
  )
}
