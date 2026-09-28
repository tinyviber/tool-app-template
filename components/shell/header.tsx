"use client"

import { forwardRef } from "react"
import { MenuIcon, MoonIcon, SearchIcon, SunIcon } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface HeaderProps {
  query: string
  onQueryChange: (value: string) => void
  onSubmitQuery: () => void
  onHome: () => void
  onOpenMenu?: () => void
}

export const Header = forwardRef<HTMLInputElement, HeaderProps>(function Header(
  { query, onQueryChange, onSubmitQuery, onHome, onOpenMenu },
  searchRef,
) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/75">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center gap-3 px-4">
        {onOpenMenu ? (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onOpenMenu}
            aria-label="Open tool menu"
          >
            <MenuIcon />
          </Button>
        ) : null}
        <button
          type="button"
          onClick={onHome}
          className="flex shrink-0 items-center gap-2 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label="TrendTool home"
        >
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-md bg-primary font-mono text-xs font-bold text-primary-foreground"
          >
            Tt
          </span>
          <span className="hidden text-sm font-bold tracking-tight sm:inline">TrendTool</span>
        </button>

        <form
          role="search"
          className="relative flex-1 md:max-w-md"
          onSubmit={(event) => {
            event.preventDefault()
            onSubmitQuery()
          }}
        >
          <label htmlFor="global-search" className="sr-only">
            Search tools
          </label>
          <SearchIcon
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            ref={searchRef}
            id="global-search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") onQueryChange("")
            }}
            placeholder="Search tools…"
            autoComplete="off"
            className="h-9 pr-10 pl-8"
          />
          <Kbd className="pointer-events-none absolute top-1/2 right-2 hidden -translate-y-1/2 sm:inline-flex">
            /
          </Kbd>
        </form>

        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                className="ml-auto"
              />
            }
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </TooltipTrigger>
          <TooltipContent>Toggle theme</TooltipContent>
        </Tooltip>
      </div>
    </header>
  )
})
