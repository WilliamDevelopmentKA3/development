// Gedeelde header, footer en animaties voor alle pagina's.
const NAV = [
  ["index.html", "Home"],
  ["website.html", "Website"],
  ["webshop.html", "Webshop"],
  ["onderhoud.html", "Onderhoud &amp; beveiliging"],
  ["index.html#portfolio", "Portfolio"]
];
const huidigePagina = location.pathname.split("/").pop() || "index.html";
const navLinks = NAV.map(([href, label]) =>
  `<a href="${href}"${href === huidigePagina ? ' aria-current="page"' : ""}>${label}</a>`).join("");

document.getElementById("site-header").outerHTML = `
<header class="site-header">
  <a href="index.html" class="logo">ka3<span>web</span></a>
  <button class="nav-toggle" aria-label="Menu openen" aria-expanded="false"><span></span><span></span></button>
  <nav class="nav" id="nav">${navLinks}<a href="index.html#contact" class="btn btn-small">Contact</a></nav>
</header>`;

document.getElementById("site-footer").outerHTML = `
<footer class="site-footer">
  <p>© ${new Date().getFullYear()} KA3 Web Development · <a href="#">Algemene voorwaarden</a> · <a href="#">Privacybeleid</a></p>
</footer>`;

// Mobiel menu
const menuKnop = document.querySelector(".nav-toggle");
const menu = document.getElementById("nav");
menuKnop.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuKnop.setAttribute("aria-expanded", String(open));
});
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  menu.classList.remove("open");
  menuKnop.setAttribute("aria-expanded", "false");
}));

// Verschijn-animatie bij scrollen
function activeerReveal() {
  const items = document.querySelectorAll(".reveal:not(.visible)");
  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      obs.unobserve(e.target);
    }
  }), { threshold: 0.15 });
  items.forEach(el => io.observe(el));
}
activeerReveal();
