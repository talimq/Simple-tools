# HandyFigs: launch and SEO

Launch preparation: 3 November 2026. The owner approved public publication after reviewing the private functional build.

## Implemented in the public source

- The original category filter and no-results display are corrected at the CSS layer.
- Search ignores accents. Blocked browser storage does not interrupt calculation/reset.
- All seven calculators retain their original functions and ES/EN routes.
- Every tool has a unique title/description, self canonical and reciprocal ES/EN alternates.
- Spanish pages provide the x-default fallback for each pair.
- Formulas, worked examples and specific FAQs are included in the static HTML.
- Related tools are selected by subject rather than using the same three on every page.
- WebSite/WebPage, WebApplication and BreadcrumbList metadata describes the actual free tools; no ratings or results are fabricated.
- Sitemap contains only the 16 localized canonical pages. Robots references the sitemap.
- Root redirects to /es/ in Cloudflare Pages. A real 404 document prevents unknown URLs from becoming soft 404 home pages.

## External launch configuration to verify

1. Bind handyfigs.com to the existing simple-tools Pages project and verify HTTPS.
2. Add www.handyfigs.com and redirect it to the apex domain, preserving path and query string.
3. Only after the custom domain works, redirect simple-tools-22i.pages.dev to https://handyfigs.com with Cloudflare Bulk Redirects. Preserve path suffix and query string. Do not redirect preview deployments blindly.
4. Add and verify the sc-domain:handyfigs.com property in Google Search Console, then submit https://handyfigs.com/sitemap.xml.
5. Inspect one home page and representative calculators in both languages. A submitted sitemap or indexing request does not guarantee indexing.
6. Record the date of the successful custom-domain launch; use it as the baseline for future performance comparisons.

Domain and indexing status must be confirmed in their providers; this file is a configuration handover, not proof of those external steps.

## First content priorities

Focus initial organic work on food cost, product margin and job pricing. They address concrete business tasks and already have working calculators and explanatory examples. This is an editorial choice, not verified keyword-demand research.

After enough Search Console data exists, choose the next updates from actual queries, impressions and click-through rates. Avoid bulk publishing thin calculator pages before measuring use of the current tools. No ranking, traffic or revenue outcome is promised.

Do not add advertising, tracking scripts or paid services without an explicit product decision. Search Console verification and sitemap submission do not require analytics scripts on the site.
