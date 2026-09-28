import type { TrendingTool } from "@/data/trends"
import { Badge } from "@/components/ui/badge"
import { formatCompact } from "@/lib/format"
import { toolIcons } from "@/lib/tool-icons"
import { cn } from "@/lib/utils"
import { isToolAvailable } from "./index"
import { TrendIndicator } from "./trend-indicator"

interface ToolCardProps {
  tool: TrendingTool
  onSelect: (id: string) => void
  variant?: "grid" | "trending"
}

export function ToolCard({ tool, onSelect, variant = "grid" }: ToolCardProps) {
  const Icon = toolIcons[tool.icon]
  const available = isToolAvailable(tool.id)

  if (variant === "trending") {
    return (
      <button
        type="button"
        onClick={() => onSelect(tool.id)}
        className="group flex w-60 shrink-0 snap-start flex-col gap-2 rounded-lg border bg-card p-3 text-left text-card-foreground transition-colors outline-none hover:border-primary/50 hover:bg-accent/40 focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <span className="flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-2">
            <Icon aria-hidden="true" className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
            <span className="truncate text-sm font-semibold">{tool.name}</span>
          </span>
          <TrendIndicator direction={tool.trendDirection} percent={tool.trendPercent} />
        </span>
        <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {tool.description}
        </span>
        <span className="mt-auto flex items-center gap-1.5">
          <Badge variant="secondary" className="font-mono tabular-nums">
            {formatCompact(tool.usageCount)} uses
          </Badge>
          {!available ? <Badge variant="outline">Soon</Badge> : null}
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(tool.id)}
      className={cn(
        "group flex items-start gap-3 rounded-lg border bg-card p-3 text-left text-card-foreground transition-colors outline-none hover:border-primary/50 hover:bg-accent/40 focus-visible:ring-3 focus-visible:ring-ring/50",
      )}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon aria-hidden="true" className="size-4" />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="flex items-center gap-2">
          <span className="truncate text-sm font-semibold">{tool.name}</span>
          {!available ? (
            <Badge variant="outline" className="h-4 px-1.5 text-[10px]">
              Soon
            </Badge>
          ) : null}
        </span>
        <span className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {tool.description}
        </span>
      </span>
    </button>
  )
}
