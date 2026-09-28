"use client"

import type { TrendingTool } from "@/data/trends"
import { toolRegistry } from "@/components/tools"
import { ToolCard } from "@/components/tools/tool-card"
import { ToolHeader } from "@/components/tools/tool-header"

interface ToolWorkspaceProps {
  tool: TrendingTool
  tools: TrendingTool[]
  sessionRuns: number
  onRun: () => void
  onBack: () => void
  onSelect: (id: string) => void
}

export function ToolWorkspace({
  tool,
  tools,
  sessionRuns,
  onRun,
  onBack,
  onSelect,
}: ToolWorkspaceProps) {
  const Tool = toolRegistry[tool.id]

  return (
    <div className="flex flex-col gap-4">
      <ToolHeader tool={tool} sessionRuns={sessionRuns} onBack={onBack} />
      {Tool ? (
        <Tool onRun={onRun} />
      ) : (
        <div className="flex flex-col gap-4 rounded-lg border border-dashed p-6">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">{tool.name} is being built</p>
            <p className="text-sm text-muted-foreground">
              It&apos;s trending, so it&apos;s next in line. These work right now:
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {tools
              .filter((item) => item.id in toolRegistry)
              .map((item) => (
                <li key={item.id} className="flex *:flex-1">
                  <ToolCard tool={item} onSelect={onSelect} />
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}
