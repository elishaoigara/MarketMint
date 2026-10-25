# MarketMint
MarketMint is a web application that provides real-time cryptocurrency prices and allows users to manage their watchlist.

## Features
* Real-time cryptocurrency prices
* Watchlist management
* User-friendly interface
* Motion-first UI: animated page transitions, scroll reveals, live price counters and a
  continuously scrolling market ticker

## Animations
All motion lives in two places:

* `src/animations/` – shared Framer Motion building blocks:
  * `variants.js` – easings, springs and reusable variants (page transitions, staggered
    reveals, card entrance, hover lift).
  * `Reveal.jsx` – `Reveal`, `RevealGroup` and `RevealItem` for scroll-triggered reveals.
  * `AnimatedNumber.jsx` – tweens from the old value to the new one (and flashes green/red
    when a price moves). It writes straight to the DOM through a ref, so a grid of 50
    prices doesn't re-render on every frame.
  * `Skeletons.jsx` – shimmering placeholders instead of a bare spinner.
  * `AmbientBackground.jsx`, `PageTransition.jsx`, `ScrollProgress.jsx`.
  * `animations.css` – decorative CSS keyframes (drifting orbs, shimmer, marquee, price flash).
* Component-level polish – animated navbar underline, sliding sidebar pill, card lifts,
  spring buttons and staggered grids.

Accessibility: the app is wrapped in `<MotionConfig reducedMotion="user" />` and the CSS
keyframes are disabled under `prefers-reduced-motion: reduce`, so every animation is
skipped for visitors who ask for less motion.

## Getting Started
1. Clone the repository: `git clone https://github.com/elishaoigara/marketmint.git`
2. Install dependencies: `npm install`
3. Start the application: `npm start`

## Deployment

The app is deployed on [Vercel](https://market-mint.vercel.app). The repo includes a
`vercel.json` that builds with `npm run build`, serves the `build/` folder and rewrites
all client-side routes to `index.html` so deep links (e.g. `/markets`) work on refresh.

> Do **not** set a `homepage` field in `package.json` for this deployment. It makes
> Create React App emit asset URLs under that sub-path (e.g. `/marketmint/static/js/...`),
> which 404 on Vercel and leave the page blank. Vercel serves the site from the domain root.

Deploy from the repository root:

```bash
npm install
npm run build
npx vercel --prod
```
