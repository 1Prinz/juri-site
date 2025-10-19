document.addEventListener("DOMContentLoaded", () => {
  // Burger + Menü
  const burger = document.getElementById("hamburger");
  const menu   = document.getElementById("menu");

  if (burger && menu) {
    const toggle = (open) => {
      const willOpen = (typeof open === "boolean") ? open : !menu.classList.contains("active");
      burger.classList.toggle("active", willOpen);
      menu.classList.toggle("active", willOpen);
      document.body.style.overflow = willOpen ? "hidden" : "";
      menu.setAttribute("aria-hidden", String(!willOpen));
    };
    burger.addEventListener("click", () => toggle());

    // Menülink-Klick => schließen
    document.querySelectorAll(".menu-link").forEach(a => {
      a.addEventListener("click", () => toggle(false));
    });

    // ESC schließt Menü
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("active")) toggle(false);
    });
  }

  // GTA-Hover (nur Desktop-Geräte mit Hover)
  if (window.matchMedia("(hover:hover)").matches) {
    const container = document.querySelector(".sections");
    const tiles = container ? Array.from(container.querySelectorAll(".section")) : [];
    if (container && tiles.length) {
      tiles.forEach(tile => {
        tile.addEventListener('mouseenter', () => {
          container.classList.add('is-hovering');
          tiles.forEach(t => t.classList.remove('is-active'));
          tile.classList.add('is-active');
        });
        tile.addEventListener('mouseleave', () => {
          tile.classList.remove('is-active');
          requestAnimationFrame(() => {
            if (!container.querySelector('.section:hover')) {
              container.classList.remove('is-hovering');
            }
          });
        });
      });
    }
  }

  // Dots (Mobile)
  const container = document.querySelector(".sections");
  const dotsWrap  = document.getElementById("dots");
  if (container && dotsWrap && window.innerWidth <= 900) {
    const slides = Array.from(container.querySelectorAll(".section"));
    slides.forEach((_, i) => {
      const d = document.createElement("div");
      d.className = "dot" + (i === 0 ? " active" : "");
      dotsWrap.appendChild(d);
    });
    const dots = Array.from(dotsWrap.children);

    const gap = 8; // wie in CSS
    const sectionW = () => slides[0].clientWidth + gap;

    container.addEventListener("scroll", () => {
      const idx = Math.round(container.scrollLeft / sectionW());
      dots.forEach((d, i) => d.classList.toggle("active", i === idx));
    }, { passive:true });
  }
});
