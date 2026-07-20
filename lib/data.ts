// Content extracted verbatim from the Groundwork brand-guide design.

export const NAV_LINKS = [
  { href: "#roasts", label: "Roasts" },
  { href: "#cafes", label: "Cafés" },
  { href: "#about", label: "About" },
] as const;

export const ORIGINS = [
  "Ethiopia Yirgacheffe",
  "Colombia Huila",
  "Guatemala Antigua",
  "Kenya AA",
  "Brazil Cerrado",
] as const;

export interface BrewStep {
  method: string;
  recipe: string;
}

export interface Roast {
  slug: string;
  level: string;
  name: string;
  origin: string;
  notes: string;
  price: string;
  /** One-line intro shown at the top of the detail drawer. */
  description: string;
  /** Origin / green-coffee spec rows. */
  specs: { label: string; value: string }[];
  /** "How it's made" — the roast/process narrative. */
  process: string;
  /** Suggested brews. */
  brew: BrewStep[];
}

export const ROASTS: Roast[] = [
  {
    slug: "morning-debt",
    level: "Light Roast",
    name: "Morning Debt",
    origin: "Ethiopia · Yirgacheffe",
    notes: "Jasmine · Bergamot · Stone Fruit",
    price: "$22",
    description:
      "A bright, floral morning cup that trades comfort for clarity — the kind of coffee that wakes the palate before the caffeine lands.",
    specs: [
      { label: "Region", value: "Gedeo Zone, Yirgacheffe" },
      { label: "Producer", value: "Idido smallholders" },
      { label: "Altitude", value: "1,900–2,100 masl" },
      { label: "Varietal", value: "Heirloom (74110, 74112)" },
      { label: "Process", value: "Washed" },
      { label: "Harvest", value: "November–January" },
    ],
    process:
      "Roasted light and pulled just past first crack — long enough for the sugars to set, short enough to keep the bergamot lift and the jasmine top note intact. We rest it four days before it hits the shelf.",
    brew: [
      { method: "Pour-over (V60)", recipe: "1:16 · 94°C · 2:45 total" },
      { method: "Batch filter", recipe: "60 g/L · medium grind" },
    ],
  },
  {
    slug: "slow-pull",
    level: "Medium Roast",
    name: "Slow Pull",
    origin: "Colombia · Huila",
    notes: "Cocoa · Red Apple · Cane Sugar",
    price: "$21",
    description:
      "A balanced, rounded medium with real body and easy sweetness — the everyday cup that works black or with milk.",
    specs: [
      { label: "Region", value: "Pitalito, Huila" },
      { label: "Producer", value: "Finca La Esperanza" },
      { label: "Altitude", value: "1,650–1,800 masl" },
      { label: "Varietal", value: "Caturra · Castillo" },
      { label: "Process", value: "Washed" },
      { label: "Harvest", value: "April–June" },
    ],
    process:
      "Taken to the very edge of second crack to build a cocoa-heavy body without scorching the fruit. The apple acidity stays bright underneath — enough structure for espresso, forgiving enough for a French press.",
    brew: [
      { method: "Espresso", recipe: "20 g → 40 g · 93°C · 28 s" },
      { method: "French press", recipe: "1:15 · 4 min steep" },
    ],
  },
  {
    slug: "last-call",
    level: "Dark Roast",
    name: "Last Call",
    origin: "Guatemala · Antigua",
    notes: "Dark Chocolate · Walnut · Molasses",
    price: "$20",
    description:
      "A deep, comforting dark roast for the end of the day — syrupy and low-toned, with none of the ashy edge.",
    specs: [
      { label: "Region", value: "Antigua Valley" },
      { label: "Producer", value: "Finca El Volcán" },
      { label: "Altitude", value: "1,500–1,700 masl" },
      { label: "Varietal", value: "Bourbon · Catuaí" },
      { label: "Process", value: "Washed" },
      { label: "Harvest", value: "December–March" },
    ],
    process:
      "Carried well into second crack, but slowly — the extra minutes pull out a molasses depth and keep the bitterness soft, so the walnut and dark chocolate stay the loudest notes in the cup.",
    brew: [
      { method: "Moka pot", recipe: "Fine grind · off heat early" },
      { method: "Espresso", recipe: "18 g → 36 g · 92°C · 30 s" },
    ],
  },
];

export interface ProcessStep {
  label: string;
  body: string;
}

export const PROCESS: ProcessStep[] = [
  {
    label: "Sourcing",
    body: "We buy single lots directly from growers we’ve bought from before. One origin per bag, named on the label. When a lot runs out, it’s gone — we don’t blend to keep a flavor on the shelf.",
  },
  {
    label: "Roasting",
    body: "Small batches, most days before the shop opens. We roast to what the bean can do — light enough to read the origin, never so dark it all tastes the same.",
  },
  {
    label: "Serving",
    body: "Pulled slow, served straight. No syrups, no whipped anything. If you want it with milk, we’ll steam it right. Otherwise the cup speaks for itself.",
  },
];

export interface Cafe {
  name: string;
  street: string;
  city: string;
  weekday: string;
  weekend: string;
}

export const CAFES: Cafe[] = [
  {
    name: "Byward",
    street: "41 Clarence St",
    city: "Ottawa, ON",
    weekday: "Mon–Fri 6–18",
    weekend: "Sat–Sun 7–17",
  },
  {
    name: "Hintonburg",
    street: "1088 Wellington W",
    city: "Ottawa, ON",
    weekday: "Mon–Fri 6–18",
    weekend: "Sat–Sun 7–17",
  },
  {
    name: "Glebe",
    street: "770 Bank St",
    city: "Ottawa, ON",
    weekday: "Mon–Fri 6–18",
    weekend: "Sat–Sun 7–17",
  },
];
