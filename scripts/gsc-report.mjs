#!/usr/bin/env node

import { createServer } from "node:http";
import { exec } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { google } from "googleapis";

const SITE_URL = process.env.GSC_SITE_URL ?? "sc-domain:ideamadera.cl";
const DAYS = Number(process.env.GSC_REPORT_DAYS ?? 28);
const ROW_LIMIT = Number(process.env.GSC_REPORT_ROWS ?? 10);
const AUTH_MODE = process.env.GSC_AUTH_MODE ?? "oauth";
const OAUTH_CLIENT_PATH = resolve(
  process.cwd(),
  process.env.GOOGLE_OAUTH_CLIENT_PATH ?? ".secrets/gcp-oauth-client.json",
);
const OAUTH_TOKEN_PATH = resolve(
  process.cwd(),
  process.env.GSC_OAUTH_TOKEN_PATH ?? ".secrets/gsc-oauth-token.json",
);
const OAUTH_REDIRECT_PORT = Number(process.env.GSC_OAUTH_PORT ?? 53682);
const OAUTH_REDIRECT_URI = `http://127.0.0.1:${OAUTH_REDIRECT_PORT}/oauth2callback`;
const SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"];

const isAuthOnly = process.argv.includes("--auth");

const formatDate = (date) => date.toISOString().slice(0, 10);

const end = new Date();
const start = new Date();
start.setDate(end.getDate() - DAYS);

const openBrowser = (url) => {
  const command =
    process.platform === "darwin"
      ? `open "${url}"`
      : process.platform === "win32"
        ? `start "" "${url}"`
        : `xdg-open "${url}"`;
  exec(command);
};

const loadOAuthClientSecrets = () => {
  if (!existsSync(OAUTH_CLIENT_PATH)) {
    console.error(`No existe el cliente OAuth: ${OAUTH_CLIENT_PATH}`);
    console.error(`
Crea credenciales OAuth en Google Cloud:
1. APIs y servicios → Credenciales → Crear credenciales → ID de cliente OAuth
2. Tipo: Aplicación de escritorio
3. Descarga JSON y guárdalo como: .secrets/gcp-oauth-client.json

En .env.local usa:
  GSC_AUTH_MODE=oauth
`);
    process.exit(1);
  }

  const raw = JSON.parse(readFileSync(OAUTH_CLIENT_PATH, "utf8"));
  const config = raw.installed ?? raw.web ?? raw;
  if (!config.client_id || !config.client_secret) {
    console.error("El JSON OAuth debe tener client_id y client_secret.");
    process.exit(1);
  }
  return config;
};

const createOAuthClient = () => {
  const { client_id, client_secret } = loadOAuthClientSecrets();
  return new google.auth.OAuth2(client_id, client_secret, OAUTH_REDIRECT_URI);
};

const runOAuthFlow = async () => {
  const oauth2Client = createOAuthClient();
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  console.log("\n🔐 Inicia sesión con el Gmail que administra Search Console.\n");

  const code = await new Promise((resolvePromise, reject) => {
    const server = createServer((req, res) => {
      const requestUrl = new URL(req.url ?? "/", OAUTH_REDIRECT_URI);
      if (requestUrl.pathname !== "/oauth2callback") {
        res.writeHead(404);
        res.end();
        return;
      }

      const authError = requestUrl.searchParams.get("error");
      if (authError) {
        res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>Error de autorización</h1><p>Cierra esta ventana.</p>");
        server.close();
        reject(new Error(authError));
        return;
      }

      const authCode = requestUrl.searchParams.get("code");
      if (!authCode) {
        res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
        res.end("<h1>Código no recibido</h1>");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        "<h1>✓ Autorizado</h1><p>Ya puedes cerrar esta pestaña y volver a la terminal.</p>",
      );
      server.close();
      resolvePromise(authCode);
    });

    server.listen(OAUTH_REDIRECT_PORT, "127.0.0.1", () => {
      console.log(`Abriendo navegador… Si no abre, visita:\n${authUrl}\n`);
      openBrowser(authUrl);
    });

    server.on("error", reject);
  });

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  writeFileSync(OAUTH_TOKEN_PATH, JSON.stringify(tokens, null, 2), "utf8");
  console.log(`\n✓ Token guardado en ${OAUTH_TOKEN_PATH}`);
  console.log("Ejecuta: npm run gsc:report\n");
};

const getOAuthAuth = async () => {
  const oauth2Client = createOAuthClient();

  if (!existsSync(OAUTH_TOKEN_PATH)) {
    console.error("No hay token OAuth. Ejecuta primero: npm run gsc:auth\n");
    process.exit(1);
  }

  oauth2Client.setCredentials(
    JSON.parse(readFileSync(OAUTH_TOKEN_PATH, "utf8")),
  );

  oauth2Client.on("tokens", (tokens) => {
    const current = JSON.parse(readFileSync(OAUTH_TOKEN_PATH, "utf8"));
    writeFileSync(
      OAUTH_TOKEN_PATH,
      JSON.stringify({ ...current, ...tokens }, null, 2),
      "utf8",
    );
  });

  return oauth2Client;
};

const getServiceAccountAuth = async () => {
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!credentialsPath) {
    console.error("Falta GOOGLE_APPLICATION_CREDENTIALS en .env.local");
    process.exit(1);
  }

  const absoluteCredentials = resolve(process.cwd(), credentialsPath);
  if (!existsSync(absoluteCredentials)) {
    console.error(`No existe: ${absoluteCredentials}`);
    process.exit(1);
  }

  process.env.GOOGLE_APPLICATION_CREDENTIALS = absoluteCredentials;
  return new google.auth.GoogleAuth({ scopes: SCOPES });
};

const getAuth = async () => {
  if (AUTH_MODE === "service_account") {
    return getServiceAccountAuth();
  }
  return getOAuthAuth();
};

const formatRow = (row, keys) =>
  keys
    .map((key, index) => {
      const value = row.keys?.[index] ?? "-";
      return `${key}=${value}`;
    })
    .join(" | ");

const sumMetrics = (rows) =>
  rows.reduce(
    (acc, row) => ({
      clicks: acc.clicks + (row.clicks ?? 0),
      impressions: acc.impressions + (row.impressions ?? 0),
    }),
    { clicks: 0, impressions: 0 },
  );

const main = async () => {
  if (isAuthOnly) {
    await runOAuthFlow();
    return;
  }

  const auth = await getAuth();
  const searchconsole = google.searchconsole({ version: "v1", auth });

  const queryAnalytics = async (dimensions) => {
    const response = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: formatDate(start),
        endDate: formatDate(end),
        dimensions,
        rowLimit: ROW_LIMIT,
      },
    });
    return response.data.rows ?? [];
  };

  console.log(`\n📊 Google Search Console — ${SITE_URL}`);
  console.log(`Auth: ${AUTH_MODE} | ${formatDate(start)} → ${formatDate(end)}\n`);

  const sites = await searchconsole.sites.list();
  const entries = sites.data.siteEntry ?? [];

  if (entries.length === 0) {
    console.error("No hay propiedades visibles para esta cuenta.");
    console.error(
      "Usa el mismo Gmail con el que entras a search.google.com/search-console",
    );
    process.exit(1);
  }

  const hasAccess = entries.some((entry) => entry.siteUrl === SITE_URL);
  if (!hasAccess) {
    console.error(`Sin acceso a ${SITE_URL}. Propiedades disponibles:`);
    for (const entry of entries) {
      console.error(`  - ${entry.siteUrl}`);
    }
    console.error("\nAjusta GSC_SITE_URL en .env.local (copia una URL de arriba).");
    process.exit(1);
  }

  const summaryRows = await queryAnalytics([]);
  const totals = sumMetrics(summaryRows);
  const ctr =
    totals.impressions > 0
      ? ((totals.clicks / totals.impressions) * 100).toFixed(2)
      : "0.00";

  console.log("Resumen");
  console.log(`  Clics:        ${totals.clicks}`);
  console.log(`  Impresiones:  ${totals.impressions}`);
  console.log(`  CTR:          ${ctr}%`);

  const queries = await queryAnalytics(["query"]);
  console.log(`\nTop ${ROW_LIMIT} consultas`);
  for (const row of queries) {
    console.log(
      `  ${formatRow(row, ["query"])} | clics=${row.clicks} | imp=${row.impressions} | pos=${row.position?.toFixed(1)}`,
    );
  }
  if (queries.length === 0) console.log("  (sin datos)");

  const pages = await queryAnalytics(["page"]);
  console.log(`\nTop ${ROW_LIMIT} páginas`);
  for (const row of pages) {
    console.log(
      `  ${formatRow(row, ["page"])} | clics=${row.clicks} | imp=${row.impressions}`,
    );
  }
  if (pages.length === 0) console.log("  (sin datos)");

  const sitemaps = await searchconsole.sitemaps.list({ siteUrl: SITE_URL });
  const sitemapEntries = sitemaps.data.sitemap ?? [];
  console.log(`\nSitemaps (${sitemapEntries.length})`);
  for (const sitemap of sitemapEntries.slice(0, 5)) {
    console.log(`  ${sitemap.path}`);
  }

  console.log("\n✓ Reporte listo.\n");
};

main().catch((error) => {
  const message = error?.response?.data?.error?.message ?? error.message;
  console.error(`\nError: ${message}\n`);
  process.exit(1);
});
