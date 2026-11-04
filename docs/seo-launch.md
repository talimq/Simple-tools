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

## Production domains and redirects

The custom domain https://handyfigs.com/es/ was confirmed serving the production site over HTTPS on 4 November 2026. Both www.handyfigs.com and simple-tools-22i.pages.dev also resolve to the same Pages project.

`functions/_middleware.js` redirects only those two production aliases to https://handyfigs.com with HTTP 301, retaining the path and query string. Root requests go directly to /es/, including when arriving through an alias. Preview hostnames retain their own host. Canonical pages, ownership verification documents and unknown paths continue through Pages' normal static handling.

The middleware is deployed through the existing GitHub-to-Pages integration. It requires no new paid browser service or Cloudflare plan upgrade. Pages Functions share the Workers Free allowance of 100,000 requests per day; `public/_routes.json` excludes /assets/* so those files remain purely static. If traffic eventually approaches the free function allowance, use Cloudflare's free Bulk Redirects at the account level and remove this middleware. Do not enable a paid plan automatically.

## Search Console: still pending

The exact Google ownership document is deployed at /google0966770103d5e696.html. Its presence alone does not mean that Google has verified the property.

1. Complete verification of the URL-prefix property https://handyfigs.com/ in the owner's Google account, then submit https://handyfigs.com/sitemap.xml.
2. Inspect one home page and representative calculators in both languages. A submitted sitemap or indexing request does not guarantee indexing.
3. Use 4 November 2026 as the custom-domain launch baseline for future performance comparisons.

Verification and sitemap submission have not yet been confirmed. The site remains crawlable without Search Console, with its canonical sitemap referenced in robots.txt.

## First content priorities

Focus initial organic work on food cost, product margin and job pricing. They address concrete business tasks and already have working calculators and explanatory examples. This is an editorial choice, not verified keyword-demand research.

After enough Search Console data exists, choose the next updates from actual queries, impressions and click-through rates. Avoid bulk publishing thin calculator pages before measuring use of the current tools. No ranking, traffic or revenue outcome is promised.

Do not add advertising, tracking scripts or paid services without an explicit product decision. Search Console verification and sitemap submission do not require analytics scripts on the site.
