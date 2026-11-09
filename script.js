const FORM_URL = "https://script.google.com/macros/s/AKfycbwBhbvRH4EeMsarWBiKkRQr2asK5eSjEiwuRgF8VWtDQZqkdjUo34j-NtPt1Hik3ZN6_Q/exec";
document.querySelectorAll("form.signup").forEach(function (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const msg = form.querySelector(".msg");
    const email = form.querySelector("input[type=email]").value.trim();
    if (FORM_URL.indexOf("http") !== 0) {
      msg.textContent = "Sign up is not connected yet. Please try again soon.";
      return;
    }
    msg.textContent = "Sending...";
    fetch(FORM_URL, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams({
        email: email,
        page: form.dataset.page,
        consent: form.querySelector("input[name=consent]").checked ? "yes" : "",
        website: form.querySelector("input[name=website]").value
      })
    }).then(function () {
      form.reset();
      msg.textContent = "Thank you. We will email you when there is news.";
    }).catch(function () {
      msg.textContent = "Something went wrong. Please try again.";
    });
  });
});
