"use client"

import { useEffect, useId, useState } from "react"
import { SparklesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { CopyButton } from "./copy-button"
import { ToolPanel } from "./tool-panel"
import type { ToolComponentProps } from "./types"

type OptionKey = "collapseSpaces" | "removeLineBreaks" | "stripSpecial" | "trimLines"

const OPTIONS: { key: OptionKey; label: string }[] = [
  { key: "collapseSpaces", label: "Collapse extra spaces" },
  { key: "removeLineBreaks", label: "Remove line breaks" },
  { key: "stripSpecial", label: "Strip special characters" },
  { key: "trimLines", label: "Trim each line" },
]

function cleanText(input: string, options: Record<OptionKey, boolean>) {
  let output = input.replace(/\r\n?/g, "\n")
  if (options.stripSpecial) {
    output = output.replace(/[^\p{L}\p{N}\s.,!?'"()\-:;@&/]/gu, "")
  }
  if (options.trimLines) {
    output = output
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
  }
  if (options.removeLineBreaks) {
    output = output.replace(/\s*\n+\s*/g, " ")
  }
  if (options.collapseSpaces) {
    output = output.replace(/[ \t\u00A0]+/g, " ")
  }
  return output.trim()
}

export function TextCleaner({ example }: ToolComponentProps) {
  const inputId = useId()
  const outputId = useId()
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [options, setOptions] = useState<Record<OptionKey, boolean>>({
    collapseSpaces: true,
    removeLineBreaks: false,
    stripSpecial: false,
    trimLines: true,
  })

  useEffect(() => {
    if (example) setInput(example.input)
  }, [example])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!input.trim()) return
    setOutput(cleanText(input, options))
  }

  const removed = output ? input.length - output.length : 0

  return (
    <div className="flex flex-col gap-4">
      <ToolPanel title="Input">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor={inputId} className="sr-only">
                Text to clean
              </FieldLabel>
              <Textarea
                id={inputId}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Paste messy text here…"
                className="min-h-40 resize-y font-mono text-sm"
                autoFocus
              />
            </Field>
            <FieldSet>
              <FieldLegend variant="label">Options</FieldLegend>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {OPTIONS.map((option) => (
                  <Field key={option.key} orientation="horizontal">
                    <Checkbox
                      id={`${inputId}-${option.key}`}
                      checked={options[option.key]}
                      onCheckedChange={(checked) =>
                        setOptions((prev) => ({ ...prev, [option.key]: checked === true }))
                      }
                    />
                    <FieldLabel
                      htmlFor={`${inputId}-${option.key}`}
                      className="font-normal"
                    >
                      {option.label}
                    </FieldLabel>
                  </Field>
                ))}
              </div>
            </FieldSet>
          </FieldGroup>
          <Button type="submit" size="lg" disabled={!input.trim()} className="self-start">
            <SparklesIcon data-icon="inline-start" />
            Clean text
          </Button>
        </form>
      </ToolPanel>

      <ToolPanel
        title="Output"
        meta={
          output ? (
            <span className="font-mono text-xs text-muted-foreground" aria-live="polite">
              {output.length} chars · {removed >= 0 ? `-${removed}` : `+${-removed}`}
            </span>
          ) : null
        }
        actions={<CopyButton value={output} />}
      >
        <label htmlFor={outputId} className="sr-only">
          Cleaned text
        </label>
        <Textarea
          id={outputId}
          value={output}
          readOnly
          placeholder="Cleaned text appears here."
          className="min-h-40 resize-y bg-muted/40 font-mono text-sm"
        />
      </ToolPanel>
    </div>
  )
}
