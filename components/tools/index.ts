import { QRCodeGenerator } from "./qr-code-generator"
import { TextCleaner } from "./text-cleaner"
import { UnitConverter } from "./unit-converter"
import type { ToolComponent } from "./types"

/** Maps a tool id from the tools data to its workspace implementation. */
export const toolRegistry: Record<string, ToolComponent> = {
  "text-cleaner": TextCleaner,
  "unit-converter": UnitConverter,
  "qr-code-generator": QRCodeGenerator,
}

export function isToolAvailable(id: string) {
  return id in toolRegistry
}

export type { ToolComponent, ToolComponentProps, ToolExampleInput } from "./types"
