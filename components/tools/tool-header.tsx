import type { Tool } from "@/data/tools"
import { site } from "@/data/site"

export function ToolHeader({ tool }: { tool: Tool }) {
  return (
    <header className="flex flex-col gap-2.5">
      <h1 className="text-3xl font-semibold tracking-tight text-balance">{tool.name}</h1>
      <p className="text-muted-foreground text-pretty">{tool.description}</p>
      <p className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[13px] text-muted-foreground">
        {site.trustItems.map((item, i) => (
          <span key={item} className="flex items-center gap-2.5">
            {i > 0 ? <span aria-hidden="true" className="opacity-40">·</span> : null}
            {item}
          </span>
        ))}
      </p>
    </header>
  )
}
