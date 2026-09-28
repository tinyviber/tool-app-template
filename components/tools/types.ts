import type { ComponentType } from "react"

/** An example input the workspace asks the tool to load (see tool.examples). */
export interface ToolExampleInput {
  input: string
  /** Changes on every pick so tools can reload the same value twice. */
  nonce: number
}

export interface ToolComponentProps {
  /**
   * Set when the visitor clicked an example below the fold. Tools with a
   * primary text input should apply `example.input` whenever `nonce` changes.
   */
  example: ToolExampleInput | null
}

export type ToolComponent = ComponentType<ToolComponentProps>
