"use client"

import { useId, useState } from "react"
import { ArrowLeftRightIcon, EqualIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatNumber } from "@/lib/format"
import { CopyButton } from "./copy-button"
import { ToolPanel } from "./tool-panel"
import type { ToolComponentProps } from "./types"

type Category = "length" | "weight" | "temperature"

interface Unit {
  value: string
  label: string
  symbol: string
  factor?: number
}

const UNITS: Record<Category, Unit[]> = {
  length: [
    { value: "m", label: "Meters", symbol: "m", factor: 1 },
    { value: "km", label: "Kilometers", symbol: "km", factor: 1000 },
    { value: "cm", label: "Centimeters", symbol: "cm", factor: 0.01 },
    { value: "mm", label: "Millimeters", symbol: "mm", factor: 0.001 },
    { value: "mi", label: "Miles", symbol: "mi", factor: 1609.344 },
    { value: "yd", label: "Yards", symbol: "yd", factor: 0.9144 },
    { value: "ft", label: "Feet", symbol: "ft", factor: 0.3048 },
    { value: "in", label: "Inches", symbol: "in", factor: 0.0254 },
  ],
  weight: [
    { value: "kg", label: "Kilograms", symbol: "kg", factor: 1 },
    { value: "g", label: "Grams", symbol: "g", factor: 0.001 },
    { value: "mg", label: "Milligrams", symbol: "mg", factor: 0.000001 },
    { value: "t", label: "Metric tons", symbol: "t", factor: 1000 },
    { value: "lb", label: "Pounds", symbol: "lb", factor: 0.45359237 },
    { value: "oz", label: "Ounces", symbol: "oz", factor: 0.028349523125 },
  ],
  temperature: [
    { value: "c", label: "Celsius", symbol: "°C" },
    { value: "f", label: "Fahrenheit", symbol: "°F" },
    { value: "k", label: "Kelvin", symbol: "K" },
  ],
}

const CATEGORY_ITEMS = [
  { value: "length", label: "Length" },
  { value: "weight", label: "Weight" },
  { value: "temperature", label: "Temperature" },
]

const DEFAULTS: Record<Category, [string, string]> = {
  length: ["km", "mi"],
  weight: ["kg", "lb"],
  temperature: ["c", "f"],
}

function toCelsius(value: number, unit: string) {
  if (unit === "f") return ((value - 32) * 5) / 9
  if (unit === "k") return value - 273.15
  return value
}

function fromCelsius(value: number, unit: string) {
  if (unit === "f") return (value * 9) / 5 + 32
  if (unit === "k") return value + 273.15
  return value
}

function convert(category: Category, value: number, from: string, to: string) {
  if (category === "temperature") return fromCelsius(toCelsius(value, from), to)
  const units = UNITS[category]
  const fromFactor = units.find((unit) => unit.value === from)?.factor ?? 1
  const toFactor = units.find((unit) => unit.value === to)?.factor ?? 1
  return (value * fromFactor) / toFactor
}

function UnitSelect({
  id,
  label,
  units,
  value,
  onChange,
}: {
  id: string
  label: string
  units: Unit[]
  value: string
  onChange: (value: string) => void
}) {
  const items = units.map((unit) => ({
    value: unit.value,
    label: `${unit.label} (${unit.symbol})`,
  }))
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Select
        items={items}
        value={value}
        onValueChange={(next) => next && onChange(next as string)}
      >
        <SelectTrigger id={id} className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}

export function UnitConverter(_props: ToolComponentProps) {
  const baseId = useId()
  const [category, setCategory] = useState<Category>("length")
  const [from, setFrom] = useState(DEFAULTS.length[0])
  const [to, setTo] = useState(DEFAULTS.length[1])
  const [amount, setAmount] = useState("10")
  const [submitted, setSubmitted] = useState<{
    value: number
    result: number
    from: string
    to: string
    category: Category
  } | null>(null)

  const units = UNITS[category]
  const numeric = Number.parseFloat(amount)
  const isValid = amount.trim() !== "" && Number.isFinite(numeric)

  function handleCategory(next: Category) {
    setCategory(next)
    setFrom(DEFAULTS[next][0])
    setTo(DEFAULTS[next][1])
    setSubmitted(null)
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!isValid) return
    setSubmitted({
      value: numeric,
      result: convert(category, numeric, from, to),
      from,
      to,
      category,
    })
  }

  const symbolFor = (cat: Category, unit: string) =>
    UNITS[cat].find((item) => item.value === unit)?.symbol ?? unit

  const resultText = submitted
    ? `${formatNumber(submitted.result)} ${symbolFor(submitted.category, submitted.to)}`
    : ""

  return (
    <div className="flex flex-col gap-4">
      <ToolPanel title="Input">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FieldGroup className="gap-4">
            <Field>
              <FieldLabel htmlFor={`${baseId}-category`}>Category</FieldLabel>
              <Select
                items={CATEGORY_ITEMS}
                value={category}
                onValueChange={(next) => next && handleCategory(next as Category)}
              >
                <SelectTrigger id={`${baseId}-category`} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {CATEGORY_ITEMS.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field data-invalid={amount !== "" && !isValid ? true : undefined}>
              <FieldLabel htmlFor={`${baseId}-amount`}>Value</FieldLabel>
              <Input
                id={`${baseId}-amount`}
                type="number"
                inputMode="decimal"
                step="any"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                aria-invalid={amount !== "" && !isValid}
                className="font-mono"
                autoFocus
              />
            </Field>
            <div className="flex items-end gap-2">
              <div className="min-w-0 flex-1">
                <UnitSelect
                  id={`${baseId}-from`}
                  label="From"
                  units={units}
                  value={from}
                  onChange={setFrom}
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label="Swap units"
                onClick={() => {
                  setFrom(to)
                  setTo(from)
                }}
              >
                <ArrowLeftRightIcon />
              </Button>
              <div className="min-w-0 flex-1">
                <UnitSelect
                  id={`${baseId}-to`}
                  label="To"
                  units={units}
                  value={to}
                  onChange={setTo}
                />
              </div>
            </div>
          </FieldGroup>
          <Button type="submit" size="lg" disabled={!isValid} className="self-start">
            <EqualIcon data-icon="inline-start" />
            Convert
          </Button>
        </form>
      </ToolPanel>

      <ToolPanel
        title="Result"
        actions={submitted ? <CopyButton value={resultText} /> : null}
      >
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-40 flex-col justify-center gap-1 rounded-lg bg-accent/50 p-4"
        >
          {submitted ? (
            <>
              <p className="font-mono text-sm text-muted-foreground">
                {formatNumber(submitted.value)} {symbolFor(submitted.category, submitted.from)} =
              </p>
              <p className="font-mono text-3xl font-semibold tracking-tight break-all text-accent-foreground">
                {resultText}
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Enter a value and press Convert.
            </p>
          )}
        </div>
      </ToolPanel>
    </div>
  )
}
