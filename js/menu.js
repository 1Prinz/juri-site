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

    document.querySelectorAll(".menu-link").forEach(a => {
      a.addEventListener("click", () => toggle(false));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("active")) toggle(false);
    });
  }

  // ===== Mobile: Dots + aktiven Slide robust bestimmen (zentralster Slide) =====
  const container = document.querySelector(".sections");
  const dotsWrap  = document.getElementById("dots");

  if (container && dotsWrap && window.innerWidth <= 900) {
    const slides = Array.from(container.querySelectorAll(".section"));

    // Dots erzeugen
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const d = document.createElement("div");
      d.className = "dot";
      dotsWrap.appendChild(d);
    });
    const dots = Array.from(dotsWrap.children);

    const gap = 8; // wie in CSS
    const sectionW = () => slides[0].clientWidth + gap;

    const centerIndex = () => {
      const mid = window.innerWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      slides.forEach((sl, i) => {
        const r = sl.getBoundingClientRect();
        const center = (r.left + r.right) / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      return best;
    };

    const setActiveByCenter = () => {
      const idx = centerIndex();
      slides.forEach((sl, i) => sl.classList.toggle("is-center", i === idx));
      dots.forEach((d, i) => d.classList.toggle("active", i === idx));
    };

    // Initial + bei Scroll/Resize aktualisieren
    setActiveByCenter();
    container.addEventListener("scroll", setActiveByCenter, { passive:true });
    window.addEventListener("resize", () => {
      // nach Resize kurz warten, dann neu zentrieren
      requestAnimationFrame(setActiveByCenter);
    });

    // Optional: Klick auf Dots -> zum Slide scrollen
    dots.forEach((d, i) => {
      d.addEventListener("click", () => {
        const target = slides[i].offsetLeft - (container.clientWidth - slides[i].clientWidth)/2;
        container.scrollTo({ left: target, behavior: "smooth" });
      });
    });
  }

  // ===== Desktop: GTA-Hover nur auf Geräten mit Hover =====
  if (window.matchMedia("(hover:hover)").matches) {
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
});
