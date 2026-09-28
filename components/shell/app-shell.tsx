"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { Tool } from "@/data/tools"
import { site } from "@/data/site"
import { DiscoverView, type CategoryFilter } from "./discover-view"
import { Footer } from "./footer"
import { Header } from "./header"
import { ToolWorkspace } from "./tool-workspace"

function toolIdFromUrl() {
  return new URLSearchParams(window.location.search).get("tool")
}

export function AppShell({
  tools,
  initialToolId,
}: {
  tools: Tool[]
  initialToolId: string | null
}) {
  const searchRef = useRef<HTMLInputElement>(null)
  const [activeId, setActiveId] = useState<string | null>(
    initialToolId && tools.some((tool) => tool.id === initialToolId) ? initialToolId : null,
  )
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState<CategoryFilter>("All")

  const activeTool = activeId ? tools.find((tool) => tool.id === activeId) ?? null : null

  const openTool = useCallback((id: string) => {
    setActiveId(id)
    setQuery("")
    if (toolIdFromUrl() !== id) {
      window.history.pushState(null, "", `?tool=${encodeURIComponent(id)}`)
    }
    window.scrollTo({ top: 0 })
  }, [])

  const goDiscover = useCallback((nextCategory?: CategoryFilter) => {
    setActiveId(null)
    if (nextCategory) setCategory(nextCategory)
    if (toolIdFromUrl()) window.history.pushState(null, "", window.location.pathname)
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
      if (event.key === "/" && !typing && !activeId) {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeId])

  useEffect(() => {
    document.title = activeTool
      ? `${activeTool.name} — ${site.name}`
      : `${site.name} — ${site.tagline}`
  }, [activeTool])

  return (
    <div className="flex min-h-dvh flex-col">
      <Header
        onHome={() => {
          setQuery("")
          goDiscover("All")
        }}
      />

      <main className="mx-auto w-full max-w-[1120px] flex-1 px-5">
        {activeTool ? (
          <div
            key={activeTool.id}
            className="animate-in duration-200 fade-in slide-in-from-bottom-1 motion-reduce:animate-none"
          >
            <ToolWorkspace
              tool={activeTool}
              tools={tools}
              onBack={() => goDiscover()}
              onSelect={openTool}
            />
          </div>
        ) : (
          <div className="animate-in duration-200 fade-in motion-reduce:animate-none">
            <DiscoverView
              tools={tools}
              query={query}
              category={category}
              onQueryChange={setQuery}
              onCategoryChange={setCategory}
              onSelect={openTool}
              onClearQuery={() => setQuery("")}
              searchRef={searchRef}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
