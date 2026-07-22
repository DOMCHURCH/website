# Groundwork

A cinematic single-page site for **Groundwork**, a botanical studio in Ottawa — _"Where the wild comes indoors."_

Built from a Claude Design brand-guide export, implemented as a production Next.js app.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Lenis** smooth scrolling + **GSAP / ScrollTrigger** motion
- Self-hosted fonts via `next/font`: Cormorant Garamond · Inter · JetBrains Mono

## Sections

Nav · Hero (over a scroll-scrubbed greenhouse frame sequence) · botanical ticker · Collections · The Glasshouse · Visit · Footer.

## Design language

Forest shadow `#0B1210`, canopy surface `#131E18`, cream type `#ECE7DA`, muted sage `#97A291`, sunlit gold accent `#D3B15F`, with fern and a rare lavender bloom.

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
- Respects `prefers-reduced-motion`: reveals, hero/numeral parallax and cursor-reactive drift are disabled, the intro loader is skipped, and the marquee is calmed — content renders static and fully visible.
- Set `NEXT_PUBLIC_SITE_URL` for absolute Open Graph / share URLs.
