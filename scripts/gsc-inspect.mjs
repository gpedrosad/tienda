#!/usr/bin/env node
/**
 * Inspección de URLs prioritarias en Search Console (solo lectura).
 * No solicita indexación: esa acción no existe en la API.
 *
 *   npm run gsc:inspect
 *   npm run gsc:inspect -- --since=2026-09-06
 *   npm run gsc:inspect -- --no-md
 *
 * Compara el <title> vivo en www con el esperado del lote SEO
 * y la última visita de Googlebot. No afirma que el snippet SERP
 * ya cambió: solo si Googlebot pasó después de --since.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { google } from "googleapis";
import { formatDate, todayInPacific } from "./lib/gsc-dates.mjs";

const SITE_URL = process.env.GSC_SITE_URL ?? "sc-domain:ideamadera.cl";
const LIVE_ORIGIN = "https://www.ideamadera.cl";
const OAUTH_CLIENT_PATH = resolve(
  process.cwd(),
  process.env.GOOGLE_OAUTH_CLIENT_PATH ?? ".secrets/gcp-oauth-client.json",
);
const OAUTH_TOKEN_PATH = resolve(
  process.cwd(),
  process.env.GSC_OAUTH_TOKEN_PATH ?? ".secrets/gsc-oauth-token.json",
);
const OAUTH_REDIRECT_URI = `http://127.0.0.1:${Number(process.env.GSC_OAUTH_PORT ?? 53682)}/oauth2callback`;

const PRIORITY_URLS = [
  {
    url: `${LIVE_ORIGIN}/`,
    expectedTitle: "Muebles de Madera en Chillán y Chile | Idea Madera",
  },
  {
    url: `${LIVE_ORIGIN}/collections/mesas`,
    expectedTitle: "Mesas de madera para comedor y living | Idea Madera",
  },
  {
    url: `${LIVE_ORIGIN}/products/mesa-tripode-ratona`,
    expectedTitle: "Mesa ratona trípode de madera para living | Idea Madera",
  },
  {
    url: `${LIVE_ORIGIN}/products/silla-kentucky`,
    expectedTitle: "Silla Kentucky de madera para comedor | Idea Madera",
  },
  {
    url: `${LIVE_ORIGIN}/products/mesa-centro-roma`,
    expectedTitle: "Mesa de centro Roma de madera | Idea Madera",
  },
  {
    url: `${LIVE_ORIGIN}/products/mesa-nordica`,
    expectedTitle: "Mesa nórdica de madera: medidas y terminación | Idea Madera",
  },
  {
    url: `${LIVE_ORIGIN}/cubiertas-a-medida`,
    expectedTitle: "Cubiertas de Madera a Medida | Quinchos y Mesones | Idea Madera",
  },
  {
    url: `${LIVE_ORIGIN}/kit-pergola`,
    expectedTitle: "Kit Pérgola Modular | Uniones Metálicas 3×3 | Idea Madera",
  },
  {
    url: `${LIVE_ORIGIN}/puertas-a-medida`,
    expectedTitle: "Puertas de Madera a Medida | Cotiza en Chile | Idea Madera",
  },
  {
    url: `${LIVE_ORIGIN}/molduras-a-medida`,
    expectedTitle: "Molduras de Madera a Medida | Chile | Idea Madera",
  },
  {
    url: `${LIVE_ORIGIN}/peldanos-a-medida`,
    expectedTitle: "Peldaños a Medida en Madera | Cotiza por WhatsApp | Idea Madera",
  },
];

function parseArg(name, fallback) {
  const prefix = `--${name}=`;
  const found = process.argv.find((arg) => arg.startsWith(prefix));
  return found ? found.slice(prefix.length) : fallback;
}

function normalizeTitle(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .trim()
    .toLowerCase();
}

function titlesMatch(live, expected) {
  const a = normalizeTitle(live);
  const b = normalizeTitle(expected);
  if (!a || !b) return false;
  return a === b || a.includes(b) || b.includes(a);
}

function createOAuthClient() {
  if (!existsSync(OAUTH_CLIENT_PATH)) {
    console.error(`No existe el cliente OAuth: ${OAUTH_CLIENT_PATH}`);
    process.exit(1);
  }
  const raw = JSON.parse(readFileSync(OAUTH_CLIENT_PATH, "utf8"));
  const config = raw.installed ?? raw.web ?? raw;
  if (!config.client_id || !config.client_secret) {
    console.error("El JSON OAuth debe tener client_id y client_secret.");
    process.exit(1);
  }
  return new google.auth.OAuth2(config.client_id, config.client_secret, OAUTH_REDIRECT_URI);
}

async function getAuth() {
  if (!existsSync(OAUTH_TOKEN_PATH)) {
    console.error("No hay token OAuth. Ejecuta primero: npm run gsc:auth\n");
    process.exit(1);
  }
  const oauth2Client = createOAuthClient();
  oauth2Client.setCredentials(JSON.parse(readFileSync(OAUTH_TOKEN_PATH, "utf8")));
  oauth2Client.on("tokens", (tokens) => {
    const current = JSON.parse(readFileSync(OAUTH_TOKEN_PATH, "utf8"));
    writeFileSync(OAUTH_TOKEN_PATH, JSON.stringify({ ...current, ...tokens }, null, 2), "utf8");
  });
  return oauth2Client;
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? match[1].replace(/\s+/g, " ").trim() : "";
}

async function fetchLiveTitle(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "IdeaMaderaGscInspect/1.0" },
  });
  const html = await response.text();
  return {
    status: response.status,
    finalUrl: response.url,
    title: extractTitle(html),
  };
}

async function inspectUrl(searchconsole, inspectionUrl) {
  const res = await searchconsole.urlInspection.index.inspect({
    requestBody: {
      inspectionUrl,
      siteUrl: SITE_URL,
      languageCode: "es-CL",
    },
  });
  const result = res.data.inspectionResult ?? {};
  const index = result.indexStatusResult ?? {};
  return {
    coverageState: index.coverageState ?? null,
    indexingState: index.indexingState ?? null,
    verdict: index.verdict ?? null,
    lastCrawlTime: index.lastCrawlTime ?? null,
    googleCanonical: index.googleCanonical ?? null,
    userCanonical: index.userCanonical ?? null,
    pageFetchState: index.pageFetchState ?? null,
    crawledAs: index.crawledAs ?? null,
    inspectionResultLink: result.inspectionResultLink ?? null,
  };
}

function crawledAfter(lastCrawlTime, sinceDate) {
  if (!lastCrawlTime) return false;
  return new Date(lastCrawlTime) >= new Date(`${sinceDate}T00:00:00.000Z`);
}

function formatCrawl(lastCrawlTime) {
  if (!lastCrawlTime) return "sin dato";
  return lastCrawlTime.replace("T", " ").replace(/\.\d+Z$/, " UTC");
}

function sleep(ms) {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, ms));
}

function verdictLine({ liveOk, crawledSince, inspectError, liveError }) {
  if (inspectError) return "GSC: error de inspección";
  if (liveError) return "vivo: no se pudo leer el title";
  if (liveOk && crawledSince) return "prod OK · Googlebot pasó tras el lote (snippet SERP no confirmado)";
  if (liveOk && !crawledSince) return "prod OK · Google aún no recrawleó tras el lote";
  if (!liveOk && crawledSince) return "Googlebot pasó, pero el title vivo no coincide";
  return "prod distinto · crawl anterior al lote";
}

async function main() {
  const since = parseArg("since", formatDate(todayInPacific()));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(since)) {
    console.error("Usa --since=YYYY-MM-DD");
    process.exit(1);
  }
  const writeMd = !process.argv.includes("--no-md");
  const today = formatDate(todayInPacific());

  const auth = await getAuth();
  const searchconsole = google.searchconsole({ version: "v1", auth });

  console.log(`\nInspección GSC (solo lectura) — ${SITE_URL}`);
  console.log(`Lote comparado desde: ${since}`);
  console.log("La API no solicita indexación.\n");

  const rows = [];
  for (const item of PRIORITY_URLS) {
    const row = {
      url: item.url,
      expectedTitle: item.expectedTitle,
    };
    try {
      row.live = await fetchLiveTitle(item.url);
    } catch (error) {
      row.liveError = error.message;
    }
    try {
      row.inspect = await inspectUrl(searchconsole, item.url);
    } catch (error) {
      row.inspectError = error?.response?.data?.error?.message ?? error.message;
    }

    row.liveOk = Boolean(row.live?.title && titlesMatch(row.live.title, item.expectedTitle));
    row.crawledSince = crawledAfter(row.inspect?.lastCrawlTime, since);
    row.summary = verdictLine(row);

    const path = new URL(item.url).pathname || "/";
    console.log(path === "/" ? "/" : path);
    console.log(`  vivo:     ${row.live?.title || row.liveError || "?"}`);
    console.log(`  esperado: ${item.expectedTitle}`);
    console.log(`  GSC:      ${row.inspect?.coverageState ?? row.inspectError ?? "?"}`);
    console.log(`  crawl:    ${formatCrawl(row.inspect?.lastCrawlTime)}`);
    console.log(`  canónico: ${row.inspect?.googleCanonical ?? "-"}`);
    console.log(`  → ${row.summary}`);
    if (row.inspect?.inspectionResultLink) {
      console.log(`  abrir:    ${row.inspect.inspectionResultLink}`);
    }
    console.log("");
    rows.push(row);
    await sleep(250);
  }

  const liveOk = rows.filter((row) => row.liveOk).length;
  const crawled = rows.filter((row) => row.crawledSince).length;
  const inspectFail = rows.filter((row) => row.inspectError).length;
  console.log(`Resumen: ${liveOk}/${rows.length} titles vivos OK · ${crawled}/${rows.length} crawl ≥ ${since} · ${inspectFail} errores GSC\n`);

  if (!writeMd) return;

  const lines = [
    `# Inspección GSC — ${today}`,
    "",
    `- Propiedad: \`${SITE_URL}\``,
    `- Lote comparado desde: \`${since}\``,
    "- Fuente: URL Inspection API (solo lectura) + `<title>` vivo en www.",
    "- **No solicita indexación.** Esa acción no existe en la API.",
    "",
    `| URL | Title vivo | Title OK | Cobertura | Último crawl | Crawl ≥ lote | Nota |`,
    `|---|---|---|---|---|---|---|`,
  ];

  for (const row of rows) {
    const path = new URL(row.url).pathname || "/";
    const liveTitle = (row.live?.title ?? row.liveError ?? "—").replace(/\|/g, "/");
    const crawl = row.inspect?.lastCrawlTime ? formatCrawl(row.inspect.lastCrawlTime) : row.inspectError ?? "—";
    const coverage = row.inspect?.coverageState ?? "—";
    lines.push(
      `| ${path} | ${liveTitle} | ${row.liveOk ? "sí" : "no"} | ${coverage} | ${crawl} | ${row.crawledSince ? "sí" : "no"} | ${row.summary} |`,
    );
  }

  lines.push(
    "",
    "## Enlaces de inspección en la UI",
    "",
    "Si hace falta forzar recrawl, abrir y pulsar Solicitar indexación:",
    "",
  );
  for (const row of rows) {
    const link = row.inspect?.inspectionResultLink;
    if (link) lines.push(`- [${new URL(row.url).pathname || "/"}](${link})`);
  }
  lines.push("");

  const outPath = resolve(process.cwd(), `docs/gsc-inspect-${today}.md`);
  writeFileSync(outPath, lines.join("\n"), "utf8");
  console.log(`Informe: ${outPath}\n`);
}

main().catch((error) => {
  const message = error?.response?.data?.error?.message ?? error.message;
  console.error(`\nError: ${message}\n`);
  if (String(message).includes("invalid_grant")) {
    console.error("Refresh expirado → npm run gsc:auth\n");
  }
  process.exit(1);
});
