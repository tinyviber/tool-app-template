import { tools, type Tool } from "@/data/tools"

/**
 * Single entry point for tool metadata. Swap the body for a `fetch()` to a
 * real source later — callers already treat it as async.
 */
export async function getTools(): Promise<Tool[]> {
  return tools
}
