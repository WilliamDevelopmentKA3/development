// Tekst die voor elk project geldt, tenzij je hem bij een project overschrijft.
const STANDAARD = {
  opdracht: "De klant wilde een online aanwezigheid die past bij het bedrijf en bezoekers omzet bezorgt.",
  aanpak: "We startten met een kennismaking, werkten een ontwerp uit en bouwden de oplossing op maat.",
  resultaat: "Een snelle, goed vindbare oplossing die de klant zelf eenvoudig kan beheren.",
  url: ""
};

// Voeg per project gerust eigen opdracht, aanpak, resultaat en url toe.
// Een nieuw project voeg je toe met één regel hier en een kaart in index.html.
const PROJECTEN = {
  "voorbeeld-a": { titel: "Voorbeeldbedrijf A", soort: "Website", kleuren: ["#2b6cb0", "#68d391"], tags: ["Ontwerp", "Development"] },
  "voorbeeld-b": { titel: "Voorbeeldbedrijf B", soort: "Website + SEO", kleuren: ["#2c5282", "#9ae6b4"], tags: ["Development", "SEO"] },
  "voorbeeld-c": { titel: "Voorbeeldbedrijf C", soort: "Zakelijke website", kleuren: ["#3182ce", "#c6f6d5"], tags: ["Development", "Onderhoud"] },
  "shop-a":      { titel: "Voorbeeldshop A", soort: "Webshop", kleuren: ["#1a365d", "#48bb78"], tags: ["Webshop", "Betalingen"] },
  "shop-b":      { titel: "Voorbeeldshop B", soort: "Webshop + mailing", kleuren: ["#4299e1", "#68d391"], tags: ["Webshop", "Mailing"] },
  "shop-c":      { titel: "Voorbeeldshop C", soort: "Lokale bezorgshop", kleuren: ["#2a4365", "#9ae6b4"], tags: ["Webshop", "Bezorging"] },
  "app-a":       { titel: "Voorbeeldapp A", soort: "Klantportaal", kleuren: ["#2b6cb0", "#9ae6b4"], tags: ["Webapplicatie", "Inloggen"] },
  "app-b":       { titel: "Voorbeeldapp B", soort: "Planningstool", kleuren: ["#2c5282", "#68d391"], tags: ["Webapplicatie", "Planning"] },
  "app-c":       { titel: "Voorbeeldapp C", soort: "Dashboard", kleuren: ["#3182ce", "#48bb78"], tags: ["Webapplicatie", "Data"] }
};

const root = document.getElementById("project");
const projectId = new URLSearchParams(location.search).get("id");
const projectIds = Object.keys(PROJECTEN);

function maak(tag, klasse, tekst) {
  const e = document.createElement(tag);
  if (klasse) e.className = klasse;
  if (tekst) e.textContent = tekst;
  return e;
}

if (!projectId || !Object.prototype.hasOwnProperty.call(PROJECTEN, projectId)) {
  document.title = "Project niet gevonden – KA3 Web Development";
  root.append(maak("h1", "", "Dit project bestaat niet"));
  const terug = maak("a", "btn", "Terug naar portfolio");
  terug.href = "index.html#portfolio";
  root.append(terug);
} else {
  const p = { ...STANDAARD, ...PROJECTEN[projectId] };
  document.title = p.titel + " – KA3 Web Development";

  const back = maak("a", "back", "← Terug naar portfolio");
  back.href = "index.html#portfolio";

  const hero = maak("div", "project-hero");
  hero.style.setProperty("--a", p.kleuren[0]);
  hero.style.setProperty("--b", p.kleuren[1]);

  const tags = maak("ul", "tools");
  p.tags.forEach(t => tags.append(maak("li", "", t)));

  const tekst = maak("div", "project-text");
  [["De opdracht", p.opdracht], ["Onze aanpak", p.aanpak], ["Het resultaat", p.resultaat]].forEach(([k, v]) => {
    const blok = maak("section", "reveal");
    blok.append(maak("h2", "", k), maak("p", "", v));
    tekst.append(blok);
  });

  root.append(back, maak("p", "eyebrow", p.soort), maak("h1", "", p.titel), tags, hero, tekst);

  if (p.url) {
    const bezoek = maak("a", "btn", "Bekijk de live site");
    bezoek.href = p.url;
    bezoek.target = "_blank";
    bezoek.rel = "noopener";
    root.append(bezoek);
  }

  const i = projectIds.indexOf(projectId);
  const pager = maak("nav", "pager");
  [[projectIds[(i + projectIds.length - 1) % projectIds.length], "← Vorige"],
   [projectIds[(i + 1) % projectIds.length], "Volgende →"]].forEach(([doel, label]) => {
    const a = maak("a", "", label + ": " + PROJECTEN[doel].titel);
    a.href = "project.html?id=" + doel;
    pager.append(a);
  });
  root.append(pager);
  activeerReveal();
}
