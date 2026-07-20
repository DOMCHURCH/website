# Groundwork

A cinematic single-page site for **Groundwork**, a specialty-coffee roaster in Ottawa — _"The cup that earns the morning."_

Built from a Claude Design brand-guide export, implemented as a production Next.js app.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Lenis** smooth scrolling + **GSAP / ScrollTrigger** motion
- Self-hosted fonts via `next/font`: Cormorant Garamond · Inter · JetBrains Mono

## Sections

Nav · video Hero · origin ticker · Featured Roasts · The Process · Café Locations · Footer.

## Design language

Deep ink `#0A0A0A`, espresso `#1C1008`, cream type `#E8E0D5`, muted taupe `#6B6058`, copper accent `#C47B2B`.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run lint
npm run build
npm run start
```

## Notes

- Fully responsive (mobile → desktop) and static-rendered.
- Respects `prefers-reduced-motion` (marquee + reveals disabled, hero video paused, poster shown).
- Set `NEXT_PUBLIC_SITE_URL` for absolute Open Graph / share URLs.
