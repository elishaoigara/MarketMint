# MarketMint
MarketMint is a web application that provides real-time cryptocurrency prices and allows users to manage their watchlist.

## Features
* Real-time cryptocurrency prices
* Watchlist management
* User-friendly interface

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
