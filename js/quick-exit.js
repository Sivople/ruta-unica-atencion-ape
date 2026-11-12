/**
 * quick-exit.js — Botón de Salida Rápida y atajo global con la tecla Escape.
 * Reemplaza la entrada actual del historial para salir de inmediato sin dejar rastro.
 */
(function () {
  "use strict";

  var SAFE_URL = "https://www.google.com";

  function triggerQuickExit() {
    window.location.replace(SAFE_URL);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var exitBtn = document.getElementById("quick-exit-btn");
    if (exitBtn) {
      exitBtn.addEventListener("click", triggerQuickExit);
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        event.preventDefault();
        triggerQuickExit();
      }
    });
  });
})();
