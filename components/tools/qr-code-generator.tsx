"use client"

import { useId, useRef, useState } from "react"
import QRCode from "qrcode"
import { DownloadIcon, QrCodeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ToolPanel } from "./tool-panel"
import type { ToolComponentProps } from "./types"

export function QRCodeGenerator({ onRun }: ToolComponentProps) {
  const inputId = useId()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [text, setText] = useState("")
  const [encoded, setEncoded] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const value = text.trim()
    if (!value || !canvasRef.current) return
    try {
      await QRCode.toCanvas(canvasRef.current, value, {
        width: 320,
        margin: 2,
        errorCorrectionLevel: "M",
        color: { dark: "#0a0a0a", light: "#ffffff" },
      })
      setEncoded(value)
      setError("")
      onRun()
    } catch {
      setEncoded("")
      setError("That text is too long to fit in a QR code.")
    }
  }

  function handleDownload() {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement("a")
    link.href = canvas.toDataURL("image/png")
    link.download = "qr-code.png"
    link.click()
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
      <ToolPanel title="Input">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FieldGroup>
            <Field data-invalid={error ? true : undefined}>
              <FieldLabel htmlFor={inputId}>Text or URL</FieldLabel>
              <Input
                id={inputId}
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="https://example.com"
                aria-invalid={Boolean(error)}
                className="font-mono"
                autoFocus
              />
              {error ? (
                <FieldError>{error}</FieldError>
              ) : (
                <FieldDescription>Links, Wi‑Fi strings, plain text — anything up to ~2,000 characters.</FieldDescription>
              )}
            </Field>
          </FieldGroup>
          <Button type="submit" size="lg" disabled={!text.trim()} className="self-start">
            <QrCodeIcon data-icon="inline-start" />
            Generate QR
          </Button>
        </form>
      </ToolPanel>

      <ToolPanel
        title="QR code"
        actions={
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleDownload}
            disabled={!encoded}
          >
            <DownloadIcon data-icon="inline-start" />
            PNG
          </Button>
        }
      >
        <div className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-lg bg-muted/40 p-4">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={encoded ? `QR code encoding ${encoded}` : "QR code preview"}
            className={encoded ? "aspect-square w-full max-w-60 rounded-md" : "hidden"}
          />
          {encoded ? (
            <p className="max-w-full truncate font-mono text-xs text-muted-foreground" aria-live="polite">
              {encoded}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Your QR code appears here.</p>
          )}
        </div>
      </ToolPanel>
    </div>
  )
}
