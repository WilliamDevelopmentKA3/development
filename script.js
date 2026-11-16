// Formulier: plak hier je Formspree-endpoint (of een ander formulier-endpoint).
// Laat leeg om het bericht via het e-mailprogramma van de bezoeker te versturen (mailto).
const FORM_ENDPOINT = "";
const MAIL_NAAR = "info@ka3-web-development.com";

// Portfolio-tabs
const tabKnoppen = document.querySelectorAll(".tab");
tabKnoppen.forEach(tab => tab.addEventListener("click", () => {
  tabKnoppen.forEach(t => {
    const actief = t === tab;
    t.classList.toggle("active", actief);
    t.setAttribute("aria-selected", String(actief));
  });
  document.querySelectorAll(".panel").forEach(p => {
    p.hidden = p.id !== "panel-" + tab.dataset.tab;
  });
}));

// Contactformulier
const form = document.getElementById("contact-form");
const statusRegel = form.querySelector(".status");
const regels = {
  naam: v => v.trim().length >= 2 || "Vul je naam in.",
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Vul een geldig e-mailadres in.",
  bericht: v => v.trim().length >= 10 || "Schrijf minimaal 10 tekens."
};
const velden = [...form.querySelectorAll("input[name], textarea")].filter(el => regels[el.name]);

function valideer(input) {
  const veld = input.closest(".field");
  const r = regels[input.name](input.value);
  const fout = r === true ? "" : r;
  veld.classList.toggle("invalid", Boolean(fout));
  veld.querySelector(".error").textContent = fout;
  return !fout;
}
velden.forEach(el => el.addEventListener("blur", () => valideer(el)));

form.addEventListener("submit", async e => {
  e.preventDefault();
  statusRegel.className = "status";
  statusRegel.textContent = "";
  if (!velden.map(valideer).every(Boolean)) return;

  const data = new FormData(form);
  if (data.get("website")) return; // honeypot tegen bots

  const knop = form.querySelector("button[type=submit]");
  knop.disabled = true;
  try {
    if (FORM_ENDPOINT) {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error("Verzenden mislukt");
      form.reset();
      statusRegel.classList.add("ok");
      statusRegel.textContent = "Bedankt! Je bericht is verstuurd.";
    } else {
      const onderwerp = encodeURIComponent("Bericht via website van " + data.get("naam"));
      const tekst = encodeURIComponent(data.get("bericht") + "\n\n" + data.get("naam") + " (" + data.get("email") + ")");
      window.location.href = "mailto:" + MAIL_NAAR + "?subject=" + onderwerp + "&body=" + tekst;
      statusRegel.classList.add("ok");
      statusRegel.textContent = "Je e-mailprogramma wordt geopend…";
    }
  } catch (err) {
    statusRegel.classList.add("fail");
    statusRegel.textContent = "Er ging iets mis. Probeer het later opnieuw.";
  } finally {
    knop.disabled = false;
  }
});
