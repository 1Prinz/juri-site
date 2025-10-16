// ==== Hamburger & Menü ==== //
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  const links = document.querySelectorAll(".menu-link");

  if (!burger || !menu) return;

  // Klick auf Hamburger => Menü öffnen/schließen
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menu.classList.toggle("active");

    // verhindern, dass Body scrollt, wenn Menü offen
    document.body.style.overflow = menu.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Klick auf Menülink => Menü schließen
  links.forEach(link => {
    link.addEventListener("click", () => {
      burger.classList.remove("active");
      menu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
});
