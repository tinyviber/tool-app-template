import {
  BracesIcon,
  CalendarRangeIcon,
  CaseSensitiveIcon,
  EraserIcon,
  FileTextIcon,
  HashIcon,
  ImageIcon,
  KeyRoundIcon,
  PaletteIcon,
  PercentIcon,
  QrCodeIcon,
  RulerIcon,
  type LucideIcon,
} from "lucide-react"
import type { ToolIconKey } from "@/data/trends"

export const toolIcons: Record<ToolIconKey, LucideIcon> = {
  eraser: EraserIcon,
  ruler: RulerIcon,
  qr: QrCodeIcon,
  case: CaseSensitiveIcon,
  hash: HashIcon,
  braces: BracesIcon,
  percent: PercentIcon,
  image: ImageIcon,
  palette: PaletteIcon,
  key: KeyRoundIcon,
  calendar: CalendarRangeIcon,
  file: FileTextIcon,
}
