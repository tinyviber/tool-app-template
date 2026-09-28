import { AppShell } from '@/components/shell/app-shell'
import { getTools } from '@/lib/tools-source'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tool?: string | string[] }>
}) {
  const [tools, params] = await Promise.all([getTools(), searchParams])
  const toolParam = Array.isArray(params.tool) ? params.tool[0] : params.tool

  return <AppShell tools={tools} initialToolId={toolParam ?? null} />
}
