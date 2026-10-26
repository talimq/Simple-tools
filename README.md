# Simple Tools

Bilingual (ES/EN) static collection of small professional calculators. All calculations happen in the browser; no user-entered calculation data is sent to a server.

## Stack

- Static HTML/CSS
- Vanilla ES modules
- Pure calculation functions in `public/assets/calculators.js`
- Node built-in test runner
- Generated localized routes for SEO
- No runtime dependencies

## Run locally

Generate/verify the site:

```bash
npm run build
npm test
npm run check
```

Serve the `public` directory with any static server.

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `public`
- Node: 22 recommended

The current canonical base URL is `https://simple-tools.pages.dev`. Change `base` in `scripts/generate-pages.js` when a real domain is chosen, then rebuild.

## Structure

- `public/assets/calculators.js` — pure deterministic calculation functions
- `public/assets/app.js` — browser UI, filters, dynamic rows, persistence, calculations
- `public/assets/styles.css` — responsive styling
- `scripts/generate-pages.js` — ES/EN static page generator
- `tests/calculators.test.js` — unit tests

## Analytics

Cloudflare Web Analytics can be enabled at the Pages/project level without changing the application.

## Limitations / roadmap

- No accounts or server storage.
- No paid PDF/export yet.
- Employee cost is configurable, not an official country-specific payroll calculator.
- Family expenses is a mathematical expense simulator, not a legal support calculator.
- Rental yield is economic, not tax advice.
- Currency is EUR for v1.
