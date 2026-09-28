"use client"

import { useState } from "react"
import { ChevronDownIcon } from "lucide-react"
import type { Tool, ToolExample } from "@/data/tools"
import { ToolCard } from "@/components/tools/tool-card"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3" aria-label={title}>
      <h2 className="text-[17px] font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  )
}

export function ExamplesSection({
  examples,
  onUse,
}: {
  examples: ToolExample[]
  onUse: (input: string) => void
}) {
  return (
    <Section title="Examples">
      <ul className="overflow-hidden rounded-[10px] border bg-card">
        {examples.map((example, i) => (
          <li key={i} className={i > 0 ? "border-t" : undefined}>
            <button
              type="button"
              onClick={() => onUse(example.input)}
              className="flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-[13.5px] transition-colors outline-none hover:bg-muted/40 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <span className="truncate font-mono text-[12.5px] text-muted-foreground">
                {example.label}
              </span>
              <span className="shrink-0 text-[12.5px] text-muted-foreground">Try it →</span>
            </button>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function HowItWorksSection({ steps }: { steps: Tool["steps"] }) {
  if (!steps?.length) return null
  return (
    <Section title="How it works">
      <ol className="grid gap-3 sm:grid-cols-3">
        {steps.map((step, i) => (
          <li key={i} className="flex flex-col gap-1 border-t pt-2.5">
            <span className="font-mono text-xs text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-[13.5px] font-semibold">{step.title}</span>
            <span className="text-[13px] text-muted-foreground">{step.body}</span>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export function ExplainerSection({ text }: { text: string }) {
  return (
    <Section title="About">
      <p className="max-w-[68ch] text-sm text-muted-foreground">{text}</p>
    </Section>
  )
}

export function RelatedToolsSection({
  tool,
  tools,
  onSelect,
}: {
  tool: Tool
  tools: Tool[]
  onSelect: (id: string) => void
}) {
  const related = [
    ...tools.filter((t) => t.category === tool.category && t.id !== tool.id),
    ...tools.filter((t) => t.category !== tool.category),
  ].slice(0, 4)

  return (
    <Section title="Related tools">
      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {related.map((t) => (
          <li key={t.id} className="flex *:flex-1">
            <ToolCard tool={t} onSelect={onSelect} />
          </li>
        ))}
      </ul>
    </Section>
  )
}

export function FaqSection({ faq }: { faq: Tool["faq"] }) {
  const [open, setOpen] = useState<number | null>(null)
  if (!faq?.length) return null

  return (
    <Section title="FAQ">
      <div className="border-t">
        {faq.map((item, i) => (
          <div key={i} className="border-b">
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-3 py-3 text-left text-sm font-medium transition-colors outline-none hover:text-foreground/80 focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {item.q}
              <ChevronDownIcon
                aria-hidden="true"
                className={`size-4 shrink-0 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i ? (
              <p className="pb-3.5 text-sm text-muted-foreground">{item.a}</p>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  )
}
