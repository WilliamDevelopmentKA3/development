# KA3 Web Development

Website van KA3 Web Development: statische HTML, CSS en JavaScript, zonder buildstap.

## Bestanden

| Bestand | Doel |
| --- | --- |
| `index.html` | Homepage met diensten, portfolio, werkwijze en contactformulier |
| `website.html`, `webshop.html`, `onderhoud.html` | Pagina's per dienst |
| `project.html` | Detailpagina voor projecten, gevuld vanuit `projects.js` |
| `layout.js` | Gedeelde header, footer, menu en scroll-animaties |
| `projects.js` | Gegevens van alle portfolioprojecten |
| `script.js` | Portfolio-tabs en contactformulier |
| `style.css` | Alle opmaak (licht en donker thema) |

## Lokaal bekijken

Open `index.html` in je browser, of start een lokale server, bijvoorbeeld met de Live Server-extensie in VS Code.

## Aanpassen

- **Bedrijfsgegevens:** plaats, KVK, BTW en e-mailadres staan in `index.html` en `script.js` (`MAIL_NAAR`).
- **Projecten:** voeg een regel toe in `projects.js` en een kaart in `index.html`. Vervang de gekleurde vlakken door screenshots.
- **Kleuren:** `--blue` en `--green` bovenin `style.css`.
- **Contactformulier:** zet een Formspree-adres (of vergelijkbaar) in `FORM_ENDPOINT` in `script.js`. Zonder endpoint opent het formulier het e-mailprogramma van de bezoeker.

## Online zetten met GitHub Pages

1. Ga in deze repository naar **Settings → Pages**.
2. Kies bij Source de branch `main` en de map `/ (root)`, en klik op **Save**.
3. Een eigen domein koppel je in hetzelfde scherm onder **Custom domain**.
