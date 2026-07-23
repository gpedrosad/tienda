#!/usr/bin/env node
/**
 * Envía el sitemap canónico www a GSC y elimina el sitemap sin www si existe.
 * Requiere token con scope webmasters (escritura): .secrets/gsc-oauth-write-token.json
 *
 *   npm run gsc:sitemap
 *   npm run gsc:sitemap:auth   # si el token write expiró
 */
import { createServer } from "node:http";
import { exec } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { google } from "googleapis";

const SITE_URL = process.env.GSC_SITE_URL ?? "sc-domain:ideamadera.cl";
const CANONICAL_SITEMAP = "https://www.ideamadera.cl/sitemap.xml";
const LEGACY_SITEMAPS = [
  "https://ideamadera.cl/sitemap.xml",
  "http://ideamadera.cl/sitemap.xml",
  "http://www.ideamadera.cl/sitemap.xml",
];
const INDEX_URLS = [
  "https://www.ideamadera.cl/",
  "https://www.ideamadera.cl/peldanos-a-medida",
  "https://www.ideamadera.cl/cubiertas-a-medida",
  "https://www.ideamadera.cl/molduras-a-medida",
  "https://www.ideamadera.cl/muebles-chillan",
  "https://www.ideamadera.cl/muebles-de-cocina-chillan",
  "https://www.ideamadera.cl/puertas-a-medida",
  "https://www.ideamadera.cl/collections/mesas",
  "https://www.ideamadera.cl/products/mesa-nordica",
  "https://www.ideamadera.cl/products/mesa-tripode-ratona",
  "https://www.ideamadera.cl/products/silla-kentucky",
  "https://www.ideamadera.cl/products/mesa-centro-roma",
];

const OAUTH_CLIENT_PATH = resolve(
  process.cwd(),
  process.env.GOOGLE_OAUTH_CLIENT_PATH ?? ".secrets/gcp-oauth-client.json",
);
const OAUTH_TOKEN_PATH = resolve(
  process.cwd(),
  process.env.GSC_OAUTH_WRITE_TOKEN_PATH ?? ".secrets/gsc-oauth-write-token.json",
);
const OAUTH_REDIRECT_PORT = Number(process.env.GSC_SITEMAP_OAUTH_PORT ?? 53684);
const OAUTH_REDIRECT_URI = `http://127.0.0.1:${OAUTH_REDIRECT_PORT}/oauth2callback`;
const SCOPES = ["https://www.googleapis.com/auth/webmasters"];
const isAuthOnly = process.argv.includes("--auth");

function openBrowser(url) {
  const command =
    process.platform === "darwin"
      ? `open "${url}"`
      : process.platform === "win32"
        ? `start "" "${url}"`
        : `xdg-open "${url}"`;
  exec(command);
}

function loadOAuthClientSecrets() {
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
}

function createOAuthClient() {
  const { client_id, client_secret } = loadOAuthClientSecrets();
  return new google.auth.OAuth2(client_id, client_secret, OAUTH_REDIRECT_URI);
}

async function runOAuthFlow() {
  const oauth2Client = createOAuthClient();
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
  });

  console.log("\n🔐 Autoriza escritura en Search Console (sitemaps).\n");

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
        res.end("<h1>Error de autorización</h1>");
        server.close();
        reject(new Error(authError));
        return;
      }
      const authCode = requestUrl.searchParams.get("code");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end("<h1>✓ Autorizado</h1><p>Ya puedes cerrar esta pestaña.</p>");
      server.close();
      resolvePromise(authCode);
    });
    server.listen(OAUTH_REDIRECT_PORT, "127.0.0.1", () => {
      console.log(`Abriendo navegador…\n${authUrl}\n`);
      openBrowser(authUrl);
    });
    server.on("error", reject);
  });

  const { tokens } = await oauth2Client.getToken(code);
  writeFileSync(OAUTH_TOKEN_PATH, JSON.stringify(tokens, null, 2), "utf8");
  console.log(`\n✓ Token write guardado en ${OAUTH_TOKEN_PATH}`);
  console.log("Ejecuta: npm run gsc:sitemap\n");
}

async function getAuth() {
  if (!existsSync(OAUTH_TOKEN_PATH)) {
    console.error("No hay token write. Ejecuta: npm run gsc:sitemap:auth\n");
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

async function main() {
  if (isAuthOnly) {
    await runOAuthFlow();
    return;
  }

  const auth = await getAuth();
  const searchconsole = google.searchconsole({ version: "v1", auth });

  console.log(`\n🗺  Search Console sitemaps — ${SITE_URL}\n`);

  const listed = await searchconsole.sitemaps.list({ siteUrl: SITE_URL });
  const existing = (listed.data.sitemap ?? []).map((entry) => entry.path);
  console.log("Sitemaps actuales:");
  for (const path of existing) console.log(`  - ${path}`);

  for (const legacy of LEGACY_SITEMAPS) {
    if (!existing.includes(legacy)) continue;
    try {
      await searchconsole.sitemaps.delete({ siteUrl: SITE_URL, feedpath: legacy });
      console.log(`✓ Eliminado sitemap legacy: ${legacy}`);
    } catch (error) {
      console.warn(`No se pudo eliminar ${legacy}: ${error.message}`);
    }
  }

  await searchconsole.sitemaps.submit({
    siteUrl: SITE_URL,
    feedpath: CANONICAL_SITEMAP,
  });
  console.log(`✓ Enviado sitemap canónico: ${CANONICAL_SITEMAP}`);

  console.log("\nInspección rápida de URLs prioritarias:");
  for (const url of INDEX_URLS) {
    try {
      const result = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: SITE_URL,
        },
      });
      const index = result.data.inspectionResult?.indexStatusResult;
      console.log(
        `  ${url}\n    → ${index?.coverageState ?? "?"} | canonical Google: ${index?.googleCanonical ?? "-"}`,
      );
    } catch (error) {
      console.warn(`  ${url}\n    → inspección falló: ${error.message}`);
    }
  }

  console.log(
    "\nNota: la API no permite 'solicitar indexación' masiva; usa Inspección de URL en la UI de GSC para forzar recrawl de las URLs clave.\n",
  );
  console.log("✓ Listo.\n");
}

main().catch((error) => {
  const message = error?.response?.data?.error?.message ?? error.message;
  console.error(`\nError: ${message}\n`);
  if (String(message).includes("invalid_grant")) {
    console.error("Refresh expirado → npm run gsc:sitemap:auth\n");
  }
  process.exit(1);
});
