# SEO + Google Search Console Execution Plan

Prepared on: `2026-07-01`
Site: `https://www.ideamadera.cl`
Search Console property reviewed: `sc-domain:ideamadera.cl`
Audience: another AI agent that will execute the work in this repo

## 1. Purpose

This document is an execution-grade SEO plan based on:

- direct Search Console review performed on `2026-07-01`
- inspection of the current Next.js codebase in this repo
- the current canonical/metadata/sitemap/schema implementation

The goal is not to brainstorm. The goal is to execute a prioritized SEO cleanup with the highest likelihood of improving:

- crawl efficiency
- canonical consistency
- indexing quality
- click-through rate from existing impressions

## 2. Verified Current State

### 2.1 Performance snapshot from Search Console

These numbers were visible in GSC on `2026-07-01`. The performance report said it was updated `hace 4 horas`.

- `24 horas` (`2026-06-30` to `2026-07-01`): `5 clicks`, `114 impressions`, `4.4% CTR`, `11.7 average position`
- `7 días` (`2026-06-23` to `2026-06-29`): `13 clicks`, `660 impressions`, `2.0% CTR`, `12.4 average position`
- `28 días` (`2026-06-02` to `2026-06-29`): `29 clicks`, `1,258 impressions`, `2.3% CTR`, `11.1 average position`
- `3 meses` (`2026-03-30` to `2026-06-29`): `96 clicks`, `3,597 impressions`, `2.7% CTR`, `9.5 average position`

### 2.2 Search demand already visible

Recent queries with signal:

- `idea madera`
- `muebles de madera`
- `muebles madera`
- `muebles en madera`
- `muebles chillan`
- `mesa ratona`
- `mesa nordica`
- `muebles de madera en chillán`

Important interpretation:

- the site is already getting impressions for non-brand commercial queries
- many of those queries are sitting near the first-page threshold
- CTR is modest, so metadata/page-match improvements are worth doing

### 2.3 Pages with recent visibility

Visible in GSC for the last `7 días`:

- `https://www.ideamadera.cl/` -> `9 clicks`, `259 impressions`
- `https://www.ideamadera.cl/peldanos-a-medida` -> `2 clicks`, `30 impressions`
- `https://ideamadera.cl/` -> `1 click`, `77 impressions`
- `https://www.ideamadera.cl/collections/todos-los-productos` -> `1 click`, `23 impressions`
- `https://www.ideamadera.cl/products/mesa-tripode-ratona` -> `0 clicks`, `89 impressions`
- `https://www.ideamadera.cl/products/mesa-nordica` -> `0 clicks`, `54 impressions`
- `https://www.ideamadera.cl/products/mesa-centro-roma` -> `0 clicks`, `25 impressions`

Additional GSC insight card on overview:

- `https://www.ideamadera.cl/products/mesa-tripode-ratona` showed `+335%` impressions compared to the prior week

### 2.4 Geography and device mix

From `7 días`:

- country: overwhelmingly `Chile`
- device split: mostly `mobile`

Implication:

- do not optimize copy for generic global intent first
- prioritize Chile-focused messaging and mobile SERP CTR

### 2.5 Indexing snapshot from Search Console

The index coverage report showed:

- `545` non-indexed pages
- `7` indexed pages
- report last updated `2026-06-11`

Main exclusion buckets visible in GSC:

- `Rastreada: actualmente sin indexar` -> `364`
- `Página alternativa con etiqueta canónica adecuada` -> `55`
- `No se ha encontrado (404)` -> `44`
- `Error de redirección` -> `43`
- `Página con redirección` -> `31`
- `Bloqueada por robots.txt` -> `4`
- `Soft 404` -> `3`
- `Excluida por una etiqueta "noindex"` -> `1`

### 2.6 What the exclusion samples looked like

The `Rastreada: actualmente sin indexar` examples were mostly parameterized URLs such as:

- `?pr_prod_strat=...`
- `?pr_rec_id=...`
- `?pr_rec_pid=...`
- `?pr_ref_pid=...`
- `?pr_seq=uniform`
- `?variant=...&country=CL&currency=CLP`

This strongly suggests crawl waste from Shopify-style or recommendation-driven query URLs, not necessarily missing canonical content pages.

The `Error de redirección` examples included:

- `https://ideamadera.cl/`
- `http://ideamadera.cl/`
- `https://ideamadera.cl/products/silla-kentucky`
- other non-`www` product URLs

Manual checks performed:

- `https://ideamadera.cl/` -> resolves to `https://www.ideamadera.cl/` with `1` redirect
- `https://ideamadera.cl/products/silla-kentucky` -> resolves to `https://www.ideamadera.cl/products/silla-kentucky` with `1` redirect
- `http://ideamadera.cl/products/silla-kentucky` -> resolves to `https://www.ideamadera.cl/products/silla-kentucky` with `2` redirects

Implication:

- there is canonical host normalization already happening
- but Google is still discovering and tracking non-final URLs
- we should reduce self-emission of non-canonical absolute URLs and make final-host signaling more explicit

## 3. Repo Facts Relevant to SEO

### 3.1 Canonical site URL constants

Current files:

- `src/lib/whatsapp.ts:4` -> `DEFAULT_SITE_URL = "https://www.ideamadera.cl"`
- `src/lib/seo.ts:4` -> `SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/$/, "")`
- `src/app/layout.tsx:29` -> `metadataBase` falls back to `https://www.ideamadera.cl`

This is good in principle.

### 3.2 Product page absolute URL risk

Critical code:

- `src/app/products/[handle]/page.tsx:217-226`
- `src/app/products/[handle]/page.tsx:302-312`

`getRequestOrigin()` falls back to the request host when `NEXT_PUBLIC_SITE_URL` is missing:

- it reads `x-forwarded-host` or `host`
- it builds `origin` from those headers
- `canonicalUrl` and absolute image/schema URLs are then built from that host

Risk:

- if production runtime does not expose `NEXT_PUBLIC_SITE_URL`
- and Google or external traffic hits `ideamadera.cl` without `www`
- product structured data and some absolute URLs may be emitted with the non-canonical host

This is the highest-confidence code-level SEO issue found in the repo.

### 3.3 Sitemap and robots are centralized and easy to harden

Current files:

- `src/app/robots.ts:4-15`
- `src/app/sitemap.ts:10-57`

Both already use `SITE_URL`, which is good, but they still depend on environment correctness.

### 3.4 Redirect inventory exists, but host-level redirect is not in repo

Current file:

- `next.config.ts:12-139`

This file contains path redirects for legacy Shopify routes, but not host-based canonicalization. Host canonicalization is likely happening at platform/domain level, not in repo.

### 3.5 Current metadata and schema surfaces

Relevant files:

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/collections/[handle]/page.tsx`
- `src/app/products/[handle]/page.tsx`
- `src/lib/service-landings.ts`
- `src/lib/seo.ts`
- `src/lib/product-seo.ts`
- `src/lib/collection-seo.ts`

The site already has:

- canonical tags
- Open Graph/Twitter metadata
- Organization/WebSite schema
- FAQ schema on home and service landings
- product schema and reviews
- collection item list schema
- sitemap
- robots

So this is not a “missing SEO basics” project. This is a “tighten canonicalization + improve SERP match” project.

## 4. Non-Negotiable Execution Rules For The Other AI

1. Do not start with broad copy rewrites. Fix canonical host consistency first.
2. Do not remove existing structured data unless it is objectively invalid.
3. Do not change public slugs unless there is a confirmed SEO reason and a redirect plan.
4. Do not block parameterized URLs in `robots.txt` until you verify they are not needed for canonical consolidation.
5. Do not add `noindex` to product, collection, landing, or home pages that are intended to rank.
6. Do not rely on the request host for any SEO-facing absolute URL if a canonical site URL constant is available.
7. After each workstream, run validation commands before moving on.
8. If a task requires Vercel dashboard/domain configuration and cannot be done in code, document the exact platform step instead of guessing.

## 5. Priority Order

### P0. Canonical host normalization and absolute URL consistency

Why first:

- it affects every product page
- it is directly connected to the `www` vs non-`www` noise seen in Search Console
- it reduces canonical ambiguity before any content work

### P1. Stop self-generated crawl waste and verify query-URL behavior

Why second:

- GSC is spending a lot of report space on parameterized URLs
- even if those URLs are external/legacy, the codebase must not emit them

### P2. Improve CTR on URLs already getting impressions

Why third:

- there is visible upside with low implementation risk
- `mesa-tripode-ratona`, `mesa-nordica`, homepage, and `todos-los-productos` already have impressions

### P3. Clean up lower-priority indexing buckets

Why fourth:

- 404s, redirect chains, and soft-404s matter
- but they are less important than canonical host consistency and CTR wins

### P4. Monitoring loop and Search Console validation

Why fifth:

- some index signals will take days or weeks to settle
- success must be measured, not assumed

## 6. Workstream P0: Canonical Host Normalization

### 6.1 Objective

Make every SEO-significant URL emitted by the app use `https://www.ideamadera.cl` regardless of request host.

### 6.2 Files to inspect and likely edit

- `src/app/products/[handle]/page.tsx`
- `src/lib/seo.ts`
- `src/lib/whatsapp.ts`
- `src/app/layout.tsx`
- possibly `middleware.ts` if repo-level host enforcement is needed
- possibly platform config outside repo if Vercel/domain redirects must be enforced there

### 6.3 Exact problem to solve

Current risk:

- metadata canonical paths are relative and generally fine
- but product page runtime absolute URLs are built from `origin`, and `origin` may come from request headers

This affects at least:

- product schema `url`
- absolute image URLs
- any absolute URL built from `origin`
- WhatsApp message links if they embed the product URL

### 6.4 Implementation plan

1. Replace SEO-sensitive runtime origin building on product pages.
   - Preferred outcome: SEO-facing URLs use `SITE_URL` or a single canonical-origin helper.
   - Do not keep host-header fallback for schema/canonical purposes.

2. Introduce a canonical-origin helper if needed.
   - Example responsibility: always return `SITE_URL`.
   - Good location: `src/lib/seo.ts` or a small dedicated helper.

3. Update product page usage.
   - `src/app/products/[handle]/page.tsx:302-312`
   - build `canonicalUrl` from canonical origin, not request origin
   - build absolute product image URLs from canonical origin, not request origin

4. Review whether WhatsApp deep links should also use canonical origin.
   - If the message includes product links, prefer final canonical host.

5. Confirm `metadataBase` remains canonical.
   - `src/app/layout.tsx:29`
   - keep `https://www.ideamadera.cl`

6. Decide how to enforce host redirect at request level.
   - Preferred: platform/domain redirect if accessible
   - Repo fallback: add `middleware.ts` to redirect non-`www` requests to `www`

### 6.5 Preferred implementation choices

Preferred choice A:

- keep canonical source of truth in `src/lib/seo.ts`
- expose a reusable helper like `CANONICAL_ORIGIN` or `getCanonicalOrigin()`
- use it everywhere SEO/signaling matters

Preferred choice B:

- if platform access exists, configure domain canonicalization in Vercel so `ideamadera.cl/*` always resolves to `https://www.ideamadera.cl/*`

### 6.6 Validation commands

Run after code changes:

```bash
npm run lint
npm run build
curl -I https://ideamadera.cl/
curl -I https://ideamadera.cl/products/silla-kentucky
curl -I http://ideamadera.cl/products/silla-kentucky
curl -sL --compressed https://www.ideamadera.cl/products/silla-kentucky | rg -n 'canonical|ideamadera\\.cl/products/silla-kentucky|www\\.ideamadera\\.cl/products/silla-kentucky'
```

### 6.7 Done criteria

- no SEO-facing absolute URL depends on `host` or `x-forwarded-host`
- product schema URLs use canonical `www` host
- rendered canonical tags resolve to `https://www.ideamadera.cl/...`
- non-`www` requests redirect to `www`
- `npm run lint` passes
- `npm run build` passes

### 6.8 If blocked

If you cannot enforce host redirects from code because platform rules are required, document the exact platform instruction:

- add primary domain `www.ideamadera.cl`
- redirect apex domain `ideamadera.cl` to `www.ideamadera.cl`
- ensure HTTPS is forced

Do not fake this in code if the platform already handles it and would create duplicate chains.

## 7. Workstream P1: Parameterized URL Containment and Crawl-Waste Audit

### 7.1 Objective

Ensure the current app does not generate crawl-waste URLs with Shopify parameters, variants, or tracking query strings.

### 7.2 What is already known

Search in repo found no direct occurrences of:

- `pr_prod_strat`
- `pr_rec_id`
- `pr_rec_pid`
- `pr_ref_pid`
- `pr_seq`
- `country=CL`
- `currency=CLP`
- `variant=`

That means the noisy URLs visible in GSC are likely coming from:

- historical Shopify links
- external backlinks
- recommendation widgets outside the current codebase
- crawled query variations Google discovered on its own

### 7.3 Files to inspect

- `src/app/products/[handle]/page.tsx`
- `src/app/collections/[handle]/page.tsx`
- `src/app/page.tsx`
- components that render product links such as product cards or related products
- any analytics/tracking scripts in `src/app/layout.tsx` or client components

### 7.4 Implementation tasks

1. Search the codebase again for any product link generation using concatenated query strings.
2. Inspect product cards, related products, and homepage catalog links.
3. Confirm all internal links use clean paths from helpers like `getProductPath(product)`.
4. Confirm sitemap only emits clean URLs.
   - Current sitemap is already clean in `src/app/sitemap.ts:50-55`.
5. Do not add query-string disallows to robots until you confirm it is necessary.
6. If query-bearing URLs are emitted by a current component, remove the query params at the source.
7. If query-bearing URLs are only external/historical, document them as “monitor, do not overreact”.

### 7.5 Validation commands

```bash
rg -n 'pr_prod_strat|pr_rec_id|pr_rec_pid|pr_ref_pid|pr_seq|variant=|country=CL|currency=CLP' src public
npm run lint
npm run build
curl -sL --compressed https://www.ideamadera.cl/sitemap.xml | head -n 40
```

### 7.6 Done criteria

- no current internal link generation appends these query parameters
- sitemap remains clean
- any remaining parameter URLs are classified as external/legacy noise rather than active app bugs

## 8. Workstream P2: Improve CTR On Pages Already Getting Impressions

### 8.1 Objective

Increase clicks from existing impressions before trying to scale index count broadly.

### 8.2 High-priority URLs

Start with these, in this order:

1. homepage: `https://www.ideamadera.cl/`
2. `https://www.ideamadera.cl/products/mesa-tripode-ratona`
3. `https://www.ideamadera.cl/products/mesa-nordica`
4. `https://www.ideamadera.cl/products/mesa-centro-roma`
5. `https://www.ideamadera.cl/collections/todos-los-productos`
6. `https://www.ideamadera.cl/peldanos-a-medida`

### 8.3 Why these pages

- they already have impressions
- some have zero clicks, which means copy/intent alignment can move faster than index expansion
- they match queries visible in GSC today

### 8.4 Files to edit

- homepage metadata and content:
  - `src/app/page.tsx`
  - homepage component under `src/app/components/HomePage` if needed
- product SEO templates:
  - `src/lib/product-seo.ts:83-164`
- specific product content records:
  - `src/data/products.ts:69-87` for `mesa-nordica`
  - `src/data/products.ts:108-125` for `silla-kentucky`
  - `src/data/products.ts:372-389` for `banca-capri`
  - `src/data/products.ts:432-449` for `mesa-centro-roma`
  - `src/data/products.ts:532-549` for `mesa-tripode-ratona`
- collection metadata:
  - `src/lib/collection-seo.ts:9-84`
- landing metadata/content:
  - `src/lib/service-landings.ts:53-85` and the relevant landing config blocks

### 8.5 Execution rules for copy changes

1. Keep titles natural. Do not keyword-stuff.
2. Prefer exact commercial query alignment where GSC already shows impressions.
3. Keep title tags roughly within `50-60` visible characters when possible.
4. Keep descriptions near `150-160` characters when possible.
5. Match page intent exactly:
   - homepage -> broad brand + category intent
   - product pages -> exact product type + use case
   - collection pages -> category intent
   - service landings -> high-intent service query

### 8.6 Specific copy opportunities

#### Homepage

Target query clusters:

- `muebles de madera`
- `muebles de madera en chillán`
- `muebles chillan`
- brand + generic commercial intent

Actions:

- keep the homepage focused on “muebles de madera en Chile”
- if the business truly serves or is based in Chillán, add one clear, non-spammy sentence or heading reference in visible content
- avoid forcing local terms if they are not operationally true

#### Mesa Trípode Ratona

Target query clusters:

- `mesa ratona`
- `mesa ratona de madera`
- related living room table intent

Actions:

- make sure the title and shortPitch explicitly reinforce `mesa ratona de madera`
- ensure on-page copy uses both `mesa ratona` and `mesa de centro` naturally
- add one short FAQ or descriptive block if needed, but do not bloat the page

#### Mesa Nórdica

Target query clusters:

- `mesa nordica`
- `mesa de madera`

Actions:

- confirm title begins with the product name and strong noun phrase
- make sure description mentions dining/comedor intent if that is the primary use case

#### Mesa Centro Roma

Target query clusters:

- `mesa de centro`
- possibly `mesa ratona` if semantically appropriate

Actions:

- adjust metadata/copy to better signal living-room coffee-table intent

#### Todos los productos collection

Target query clusters:

- `muebles de madera`
- broader catalog intent

Actions:

- strengthen title and description in `src/lib/collection-seo.ts`
- keep the page positioned as the main catalog hub

#### Peldaños a medida

Target query clusters:

- `peldaños a medida`
- `escalones de madera a medida`

Actions:

- this page already has some demand
- preserve the current topical focus
- only refine titles/descriptions if there is a clear CTR mismatch

### 8.7 Validation commands

```bash
npm run lint
npm run build
curl -sL --compressed https://www.ideamadera.cl/ | rg -n '<title>|name=\"description\"|canonical'
curl -sL --compressed https://www.ideamadera.cl/products/mesa-tripode-ratona | rg -n '<title>|name=\"description\"|canonical'
curl -sL --compressed https://www.ideamadera.cl/products/mesa-nordica | rg -n '<title>|name=\"description\"|canonical'
```

### 8.8 Done criteria

- priority pages have tighter query-to-title alignment
- descriptions are clearer and more compelling
- no title duplication is introduced
- build and lint pass

## 9. Workstream P3: Lower-Priority Index Cleanup

### 9.1 Objective

Reduce unnecessary crawl/index noise without destabilizing ranking pages.

### 9.2 Buckets to address, in order

1. `Error de redirección`
2. `No se ha encontrado (404)`
3. `Página con redirección`
4. `Soft 404`
5. `Bloqueada por robots.txt`

### 9.3 Redirect bucket process

Files:

- `next.config.ts`
- possibly new `middleware.ts`

Actions:

1. Export or manually inspect examples from GSC.
2. Group them into:
   - host normalization issues
   - legacy Shopify paths
   - deleted product/category URLs
   - malformed or parameterized URLs
3. Fix only the ones that represent real user/discovery paths.
4. Avoid creating large redirect maps for garbage query URLs unless they are common and valuable.

### 9.4 404 bucket process

Actions:

1. Determine whether 404s are:
   - expected removed content
   - mistyped internal links
   - legacy Shopify URLs without redirects
2. If a 404 has a close replacement page, add a redirect.
3. If a 404 is truly dead and unimportant, leave it as 404.
4. Search for broken internal references before adding redirects.

### 9.5 Soft 404 bucket process

Actions:

1. Check whether affected pages are thin, empty, or redirect-like.
2. If a page should rank, enrich content and make intent clearer.
3. If a page should not exist, 404 it cleanly or redirect it.

### 9.6 Robots bucket process

Current robots file:

- `src/app/robots.ts:4-15`

Actions:

1. Confirm which 4 blocked URLs are affected.
2. Only change robots rules if important pages are accidentally blocked.
3. Do not loosen robots broadly without evidence.

### 9.7 Done criteria

- only meaningful redirect/404 problems are fixed
- no unnecessary redirect maze is introduced
- internal broken links are reduced

## 10. Workstream P4: Search Console Monitoring and Validation Loop

### 10.1 Immediate post-deploy checks

After deployment:

1. check live canonical tags on homepage, product pages, collection pages, service landings
2. check live structured data URLs
3. check live `robots.txt`
4. check live `sitemap.xml`

### 10.2 Search Console actions

After the deploy is verified:

1. inspect the homepage URL
2. inspect at least one product URL such as `/products/silla-kentucky`
3. inspect `/products/mesa-tripode-ratona`
4. inspect `/collections/todos-los-productos`
5. request indexing only for materially improved URLs
6. use “Validate fix” only for GSC issue buckets that were actually addressed

### 10.3 Expected timeline

- canonical and redirect signals: a few days to a few weeks
- indexing bucket movement: often slow, sometimes several weeks
- CTR changes on existing queries: can appear faster if snippets change quickly

### 10.4 Success metrics for the next review

Re-check after `2-4 weeks`:

- `Error de redirección` bucket should trend down
- non-`www` examples should reduce
- `7 días` CTR should improve above current `2.0%`
- `mesa-tripode-ratona` and `mesa-nordica` should ideally convert impressions into clicks
- homepage should maintain or improve its click share

## 11. Detailed Execution Checklist

Use this as the working order.

### Phase A: Baseline and safety

- [ ] create a working branch
- [ ] run `npm run lint`
- [ ] run `npm run build`
- [ ] confirm current working tree state

### Phase B: Canonical host fix

- [ ] inspect `src/app/products/[handle]/page.tsx`
- [ ] remove SEO dependence on request host for absolute URLs
- [ ] introduce canonical-origin helper if needed
- [ ] decide whether `middleware.ts` is necessary
- [ ] validate live host behavior with `curl`

### Phase C: Parameter URL containment

- [ ] re-search repo for Shopify-style query params
- [ ] inspect product/related-product link generation
- [ ] confirm sitemap emits only clean URLs
- [ ] document whether remaining query URLs are external/legacy

### Phase D: CTR improvements

- [ ] tighten homepage SEO copy
- [ ] tighten `mesa-tripode-ratona` metadata and copy
- [ ] tighten `mesa-nordica` metadata and copy
- [ ] tighten `mesa-centro-roma` metadata and copy
- [ ] review `todos-los-productos` collection metadata
- [ ] keep `peldaños a medida` aligned with current high-intent terms

### Phase E: Lower-priority cleanup

- [ ] classify redirect issues
- [ ] classify 404 issues
- [ ] fix only meaningful internal/legacy issues
- [ ] avoid over-building redirects for garbage URLs

### Phase F: Deploy and verify

- [ ] deploy
- [ ] validate canonical tags live
- [ ] validate structured data live
- [ ] validate robots and sitemap live
- [ ] inspect priority URLs in Search Console

## 12. Command Pack For The Executing AI

### Local codebase inspection

```bash
rg -n 'x-forwarded-host|x-forwarded-proto|headers\\(|NEXT_PUBLIC_SITE_URL|DEFAULT_SITE_URL|SITE_URL' src
rg -n 'pr_prod_strat|pr_rec_id|pr_rec_pid|pr_ref_pid|pr_seq|variant=|country=CL|currency=CLP' src public
rg -n 'canonical|metadataBase|robots|sitemap|openGraph|twitter' src/app src/lib
```

### Validation

```bash
npm run lint
npm run build
curl -I https://ideamadera.cl/
curl -I https://ideamadera.cl/products/silla-kentucky
curl -I http://ideamadera.cl/products/silla-kentucky
curl -sL --compressed https://www.ideamadera.cl/robots.txt
curl -sL --compressed https://www.ideamadera.cl/sitemap.xml | head -n 50
```

### Rendered HTML spot checks

```bash
curl -sL --compressed https://www.ideamadera.cl/ | rg -n '<title>|description|canonical'
curl -sL --compressed https://www.ideamadera.cl/products/mesa-tripode-ratona | rg -n '<title>|description|canonical|application/ld\\+json'
curl -sL --compressed https://www.ideamadera.cl/products/mesa-nordica | rg -n '<title>|description|canonical|application/ld\\+json'
curl -sL --compressed https://www.ideamadera.cl/collections/todos-los-productos | rg -n '<title>|description|canonical'
```

## 13. What Not To Waste Time On First

Do not start here:

- building new blog/content sections
- adding programmatic SEO pages
- rewriting all product descriptions site-wide
- changing category architecture
- adding speculative `llms.txt`
- large schema rewrites without evidence of errors

These are not the highest-leverage moves right now.

## 14. Expected Deliverables From The Other AI

At minimum, the other AI should deliver:

1. code changes that remove non-canonical host leakage
2. proof that product structured data now uses canonical `www` URLs
3. confirmation that the app is not generating Shopify-style noisy query URLs
4. targeted metadata/copy improvements for the high-impression pages
5. a short post-change verification note with:
   - files changed
   - commands run
   - anything that still requires manual Vercel/Search Console action

## 15. Final Recommendation

If only one thing gets done, do this first:

- make every SEO-facing absolute URL come from the canonical site constant, not the request host

If two things get done, add this second:

- improve the snippet match for `mesa-tripode-ratona`, `mesa-nordica`, homepage, and `todos-los-productos`

That combination is the best balance of technical cleanup and near-term search upside.
