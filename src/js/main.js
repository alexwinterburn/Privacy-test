/* ============================================================
   Sentinel Privacy — shared site behaviour
   ============================================================ */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* ---- Active nav link based on current page ---- */
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__links a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq-item__q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var answer = item.querySelector(".faq-item__a");
      var isOpen = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      answer.style.maxHeight = isOpen ? answer.scrollHeight + "px" : null;
    });
  });

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { obs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Footer year ---- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Animated counters ---- */
  var counters = document.querySelectorAll("[data-count]");
  function runCounter(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    var decimals = (target % 1 !== 0) ? 1 : 0;
    var dur = 1400, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = (target * eased).toFixed(decimals);
      el.textContent = prefix + val + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(tick);
  }
  if (counters.length) {
    if ("IntersectionObserver" in window) {
      var cObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { runCounter(en.target); cObs.unobserve(en.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { cObs.observe(el); });
    } else {
      counters.forEach(runCounter);
    }
  }

  /* ---- Header shadow on scroll ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- Contact form validation + submission ---- */
  var form = document.getElementById("contact-form");
  if (form) {
    var alertBox = form.querySelector(".form-alert--success");
    var errorBox = form.querySelector(".form-alert--error");

    function setError(field, on) {
      field.classList.toggle("invalid", on);
    }

    function validate() {
      var ok = true;
      form.querySelectorAll("[data-required]").forEach(function (input) {
        var field = input.closest(".field") || input.closest(".checkbox-field");
        var val = (input.value || "").trim();
        var bad = false;
        if (input.type === "checkbox") bad = !input.checked;
        else if (input.type === "email") bad = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        else bad = val === "";
        if (bad) ok = false;
        if (field) setError(field, bad);
      });
      return ok;
    }

    function showSuccess() {
      form.style.display = "none";
      if (errorBox) errorBox.style.display = "none";
      if (alertBox) {
        alertBox.style.display = "block";
        alertBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
    function showError() {
      if (errorBox) {
        errorBox.style.display = "block";
        errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      submitBtn.disabled = false;
      submitBtn.textContent = submitLabel;
    }

    var submitBtn = form.querySelector('button[type="submit"]');
    var submitLabel = submitBtn ? submitBtn.textContent : "Send message";

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (errorBox) errorBox.style.display = "none";
      if (!validate()) {
        var firstBad = form.querySelector(".invalid input, .invalid select, .invalid textarea");
        if (firstBad) firstBad.focus();
        return;
      }

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }

      // Submit to Netlify Forms via AJAX so we can keep the inline success state.
      // (Works once the site is deployed on Netlify with form handling enabled.)
      var body = new URLSearchParams(new FormData(form)).toString();
      fetch(form.getAttribute("action") || "/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body
      })
        .then(function (res) {
          if (res.ok || res.status === 200) showSuccess();
          else showError();
        })
        .catch(showError);
    });

    // Clear error state as the user corrects a field
    form.querySelectorAll("input, select, textarea").forEach(function (input) {
      input.addEventListener("input", function () {
        var field = input.closest(".field") || input.closest(".checkbox-field");
        if (field) field.classList.remove("invalid");
      });
    });
  }
})();
