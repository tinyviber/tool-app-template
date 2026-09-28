/**
 * Demo content for the template. A tool entry is an entity card plus a tool
 * page; the optional content blocks render below the fold in a fixed order
 * (examples → how it works → explainer → related → FAQ). Replace this list
 * with your own tools — the shell and page layout don't care what domain
 * they are.
 */
export const TOOL_CATEGORIES = [
  "Convert",
  "Generate",
  "Clean",
  "Calculate",
  "Text",
  "Image",
] as const

export type ToolCategory = (typeof TOOL_CATEGORIES)[number]

export interface ToolExample {
  /** Shown on the example row, e.g. "5 mi → km". */
  label: string
  /** Passed to the tool component as its primary input when clicked. */
  input: string
}

export interface ToolStep {
  title: string
  body: string
}

export interface ToolFaq {
  q: string
  a: string
}

export interface Tool {
  id: string
  name: string
  /** One sentence, shown under the H1 and on the card. */
  description: string
  category: ToolCategory
  /** Everything below is optional below-the-fold content for SEO/help. */
  examples?: ToolExample[]
  steps?: ToolStep[]
  explainer?: string
  faq?: ToolFaq[]
}

export const tools: Tool[] = [
  {
    id: "text-cleaner",
    name: "Text Cleaner",
    description: "Strip extra spaces, line breaks and stray symbols from text.",
    category: "Clean",
    examples: [
      { label: "hello   world  → hello world", input: "  hello   world  \n\n\nthis   has   spaces" },
      { label: "Line one. Line two!!", input: "Line  one.\n\n\n\nLine   two!!  " },
      { label: "messy,,, input text ;; here", input: "  messy,,, input   text ;; here" },
    ],
    steps: [
      { title: "Paste", body: "Drop in text copied from a PDF, email or chat export." },
      { title: "Pick options", body: "Trimming and space collapsing are on by default." },
      { title: "Copy", body: "Copy the cleaned output back with one click." },
    ],
    explainer:
      "Text copied from PDFs, spreadsheets and chat apps carries invisible baggage: double spaces from justified columns, blank lines from page breaks, and stray punctuation from export artifacts. Cleaning it by hand is tedious; running it through a deterministic filter is instant and repeatable.",
    faq: [
      {
        q: "Is my text uploaded anywhere?",
        a: "No. Cleaning runs entirely in your browser — nothing leaves the page.",
      },
      {
        q: "What counts as a stray symbol?",
        a: "Repeated punctuation and symbols like “;;;” or stray backslashes that usually come from export artifacts.",
      },
    ],
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert length, weight and temperature between common units.",
    category: "Convert",
    steps: [
      { title: "Choose a category", body: "Length, weight or temperature." },
      { title: "Type a value", body: "Pick the units to convert between." },
      { title: "Copy", body: "Grab the result including units with one click." },
    ],
    explainer:
      "All conversions go through exact SI base factors — miles use the international definition (1 mi = 1609.344 m), pounds the avoirdupois pound (1 lb = 0.45359237 kg). Temperature converts through Celsius as the pivot, so Fahrenheit↔Kelvin stays correct.",
    faq: [
      {
        q: "Are the factors exact?",
        a: "Length and weight use exact international definitions; results are rounded to a readable precision.",
      },
    ],
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    description: "Turn any link or text into a downloadable QR code.",
    category: "Generate",
    examples: [
      { label: "https://example.com", input: "https://example.com" },
      { label: "Wi-Fi string", input: "WIFI:T:WPA;S:HomeWifi;P:hunter2;;" },
    ],
    steps: [
      { title: "Paste", body: "Any link, Wi-Fi string or plain text." },
      { title: "Generate", body: "The code renders instantly at 320px." },
      { title: "Download", body: "Save it as a PNG, ready to print or share." },
    ],
    faq: [
      {
        q: "How much text fits?",
        a: "Up to about 2,000 characters at medium error correction.",
      },
    ],
  },
  {
    id: "case-converter",
    name: "Case Converter",
    description: "Switch text between camelCase, snake_case, Title Case and more.",
    category: "Text",
  },
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters and reading time instantly.",
    category: "Text",
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Pretty-print, validate and minify JSON payloads.",
    category: "Clean",
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Work out percentages, increases and discounts fast.",
    category: "Calculate",
  },
  {
    id: "image-compressor",
    name: "Image Compressor",
    description: "Shrink JPG and PNG files without visible quality loss.",
    category: "Image",
  },
  {
    id: "color-converter",
    name: "Color Converter",
    description: "Translate colors between HEX, RGB and HSL.",
    category: "Convert",
  },
  {
    id: "password-generator",
    name: "Password Generator",
    description: "Create strong random passwords with custom rules.",
    category: "Generate",
  },
  {
    id: "date-difference",
    name: "Date Difference",
    description: "Count days, weeks and months between two dates.",
    category: "Calculate",
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    description: "Resize images to exact pixel dimensions or ratios.",
    category: "Image",
  },
  {
    id: "lorem-generator",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder paragraphs, sentences or words.",
    category: "Generate",
  },
  {
    id: "remove-duplicates",
    name: "Remove Duplicate Lines",
    description: "Deduplicate lists and keep only unique lines.",
    category: "Clean",
  },
]
