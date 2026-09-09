/* ============================================================================
 * Service Worker.
 *
 * Cache-first: Nach dem ersten Besuch läuft die Seite komplett offline —
 * auch mit neuen Adressteilen, denn die erreichen den Server ohnehin nie.
 *
 * Die Cache-Kennung wird beim Bauen aus package.json eingesetzt. Sie von
 * Hand mit der sichtbaren Versionsnummer gleichzuhalten war im
 * Vorgängerprojekt die häufigste Ursache dafür, dass iPads eine alte
 * Fassung behielten — hier gibt es nur noch eine Quelle.
 * ========================================================================== */

const CACHE = "handhoch-v0.11.0";
const DATEIEN = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(DATEIEN)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(
      (treffer) =>
        treffer ??
        fetch(e.request).catch(() =>
          // Navigation offline ohne Cache-Treffer → Seite selbst liefern.
          e.request.mode === "navigate"
            ? caches.match("./index.html")
            : Response.error(),
        ),
    ),
  );
});
