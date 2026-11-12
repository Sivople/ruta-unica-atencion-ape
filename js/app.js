/**
 * app.js — Lógica de UI, filtros, acordeones, carga resiliente de logos y accesibilidad
 * Cero rastro: todo el estado vive únicamente en memoria durante la sesión.
 */
(function () {
  "use strict";

  var data = window.RUTA_DATA;
  if (!data) {
    return;
  }

  var state = {
    activeFilter: "all",
    visitedSteps: new Set(),
    fontScale: 1,
    highContrast: false
  };

  var FONT_MIN = 0.875;
  var FONT_MAX = 1.375;
  var FONT_STEP = 0.125;

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function createSvgIcon(type) {
    var svgNS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2.2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");

    var path = document.createElementNS(svgNS, "path");
    if (type === "chevron") {
      path.setAttribute("d", "M6 9l6 6 6-6");
    } else if (type === "map") {
      path.setAttribute("d", "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z");
      var circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("cx", "12");
      circle.setAttribute("cy", "10");
      circle.setAttribute("r", "3");
      svg.appendChild(circle);
    } else if (type === "check") {
      path.setAttribute("d", "M20 6L9 17l-5-5");
    } else if (type === "shield") {
      path.setAttribute("d", "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z");
    }
    svg.appendChild(path);
    return svg;
  }

  function createFallbackChip(label, title) {
    var chip = document.createElement("span");
    chip.className = "logo-fallback-chip";
    chip.textContent = label;
    if (title) {
      chip.setAttribute("title", title);
    }
    return chip;
  }

  function renderHeaderLogo() {
    var container = document.getElementById("header-logo-ribbon");
    if (!container) {
      return;
    }

    var banner = data.headerBanner;
    if (!banner || !banner.src) {
      container.appendChild(createFallbackChip(banner ? banner.fallbackText : "Gobierno de Veracruz"));
      return;
    }

    var img = document.createElement("img");
    img.className = "logo-ribbon__banner";
    img.src = banner.src;
    img.alt = banner.alt;
    img.decoding = "async";
    img.addEventListener("error", function () {
      if (img.parentNode) {
        img.parentNode.replaceChild(createFallbackChip(banner.fallbackText, banner.alt), img);
      }
    });

    container.appendChild(img);
  }

  function renderFooterLogos() {
    var container = document.getElementById("footer-logos");
    if (!container) {
      return;
    }

    data.footerLogos.forEach(function (logo) {
      var slot = document.createElement("div");
      slot.className = "footer-logo-slot";

      if (logo.src) {
        var img = document.createElement("img");
        img.src = logo.src;
        img.alt = logo.nombre + " (" + logo.sigla + ")";
        img.loading = "lazy";
        img.decoding = "async";
        img.addEventListener("error", function () {
          if (img.parentNode) {
            img.parentNode.replaceChild(createFallbackChip(logo.sigla, logo.nombre), img);
          }
        });
        slot.appendChild(img);
      } else {
        slot.appendChild(createFallbackChip(logo.sigla, logo.nombre));
      }

      container.appendChild(slot);
    });
  }

  function updateProgress() {
    var total = data.steps.length;
    var count = state.visitedSteps.size;
    var pct = Math.round((count / total) * 100);

    var labelEl = document.getElementById("progress-count");
    var fillEl = document.getElementById("progress-fill");
    var barEl = document.getElementById("progress-track");

    if (labelEl) {
      labelEl.textContent = count + " de " + total + " pasos revisados";
    }
    if (fillEl) {
      fillEl.style.width = pct + "%";
    }
    if (barEl) {
      barEl.setAttribute("aria-valuenow", String(count));
    }
  }

  function toggleStep(stepNumber, trigger, body) {
    var isExpanded = trigger.getAttribute("aria-expanded") === "true";
    var nextExpanded = !isExpanded;
    trigger.setAttribute("aria-expanded", String(nextExpanded));
    body.hidden = !nextExpanded;

    if (nextExpanded) {
      state.visitedSteps.add(stepNumber);
      updateProgress();
    }
  }

  function renderTimeline() {
    var list = document.getElementById("timeline-list");
    if (!list) {
      return;
    }

    data.steps.forEach(function (step) {
      var actor = data.actors[step.actor];
      var li = document.createElement("li");
      li.className = "step-card step-card--" + step.actor;
      li.dataset.actor = step.actor;
      li.dataset.step = String(step.number);

      var marker = document.createElement("span");
      marker.className = "step-card__marker";
      marker.setAttribute("aria-hidden", "true");
      marker.textContent = String(step.number);
      li.appendChild(marker);

      var panel = document.createElement("div");
      panel.className = "step-card__panel";

      var bodyId = "step-body-" + step.number;
      var trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "step-card__trigger";
      trigger.setAttribute("aria-expanded", step.number === 1 ? "true" : "false");
      trigger.setAttribute("aria-controls", bodyId);

      var textWrap = document.createElement("div");
      var meta = document.createElement("div");
      meta.className = "step-card__meta";

      var badge = document.createElement("span");
      badge.className = "actor-badge actor-badge--" + step.actor;
      badge.appendChild(createSvgIcon("shield"));
      var badgeText = document.createElement("span");
      badgeText.textContent = actor.name;
      badge.appendChild(badgeText);

      var stepLabel = document.createElement("span");
      stepLabel.className = "step-card__step-label";
      stepLabel.textContent = "Paso " + step.number + " de " + data.steps.length;

      meta.appendChild(badge);
      meta.appendChild(stepLabel);

      var title = document.createElement("h3");
      title.className = "step-card__title";
      title.textContent = step.title;

      textWrap.appendChild(meta);
      textWrap.appendChild(title);

      var chevron = document.createElement("span");
      chevron.className = "step-card__chevron";
      chevron.setAttribute("aria-hidden", "true");
      chevron.appendChild(createSvgIcon("chevron"));

      trigger.appendChild(textWrap);
      trigger.appendChild(chevron);

      var body = document.createElement("div");
      body.id = bodyId;
      body.className = "step-card__body";
      body.hidden = step.number !== 1;

      var companion = document.createElement("p");
      companion.className = "step-card__companion";
      companion.textContent = step.companion;
      body.appendChild(companion);

      var checkNote = document.createElement("div");
      checkNote.className = "step-card__check";
      checkNote.appendChild(createSvgIcon("check"));
      var checkSpan = document.createElement("span");
      checkSpan.textContent = "Instancia responsable: " + actor.name;
      checkNote.appendChild(checkSpan);
      body.appendChild(checkNote);

      trigger.addEventListener("click", function () {
        toggleStep(step.number, trigger, body);
      });

      panel.appendChild(trigger);
      panel.appendChild(body);
      li.appendChild(panel);
      list.appendChild(li);
    });

    // El paso 1 inicia abierto para lectura inmediata
    state.visitedSteps.add(1);
    updateProgress();
  }

  function applyTimelineFilter(filterValue) {
    state.activeFilter = filterValue;

    var filterButtons = document.querySelectorAll("[data-filter]");
    filterButtons.forEach(function (btn) {
      var isActive = btn.dataset.filter === filterValue;
      btn.setAttribute("aria-pressed", String(isActive));
    });

    var cards = document.querySelectorAll("#timeline-list .step-card");
    cards.forEach(function (card) {
      var matches = filterValue === "all" || card.dataset.actor === filterValue;
      card.hidden = !matches;
    });
  }

  function setAllStepsExpanded(expand) {
    var cards = document.querySelectorAll("#timeline-list .step-card");
    cards.forEach(function (card) {
      if (card.hidden) {
        return;
      }
      var trigger = card.querySelector(".step-card__trigger");
      var body = card.querySelector(".step-card__body");
      if (!trigger || !body) {
        return;
      }
      trigger.setAttribute("aria-expanded", String(expand));
      body.hidden = !expand;
      if (expand) {
        state.visitedSteps.add(Number(card.dataset.step));
      }
    });
    updateProgress();
  }

  function renderDirectory() {
    var grid = document.getElementById("directory-grid");
    if (!grid) {
      return;
    }

    data.directory.forEach(function (place) {
      var card = document.createElement("article");
      card.className = "place-card place-card--" + place.actor;

      var top = document.createElement("div");

      var badge = document.createElement("span");
      badge.className = "actor-badge actor-badge--" + place.actor;
      badge.textContent = place.badge;

      var title = document.createElement("h3");
      title.className = "place-card__title";
      title.textContent = place.title;

      var addr = document.createElement("address");
      addr.className = "place-card__address";
      addr.textContent = place.address;

      top.appendChild(badge);
      top.appendChild(title);
      top.appendChild(addr);

      var actions = document.createElement("div");
      actions.className = "place-card__actions";

      var mapLink = document.createElement("a");
      mapLink.className = "btn-primary";
      mapLink.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(place.mapQuery);
      mapLink.target = "_blank";
      mapLink.rel = "noopener noreferrer";
      mapLink.appendChild(createSvgIcon("map"));

      var linkLabel = document.createElement("span");
      linkLabel.textContent = "Abrir en Mapas";
      mapLink.appendChild(linkLabel);

      actions.appendChild(mapLink);
      card.appendChild(top);
      card.appendChild(actions);
      grid.appendChild(card);
    });
  }

  function renderGlossary() {
    var grid = document.getElementById("glossary-grid");
    if (!grid) {
      return;
    }

    data.glossary.forEach(function (item) {
      var card = document.createElement("article");
      card.className = "glossary-card";
      card.dataset.keywords = normalizeText(item.term + " " + item.meaning + " " + item.keywords);

      var term = document.createElement("h3");
      term.className = "glossary-card__term";
      term.textContent = item.term;

      var meaning = document.createElement("p");
      meaning.className = "glossary-card__meaning";
      meaning.textContent = item.meaning;

      card.appendChild(term);
      card.appendChild(meaning);
      grid.appendChild(card);
    });
  }

  function filterGlossary(query) {
    var normalized = normalizeText(query);
    var cards = document.querySelectorAll("#glossary-grid .glossary-card");
    var visibleCount = 0;

    cards.forEach(function (card) {
      var haystack = card.dataset.keywords || "";
      var match = !normalized || haystack.indexOf(normalized) !== -1;
      card.hidden = !match;
      if (match) {
        visibleCount += 1;
      }
    });

    var emptyMsg = document.getElementById("glossary-empty");
    if (emptyMsg) {
      emptyMsg.hidden = visibleCount > 0;
    }
  }

  function applyFontScale(nextScale) {
    var clamped = Math.min(FONT_MAX, Math.max(FONT_MIN, nextScale));
    state.fontScale = clamped;
    document.documentElement.style.setProperty("--font-scale", String(clamped));
  }

  function bindControls() {
    document.querySelectorAll("[data-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyTimelineFilter(btn.dataset.filter);
      });
    });

    var expandAllBtn = document.getElementById("expand-all-steps");
    var collapseAllBtn = document.getElementById("collapse-all-steps");
    if (expandAllBtn) {
      expandAllBtn.addEventListener("click", function () {
        setAllStepsExpanded(true);
      });
    }
    if (collapseAllBtn) {
      collapseAllBtn.addEventListener("click", function () {
        setAllStepsExpanded(false);
      });
    }

    var searchInput = document.getElementById("glossary-search");
    if (searchInput) {
      searchInput.addEventListener("input", function (event) {
        filterGlossary(event.target.value);
      });
    }

    var fontDec = document.getElementById("font-decrease");
    var fontInc = document.getElementById("font-increase");
    var contrastBtn = document.getElementById("toggle-contrast");

    if (fontDec) {
      fontDec.addEventListener("click", function () {
        applyFontScale(state.fontScale - FONT_STEP);
      });
    }
    if (fontInc) {
      fontInc.addEventListener("click", function () {
        applyFontScale(state.fontScale + FONT_STEP);
      });
    }
    if (contrastBtn) {
      contrastBtn.addEventListener("click", function () {
        state.highContrast = !state.highContrast;
        document.body.classList.toggle("high-contrast", state.highContrast);
        contrastBtn.setAttribute("aria-pressed", String(state.highContrast));
      });
    }

    var qrModal = document.getElementById("qr-modal");
    var openQrBtn = document.getElementById("open-qr-modal");
    var closeQrBtn = document.getElementById("close-qr-modal");
    var printQrBtn = document.getElementById("print-qr-btn");
    var qrImg = document.getElementById("qr-modal-img");

    if (qrImg && data.qrAssets) {
      qrImg.addEventListener("error", function () {
        if (qrImg.src.indexOf("qr-ruta-atencion.png") === -1) {
          qrImg.src = data.qrAssets.png;
        }
      });
    }

    if (qrModal && openQrBtn) {
      openQrBtn.addEventListener("click", function () {
        if (typeof qrModal.showModal === "function") {
          qrModal.showModal();
        } else {
          qrModal.setAttribute("open", "open");
        }
      });
    }

    if (qrModal && closeQrBtn) {
      closeQrBtn.addEventListener("click", function () {
        if (typeof qrModal.close === "function") {
          qrModal.close();
        } else {
          qrModal.removeAttribute("open");
        }
        if (openQrBtn) {
          openQrBtn.focus();
        }
      });

      qrModal.addEventListener("click", function (event) {
        if (event.target === qrModal) {
          closeQrBtn.click();
        }
      });
    }

    if (printQrBtn) {
      printQrBtn.addEventListener("click", function () {
        window.print();
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHeaderLogo();
    renderTimeline();
    renderDirectory();
    renderGlossary();
    renderFooterLogos();
    bindControls();
  });
})();
