/* ==========================================================================
   Haptic (vibration) feedback for phones
   --------------------------------------------------------------------------
   • Android (Chrome, Firefox, Samsung Internet): navigator.vibrate().
   • iPhone / iPad (Safari, 17.4+): Apple doesn't offer the Vibration API, but
     toggling a native <input type="checkbox" switch> produces a light haptic
     tick. We toggle a hidden one from inside the tap handler. iOS can only
     do a single "tick" style, so patterns become 1–3 evenly spaced ticks.
   • Desktop / non-touch: does nothing at all.

   A small "Vibration on/off" switch is added to the footer on touch devices;
   the choice is remembered in localStorage ("cwHaptics" = "off" to disable).
   Nothing here changes what any button does — it only adds feedback.
   ========================================================================== */
(function () {
  "use strict";

  var KEY = "cwHaptics";

  // Feel of each kind of interaction (milliseconds; arrays are buzz/pause/buzz…)
  var PATTERNS = {
    select: 6, //  tabs, chips, filters  — the lightest tick
    tap: 10, //     ordinary buttons and cards
    success: [10, 45, 18], // ticked a to-do, right quiz answer
    error: [40, 50, 40], //   wrong quiz answer
    warn: 28, //     delete / remove
    heart: [12, 40, 12, 40, 12, 40, 30], // "Click this ♥" heartbeat
  };

  var SEL = {
    off: ".haptics-toggle, input, textarea, select, option",
    danger:
      ".confirm-delete, .bucket-icon-btn.delete, .track-del, .album-del-btn, .memory-del, .pbs-sbtn.danger, .daycard-actions button.danger",
    heart: "#heartBtn",
    quiz: ".quiz-opt",
    check: ".bucket-check",
    select:
      ".tab-btn, .theme-btn, .hamburger, .bucket-filter, .movie-subtab-btn, .cal-filter-btn, .music-pl-btn, .games-chip, .pbs-tab, .pbs-chip",
    tap: 'button, a.btn, [role="button"], .ow-card, .games-tile, .quiz-select-card, .photo-tile, .cal-day, .miss-card, .little-chip, .today-toggle, .pbs-sticker, .movie-card',
  };

  var ua = navigator.userAgent || "";
  var isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var canVibrate = typeof navigator.vibrate === "function";
  var supported = canVibrate || isIOS;

  function isTouchDevice() {
    return (
      !!window.matchMedia && window.matchMedia("(hover: none) and (pointer: coarse)").matches
    );
  }
  function enabled() {
    try {
      return localStorage.getItem(KEY) !== "off";
    } catch (e) {
      return true;
    }
  }

  /* ---- iOS: hidden native switch ---- */
  var iosLabel = null;
  function iosTick() {
    try {
      if (!iosLabel) {
        iosLabel = document.createElement("label");
        iosLabel.setAttribute("aria-hidden", "true");
        iosLabel.style.cssText =
          "position:fixed;left:-100px;top:-100px;width:1px;height:1px;opacity:0;overflow:hidden;pointer-events:none;";
        var sw = document.createElement("input");
        sw.type = "checkbox";
        sw.setAttribute("switch", "");
        sw.tabIndex = -1;
        iosLabel.appendChild(sw);
        document.body.appendChild(iosLabel);
      }
      iosLabel.click();
    } catch (e) {
      /* haptics are a nicety; never break the page */
    }
  }
  function iosPlay(pattern) {
    if (typeof pattern === "number") return iosTick();
    var t = 0;
    for (var i = 0; i < pattern.length; i++) {
      if (i % 2 === 0) {
        if (t === 0) iosTick();
        else setTimeout(iosTick, t);
      }
      t += pattern[i];
    }
  }

  var lastAt = 0;
  function buzz(kind) {
    if (!supported || !enabled() || document.hidden) return;
    var now = Date.now();
    if (now - lastAt < 30) return; // ignore double-fires from one tap
    lastAt = now;
    var p = PATTERNS[kind] || PATTERNS.tap;
    try {
      if (canVibrate) navigator.vibrate(p);
      else if (isIOS) iosPlay(p);
    } catch (e) {
      /* ignore */
    }
  }

  function disabledEl(el) {
    return el.disabled || el.getAttribute("aria-disabled") === "true";
  }

  function onClick(e) {
    if (!e.isTrusted || !isTouchDevice()) return; // real taps on phones only
    var t = e.target;
    if (!t || !t.closest) return;
    if (t.closest(SEL.off)) return;

    var el;
    if ((el = t.closest(SEL.danger))) return disabledEl(el) ? 0 : buzz("warn");
    if ((el = t.closest(SEL.heart))) return buzz("heart");

    if ((el = t.closest(SEL.quiz))) {
      if (disabledEl(el)) return;
      // the answer is graded a moment after the tap; feel the result
      setTimeout(function () {
        buzz(
          el.classList.contains("correct")
            ? "success"
            : el.classList.contains("wrong")
              ? "error"
              : "tap",
        );
      }, 60);
      return;
    }
    if ((el = t.closest(SEL.check))) {
      // The list re-renders when you tick something, so compare counts instead
      // of holding on to the old element. Success if one more is done.
      var before = document.querySelectorAll(".bucket-item.done").length;
      var waited = 0;
      (function poll() {
        var now = document.querySelectorAll(".bucket-item.done").length;
        if (now > before) return buzz("success");
        if (now < before || waited >= 250) return buzz("select");
        waited += 50;
        setTimeout(poll, 50);
      })();
      return;
    }
    if ((el = t.closest(SEL.select))) return disabledEl(el) ? 0 : buzz("select");
    if ((el = t.closest(SEL.tap))) return disabledEl(el) ? 0 : buzz("tap");
  }
  document.addEventListener("click", onClick, true);

  /* ---- footer switch (touch devices only) ---- */
  function addToggle() {
    if (!supported || !isTouchDevice()) return;
    var footer = document.querySelector("footer");
    if (!footer || footer.querySelector(".haptics-toggle")) return;
    var words = { on: "Vibration on", off: "Vibration off", label: "Tap vibration" };

    var row = document.createElement("p");
    row.className = "haptics-row";
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "haptics-toggle";
    btn.setAttribute("aria-label", words.label);
    function paint() {
      var on = enabled();
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.textContent = on ? words.on : words.off;
      btn.classList.toggle("is-off", !on);
    }
    btn.addEventListener("click", function () {
      try {
        localStorage.setItem(KEY, enabled() ? "off" : "on");
      } catch (e) {}
      paint();
      if (enabled()) buzz("success"); // a little "it's on" confirmation
    });
    paint();
    row.appendChild(btn);
    footer.appendChild(row);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addToggle);
  } else {
    addToggle();
  }

  // Small public hook in case other code wants to buzz later.
  window.cwHaptics = { buzz: buzz, supported: supported };
})();
