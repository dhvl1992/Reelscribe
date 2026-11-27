// Clean-up only. The August 2026 ReelScribe installed a service worker here that served its own
// saved copy of the app forever (cache-first), so phones never saw new versions.
// This replacement removes that saved copy, removes itself, and reloads open ReelScribe tabs.
// It does not touch the AI model cache or the share inbox.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil((async () => {
  await caches.delete("reel-scribe-shell-v1");
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: "window" })) c.navigate(c.url);
})()));
