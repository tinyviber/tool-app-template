"use client"

import { useState } from "react"
import { ArrowLeftIcon } from "lucide-react"
import type { Tool } from "@/data/tools"
import { toolRegistry } from "@/components/tools"
import type { ToolExampleInput } from "@/components/tools/types"
import { ToolHeader } from "@/components/tools/tool-header"
import {
  ExamplesSection,
  ExplainerSection,
  FaqSection,
  HowItWorksSection,
  RelatedToolsSection,
} from "./tool-sections"

interface ToolWorkspaceProps {
  tool: Tool
  tools: Tool[]
  onBack: () => void
  onSelect: (id: string) => void
}

/**
 * The tool IS the hero: header → workspace → result, all usable above the
 * fold, then a fixed below-the-fold sequence (examples → how it works →
 * explainer → related → FAQ) for SEO and help. See DESIGN.md §Layout.
 */
export function ToolWorkspace({ tool, tools, onBack, onSelect }: ToolWorkspaceProps) {
  const Tool = toolRegistry[tool.id]
  const [example, setExample] = useState<ToolExampleInput | null>(null)

  return (
    <div className="mx-auto flex w-full max-w-[720px] flex-col gap-6 py-8">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 self-start rounded-md text-[13.5px] text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <ArrowLeftIcon aria-hidden="true" className="size-3.5" />
        All tools
      </button>

      <ToolHeader tool={tool} />

      {Tool ? (
        <Tool example={example} />
      ) : (
        <div className="rounded-[10px] border border-dashed p-6">
          <p className="text-sm font-semibold">{tool.name} isn't built yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            This slot is where the tool's input controls live — pick a working
            tool from the list to see the pattern.
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-10">
        {tool.examples?.length ? (
          <ExamplesSection
            examples={tool.examples}
            onUse={(input) => {
              setExample({ input, nonce: Date.now() })
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          />
        ) : null}
        <HowItWorksSection steps={tool.steps} />
        {tool.explainer ? <ExplainerSection text={tool.explainer} /> : null}
        <RelatedToolsSection tool={tool} tools={tools} onSelect={onSelect} />
        <FaqSection faq={tool.faq} />
      </div>
    </div>
  )
}
