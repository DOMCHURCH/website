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

export interface Roast {
  level: string;
  name: string;
  origin: string;
  notes: string;
  price: string;
}

export const ROASTS: Roast[] = [
  {
    level: "Light Roast",
    name: "Morning Debt",
    origin: "Ethiopia · Yirgacheffe",
    notes: "Jasmine · Bergamot · Stone Fruit",
    price: "$22",
  },
  {
    level: "Medium Roast",
    name: "Slow Pull",
    origin: "Colombia · Huila",
    notes: "Cocoa · Red Apple · Cane Sugar",
    price: "$21",
  },
  {
    level: "Dark Roast",
    name: "Last Call",
    origin: "Guatemala · Antigua",
    notes: "Dark Chocolate · Walnut · Molasses",
    price: "$20",
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
