# KA3 Web Development

Website van KA3 Web Development: statische HTML, CSS en JavaScript, zonder buildstap. De site staat in `public/` en wordt gepubliceerd als Cloudflare Worker met statische assets.

## Bestanden

Alle sitebestanden staan in `public/`.

| Bestand | Doel |
| --- | --- |
| `wrangler.jsonc` (hoofdmap) | Cloudflare-configuratie: Worker `development`, publiceert `./public` |
| `index.html` | Homepage met diensten, portfolio, werkwijze en contactformulier |
| `website.html`, `webshop.html`, `onderhoud.html` | Pagina's per dienst |
| `project.html` | Detailpagina voor projecten, gevuld vanuit `projects.js` |
| `layout.js` | Gedeelde header, footer, menu en scroll-animaties |
| `projects.js` | Gegevens van alle portfolioprojecten |
| `script.js` | Portfolio-tabs en contactformulier |
| `style.css` | Alle opmaak (licht en donker thema) |

## Lokaal bekijken

Open `public/index.html` in je browser, of start een lokale server met `npx wrangler dev` in de hoofdmap (of de Live Server-extensie in VS Code).

## Aanpassen

- **Bedrijfsgegevens:** plaats, KVK, BTW en e-mailadres staan in `index.html` en `script.js` (`MAIL_NAAR`).
- **Projecten:** voeg een regel toe in `projects.js` en een kaart in `index.html`. Vervang de gekleurde vlakken door screenshots.
- **Kleuren:** `--blue` en `--green` bovenin `style.css`.
- **Contactformulier:** zet een Formspree-adres (of vergelijkbaar) in `FORM_ENDPOINT` in `script.js`. Zonder endpoint opent het formulier het e-mailprogramma van de bezoeker.

## Online zetten met Cloudflare

De configuratie staat in `wrangler.jsonc`: alles in `public/` wordt gepubliceerd naar de Worker `development`.

- **Handmatig:** voer in de hoofdmap `npx wrangler deploy` uit.
- **Automatisch:** koppel deze repository in het Cloudflare-dashboard bij **Workers & Pages → development → Settings → Builds**. Elke push naar `main` wordt dan gepubliceerd.
- **Eigen domein:** voeg het toe bij **Workers & Pages → development → Settings → Domains & Routes**.
