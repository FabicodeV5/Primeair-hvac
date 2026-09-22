/* =========================================================
   PrimeAir HVAC — Demo landing page (V1.2 — no JS changes needed)
   Vanilla JS. No dependencies, no external requests.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Mobile menu toggle ---------- */
  var menuToggle = document.querySelector(".menu-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      mobileNav.hidden = isOpen;
    });

    // Close mobile menu when a link inside it is clicked (anchor navigation).
    mobileNav.addEventListener("click", function (event) {
      var target = event.target;
      if (target && target.tagName === "A") {
        mobileNav.hidden = true;
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close on Escape for keyboard users.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        mobileNav.hidden = true;
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.focus();
      }
    });
  }

  /* ---------- Demo contact form ---------- */
  var form = document.getElementById("quote-form");
  var status = document.getElementById("form-status");

  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        status.setAttribute("data-state", "error");
        status.textContent = "Please fill in the required fields before requesting a quote.";
        return;
      }

      var nameField = document.getElementById("name");
      var firstName = "there";
      if (nameField && nameField.value && nameField.value.trim().length > 0) {
        firstName = nameField.value.trim().split(" ")[0];
      }

      status.setAttribute("data-state", "success");
      status.textContent =
        "Thanks, " + firstName + ". This is a demo form, so nothing was sent — " +
        "in the live version this would notify our team right away.";

      form.reset();
    });
  }
})();
