# Conectar Google Search Console — Idea Madera

Guía de OAuth GSC para **ideamadera.cl**.

**Para agentes (corto):** ver `self-learn/seo/COMMANDS.md` + `self-learn/seo/RULES.md`. Este doc es el detalle de setup.

**Importante:** no copies tokens reales de `.env.local` a chats ni commits. Usa solo nombres de variables y placeholders.

---

## Resumen para la IA (copiar este bloque)

```text
Contexto: En el repo gonzalopedrosa ya hay integración con Google Search Console vía OAuth (no service account). Quiero la misma conexión en el proyecto de Idea Madera (propiedad GSC: sc-domain:ideamadera.cl).

Cómo funciona hoy:
1. Cliente OAuth de escritorio en Google Cloud → JSON en `.secrets/gcp-oauth-client.json`
2. Variables en `.env.local`: GSC_AUTH_MODE=oauth, GOOGLE_OAUTH_CLIENT_PATH, GSC_SITE_URL
3. `npm run gsc:auth` abre el navegador, el Gmail dueño de GSC autoriza scope webmasters.readonly, y guarda el token en `.secrets/gsc-oauth-token.json`
4. `npm run gsc:report` (o `scripts/gsc-report-md.mjs`) llama a Search Console API con ese token
5. El refresh token puede expirar (~7 días en clientes testing); si falla con invalid_grant, re-ejecutar gsc:auth

Para Idea Madera:
- Cambiar solo GSC_SITE_URL=sc-domain:ideamadera.cl (si GSC lista otra URL exacta, usar esa)
- Reutilizar el mismo OAuth client + el mismo Gmail si ese Gmail ya es owner de sc-domain:ideamadera.cl (confirmado: en listados previos aparece como siteOwner)
- No hace falta Meta Pixel, OpenAI, GTM ni Google Ads para GSC
- Dependencia: googleapis
- Scripts: gsc:auth, gsc:report; opcional informe MD con gsc-report-md.mjs
- Nunca commitear `.secrets/` ni `.env.local`

Objetivo: dejar Idea Madera autenticado y capaz de sacar un reporte GSC (clics, impresiones, CTR, queries, pages) igual que gonzalopedrosa.
```

---

## Arquitectura (cómo nos conectamos)

```
Gmail (owner en Search Console)
        │
        ▼
OAuth Desktop Client (Google Cloud)
  .secrets/gcp-oauth-client.json
        │
        ▼  npm run gsc:auth
Token con refresh
  .secrets/gsc-oauth-token.json
        │
        ▼  npm run gsc:report
Search Console API
  propiedad = GSC_SITE_URL (sc-domain:…)
```

Modo recomendado: **OAuth**. La cuenta de servicio a menudo no se puede añadir como usuario en GSC y falla con “insufficient permission”.

---

## Paso a paso (setup desde cero o portar a Idea Madera)

### 1. Google Cloud

1. Proyecto GCP (puede ser el mismo que gonzalopedrosa).
2. Activar **Google Search Console API**.
3. Credenciales → **ID de cliente OAuth** → tipo **Aplicación de escritorio**.
4. Descargar el JSON → guardarlo como `.secrets/gcp-oauth-client.json`.
5. Asegurar que `.secrets/` esté en `.gitignore`.

### 2. Search Console

1. Entrar a [Google Search Console](https://search.google.com/search-console) con el Gmail dueño.
2. Confirmar la propiedad **dominio** `ideamadera.cl` (o la URL exacta que muestre GSC).
3. Ese mismo Gmail es el que debe autorizar el flujo OAuth local.

### 3. Variables de entorno (solo GSC)

En `.env.local` del repo Idea Madera:

```env
# Google Search Console (OAuth con el Gmail que administra Search Console)
GSC_AUTH_MODE=oauth
GOOGLE_OAUTH_CLIENT_PATH=.secrets/gcp-oauth-client.json
GSC_SITE_URL=sc-domain:ideamadera.cl

# Opcionales
# GSC_OAUTH_TOKEN_PATH=.secrets/gsc-oauth-token.json
# GSC_OAUTH_PORT=53682
# GSC_DASHBOARD_DAYS=28
# GSC_REPORT_DAYS=28
# GSC_BRAND_TERMS=ideamadera
```

#### Qué NO hace falta para GSC

Estas variables pueden existir en gonzalopedrosa pero **no** se usan para Search Console:

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` | Meta Pixel |
| `FACEBOOK_ACCESS_TOKEN` | Meta API |
| `META_TEST_EVENT_CODE` | Meta test |
| `OPENAI_API_KEY` | OpenAI |
| `NEXT_PUBLIC_GTM_ID` | GTM |
| `GOOGLE_ADS_*` | Google Ads API |

### 4. Dependencia y scripts (`package.json`)

```json
{
  "dependencies": {
    "googleapis": "^171.4.0"
  },
  "scripts": {
    "gsc:auth": "node --env-file=.env.local scripts/gsc-report.mjs --auth",
    "gsc:report": "node --env-file=.env.local scripts/gsc-report.mjs"
  }
}
```

Opcional informe Markdown:

```json
"gsc:report:md": "node --env-file=.env.local scripts/gsc-report-md.mjs"
```

### 5. Archivos de referencia a copiar desde gonzalopedrosa

Mínimo para CLI:

- `scripts/gsc-report.mjs`
- (opcional) `scripts/gsc-report-md.mjs`
- (opcional panel web) `src/lib/gsc.ts`, `src/lib/gsc-analysis.ts`, `src/app/interno/gsc/*`

### 6. Autorizar

```bash
# Opción rápida si Idea Madera corre en la misma máquina y mismo Gmail:
# ln -sf /Users/gonzalo/gonzalopedrosa/.secrets .secrets

npm run gsc:auth
```

1. Se abre el navegador.
2. Login con el Gmail owner de `sc-domain:ideamadera.cl`.
3. Aceptar scope `https://www.googleapis.com/auth/webmasters.readonly`.
4. Token guardado en `.secrets/gsc-oauth-token.json`.

### 7. Probar

```bash
npm run gsc:report
```

Debe listar la propiedad y métricas. Si `GSC_SITE_URL` no coincide con lo que devuelve la API, actualizar `.env.local` con la URL exacta (ej. `sc-domain:ideamadera.cl` o `https://www.ideamadera.cl/`).

### 8. Escritura (solo si hay que borrar sitemaps falsos)

Scope distinto (`webmasters`, no solo readonly):

```bash
npm run gsc:cleanup:auth
npm run gsc:cleanup:sitemaps
```

Token separado: `.secrets/gsc-oauth-write-token.json`.

---

## Errores frecuentes

| Error | Qué hacer |
| --- | --- |
| `invalid_grant` | Refresh expirado → `npm run gsc:auth` de nuevo |
| `insufficient permission` | Mal `GSC_SITE_URL`, o Gmail sin acceso a esa propiedad; o service_account sin permiso |
| Falta token OAuth | Ejecutar `gsc:auth` |
| Puerto OAuth ocupado | Cambiar `GSC_OAUTH_PORT` (default `53682`) |

---

## Checklist Idea Madera

- [ ] Search Console API habilitada en GCP
- [ ] `.secrets/gcp-oauth-client.json` presente
- [ ] `.env.local` con `GSC_AUTH_MODE`, `GOOGLE_OAUTH_CLIENT_PATH`, `GSC_SITE_URL=sc-domain:ideamadera.cl`
- [ ] `googleapis` en dependencies
- [ ] Scripts `gsc:auth` / `gsc:report`
- [ ] `npm run gsc:auth` con el Gmail correcto
- [ ] `npm run gsc:report` OK
- [ ] `.secrets/` y `.env.local` fuera de git

---

## Prompt corto para pegar en el repo Idea Madera

```markdown
Integra Google Search Console como en gonzalopedrosa.

- Auth: OAuth desktop (NO service account por defecto)
- Propiedad: GSC_SITE_URL=sc-domain:ideamadera.cl
- Reutiliza o copia `.secrets/gcp-oauth-client.json` y, si el mismo Gmail es owner, el token tras `gsc:auth`
- Scripts: gsc:auth, gsc:report (ver docs/gsc-conexion-ideamadera.md del repo referencia)
- Dependencia: googleapis
- No commitear .secrets ni .env.local
- Objetivo: poder correr un reporte de performance (clicks, impressions, CTR, queries, pages)
```
