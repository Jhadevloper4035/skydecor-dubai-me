
1. **Use Metadata API correctly (App Router)** — Define `generateMetadata()` per page for dynamic title/description instead of one static `metadata` object for the whole app. A common mistake is leaving the default Next.js title/description on every route, which tanks unique-page indexing.

2. **Server-render or statically generate crawlable content** — Don't rely on client-side `useEffect` + fetch to render your main content. Crawlers (and AI bots) may not execute JS reliably. Use SSR (`fetch` in Server Components), SSG, or ISR so content is in the initial HTML.

3. **Structured data (JSON-LD)** — Add schema.org markup (Product, Article, Organization, BreadcrumbList, FAQ) via a `<script type="application/ld+json">` in your layout/page. This directly helps AI systems and Google understand entities, not just keywords.

4. **Canonical tags on every page** — Especially critical for e-commerce/filtering (your Skydecor/Sanaar work) where query params create duplicate content. Set `alternates: { canonical: url }` in metadata to avoid duplicate-content penalties.

5. **Proper `robots.txt` + `sitemap.xml`** — Generate dynamically via `app/sitemap.ts` and `app/robots.ts` instead of static files, so new products/pages auto-include. Mistake: forgetting to exclude admin/cart/checkout routes from the sitemap.

6. **Image optimization done right** — Use `next/image` with descriptive `alt` text (not empty or filename-based). Missing alt text is one of the most common and easily fixed SEO gaps, and also matters for AI image understanding.

7. **Core Web Vitals / performance** — LCP, CLS, INP matter as ranking signals. Avoid render-blocking scripts, oversized hero images, and layout shift from ads/fonts. Use `next/font` for font loading instead of external `<link>` tags.

8. **Semantic HTML + heading hierarchy** — One `<h1>` per page, logical `<h2>`/`<h3>` nesting. Mistake: styling divs to look like headings, or skipping heading levels for visual reasons — this hurts both search and AI content parsing.

9. **URL structure and internal linking** — Clean, human-readable slugs (`/products/laminate-sheets` not `/products?id=123`), consistent trailing slash behavior, and strong internal linking between related pages (category → product → related products) so crawlers and AI can map your site's topical structure.

10. **Avoid soft 404s and broken redirects** — When products/pages are removed (common in e-commerce), return real `notFound()` (404) or `redirect()` (301) — not a page that says "not found" while returning HTTP 200. Also audit for redirect chains, which dilute link equity and slow crawling.

**Bonus AI-specific tip:** since you mentioned sharing this with AI — also make sure your `llms.txt` (emerging convention) or at least clean, well-structured markdown-like content and clear metadata exist, since AI crawlers/answer engines increasingly rely on structured, unambiguous content rather than visual layout to extract facts.

Want me to turn this into a checklist artifact or write actual code snippets (e.g. `generateMetadata`, `sitemap.ts`, JSON-LD component) for one of your Next.js projects?