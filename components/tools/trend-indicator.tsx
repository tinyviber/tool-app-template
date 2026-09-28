import { ArrowDownRightIcon, ArrowUpRightIcon } from "lucide-react"
import type { TrendDirection } from "@/data/trends"
import { cn } from "@/lib/utils"

export function TrendIndicator({
  direction,
  percent,
  className,
}: {
  direction: TrendDirection
  percent: number
  className?: string
}) {
  const Icon = direction === "up" ? ArrowUpRightIcon : ArrowDownRightIcon
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 font-mono text-xs font-medium tabular-nums",
        direction === "up" ? "text-primary" : "text-muted-foreground",
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      <span className="sr-only">{direction === "up" ? "Up" : "Down"}</span>
      {percent}%
    </span>
  )
}
