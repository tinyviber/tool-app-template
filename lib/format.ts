const compact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
})

export function formatCompact(value: number) {
  return compact.format(value)
}

export function formatNumber(value: number, maximumFractionDigits = 6) {
  if (!Number.isFinite(value)) return "—"
  return new Intl.NumberFormat("en", { maximumFractionDigits }).format(value)
}

export function dailyUsage(totalUsage: number) {
  return Math.round(totalUsage / 30)
}
