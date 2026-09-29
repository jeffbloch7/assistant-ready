// Sends the contact form to Web3Forms without leaving the page.
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;
  var status = form.querySelector(".form-status");
  var button = form.querySelector("button[type=submit]");
  var FALLBACK = 'Sorry, the form isn\'t working right now. Please email <a href="mailto:jeff@assistantready.com">jeff@assistantready.com</a> instead.';

  function show(message, kind, isHtml) {
    status.className = "form-status " + (kind || "");
    if (isHtml) status.innerHTML = message; else status.textContent = message;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      show("Please fill in every field, with a valid email address.", "error");
      var firstInvalid = form.querySelector(":invalid");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    var key = form.elements.access_key.value;
    if (!key || key.indexOf("YOUR_") === 0) {
      show(FALLBACK, "error", true);
      return;
    }

    button.disabled = true;
    show("Sending…");

    fetch(form.action, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          form.reset();
          show("Thanks! Your message is on its way. I'll reply within one business day.", "ok");
        } else {
          show(FALLBACK, "error", true);
        }
      })
      .catch(function () { show(FALLBACK, "error", true); })
      .finally(function () { button.disabled = false; });
  });
})();
