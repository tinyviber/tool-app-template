export const TOOL_CATEGORIES = [
  "Convert",
  "Generate",
  "Clean",
  "Calculate",
  "Text",
  "Image",
] as const

export type ToolCategory = (typeof TOOL_CATEGORIES)[number]
export type TrendDirection = "up" | "down"

export type ToolIconKey =
  | "eraser"
  | "ruler"
  | "qr"
  | "case"
  | "hash"
  | "braces"
  | "percent"
  | "image"
  | "palette"
  | "key"
  | "calendar"
  | "file"

export interface TrendingTool {
  id: string
  name: string
  description: string
  category: ToolCategory
  icon: ToolIconKey
  usageCount: number
  trendPercent: number
  trendDirection: TrendDirection
  trending?: boolean
}

export const trends: TrendingTool[] = [
  {
    id: "text-cleaner",
    name: "Text Cleaner",
    description: "Strip extra spaces, line breaks and stray symbols from text.",
    category: "Clean",
    icon: "eraser",
    usageCount: 12840,
    trendPercent: 34,
    trendDirection: "up",
    trending: true,
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert length, weight and temperature between common units.",
    category: "Convert",
    icon: "ruler",
    usageCount: 9412,
    trendPercent: 12,
    trendDirection: "up",
    trending: true,
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    description: "Turn any link or text into a downloadable QR code.",
    category: "Generate",
    icon: "qr",
    usageCount: 15730,
    trendPercent: 48,
    trendDirection: "up",
    trending: true,
  },
  {
    id: "case-converter",
    name: "Case Converter",
    description: "Switch text between camelCase, snake_case, Title Case and more.",
    category: "Text",
    icon: "case",
    usageCount: 6120,
    trendPercent: 8,
    trendDirection: "up",
    trending: true,
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters and reading time instantly.",
    category: "Text",
    icon: "hash",
    usageCount: 8804,
    trendPercent: 5,
    trendDirection: "down",
    trending: true,
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Pretty-print, validate and minify JSON payloads.",
    category: "Clean",
    icon: "braces",
    usageCount: 11210,
    trendPercent: 21,
    trendDirection: "up",
    trending: true,
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Work out percentages, increases and discounts fast.",
    category: "Calculate",
    icon: "percent",
    usageCount: 5390,
    trendPercent: 3,
    trendDirection: "down",
    trending: true,
  },
  {
    id: "image-compressor",
    name: "Image Compressor",
    description: "Shrink JPG and PNG files without visible quality loss.",
    category: "Image",
    icon: "image",
    usageCount: 7650,
    trendPercent: 17,
    trendDirection: "up",
    trending: true,
  },
  {
    id: "color-converter",
    name: "Color Converter",
    description: "Translate colors between HEX, RGB and HSL.",
    category: "Convert",
    icon: "palette",
    usageCount: 4210,
    trendPercent: 2,
    trendDirection: "up",
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Create strong random passwords with custom rules.",
    category: "Generate",
    icon: "key",
    usageCount: 6980,
    trendPercent: 9,
    trendDirection: "down",
  },
  {
    id: "date-difference",
    name: "Date Difference",
    description: "Count days, weeks and months between two dates.",
    category: "Calculate",
    icon: "calendar",
    usageCount: 3120,
    trendPercent: 6,
    trendDirection: "up",
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    description: "Resize images to exact pixel dimensions or ratios.",
    category: "Image",
    icon: "image",
    usageCount: 5540,
    trendPercent: 4,
    trendDirection: "down",
  },
  {
    id: "lorem-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder paragraphs, sentences or words.",
    category: "Generate",
    icon: "file",
    usageCount: 2890,
    trendPercent: 1,
    trendDirection: "down",
  },
  {
    id: "remove-duplicates",
    name: "Remove Duplicate Lines",
    description: "Deduplicate lists and keep only unique lines.",
    category: "Clean",
    icon: "eraser",
    usageCount: 3470,
    trendPercent: 11,
    trendDirection: "up",
  },
]
