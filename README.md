# HandyFigs

Free, bilingual (Spanish/English) calculators for small business and household expenses.
All calculator inputs remain in the browser. No accounts or runtime dependencies are needed.

## Local checks and build

```sh
npm run check
npm test
npm run build
```

Serve `public/` after building. `npm run test:e2e` runs Playwright on desktop and mobile projects; install development dependencies and Chromium first. CI runs this suite automatically.

## Cloudflare Pages

- Repository: `talimq/Simple-tools`, branch `main`
- Build command: `npm run build`
- Output directory: `public`
- Node: 22
- Canonical production origin: `https://handyfigs.com`

The generator writes 16 localized canonical pages, a root fallback, a 404 page,
`sitemap.xml`, `robots.txt`, and a Cloudflare `_redirects` root rule.
Generated output is ignored by Git; Pages builds from the checked-in sources.
Custom-domain binding, HTTPS and hostname redirects are configured in Cloudflare.

## Source layout

- `public/assets/calculators.js`: pure calculation functions
- `public/assets/app.js`: filtering, forms, browser-local persistence and results
- `public/assets/styles.css`: responsive styles
- `scripts/generate-pages.js`: localized static pages and crawl files
- `scripts/seo-content.js`: visible worked examples, formulas and specific FAQs
- `tests/calculators.test.js`: calculation tests
- `tests/seo.test.js`: metadata, alternates, sitemap, structured data and crawl controls
- `tests/e2e/core.spec.js`: rendered filtering, navigation, calculations and persistence
- `docs/seo-launch.md`: launch configuration and next actions

## Scope and limitations

Family expenses simulates a mathematical split and does not determine legal support.
Employee cost uses configurable estimates, not official payroll rates. Rental yield
is an economic model, not a tax calculation. All money is in EUR. Tools are currently
free; there are no paid exports, subscriptions or server-side storage.
