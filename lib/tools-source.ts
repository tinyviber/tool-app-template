import { trends, type TrendingTool } from "@/data/trends"

/**
 * Single entry point for tool metadata. Swap the body for a `fetch()` to a
 * real trends API later — callers already treat it as async.
 */
export async function getTools(): Promise<TrendingTool[]> {
  return trends
}
