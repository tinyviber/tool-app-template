"use client"

import { useCallback, useSyncExternalStore } from "react"

const listeners = new Set<() => void>()

function subscribe(callback: () => void) {
  listeners.add(callback)
  window.addEventListener("storage", callback)
  return () => {
    listeners.delete(callback)
    window.removeEventListener("storage", callback)
  }
}

function readRaw(key: string) {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function useLocalStorage<T>(key: string, fallback: T) {
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(key),
    () => null,
  )

  let value = fallback
  if (raw !== null) {
    try {
      value = JSON.parse(raw) as T
    } catch {
      value = fallback
    }
  }

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const currentRaw = readRaw(key)
      let current = fallback
      if (currentRaw !== null) {
        try {
          current = JSON.parse(currentRaw) as T
        } catch {}
      }
      const resolved =
        typeof next === "function" ? (next as (prev: T) => T)(current) : next
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved))
      } catch {}
      listeners.forEach((listener) => listener())
    },
    // fallback is intentionally excluded: callers pass literals.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  )

  return [value, setValue] as const
}
