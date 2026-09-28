import type { ReactNode } from "react"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ToolPanel({
  title,
  meta,
  actions,
  children,
}: {
  title: string
  meta?: ReactNode
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <Card size="sm" className="gap-3">
      <CardHeader className="flex items-center gap-2">
        <CardTitle className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {title}
        </CardTitle>
        {meta}
        {actions ? <CardAction>{actions}</CardAction> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
