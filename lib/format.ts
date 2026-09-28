export function formatNumber(value: number, maximumFractionDigits = 6) {
  if (!Number.isFinite(value)) return "—"
  return new Intl.NumberFormat("en", { maximumFractionDigits }).format(value)
}
