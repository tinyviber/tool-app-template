"use client"

import { createContext, useCallback, useContext, useSyncExternalStore } from "react"

type Theme = "light" | "dark"

export const THEME_STORAGE_KEY = "trendtool:theme"

export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t){t=JSON.parse(t)}if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var d=document.documentElement;d.classList.remove('light','dark');d.classList.add(t);d.style.colorScheme=t}catch(e){}})()`

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const themeListeners = new Set<() => void>()

function subscribe(callback: () => void) {
  themeListeners.add(callback)
  return () => themeListeners.delete(callback)
}

function getTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme)

  const toggleTheme = useCallback(() => {
    const next: Theme = getTheme() === "dark" ? "light" : "dark"
    const root = document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(next)
    root.style.colorScheme = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(next))
    } catch {}
    themeListeners.forEach((listener) => listener())
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used inside ThemeProvider")
  return context
}
