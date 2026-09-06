#!/usr/bin/env node

import { createServer } from "node:http";
import { exec } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, appendFileSync } from "node:fs";
import { resolve } from "node:path";
import { google } from "googleapis";

const MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID ?? "G-KBR6DKMXVM";
const DAYS = Number(process.env.GA_REPORT_DAYS ?? 28);
const ROW_LIMIT = Number(process.env.GA_REPORT_ROWS ?? 10);
const OAUTH_CLIENT_PATH = resolve(
  process.cwd(),
  process.env.GOOGLE_OAUTH_CLIENT_PATH ?? ".secrets/gcp-oauth-client.json",
);
const OAUTH_TOKEN_PATH = resolve(
  process.cwd(),
  process.env.GA_OAUTH_TOKEN_PATH ?? ".secrets/ga-oauth-token.json",
);
const OAUTH_REDIRECT_PORT = Number(process.env.GA_OAUTH_PORT ?? 53683);
const OAUTH_REDIRECT_URI = `http://127.0.0.1:${OAUTH_REDIRECT_PORT}/oauth2callback`;
const SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"];
const ENV_LOCAL_PATH = resolve(process.cwd(), ".env.local");

const isAuthOnly = process.argv.includes("--auth");
const isListOnly = process.argv.includes("--list");

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

  console.log("\n🔐 Inicia sesión con el Gmail que administra GA4 (G-KBR6DKMXVM).\n");

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
  console.log("Ejecuta: npm run ga:report\n");
};

const getAuth = async () => {
  const oauth2Client = createOAuthClient();

  if (!existsSync(OAUTH_TOKEN_PATH)) {
    console.error("No hay token OAuth. Ejecuta primero: npm run ga:auth\n");
    process.exit(1);
  }

  oauth2Client.setCredentials(JSON.parse(readFileSync(OAUTH_TOKEN_PATH, "utf8")));
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

const numericPropertyId = (propertyName) =>
  String(propertyName ?? "").replace(/^properties\//, "");

const persistPropertyId = (propertyId) => {
  if (!propertyId || !existsSync(ENV_LOCAL_PATH)) return;
  const env = readFileSync(ENV_LOCAL_PATH, "utf8");
  if (/(^|\n)GA_PROPERTY_ID=/.test(env)) return;
  appendFileSync(ENV_LOCAL_PATH, `\nGA_PROPERTY_ID=${propertyId}\n`, "utf8");
  console.log(`✓ GA_PROPERTY_ID=${propertyId} guardado en .env.local`);
};

const listAccountProperties = async (admin) => {
  const summaries = [];
  let pageToken;

  do {
    const response = await admin.accountSummaries.list({
      pageSize: 200,
      pageToken,
    });
    summaries.push(...(response.data.accountSummaries ?? []));
    pageToken = response.data.nextPageToken;
  } while (pageToken);

  const properties = [];
  for (const account of summaries) {
    for (const property of account.propertySummaries ?? []) {
      properties.push({
        accountName: account.displayName ?? account.account,
        propertyId: numericPropertyId(property.property),
        property: property.property,
        displayName: property.displayName ?? property.property,
      });
    }
  }
  return properties;
};

const findPropertyByMeasurementId = async (admin, properties) => {
  for (const property of properties) {
    const streams = await admin.properties.dataStreams.list({
      parent: property.property,
    });
    const match = (streams.data.dataStreams ?? []).some(
      (stream) => stream.webStreamData?.measurementId === MEASUREMENT_ID,
    );
    if (match) return property;
  }
  return null;
};

const resolveProperty = async (admin) => {
  const properties = await listAccountProperties(admin);

  if (properties.length === 0) {
    console.error("No hay propiedades GA4 visibles para esta cuenta.");
    console.error("Usa el mismo Gmail con el que entras a analytics.google.com");
    process.exit(1);
  }

  const configuredId = numericPropertyId(process.env.GA_PROPERTY_ID);
  if (configuredId) {
    const configured = properties.find((item) => item.propertyId === configuredId);
    if (!configured) {
      console.error(`Sin acceso a properties/${configuredId}. Propiedades disponibles:`);
      for (const item of properties) {
        console.error(`  - ${item.propertyId} · ${item.displayName} (${item.accountName})`);
      }
      process.exit(1);
    }
    return configured;
  }

  const matched = await findPropertyByMeasurementId(admin, properties);
  if (matched) {
    persistPropertyId(matched.propertyId);
    return matched;
  }

  console.error(`No encontré el stream ${MEASUREMENT_ID}. Propiedades visibles:`);
  for (const item of properties) {
    console.error(`  - ${item.propertyId} · ${item.displayName} (${item.accountName})`);
  }
  console.error("\nPon GA_PROPERTY_ID=<id numérico> en .env.local y reintenta.");
  process.exit(1);
};

const metricMap = (response) => {
  const headers = response.data.metricHeaders ?? [];
  const values = response.data.rows?.[0]?.metricValues ?? [];
  return Object.fromEntries(
    headers.map((header, index) => [header.name, values[index]?.value ?? "0"]),
  );
};

const printDimensionRows = (title, response, dimensionNames) => {
  const rows = response.data.rows ?? [];
  const metricHeaders = response.data.metricHeaders ?? [];
  console.log(`\n${title}`);
  if (rows.length === 0) {
    console.log("  (sin datos)");
    return;
  }

  for (const row of rows) {
    const dims = (row.dimensionValues ?? [])
      .map((value, index) => `${dimensionNames[index]}=${value.value || "/"}`)
      .join(" | ");
    const metrics = (row.metricValues ?? [])
      .map((value, index) => `${metricHeaders[index]?.name}=${value.value ?? "0"}`)
      .join(" | ");
    console.log(`  ${dims} | ${metrics}`);
  }
};

const main = async () => {
  if (isAuthOnly) {
    await runOAuthFlow();
    return;
  }

  const auth = await getAuth();
  const admin = google.analyticsadmin({ version: "v1beta", auth });
  const analyticsdata = google.analyticsdata({ version: "v1beta", auth });
  const property = await resolveProperty(admin);
  const propertyName = `properties/${property.propertyId}`;

  if (isListOnly) {
    const properties = await listAccountProperties(admin);
    console.log("\nPropiedades GA4 visibles\n");
    for (const item of properties) {
      const selected = item.propertyId === property.propertyId ? " ← actual" : "";
      console.log(
        `  ${item.propertyId} · ${item.displayName} (${item.accountName})${selected}`,
      );
    }
    console.log(`\nMeasurement ID buscado: ${MEASUREMENT_ID}\n`);
    return;
  }

  console.log(`\n📊 Google Analytics 4 — ${property.displayName}`);
  console.log(`Property: ${propertyName} · stream ${MEASUREMENT_ID}`);
  console.log(`${formatDate(start)} → ${formatDate(end)}\n`);

  const summary = await analyticsdata.properties.runReport({
    property: propertyName,
    requestBody: {
      dateRanges: [{ startDate: formatDate(start), endDate: formatDate(end) }],
      metrics: [
        { name: "activeUsers" },
        { name: "sessions" },
        { name: "screenPageViews" },
        { name: "engagedSessions" },
        { name: "bounceRate" },
        { name: "averageSessionDuration" },
      ],
    },
  });

  const totals = metricMap(summary);
  console.log("Resumen");
  console.log(`  Usuarios:           ${totals.activeUsers ?? 0}`);
  console.log(`  Sesiones:           ${totals.sessions ?? 0}`);
  console.log(`  Vistas:             ${totals.screenPageViews ?? 0}`);
  console.log(`  Sesiones engaged:   ${totals.engagedSessions ?? 0}`);
  console.log(
    `  Bounce rate:        ${(Number(totals.bounceRate || 0) * 100).toFixed(2)}%`,
  );
  console.log(
    `  Duración media:     ${Number(totals.averageSessionDuration || 0).toFixed(1)}s`,
  );

  const pages = await analyticsdata.properties.runReport({
    property: propertyName,
    requestBody: {
      dateRanges: [{ startDate: formatDate(start), endDate: formatDate(end) }],
      dimensions: [{ name: "pagePath" }],
      metrics: [
        { name: "screenPageViews" },
        { name: "sessions" },
        { name: "activeUsers" },
      ],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: ROW_LIMIT,
    },
  });
  printDimensionRows(`Top ${ROW_LIMIT} páginas`, pages, ["path"]);

  const sources = await analyticsdata.properties.runReport({
    property: propertyName,
    requestBody: {
      dateRanges: [{ startDate: formatDate(start), endDate: formatDate(end) }],
      dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
      metrics: [{ name: "sessions" }, { name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: ROW_LIMIT,
    },
  });
  printDimensionRows(`Top ${ROW_LIMIT} fuentes`, sources, ["source", "medium"]);

  try {
    const realtime = await analyticsdata.properties.runRealtimeReport({
      property: propertyName,
      requestBody: {
        metrics: [{ name: "activeUsers" }],
        dimensions: [{ name: "unifiedScreenName" }],
        limit: 5,
      },
    });
    printDimensionRows("Tiempo real (30 min)", realtime, ["screen"]);
  } catch {
    console.log("\nTiempo real (30 min)");
    console.log("  (no disponible aún)");
  }

  console.log("\n✓ Reporte listo.\n");
};

main().catch((error) => {
  const apiError = error?.response?.data?.error;
  const message = apiError?.message ?? error.message;
  console.error(`\nError: ${message}\n`);
  if (String(message).includes("has not been used") || String(message).includes("disabled")) {
    console.error("Activa estas APIs en el proyecto GCP proyectogonzalo-496821:");
    console.error(
      "  https://console.developers.google.com/apis/api/analyticsdata.googleapis.com/overview?project=proyectogonzalo-496821",
    );
    console.error(
      "  https://console.developers.google.com/apis/api/analyticsadmin.googleapis.com/overview?project=proyectogonzalo-496821",
    );
    console.error("");
  }
  process.exit(1);
});
