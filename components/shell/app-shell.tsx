"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { TrendingTool } from "@/data/trends"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { DiscoverView, matchesQuery, type CategoryFilter } from "./discover-view"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { ToolWorkspace } from "./tool-workspace"

const RECENT_KEY = "trendtool:recent"
const RUNS_KEY = "trendtool:runs"
const MAX_RECENT = 6

interface DailyRuns {
  date: string
  counts: Record<string, number>
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function toolIdFromUrl() {
  return new URLSearchParams(window.location.search).get("tool")
}

export function AppShell({
  tools,
  initialToolId,
}: {
  tools: TrendingTool[]
  initialToolId: string | null
}) {
  const searchRef = useRef<HTMLInputElement>(null)
  const [activeId, setActiveId] = useState<string | null>(
    initialToolId && tools.some((tool) => tool.id === initialToolId) ? initialToolId : null,
  )
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<CategoryFilter>("All")
  const [menuOpen, setMenuOpen] = useState(false)
  const [recentIds, setRecentIds] = useLocalStorage<string[]>(RECENT_KEY, [])
  const [runs, setRuns] = useLocalStorage<DailyRuns>(RUNS_KEY, { date: "", counts: {} })

  const activeTool = activeId ? tools.find((tool) => tool.id === activeId) ?? null : null

  const openTool = useCallback(
    (id: string) => {
      setActiveId(id)
      setQuery("")
      setMenuOpen(false)
      setRecentIds((prev) => [id, ...prev.filter((item) => item !== id)].slice(0, MAX_RECENT))
      if (toolIdFromUrl() !== id) {
        window.history.pushState(null, "", `?tool=${encodeURIComponent(id)}`)
      }
      window.scrollTo({ top: 0 })
    },
    [setRecentIds],
  )

  const goDiscover = useCallback((nextCategory?: CategoryFilter) => {
    setActiveId(null)
    setMenuOpen(false)
    if (nextCategory) setCategory(nextCategory)
    if (toolIdFromUrl()) window.history.pushState(null, "", window.location.pathname)
  }, [])

  useEffect(() => {
    if (activeId) {
      setRecentIds((prev) =>
        prev[0] === activeId ? prev : [activeId, ...prev.filter((item) => item !== activeId)].slice(0, MAX_RECENT),
      )
    }
    // Only record the tool the visitor landed on.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    function handlePopState() {
      const id = toolIdFromUrl()
      setActiveId(id && tools.some((tool) => tool.id === id) ? id : null)
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [tools])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null
      const typing =
        target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      if (event.key === "/" && !typing) {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (activeTool) document.title = `${activeTool.name} — TrendTool`
    else document.title = "TrendTool — Fast, focused utilities"
  }, [activeTool])

  function handleQueryChange(value: string) {
    setQuery(value)
    if (value && activeId) goDiscover()
  }

  function handleSubmitQuery() {
    const first = tools.find((tool) => matchesQuery(tool, query))
    if (query.trim() && first) openTool(first.id)
  }

  function recordRun() {
    if (!activeId) return
    const date = today()
    setRuns((prev) => {
      const counts = prev.date === date ? prev.counts : {}
      return { date, counts: { ...counts, [activeId]: (counts[activeId] ?? 0) + 1 } }
    })
  }

  const sessionRuns = activeId && runs.date === today() ? runs.counts[activeId] ?? 0 : 0

  const sidebar = (
    <Sidebar
      tools={tools}
      activeId={activeId}
      recentIds={recentIds}
      onDiscover={goDiscover}
      onSelect={openTool}
      onClearRecent={() => setRecentIds([])}
    />
  )

  return (
    <div className="flex min-h-dvh flex-col">
      <Header
        ref={searchRef}
        query={query}
        onQueryChange={handleQueryChange}
        onSubmitQuery={handleSubmitQuery}
        onHome={() => {
          setQuery("")
          goDiscover("All")
        }}
        onOpenMenu={activeTool ? () => setMenuOpen(true) : undefined}
      />

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-5">
        {activeTool ? (
          <div className="grid gap-6 md:grid-cols-[200px_minmax(0,1fr)]">
            <aside className="hidden md:block">
              <div className="sticky top-19">{sidebar}</div>
            </aside>
            <div
              key={activeTool.id}
              className="animate-in duration-200 fade-in slide-in-from-bottom-1 motion-reduce:animate-none"
            >
              <ToolWorkspace
                tool={activeTool}
                tools={tools}
                sessionRuns={sessionRuns}
                onRun={recordRun}
                onBack={() => goDiscover()}
                onSelect={openTool}
              />
            </div>
          </div>
        ) : (
          <div className="animate-in duration-200 fade-in motion-reduce:animate-none">
            <DiscoverView
              tools={tools}
              query={query}
              category={category}
              onCategoryChange={setCategory}
              onSelect={openTool}
              onClearQuery={() => setQuery("")}
            />
          </div>
        )}
      </main>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="bottom" className="max-h-[80dvh] overflow-y-auto rounded-t-xl pb-6">
          <SheetHeader className="pb-0">
            <SheetTitle>Tools</SheetTitle>
          </SheetHeader>
          <div className="px-4">{sidebar}</div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
