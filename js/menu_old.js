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


// ===== Mobile Dots (aktiver Slide) =====
const container = document.querySelector(".sections");
const sections = container ? Array.from(container.querySelectorAll(".section")) : [];
const dotsContainer = document.getElementById("dots");

if (container && dotsContainer && window.innerWidth <= 900) {
  // Dots erzeugen
  sections.forEach((_, i) => {
    const d = document.createElement("div");
    d.classList.add("dot");
    if (i === 0) d.classList.add("active");
    dotsContainer.appendChild(d);
  });
  const dots = dotsContainer.querySelectorAll(".dot");

  container.addEventListener("scroll", () => {
    const scrollPos = container.scrollLeft;
    const sectionWidth = sections[0].clientWidth + 8; // +gap
    const index = Math.round(scrollPos / sectionWidth);
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  });
}


// ==== physikalisch wirkendes Scrollverhalten ==== //
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".sections");
  if (!container || window.innerWidth > 900) return; // nur auf Mobile aktiv

  let isDown = false;
  let startX;
  let scrollLeft;
  let velocity = 0;
  let momentumID;

  const easeOut = (x) => 1 - Math.pow(1 - x, 3); // weiches Auslaufen

  container.addEventListener("mousedown", startDrag);
  container.addEventListener("touchstart", startDrag);
  container.addEventListener("mouseleave", endDrag);
  container.addEventListener("mouseup", endDrag);
  container.addEventListener("touchend", endDrag);
  container.addEventListener("mousemove", moveDrag);
  container.addEventListener("touchmove", moveDrag);

  function startDrag(e) {
    isDown = true;
    startX = (e.pageX || e.touches[0].pageX) - container.offsetLeft;
    scrollLeft = container.scrollLeft;
    velocity = 0;
    cancelAnimationFrame(momentumID);
  }

  function moveDrag(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = (e.pageX || e.touches[0].pageX) - container.offsetLeft;
    const walk = (x - startX) * 1.2;
    const prevScroll = container.scrollLeft;
    container.scrollLeft = scrollLeft - walk;
    velocity = container.scrollLeft - prevScroll;
  }

  function endDrag() {
    if (!isDown) return;
    isDown = false;
    momentumScroll();
  }

  function momentumScroll() {
    if (Math.abs(velocity) < 0.5) return;
    container.scrollLeft += velocity;
    velocity *= 0.95;
    momentumID = requestAnimationFrame(momentumScroll);
  }
});
