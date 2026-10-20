/* ================================================================
   PWA — js/pwa.js
   ----------------------------------------------------------------
   Registers service-worker.js so the site is installable and its core
   files work offline. Also shows an "Update available" banner when a
   new deploy has taken over. Safe no-op where service workers are
   unsupported (file://, older browsers).
   ================================================================ */
// The update banner watches for a newer service worker taking over (a new
// deploy landed) instead of silently sitting on stale JS/HTML.
if ("serviceWorker" in navigator) {
  function showSwUpdateBanner() {
    if (document.getElementById("swUpdateBanner")) return;
    const bar = document.createElement("div");
    bar.id = "swUpdateBanner";
    bar.innerHTML =
      '<span class="sw-update-text">A new version of the site is ready.</span>' +
      '<button type="button" class="sw-update-btn">Update</button>' +
      '<button type="button" class="sw-update-dismiss" aria-label="Dismiss">✕</button>';
    bar.querySelector(".sw-update-btn").addEventListener("click", () => {
      window.location.reload();
    });
    bar.querySelector(".sw-update-dismiss").addEventListener("click", () => {
      bar.remove();
    });
    document.body.appendChild(bar);
  }

  let swRefreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    // Fires once a new service worker takes control. The very first
    // time a service worker ever activates on this page there's no
    // reload needed (nothing was showing stale content yet) — only
    // show the banner for genuine "you already had the app open, and
    // it just changed under you" updates.
    if (!navigator.serviceWorker.controller || swRefreshing) return;
    if (window.__swHadController) showSwUpdateBanner();
    window.__swHadController = true;
  });

  window.addEventListener("load", function () {
    window.__swHadController = !!navigator.serviceWorker.controller;
    navigator.serviceWorker
      .register("service-worker.js")
      .then(function (reg) {
        if (reg.waiting && navigator.serviceWorker.controller) {
          showSwUpdateBanner();
        }
        reg.addEventListener("updatefound", function () {
          const installing = reg.installing;
          if (!installing) return;
          installing.addEventListener("statechange", function () {
            if (
              installing.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              showSwUpdateBanner();
            }
          });
        });
        // Browsers already check for a new service-worker.js on
        // navigation, but an app left open in a background tab for a
        // while won't get that chance — so also check whenever the
        // tab becomes visible again.
        document.addEventListener("visibilitychange", function () {
          if (document.visibilityState === "visible") {
            reg.update().catch(function () {});
          }
        });
      })
      .catch(function (err) {
        console.warn("Service worker registration failed:", err);
      });
  });
}
