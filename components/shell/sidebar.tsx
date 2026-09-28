"use client"

import { CompassIcon, HistoryIcon } from "lucide-react"
import type { TrendingTool } from "@/data/trends"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toolIcons } from "@/lib/tool-icons"
import { cn } from "@/lib/utils"
import { CATEGORY_FILTERS, type CategoryFilter } from "./discover-view"

interface SidebarProps {
  tools: TrendingTool[]
  activeId: string | null
  recentIds: string[]
  onDiscover: (category?: CategoryFilter) => void
  onSelect: (id: string) => void
  onClearRecent: () => void
}

export function Sidebar({
  tools,
  activeId,
  recentIds,
  onDiscover,
  onSelect,
  onClearRecent,
}: SidebarProps) {
  const recent = recentIds
    .map((id) => tools.find((tool) => tool.id === id))
    .filter((tool): tool is TrendingTool => Boolean(tool))

  return (
    <nav aria-label="Tool navigation" className="flex flex-col gap-4 text-sm">
      <Button variant="outline" className="justify-start" onClick={() => onDiscover()}>
        <CompassIcon data-icon="inline-start" />
        Discover
      </Button>

      <div className="flex flex-col gap-1">
        <h2 className="px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Categories
        </h2>
        <ul className="flex flex-col">
          {CATEGORY_FILTERS.filter((filter) => filter !== "All").map((filter) => (
            <li key={filter}>
              <button
                type="button"
                onClick={() => onDiscover(filter)}
                className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {filter}
                <span className="font-mono text-xs tabular-nums">
                  {tools.filter((tool) => tool.category === filter).length}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between px-2">
          <h2 className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            <HistoryIcon aria-hidden="true" className="size-3.5" />
            Recent
          </h2>
          {recent.length > 0 ? (
            <Button variant="ghost" size="xs" onClick={onClearRecent}>
              Clear
            </Button>
          ) : null}
        </div>
        {recent.length > 0 ? (
          <ul className="flex flex-col">
            {recent.map((tool) => {
              const Icon = toolIcons[tool.icon]
              const active = tool.id === activeId
              return (
                <li key={tool.id}>
                  <button
                    type="button"
                    onClick={() => onSelect(tool.id)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                      active
                        ? "bg-accent font-medium text-accent-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon aria-hidden="true" className="size-4 shrink-0" />
                    <span className="truncate">{tool.name}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="px-2 text-xs leading-relaxed text-muted-foreground">
            Tools you open show up here.
          </p>
        )}
      </div>
    </nav>
  )
}
