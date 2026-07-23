# SEO · comandos

```bash
# GSC — auth OAuth readonly (si invalid_grant)
npm run gsc:auth

# GSC — resumen en terminal (clicks, impressions, CTR, queries, pages)
npm run gsc:report

# GSC → Markdown en docs/gsc-informe-YYYY-MM-DD.md
npm run gsc:report:md

# GSC — enviar sitemap www + borrar legacy sin www (scope escritura)
npm run gsc:sitemap:auth   # solo si write token expiró
npm run gsc:sitemap

# QA
npm run build
npm run lint
```

## Env requerido (`.env.local`, no commitear)

```env
GSC_AUTH_MODE=oauth
GOOGLE_OAUTH_CLIENT_PATH=.secrets/gcp-oauth-client.json
GSC_SITE_URL=sc-domain:ideamadera.cl
GSC_BRAND_TERMS=idea madera,ideamadera
```

`.secrets/` suele ser symlink a gonzalopedrosa (mismo Gmail owner). No commitear.

## Archivos clave

| Qué | Dónde |
|---|---|
| Sitemap | `src/app/sitemap.ts` |
| robots | `src/app/robots.ts` |
| Redirects | `next.config.ts` |
| Middleware (page=1, params Shopify) | `src/middleware.ts` |
| SEO productos | `src/lib/product-seo.ts` + `seoTitle`/`seoDescription` en `src/data/products.ts` |
| SEO colecciones | `src/lib/collection-seo.ts` |
| Landings servicio | `src/lib/service-landings.ts` |
| Constantes SITE_URL | `src/lib/seo.ts` |
| Scripts GSC | `scripts/gsc-report.mjs`, `gsc-report-md.mjs`, `gsc-submit-sitemap.mjs` |
