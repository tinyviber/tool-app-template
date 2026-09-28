import { ArrowLeftIcon, ActivityIcon } from "lucide-react"
import type { TrendingTool } from "@/data/trends"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { dailyUsage, formatNumber } from "@/lib/format"
import { toolIcons } from "@/lib/tool-icons"
import { TrendIndicator } from "./trend-indicator"

export function ToolHeader({
  tool,
  sessionRuns,
  onBack,
}: {
  tool: TrendingTool
  sessionRuns: number
  onBack: () => void
}) {
  const Icon = toolIcons[tool.icon]
  const usedToday = dailyUsage(tool.usageCount) + sessionRuns

  return (
    <header className="flex flex-col gap-3 border-b pb-4">
      <Button
        variant="link"
        size="sm"
        onClick={onBack}
        className="self-start px-0 text-muted-foreground"
      >
        <ArrowLeftIcon data-icon="inline-start" />
        Back to Discover
      </Button>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Icon aria-hidden="true" className="size-5" />
          </span>
          <div className="flex min-w-0 flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-balance">{tool.name}</h1>
              <Badge variant="outline">{tool.category}</Badge>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">{tool.description}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
          <Tooltip>
            <TooltipTrigger
              render={
                <span
                  tabIndex={0}
                  className="inline-flex items-center gap-1.5 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              }
            >
              <ActivityIcon aria-hidden="true" className="size-3.5" />
              <span className="font-mono tabular-nums text-foreground">
                {formatNumber(usedToday, 0)}
              </span>
              used today
            </TooltipTrigger>
            <TooltipContent>
              {sessionRuns > 0
                ? `Includes ${sessionRuns} run${sessionRuns === 1 ? "" : "s"} by you`
                : "Runs across all visitors today"}
            </TooltipContent>
          </Tooltip>
          <span aria-hidden="true" className="h-3 w-px bg-border" />
          <span className="inline-flex items-center gap-1">
            <TrendIndicator direction={tool.trendDirection} percent={tool.trendPercent} />
            this week
          </span>
        </div>
      </div>
    </header>
  )
}
