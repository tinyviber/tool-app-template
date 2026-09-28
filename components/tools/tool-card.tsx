import { ChevronRightIcon } from "lucide-react"
import type { Tool } from "@/data/tools"
import { isToolAvailable } from "./index"

interface ToolCardProps {
  tool: Tool
  onSelect: (id: string) => void
}

/**
 * Entity card — a tool is a real entity, so it earns a card. Feature bullet
 * points never do. See DESIGN.md §Components.
 */
export function ToolCard({ tool, onSelect }: ToolCardProps) {
  const available = isToolAvailable(tool.id)

  return (
    <button
      type="button"
      onClick={() => onSelect(tool.id)}
      className="group flex flex-col gap-1.5 rounded-[10px] border bg-card p-4 text-left transition-colors outline-none hover:border-input hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="truncate text-sm font-semibold">{tool.name}</span>
        <ChevronRightIcon
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-70 group-focus-visible:opacity-70"
        />
      </span>
      <span className="line-clamp-2 text-[13px] leading-snug text-muted-foreground">
        {tool.description}
      </span>
      {!available ? (
        <span className="mt-0.5 flex">
          <span className="rounded-[5px] border px-1.5 py-0.5 text-[11.5px] text-muted-foreground">
            soon
          </span>
        </span>
      ) : null}
    </button>
  )
}
