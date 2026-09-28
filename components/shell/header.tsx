"use client"

import { MoonIcon, SunIcon, WrenchIcon } from "lucide-react"
import { site } from "@/data/site"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface HeaderProps {
  onHome: () => void
}

export function Header({ onHome }: HeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-14 max-w-[1120px] items-center gap-4 px-5">
        <button
          type="button"
          onClick={onHome}
          className="flex shrink-0 items-center gap-2 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          aria-label={`${site.name} home`}
        >
          <WrenchIcon aria-hidden="true" className="size-4 text-primary" />
          <span className="text-sm font-semibold tracking-tight">{site.name}</span>
        </button>

        <nav className="flex items-center gap-1" aria-label="Primary">
          <Button variant="ghost" size="sm" onClick={onHome}>
            Tools
          </Button>
        </nav>

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
}
