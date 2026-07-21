// Groundwork — botanical studio. Content for the greenhouse rebrand.

export const NAV_LINKS = [
  { href: "#collections", label: "Collections" },
  { href: "#glasshouse", label: "Glasshouse" },
  { href: "#visit", label: "Visit" },
] as const;

/** Latin names for the marquee. */
export const BOTANICALS = [
  "Monstera Deliciosa",
  "Asplenium Nidus",
  "Philodendron Gloriosum",
  "Calathea Orbifolia",
  "Maranta Leuconeura",
  "Epipremnum Pinnatum",
  "Hoya Carnosa",
] as const;

export interface Collection {
  slug: string;
  /** Light label shown as the eyebrow, e.g. "Shade". */
  tag: string;
  name: string;
  /** Habitat line, e.g. "Tropical understory". */
  family: string;
  /** Short one-liner shown on the card. */
  summary: string;
  price: string;
  description: string;
  /** Care attributes shown in the detail drawer. */
  care: { label: string; value: string }[];
  /** "How it grows" narrative. */
  growing: string;
  /** Species in the collection. */
  plants: string[];
}

export const COLLECTIONS: Collection[] = [
  {
    slug: "understory",
    tag: "Shade",
    name: "Understory",
    family: "Tropical forest floor",
    summary: "Low-light lovers · ferns & calatheas",
    price: "from $34",
    description:
      "Plants from the shaded forest floor — soft, unfurling, and happiest out of direct sun. The easiest way to green a dim corner.",
    care: [
      { label: "Light", value: "Low · indirect" },
      { label: "Water", value: "Keep evenly moist" },
      { label: "Humidity", value: "High · 60%+" },
      { label: "Temperature", value: "18–24°C" },
      { label: "Origin", value: "Tropical understory" },
      { label: "Difficulty", value: "Intermediate" },
    ],
    growing:
      "Grown slow under shade cloth so the fronds stay soft and deep green. We harden them off gently before they leave — a plant rushed under bright light never quite settles.",
    plants: ["Bird’s Nest Fern", "Maidenhair Fern", "Calathea Orbifolia"],
  },
  {
    slug: "canopy",
    tag: "Bright indirect",
    name: "Canopy",
    family: "Tropical canopy",
    summary: "Statement leaves · climbers & foliage",
    price: "from $28",
    description:
      "Climbers and trailers that reach for the light — big, architectural leaves that fill a room and forgive the occasional missed watering.",
    care: [
      { label: "Light", value: "Bright · indirect" },
      { label: "Water", value: "When top 5cm dry" },
      { label: "Humidity", value: "Moderate · 50%" },
      { label: "Temperature", value: "18–27°C" },
      { label: "Origin", value: "Tropical canopy" },
      { label: "Difficulty", value: "Easy" },
    ],
    growing:
      "Trained up moss poles from cuttings taken in-house, so the leaves fenestrate early and the roots are strong. The hardiest things we grow — a good first plant.",
    plants: ["Monstera Deliciosa", "Philodendron Gloriosum", "Golden Pothos"],
  },
  {
    slug: "bloom",
    tag: "Bright",
    name: "Bloom",
    family: "Epiphytic & flowering",
    summary: "The show-offs · flowers worth the wait",
    price: "from $46",
    description:
      "The show-offs. Flowering and epiphytic plants that ask for a little more attention and pay it back with blooms worth the patience.",
    care: [
      { label: "Light", value: "Bright · some direct" },
      { label: "Water", value: "Sparingly · dry between" },
      { label: "Humidity", value: "Moderate–High" },
      { label: "Temperature", value: "18–26°C" },
      { label: "Origin", value: "Epiphytic" },
      { label: "Difficulty", value: "Advanced" },
    ],
    growing:
      "Raised on bark and left slightly root-bound — the stress that coaxes a flower spike. We only send them out once they’ve bloomed for us at least once, so you know they will for you.",
    plants: ["Hoya Carnosa", "Phalaenopsis Orchid", "Anthurium Clarinervium"],
  },
];

export interface GlasshouseStep {
  label: string;
  body: string;
}

export const GLASSHOUSE: GlasshouseStep[] = [
  {
    label: "Sourcing",
    body: "We propagate from our own stock and a handful of growers we’ve known for years. One species per pot, named on the label. When a batch sells, it’s gone — we don’t force stock to keep a shelf full.",
  },
  {
    label: "Tending",
    body: "Hand-watered, most mornings before we open. We grow to what the plant wants — bright enough to keep its colour, never so forced it outgrows itself.",
  },
  {
    label: "Homing",
    body: "Every plant leaves with a care card and honest advice. If it needs more light than your room has, we’ll say so. We’d rather it thrive than sell.",
  },
];

export interface Location {
  name: string;
  street: string;
  city: string;
  weekday: string;
  weekend: string;
}

export const LOCATIONS: Location[] = [
  {
    name: "Byward",
    street: "41 Clarence St",
    city: "Ottawa, ON",
    weekday: "Mon–Fri 9–18",
    weekend: "Sat–Sun 10–17",
  },
  {
    name: "Hintonburg",
    street: "1088 Wellington W",
    city: "Ottawa, ON",
    weekday: "Mon–Fri 9–18",
    weekend: "Sat–Sun 10–17",
  },
  {
    name: "Glebe",
    street: "770 Bank St",
    city: "Ottawa, ON",
    weekday: "Mon–Fri 9–18",
    weekend: "Sat–Sun 10–17",
  },
];
