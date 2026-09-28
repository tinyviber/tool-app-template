import { FlameIcon } from "lucide-react"
import type { TrendingTool } from "@/data/trends"
import { ToolCard } from "@/components/tools/tool-card"

export function TrendingStrip({
  tools,
  onSelect,
}: {
  tools: TrendingTool[]
  onSelect: (id: string) => void
}) {
  return (
    <section aria-labelledby="trending-heading" className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2
          id="trending-heading"
          className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
        >
          <FlameIcon aria-hidden="true" className="size-3.5 text-primary" />
          Trending now
        </h2>
        <span className="font-mono text-xs text-muted-foreground">last 7 days</span>
      </div>
      <ul className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1">
        {tools.map((tool) => (
          <li key={tool.id} className="flex">
            <ToolCard tool={tool} onSelect={onSelect} variant="trending" />
          </li>
        ))}
      </ul>
    </section>
  )
}
