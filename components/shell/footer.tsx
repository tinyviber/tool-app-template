import { site } from "@/data/site"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 px-5 py-6 text-[13px] text-muted-foreground">
        <span>{site.name}</span>
        <span>{site.footerNote}</span>
      </div>
    </footer>
  )
}
