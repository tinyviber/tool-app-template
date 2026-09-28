import type { ComponentType } from "react"

export interface ToolComponentProps {
  /** Call after the tool's primary action succeeds so usage counters update. */
  onRun: () => void
}

export type ToolComponent = ComponentType<ToolComponentProps>
