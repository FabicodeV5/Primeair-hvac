/* =========================================================
   PrimeAir HVAC — Demo landing page (V1.2 + Step 5: Web3Forms)
   Vanilla JS, no build dependencies. The quote form now sends a real
   request to the Web3Forms API (https://api.web3forms.com/submit).
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
    var submitBtn = form.querySelector('button[type="submit"]');
    var submitBtnDefaultText = submitBtn ? submitBtn.textContent : "";

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

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }
      status.removeAttribute("data-state");
      status.textContent = "Sending your request...";

      var payload = Object.fromEntries(new FormData(form));

      fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          if (result && result.success) {
            status.setAttribute("data-state", "success");
            status.textContent =
              "Thanks, " + firstName + ". Your request has been sent. We'll be in touch shortly.";
            form.reset();
          } else {
            status.setAttribute("data-state", "error");
            status.textContent =
              "We couldn't send your request. Please try again or call us directly.";
          }
        })
        .catch(function () {
          status.setAttribute("data-state", "error");
          status.textContent =
            "We couldn't send your request. Please try again or call us directly.";
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = submitBtnDefaultText;
          }
        });
    });
  }
})();
          
