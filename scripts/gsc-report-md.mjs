#!/usr/bin/env node

// Informe completo de Search Console en Markdown.
//
// Uso:
//   node scripts/gsc-report-md.mjs [ruta-salida.md] [--start=YYYY-MM-DD --end=YYYY-MM-DD]
//
// Sin flags, la ventana es de GSC_DASHBOARD_DAYS dias inclusivos (default 28)
// terminando hoy en zona America/Los_Angeles (la fecha de calendario de GSC).
// Con --start y --end se usan esas fechas exactas, con prioridad sobre
// GSC_DASHBOARD_DAYS; el periodo anterior comparado tiene el mismo largo.
// Ademas del Markdown, exporta los datos crudos en
// docs/gsc-informe-data-YYYY-MM-DD.json (misma fecha del informe).

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { google } from "googleapis";
import {
  formatDate,
  previousWindow,
  resolveReportWindow,
  todayInPacific,
} from "./lib/gsc-dates.mjs";

const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];
const SITE_URL = process.env.GSC_SITE_URL ?? "sc-domain:ideamadera.cl";
const DAYS = Number(process.env.GSC_DASHBOARD_DAYS ?? 28);
const KEYED_MAX_ROWS = Number(process.env.GSC_ANALYTICS_KEYED_MAX_ROWS ?? 2500);
const LOW_CTR_PAGES_MAX_ROWS = Number(process.env.GSC_LOW_CTR_PAGES_MAX_ROWS ?? 15000);
const TRENDING_ROWS = Number(process.env.GSC_TRENDING_ROWS ?? 25);
const BRAND_TERMS = process.env.GSC_BRAND_TERMS?.trim() || "idea madera,ideamadera";
const SKIP_URL_INSPECTION = process.env.GSC_SKIP_URL_INSPECTION === "1";
const AUTH_MODE = process.env.GSC_AUTH_MODE ?? "oauth";
const API_TIMEOUT_MS = Number(process.env.GSC_API_TIMEOUT_MS ?? 15000);
const OPTIONAL_TIMEOUT_MS = Number(process.env.GSC_OPTIONAL_TIMEOUT_MS ?? 8000);

const OAUTH_CLIENT_PATH = resolve(
  process.cwd(),
  process.env.GOOGLE_OAUTH_CLIENT_PATH ?? ".secrets/gcp-oauth-client.json",
);
const OAUTH_TOKEN_PATH = resolve(
  process.cwd(),
  process.env.GSC_OAUTH_TOKEN_PATH ?? ".secrets/gsc-oauth-token.json",
);

const REPORT_DATE = formatDate(todayInPacific());
const positionalArgs = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));
const OUTPUT_PATH = resolve(
  process.cwd(),
  positionalArgs[0] ?? `docs/gsc-informe-${REPORT_DATE}.md`,
);

const PRIORITY_ORDER = { alta: 0, media: 1, baja: 2 };

// Registro de las consultas hechas a la API (dimensiones, limites, filas y
// errores) para el JSON de datos crudos.
const requestLog = [];

function withTimeout(promise, timeoutMs, label) {
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    return promise;
  }

  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`${label} excedio ${timeoutMs}ms.`)), timeoutMs);
    }),
  ]);
}

async function bestEffort(promise, fallback, timeoutMs, label) {
  try {
    return await withTimeout(promise, timeoutMs, label);
  } catch (error) {
    const message = error?.response?.data?.error?.message ?? error.message ?? String(error);
    requestLog.push({ endpoint: label, rows: null, error: message });
    return fallback;
  }
}

function loadJsonFile(filePath, hint) {
  if (!existsSync(filePath)) {
    throw new Error(`${hint}: no existe ${filePath}`);
  }
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function getOAuthAuth() {
  const raw = loadJsonFile(
    OAUTH_CLIENT_PATH,
    "Falta el cliente OAuth. Ejecuta npm run gsc:auth despues de configurar .secrets/gcp-oauth-client.json",
  );
  const config = raw.installed ?? raw.web ?? raw;
  if (!config.client_id || !config.client_secret) {
    throw new Error("Cliente OAuth invalido: falta client_id o client_secret.");
  }
  if (!existsSync(OAUTH_TOKEN_PATH)) {
    throw new Error("No hay token OAuth. Ejecuta npm run gsc:auth.");
  }

  const oauth2Client = new google.auth.OAuth2(config.client_id, config.client_secret);
  oauth2Client.setCredentials(loadJsonFile(OAUTH_TOKEN_PATH, "Falta el token OAuth"));
  oauth2Client.on("tokens", (tokens) => {
    const current = loadJsonFile(OAUTH_TOKEN_PATH, "No se pudo leer token actual");
    writeFileSync(OAUTH_TOKEN_PATH, JSON.stringify({ ...current, ...tokens }, null, 2), "utf8");
  });
  return oauth2Client;
}

function getServiceAccountAuth() {
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!credentialsPath) {
    throw new Error("Falta GOOGLE_APPLICATION_CREDENTIALS.");
  }
  const absolutePath = resolve(process.cwd(), credentialsPath);
  if (!existsSync(absolutePath)) {
    throw new Error(`No existe ${absolutePath}.`);
  }
  process.env.GOOGLE_APPLICATION_CREDENTIALS = absolutePath;
  return new google.auth.GoogleAuth({ scopes: SCOPES });
}

function getSearchConsoleClient() {
  const auth = AUTH_MODE === "service_account" ? getServiceAccountAuth() : getOAuthAuth();
  return google.searchconsole({ version: "v1", auth });
}

function mapRows(rows) {
  return (rows ?? []).map((row) => ({
    keys: row.keys ?? [],
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 0,
  }));
}

function aggregate(rows) {
  if (rows.length === 0) {
    return { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  }

  const clicks = rows.reduce((sum, row) => sum + row.clicks, 0);
  const impressions = rows.reduce((sum, row) => sum + row.impressions, 0);
  const ctr = impressions > 0 ? clicks / impressions : 0;
  const position =
    rows.reduce((sum, row) => sum + row.position * row.impressions, 0) / (impressions || 1);

  return { clicks, impressions, ctr, position };
}

async function queryAnalytics(client, siteUrl, startDate, endDate, dimensions, rowLimit = 25) {
  const label = `searchanalytics.query(${dimensions.join(",") || "summary"})`;
  try {
    const response = await withTimeout(
      client.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate,
          endDate,
          dimensions,
          rowLimit,
          type: "web",
          dataState: "final",
        },
      }),
      API_TIMEOUT_MS,
      label,
    );
    const rows = mapRows(response.data.rows);
    requestLog.push({ endpoint: label, startDate, endDate, dimensions, rowLimit, rows: rows.length });
    return rows;
  } catch (error) {
    const message = error?.response?.data?.error?.message ?? error.message ?? String(error);
    requestLog.push({ endpoint: label, startDate, endDate, dimensions, rowLimit, rows: null, error: message });
    throw error;
  }
}

async function fetchSearchAnalyticsKeyedPaged(
  client,
  siteUrl,
  startDate,
  endDate,
  dimension,
  maxRows,
) {
  const out = [];
  let startRow = 0;
  const pageSize = Math.min(5000, Math.max(1, maxRows));

  while (out.length < maxRows) {
    const rowLimit = Math.min(pageSize, maxRows - out.length);
    const label = `searchanalytics.query(${dimension}) lote ${startRow}`;
    let batch;
    try {
      const response = await withTimeout(
        client.searchanalytics.query({
          siteUrl,
          requestBody: {
            startDate,
            endDate,
            dimensions: [dimension],
            rowLimit,
            startRow,
            type: "web",
            dataState: "final",
          },
        }),
        API_TIMEOUT_MS,
        label,
      );
      batch = mapRows(response.data.rows);
      requestLog.push({
        endpoint: label, startDate, endDate, dimensions: [dimension], rowLimit, startRow, rows: batch.length,
      });
    } catch (error) {
      const message = error?.response?.data?.error?.message ?? error.message ?? String(error);
      requestLog.push({
        endpoint: label, startDate, endDate, dimensions: [dimension], rowLimit, startRow, rows: null, error: message,
      });
      throw error;
    }
    out.push(...batch);
    if (batch.length < rowLimit || batch.length === 0) {
      break;
    }
    startRow += rowLimit;
  }

  return out;
}

function rowMapsByPrimaryKey(rows) {
  const map = new Map();
  for (const row of rows) {
    const key = row.keys[0]?.trim();
    if (key) {
      map.set(key, row);
    }
  }
  return map;
}

function computeTrendComparisons(current, previous, kind, limit) {
  const currentMap = rowMapsByPrimaryKey(current);
  const previousMap = rowMapsByPrimaryKey(previous);
  const keys = new Set([...currentMap.keys(), ...previousMap.keys()]);
  const zero = { keys: [], clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const items = [];

  for (const key of keys) {
    const c = currentMap.get(key) ?? zero;
    const p = previousMap.get(key) ?? zero;
    const deltaClicks = c.clicks - p.clicks;
    const deltaImpressions = c.impressions - p.impressions;
    const pass =
      kind === "up"
        ? deltaClicks >= 1 || (deltaClicks >= 0 && deltaImpressions >= 5)
        : deltaClicks <= -1 || (deltaClicks <= 0 && deltaImpressions <= -5);

    if (!pass) {
      continue;
    }

    items.push({
      key,
      currentClicks: c.clicks,
      previousClicks: p.clicks,
      currentImpressions: c.impressions,
      previousImpressions: p.impressions,
      deltaClicks,
      deltaImpressions,
      currentCtr: c.ctr,
      previousCtr: p.ctr,
      currentPosition: c.position,
      previousPosition: p.position,
    });
  }

  const sortMult = kind === "up" ? -1 : 1;
  items.sort((a, b) => {
    const clicksDiff = sortMult * (a.deltaClicks - b.deltaClicks);
    if (clicksDiff !== 0) {
      return clicksDiff;
    }
    return sortMult * (a.deltaImpressions - b.deltaImpressions);
  });

  return items.slice(0, limit);
}

function sortRowsByClicksDesc(rows) {
  return [...rows].sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions);
}

function expectedCtrForPosition(position) {
  const rounded = Math.round(position);
  if (rounded < 1 || rounded > 10) {
    return undefined;
  }
  if (rounded === 1) return 0.25;
  if (rounded === 2) return 0.15;
  if (rounded === 3) return 0.1;
  if (rounded <= 5) return 0.06;
  return 0.035;
}

function analyzeLowCtrPages(pages, minImpressions = 10) {
  const out = [];

  for (const row of pages) {
    const page = row.keys[0];
    if (!page || row.impressions < minImpressions) {
      continue;
    }

    const expectedCtr = expectedCtrForPosition(row.position);
    if (expectedCtr === undefined || row.ctr >= expectedCtr) {
      continue;
    }

    const gap = expectedCtr - row.ctr;
    out.push({
      page,
      impressions: row.impressions,
      clicks: row.clicks,
      position: row.position,
      actualCtr: row.ctr,
      expectedCtr,
      gap,
      upliftPotential: Math.max(0, row.impressions * gap),
    });
  }

  return out.sort((a, b) => b.upliftPotential - a.upliftPotential);
}

function resolveBrandTerms(siteUrl, csv) {
  const fromCsv =
    csv
      ?.split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean) ?? [];
  if (fromCsv.length > 0) {
    return Array.from(new Set(fromCsv));
  }

  let host = siteUrl.replace(/^sc-domain:/i, "").replace(/^https?:\/\//i, "");
  host = (host.split("/")[0] ?? host).replace(/^www\./i, "");
  const first = host.split(".")[0]?.toLowerCase() ?? "";
  const withoutTld = host.includes(".") ? host.replace(/\.[^.]+$/, "").toLowerCase() : "";
  return Array.from(new Set([first, withoutTld].filter(Boolean)));
}

function foldTotals(rows) {
  const clicks = rows.reduce((sum, row) => sum + row.clicks, 0);
  const impressions = rows.reduce((sum, row) => sum + row.impressions, 0);
  const ctr = impressions > 0 ? clicks / impressions : 0;
  const position =
    impressions > 0
      ? rows.reduce((sum, row) => sum + row.position * row.impressions, 0) / impressions
      : 0;
  return { clicks, impressions, ctr, position };
}

function detectBrandedQueries(queries, siteUrl, csv) {
  const terms = resolveBrandTerms(siteUrl, csv);
  const branded = [];
  const nonBranded = [];

  for (const row of queries) {
    const query = row.keys[0]?.toLowerCase() ?? "";
    const isBranded = terms.some((term) => term.length >= 3 && query.includes(term));
    if (isBranded) {
      branded.push(row);
    } else {
      nonBranded.push(row);
    }
  }

  return {
    branded: foldTotals(branded),
    nonBranded: foldTotals(nonBranded),
    queryRowCounts: {
      branded: branded.length,
      nonBranded: nonBranded.length,
    },
  };
}

function num(value) {
  if (value == null) return 0;
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function findHostVariantPageUrls(pages, siteUrl, limit = 12) {
  if (siteUrl.startsWith("sc-domain:")) {
    return [];
  }

  let wantWww;
  try {
    const normalized = siteUrl.match(/^https?:\/\//i) ? siteUrl : `https://${siteUrl}`;
    const url = new URL(normalized.endsWith("/") ? normalized : `${normalized}/`);
    wantWww = url.hostname.startsWith("www.");
  } catch {
    return [];
  }

  const out = [];
  for (const row of pages) {
    const page = row.keys[0];
    if (!page?.startsWith("http")) continue;
    try {
      const url = new URL(page);
      const hasWww = url.hostname.startsWith("www.");
      if (wantWww !== hasWww) {
        out.push(page);
      }
      if (out.length >= limit) {
        break;
      }
    } catch {
      continue;
    }
  }

  return out;
}

function detectObservedHosts(pages) {
  const counts = new Map();

  for (const row of pages) {
    const page = row.keys[0];
    if (!page?.startsWith("http")) continue;
    try {
      const host = new URL(page).hostname.toLowerCase();
      counts.set(host, (counts.get(host) ?? 0) + 1);
    } catch {
      continue;
    }
  }

  return Array.from(counts.entries())
    .map(([host, rows]) => ({ host, rows }))
    .sort((a, b) => b.rows - a.rows);
}

// Alertas operativas de sitemaps. El campo contents[].indexed de la Sitemaps
// API fue marcado como obsoleto por Google, por lo que ya no se usa como
// senal: solo errores, advertencias, fecha de descarga y URLs enviadas.
function summarizeSitemapOperationalIssues(sitemaps) {
  const issues = [];

  for (const sitemap of sitemaps) {
    const path = sitemap.path ?? "-";
    const type = sitemap.type ?? "-";
    const errors = num(sitemap.errors);
    const warnings = num(sitemap.warnings);

    if (errors > 0) {
      issues.push({
        path,
        type,
        detail: `${errors} error(es) reportado(s) por Google`,
        severity: "alta",
      });
    }
    if (warnings > 0) {
      issues.push({
        path,
        type,
        detail: `${warnings} advertencia(s) reportada(s) por Google`,
        severity: "media",
      });
    }
    if (!sitemap.lastDownloaded) {
      issues.push({
        path,
        type,
        detail: "Google aun no registra descarga del sitemap (lastDownloaded vacio)",
        severity: "media",
      });
    }

    const contents = sitemap.contents ?? [];
    if (contents.length > 0) {
      const submitted = contents.reduce((sum, content) => sum + num(content.submitted), 0);
      if (submitted === 0) {
        issues.push({
          path,
          type,
          detail: "El contenido reportado no incluye URLs enviadas (submitted = 0)",
          severity: "media",
        });
      }
    }
  }

  return issues;
}

function generateActionPlan(data) {
  const items = [];

  const badSitemaps = data.sitemaps.filter((item) => num(item.errors) > 0 || num(item.warnings) > 0);
  if (badSitemaps.length > 0) {
    items.push({
      priority: "alta",
      title: "Revisar sitemaps con errores o advertencias",
      detail: `Detectados: ${badSitemaps
        .map((item) => item.path)
        .filter(Boolean)
        .slice(0, 5)
        .join(", ") || "varios"}.`,
    });
  }

  if (data.hostVariants.length > 1) {
    items.push({
      priority: "alta",
      title: "Unificar version canonica entre www y sin www",
      detail: `Se observan multiples hosts en las URLs con impresiones: ${data.hostVariants
        .map((item) => item.host)
        .join(", ")}.`,
    });
  }

  const topLowCtr = data.lowCtrOpportunities.slice(0, 5);
  if (topLowCtr.length > 0) {
    const example = topLowCtr[0];
    items.push({
      priority: "alta",
      title: "Optimizar titles y meta descriptions en paginas con CTR bajo",
      detail: `${topLowCtr.length} URL(s) con gap relevante. Ejemplo: ${example.page} | CTR ${(example.actualCtr * 100).toFixed(2)}% vs esperado ${(example.expectedCtr * 100).toFixed(2)}%.`,
    });
  }

  const downPages = data.trendingDownPages.filter((item) => item.deltaClicks <= -3);
  if (downPages.length > 0) {
    items.push({
      priority: "media",
      title: "Investigar paginas con caida clara de clics",
      detail: downPages
        .slice(0, 3)
        .map((item) => item.key)
        .join(" | "),
    });
  }

  const downQueries = data.trendingDownQueries.filter((item) => item.deltaClicks <= -2);
  if (downQueries.length > 0) {
    items.push({
      priority: "media",
      title: "Revisar consultas en tendencia a la baja",
      detail: downQueries
        .slice(0, 5)
        .map((item) => item.key)
        .join(" | "),
    });
  }

  const totalImp = data.summary.impressions;
  const brandedShare = totalImp > 0 ? data.brandedSplit.branded.impressions / totalImp : 0;
  if (totalImp > 500 && brandedShare < 0.15 && data.brandedSplit.queryRowCounts.nonBranded > 0) {
    items.push({
      priority: "baja",
      title: "Reforzar captacion no marca",
      detail: "El rendimiento depende poco de busquedas de marca segun el corte actual.",
    });
  }

  if (items.length === 0) {
    items.push({
      priority: "baja",
      title: "Mantener monitorizacion mensual",
      detail: "No aparecen alertas automaticas fuertes en este snapshot.",
    });
  }

  return items.sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
}

function publicSiteOrigin(siteUrl) {
  if (siteUrl.startsWith("sc-domain:")) {
    return `https://${siteUrl.slice("sc-domain:".length)}`;
  }
  try {
    const url = new URL(siteUrl.includes("://") ? siteUrl : `https://${siteUrl}`);
    return `${url.origin}/`;
  } catch {
    return siteUrl.endsWith("/") ? siteUrl : `${siteUrl}/`;
  }
}

function summarizeInspection(inspectionUrl, data, error) {
  const index = data?.inspectionResult?.indexStatusResult;
  return {
    inspectionUrl,
    error,
    indexVerdict: index?.verdict ?? null,
    coverageState: index?.coverageState ?? null,
    indexingState: index?.indexingState ?? null,
    googleCanonical: index?.googleCanonical ?? null,
    userCanonical: index?.userCanonical ?? null,
    pageFetchState: index?.pageFetchState ?? null,
    inspectionResultLink: data?.inspectionResult?.inspectionResultLink ?? null,
  };
}

async function runUrlInspectionSample(client, siteUrl, inspectionUrls) {
  return Promise.all(
    inspectionUrls.map(async (inspectionUrl) => {
      try {
        const res = await withTimeout(
          client.urlInspection.index.inspect({
            requestBody: {
              siteUrl,
              inspectionUrl,
              languageCode: "es-419",
            },
          }),
          OPTIONAL_TIMEOUT_MS,
          `urlInspection(${inspectionUrl})`,
        );
        return summarizeInspection(inspectionUrl, res.data);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return summarizeInspection(inspectionUrl, undefined, message);
      }
    }),
  );
}

async function getDashboardData() {
  const client = getSearchConsoleClient();
  const reportWindow = resolveReportWindow(process.argv.slice(2), DAYS);
  const { start, end } = reportWindow;
  const { prevStart, prevEnd } = previousWindow(start, end);

  const startDate = formatDate(start);
  const endDate = formatDate(end);
  const prevStartDate = formatDate(prevStart);
  const prevEndDate = formatDate(prevEnd);

  const needTail = KEYED_MAX_ROWS < LOW_CTR_PAGES_MAX_ROWS;
  const lowCtrPagesPromise = needTail
    ? fetchSearchAnalyticsKeyedPaged(
        client,
        SITE_URL,
        startDate,
        endDate,
        "page",
        LOW_CTR_PAGES_MAX_ROWS,
      )
    : Promise.resolve(null);

  const sitesPromise = bestEffort(client.sites.list(), null, OPTIONAL_TIMEOUT_MS, "sites.list");
  const sitemapsListPromise = bestEffort(
    client.sitemaps.list({ siteUrl: SITE_URL }),
    null,
    OPTIONAL_TIMEOUT_MS,
    "sitemaps.list",
  );

  const [
    daily,
    devices,
    countries,
    currentTotals,
    previousTotals,
    queriesCurrKeyed,
    pagesCurrKeyed,
    queriesPrevKeyed,
    pagesPrevKeyed,
    searchAppearance,
    queryPageCombosTop25,
    sitesResponse,
    sitemapsListResponse,
    lowCtrPagesMaybe,
  ] = await Promise.all([
    queryAnalytics(client, SITE_URL, startDate, endDate, ["date"], 400),
    queryAnalytics(client, SITE_URL, startDate, endDate, ["device"], 10),
    queryAnalytics(client, SITE_URL, startDate, endDate, ["country"], 15),
    queryAnalytics(client, SITE_URL, startDate, endDate, [], 1),
    queryAnalytics(client, SITE_URL, prevStartDate, prevEndDate, [], 1),
    fetchSearchAnalyticsKeyedPaged(client, SITE_URL, startDate, endDate, "query", KEYED_MAX_ROWS),
    fetchSearchAnalyticsKeyedPaged(client, SITE_URL, startDate, endDate, "page", KEYED_MAX_ROWS),
    fetchSearchAnalyticsKeyedPaged(client, SITE_URL, prevStartDate, prevEndDate, "query", KEYED_MAX_ROWS),
    fetchSearchAnalyticsKeyedPaged(client, SITE_URL, prevStartDate, prevEndDate, "page", KEYED_MAX_ROWS),
    queryAnalytics(client, SITE_URL, startDate, endDate, ["searchAppearance"], 100),
    queryAnalytics(client, SITE_URL, startDate, endDate, ["query", "page"], 25),
    sitesPromise,
    sitemapsListPromise,
    lowCtrPagesPromise,
  ]);

  const queriesSorted = sortRowsByClicksDesc(queriesCurrKeyed);
  const pagesSorted = sortRowsByClicksDesc(pagesCurrKeyed);
  const pagesAccumForLowCtr = lowCtrPagesMaybe ?? pagesCurrKeyed;
  const lowCtrOpportunities = analyzeLowCtrPages(pagesAccumForLowCtr, 10);

  const trendingUpQueries = computeTrendComparisons(
    queriesCurrKeyed,
    queriesPrevKeyed,
    "up",
    TRENDING_ROWS,
  );
  const trendingDownQueries = computeTrendComparisons(
    queriesCurrKeyed,
    queriesPrevKeyed,
    "down",
    TRENDING_ROWS,
  );
  const trendingUpPages = computeTrendComparisons(
    pagesCurrKeyed,
    pagesPrevKeyed,
    "up",
    TRENDING_ROWS,
  );
  const trendingDownPages = computeTrendComparisons(
    pagesCurrKeyed,
    pagesPrevKeyed,
    "down",
    TRENDING_ROWS,
  );

  const brandedSplit = detectBrandedQueries(queriesCurrKeyed, SITE_URL, BRAND_TERMS);
  const appliedBrandTerms = resolveBrandTerms(SITE_URL, BRAND_TERMS);

  const sitemapList = sitemapsListResponse?.data.sitemap ?? [];
  const sitemaps = await Promise.all(
    sitemapList.map(async (sitemap) => {
      const feedpath = sitemap.path;
      const detailed = feedpath
        ? await bestEffort(
            client.sitemaps.get({ siteUrl: SITE_URL, feedpath }),
            null,
            OPTIONAL_TIMEOUT_MS,
            `sitemaps.get(${feedpath})`,
          )
        : null;

      return {
        path: sitemap.path ?? null,
        lastSubmitted: sitemap.lastSubmitted ?? null,
        lastDownloaded: sitemap.lastDownloaded ?? null,
        warnings: sitemap.warnings ?? null,
        errors: sitemap.errors ?? null,
        isPending: sitemap.isPending ?? null,
        isSitemapsIndex: sitemap.isSitemapsIndex ?? null,
        type: sitemap.type ?? null,
        contents: (detailed?.data.contents ?? []).map((content) => ({
          type: content.type ?? null,
          submitted: content.submitted ?? null,
        })),
      };
    }),
  );

  const origin = publicSiteOrigin(SITE_URL);
  const homeUrl = new URL("/", origin).toString().replace(/\/?$/, "/");
  const agendarUrl = new URL("agendar", origin).toString();
  const topPerformingUrl = pagesSorted[0]?.keys[0]?.trim();
  const inspectCandidates = [homeUrl, agendarUrl];
  if (topPerformingUrl && topPerformingUrl !== homeUrl && topPerformingUrl !== agendarUrl) {
    inspectCandidates.push(topPerformingUrl);
  }
  const uniqueInspection = [...new Set(inspectCandidates)].slice(0, 5);
  const urlInspectionSamples = SKIP_URL_INSPECTION
    ? []
    : await bestEffort(
        runUrlInspectionSample(client, SITE_URL, uniqueInspection),
        [],
        OPTIONAL_TIMEOUT_MS,
        "urlInspection.batch",
      );

  const data = {
    siteUrl: SITE_URL,
    period: { start: startDate, end: endDate, days: reportWindow.days, source: reportWindow.source },
    previousPeriod: { start: prevStartDate, end: prevEndDate },
    generatedAt: new Date().toISOString(),
    sites: (sitesResponse?.data.siteEntry ?? []).map((site) => ({
      siteUrl: site.siteUrl ?? "",
      permissionLevel: site.permissionLevel ?? null,
    })),
    summary: aggregate(currentTotals),
    previousSummary: aggregate(previousTotals),
    daily: daily.sort((a, b) => a.keys[0].localeCompare(b.keys[0])),
    queries: queriesSorted.slice(0, 50),
    pages: pagesSorted.slice(0, 50),
    devices,
    countries,
    searchAppearance: sortRowsByClicksDesc(searchAppearance),
    queryPageCombosTop25: sortRowsByClicksDesc(queryPageCombosTop25).slice(0, 25),
    trendingUpQueries,
    trendingDownQueries,
    trendingUpPages,
    trendingDownPages,
    lowCtrOpportunities,
    brandedSplit,
    appliedBrandTerms,
    sitemaps,
    urlInspectionSamples,
    hostVariants: detectObservedHosts(pagesCurrKeyed),
  };

  return {
    ...data,
    actionPlan: generateActionPlan(data),
    hostMismatches: findHostVariantPageUrls(data.pages, data.siteUrl),
  };
}

function pct(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function deltaPct(current, previous) {
  if (!previous) return null;
  return (current - previous) / previous;
}

function deltaAbsolute(current, previous) {
  return current - previous;
}

function fmtNum(value, decimals = 0) {
  return Number(value).toLocaleString("es-CL", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function fmtSigned(value, decimals = 0, suffix = "") {
  if (value == null || Number.isNaN(value)) {
    return "n/d";
  }
  const formatted = fmtNum(Math.abs(value), decimals);
  if (value > 0) return `+${formatted}${suffix}`;
  if (value < 0) return `-${formatted}${suffix}`;
  return `0${suffix}`;
}

function fmtDeltaPct(current, previous) {
  const delta = deltaPct(current, previous);
  return delta == null ? "n/d" : fmtSigned(delta * 100, 1, "%");
}

function mdCell(value) {
  if (value == null || value === "") {
    return "-";
  }
  return String(value).replace(/\|/g, "\\|").replace(/\n/g, "<br>");
}

function mdLink(url) {
  return url ? `<${url}>` : "-";
}

function table(headers, rows) {
  const head = `| ${headers.map(mdCell).join(" | ")} |`;
  const sep = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows.length
    ? rows.map((row) => `| ${row.map(mdCell).join(" | ")} |`).join("\n")
    : "| - |";
  return `${head}\n${sep}\n${body}`;
}

function section(title, content) {
  return `## ${title}\n\n${content.trim()}`;
}

function buildMarkdown(data) {
  const summary = data.summary;
  const previous = data.previousSummary;
  const actionPlanUrgent = data.actionPlan.filter((item) => item.priority === "alta");
  const actionPlanNext = data.actionPlan.filter((item) => item.priority !== "alta");
  const inspectionIssues = data.urlInspectionSamples.filter(
    (item) => item.error || (item.indexVerdict && item.indexVerdict !== "PASS"),
  );
  const sitemapOperationalIssues = summarizeSitemapOperationalIssues(data.sitemaps);

  const parts = [];
  parts.push(`# Informe completo de Google Search Console`);
  parts.push(
    [
      `- Sitio: \`${data.siteUrl}\``,
      `- Periodo analizado: \`${data.period.start}\` -> \`${data.period.end}\` (${data.period.days} dias)`,
      `- Periodo comparado: \`${data.previousPeriod.start}\` -> \`${data.previousPeriod.end}\``,
      `- Generado: \`${data.generatedAt}\``,
      `- Fuente: Search Console API`,
    ].join("\n"),
  );

  parts.push(
    section(
      "Resumen ejecutivo",
      [
        `- Clics: **${fmtNum(summary.clicks)}** (${fmtDeltaPct(summary.clicks, previous.clicks)} vs periodo anterior)`,
        `- Impresiones: **${fmtNum(summary.impressions)}** (${fmtDeltaPct(summary.impressions, previous.impressions)} vs periodo anterior)`,
        `- CTR promedio: **${pct(summary.ctr)}** (${fmtSigned((summary.ctr - previous.ctr) * 100, 2, " pp")} vs periodo anterior)`,
        `- Posicion media ponderada: **${fmtNum(summary.position, 1)}** (${fmtSigned(
          previous.position - summary.position,
          1,
        )} puntos; positivo = mejora)`,
        `- Terminos de marca detectados: ${data.appliedBrandTerms.length > 0 ? data.appliedBrandTerms.map((term) => `\`${term}\``).join(", ") : "ninguno"}`,
      ].join("\n"),
    ),
  );

  parts.push(
    section(
      "Cambios urgentes",
      actionPlanUrgent.length > 0
        ? actionPlanUrgent
            .map((item, index) => `${index + 1}. **${item.title}**. ${item.detail}`)
            .join("\n")
        : "No aparecieron alertas automaticas de prioridad alta en este snapshot.",
    ),
  );

  const notableIssues = [];
  if (data.hostVariants.length > 1) {
    notableIssues.push(
      `- Host mezclado: aparecen ${data.hostVariants.length} hosts distintos en URLs con impresiones (${data.hostVariants
        .map((item) => `\`${item.host}\``)
        .join(", ")}).`,
    );
  }
  if (data.lowCtrOpportunities.length > 0) {
    notableIssues.push(
      `- CTR bajo: ${data.lowCtrOpportunities.length} URL(s) con gap frente al benchmark de primera pagina.`,
    );
  }
  if (inspectionIssues.length > 0) {
    notableIssues.push(`- URL Inspection: ${inspectionIssues.length} muestra(n) senales de problema o respuesta incompleta.`);
  }
  if (sitemapOperationalIssues.length > 0) {
    notableIssues.push(
      `- Sitemaps: ${sitemapOperationalIssues.length} alerta(s) operativa(s) (errores, advertencias, descarga no registrada o envio de URLs en cero).`,
    );
  }
  parts.push(section("Riesgos detectados", notableIssues.join("\n") || "- No se detectaron riesgos tecnicos fuertes en este corte."));

  parts.push(
    section(
      "KPI comparados",
      table(
        ["Metrica", "Periodo actual", "Periodo anterior", "Delta"],
        [
          ["Clics", fmtNum(summary.clicks), fmtNum(previous.clicks), fmtSigned(deltaAbsolute(summary.clicks, previous.clicks))],
          ["Impresiones", fmtNum(summary.impressions), fmtNum(previous.impressions), fmtSigned(deltaAbsolute(summary.impressions, previous.impressions))],
          ["CTR", pct(summary.ctr), pct(previous.ctr), fmtSigned((summary.ctr - previous.ctr) * 100, 2, " pp")],
          ["Posicion media", fmtNum(summary.position, 1), fmtNum(previous.position, 1), fmtSigned(previous.position - summary.position, 1)],
        ],
      ),
    ),
  );

  parts.push(
    section(
      "Marca vs no marca",
      table(
        ["Bucket", "Clics", "Impresiones", "CTR", "Posicion", "Filas"],
        [
          [
            "Marca",
            fmtNum(data.brandedSplit.branded.clicks),
            fmtNum(data.brandedSplit.branded.impressions),
            pct(data.brandedSplit.branded.ctr),
            fmtNum(data.brandedSplit.branded.position, 1),
            fmtNum(data.brandedSplit.queryRowCounts.branded),
          ],
          [
            "No marca",
            fmtNum(data.brandedSplit.nonBranded.clicks),
            fmtNum(data.brandedSplit.nonBranded.impressions),
            pct(data.brandedSplit.nonBranded.ctr),
            fmtNum(data.brandedSplit.nonBranded.position, 1),
            fmtNum(data.brandedSplit.queryRowCounts.nonBranded),
          ],
        ],
      ),
    ),
  );

  parts.push(
    section(
      "Acciones recomendadas",
      actionPlanNext.length > 0
        ? actionPlanNext
            .map((item, index) => `${index + 1}. **${item.title}**. ${item.detail}`)
            .join("\n")
        : "No hay acciones secundarias adicionales.",
    ),
  );

  parts.push(
    section(
      "URLs con CTR bajo y potencial de mejora",
      table(
        ["URL", "Clics", "Impresiones", "CTR actual", "CTR esperado", "Gap", "Clicks extra potenciales"],
        data.lowCtrOpportunities.map((row) => [
          mdLink(row.page),
          fmtNum(row.clicks),
          fmtNum(row.impressions),
          pct(row.actualCtr),
          pct(row.expectedCtr),
          fmtSigned(row.gap * 100, 2, " pp"),
          fmtNum(row.upliftPotential, 1),
        ]),
      ),
    ),
  );

  if (data.hostMismatches.length > 0) {
    parts.push(
      section(
        "URLs con host inconsistente",
        data.hostMismatches.map((url) => `- ${mdLink(url)}`).join("\n"),
      ),
    );
  }

  if (data.hostVariants.length > 0) {
    parts.push(
      section(
        "Hosts observados en URLs con impresiones",
        table(
          ["Host", "Filas observadas"],
          data.hostVariants.map((item) => [item.host, fmtNum(item.rows)]),
        ),
      ),
    );
  }

  parts.push(
    section(
      "Tendencias: consultas",
      [
        "### Consultas en alza",
        table(
          ["Consulta", "Clics actuales", "Clics previos", "Delta clics", "Delta impresiones"],
          data.trendingUpQueries.map((row) => [
            row.key,
            fmtNum(row.currentClicks),
            fmtNum(row.previousClicks),
            fmtSigned(row.deltaClicks),
            fmtSigned(row.deltaImpressions),
          ]),
        ),
        "",
        "### Consultas en baja",
        table(
          ["Consulta", "Clics actuales", "Clics previos", "Delta clics", "Delta impresiones"],
          data.trendingDownQueries.map((row) => [
            row.key,
            fmtNum(row.currentClicks),
            fmtNum(row.previousClicks),
            fmtSigned(row.deltaClicks),
            fmtSigned(row.deltaImpressions),
          ]),
        ),
      ].join("\n"),
    ),
  );

  parts.push(
    section(
      "Tendencias: paginas",
      [
        "### Paginas en alza",
        table(
          ["Pagina", "Clics actuales", "Clics previos", "Delta clics", "Delta impresiones"],
          data.trendingUpPages.map((row) => [
            mdLink(row.key),
            fmtNum(row.currentClicks),
            fmtNum(row.previousClicks),
            fmtSigned(row.deltaClicks),
            fmtSigned(row.deltaImpressions),
          ]),
        ),
        "",
        "### Paginas en baja",
        table(
          ["Pagina", "Clics actuales", "Clics previos", "Delta clics", "Delta impresiones"],
          data.trendingDownPages.map((row) => [
            mdLink(row.key),
            fmtNum(row.currentClicks),
            fmtNum(row.previousClicks),
            fmtSigned(row.deltaClicks),
            fmtSigned(row.deltaImpressions),
          ]),
        ),
      ].join("\n"),
    ),
  );

  parts.push(
    section(
      "Top consultas",
      table(
        ["Consulta", "Clics", "Impresiones", "CTR", "Posicion"],
        data.queries.map((row) => [
          row.keys[0] ?? "-",
          fmtNum(row.clicks),
          fmtNum(row.impressions),
          pct(row.ctr),
          fmtNum(row.position, 1),
        ]),
      ),
    ),
  );

  parts.push(
    section(
      "Top paginas",
      table(
        ["Pagina", "Clics", "Impresiones", "CTR", "Posicion"],
        data.pages.map((row) => [
          mdLink(row.keys[0] ?? "-"),
          fmtNum(row.clicks),
          fmtNum(row.impressions),
          pct(row.ctr),
          fmtNum(row.position, 1),
        ]),
      ),
    ),
  );

  parts.push(
    section(
      "Combinaciones consulta + pagina",
      table(
        ["Consulta", "Pagina", "Clics", "Impresiones", "CTR", "Posicion"],
        data.queryPageCombosTop25.map((row) => [
          row.keys[0] ?? "-",
          mdLink(row.keys[1] ?? "-"),
          fmtNum(row.clicks),
          fmtNum(row.impressions),
          pct(row.ctr),
          fmtNum(row.position, 1),
        ]),
      ),
    ),
  );

  parts.push(
    section(
      "Dispositivos",
      table(
        ["Dispositivo", "Clics", "Impresiones", "CTR", "Posicion"],
        data.devices.map((row) => [
          row.keys[0] ?? "-",
          fmtNum(row.clicks),
          fmtNum(row.impressions),
          pct(row.ctr),
          fmtNum(row.position, 1),
        ]),
      ),
    ),
  );

  parts.push(
    section(
      "Paises",
      table(
        ["Pais", "Clics", "Impresiones", "CTR", "Posicion"],
        data.countries.map((row) => [
          row.keys[0] ?? "-",
          fmtNum(row.clicks),
          fmtNum(row.impressions),
          pct(row.ctr),
          fmtNum(row.position, 1),
        ]),
      ),
    ),
  );

  parts.push(
    section(
      "Search appearance",
      table(
        ["Tipo", "Clics", "Impresiones", "CTR", "Posicion"],
        data.searchAppearance.map((row) => [
          row.keys[0] ?? "-",
          fmtNum(row.clicks),
          fmtNum(row.impressions),
          pct(row.ctr),
          fmtNum(row.position, 1),
        ]),
      ),
    ),
  );

  parts.push(
    section(
      "Serie diaria",
      table(
        ["Fecha", "Clics", "Impresiones", "CTR", "Posicion"],
        data.daily.map((row) => [
          row.keys[0] ?? "-",
          fmtNum(row.clicks),
          fmtNum(row.impressions),
          pct(row.ctr),
          fmtNum(row.position, 1),
        ]),
      ),
    ),
  );

  parts.push(
    section(
      "Sitemaps",
      table(
        ["Path", "Tipo", "Errores", "Warnings", "Ultimo submitted", "Ultimo downloaded", "Contenido"],
        data.sitemaps.map((row) => [
          row.path ?? "-",
          row.type ?? "-",
          fmtNum(num(row.errors)),
          fmtNum(num(row.warnings)),
          row.lastSubmitted ?? "-",
          row.lastDownloaded ?? "-",
          row.contents.length > 0
            ? row.contents
                .map((content) => `${content.type ?? "?"}: ${content.submitted ?? "-"} enviadas`)
                .join("<br>")
            : "-",
        ]),
      ),
    ),
  );

  if (sitemapOperationalIssues.length > 0) {
    parts.push(
      section(
        "Alertas operativas de sitemap",
        table(
          ["Path", "Tipo", "Detalle", "Severidad"],
          sitemapOperationalIssues.map((item) => [
            item.path,
            item.type,
            item.detail,
            item.severity,
          ]),
        ),
      ),
    );
  }

  parts.push(
    section(
      "Muestra de URL Inspection",
      table(
        ["URL", "Verdict", "Coverage", "Fetch", "Canonical usuario", "Canonical Google", "Error"],
        data.urlInspectionSamples.map((row) => [
          mdLink(row.inspectionUrl),
          row.indexVerdict ?? "-",
          row.coverageState ?? "-",
          row.pageFetchState ?? "-",
          row.userCanonical ? mdLink(row.userCanonical) : "-",
          row.googleCanonical ? mdLink(row.googleCanonical) : "-",
          row.error ?? "-",
        ]),
      ),
    ),
  );

  parts.push(
    section(
      "Propiedades visibles para la cuenta",
      table(
        ["Property", "Permiso"],
        data.sites.map((row) => [row.siteUrl, row.permissionLevel ?? "-"]),
      ),
    ),
  );

  parts.push(
    section(
      "Propuesta de trabajo",
      [
        "### Proximas 72 horas",
        actionPlanUrgent.length > 0
          ? actionPlanUrgent.map((item) => `- ${item.title}. ${item.detail}`).join("\n")
          : "- No hay un fix urgente automaticamente detectado; validar manualmente titles, host y sitemap.",
        "",
        "### Proximas 2 semanas",
        actionPlanNext.length > 0
          ? actionPlanNext.map((item) => `- ${item.title}. ${item.detail}`).join("\n")
          : "- Mantener seguimiento y comparar con el siguiente corte.",
      ].join("\n"),
    ),
  );

  parts.push(
    section(
      "Notas y limites",
      [
        "- El bucket marca/no marca es heuristico y depende de los terminos detectados.",
        "- Search Console API no separa AI Overviews de organico en este reporte.",
        "- Los trends comparan el periodo actual contra el inmediatamente anterior de igual largo.",
        "- La inspeccion de URL es una muestra chica por cuota y tiempo de respuesta.",
      ].join("\n"),
    ),
  );

  return `${parts.join("\n\n")}\n`;
}

async function main() {
  const data = await getDashboardData();
  const markdown = buildMarkdown(data);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, markdown, "utf8");
  console.log(`Informe guardado en ${OUTPUT_PATH}`);
}

main().catch((error) => {
  const message = error?.response?.data?.error?.message ?? error.message ?? String(error);
  console.error(`Error: ${message}`);
  process.exit(1);
});
