// Avisa a Bing (y a los buscadores que usan IndexNow) qué URLs del sitio existen o cambiaron.
// ChatGPT busca sobre el índice de Bing. Correr después de un deploy con cambios de contenido:
//   npm run indexnow            → todas las URLs del sitemap de producción
//   npm run indexnow -- /a /b   → solo esas rutas
const HOST = "www.ideamadera.cl";
const KEY = "aad92ed9d50bdec592497389b67967c2"; // también publicada en public/aad92ed9d50bdec592497389b67967c2.txt
const SITE = `https://${HOST}`;

const paths = process.argv.slice(2);
let urlList;
if (paths.length > 0) {
  urlList = paths.map((p) => new URL(p, SITE).toString());
} else {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => u.startsWith(SITE));
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${urlList.length} URLs → HTTP ${res.status} ${res.statusText}`);
if (res.status >= 400) {
  console.log(await res.text());
  process.exit(1);
}
