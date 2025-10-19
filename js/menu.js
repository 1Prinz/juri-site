// Burger + Menü
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("hamburger");
  const menu   = document.getElementById("menu");

  if (burger && menu) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      menu.classList.toggle("active");
      document.body.style.overflow = menu.classList.contains("active") ? "hidden" : "";
      menu.setAttribute("aria-hidden", menu.classList.contains("active") ? "false" : "true");
    });

    // Menülink-Klick → schließen
    document.querySelectorAll(".menu-link").forEach(a => {
      a.addEventListener("click", () => {
        burger.classList.remove("active");
        menu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // GTA-Hover nur auf Desktop
  if (window.matchMedia('(hover: hover)').matches) {
    const container = document.querySelector(".sections");
    const tiles = Array.from(document.querySelectorAll(".section"));
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

  // Mobile: Dots + Momentum-Scroll
  if (window.innerWidth <= 900) {
    const container = document.querySelector(".sections");
    const sections  = container ? Array.from(container.querySelectorAll(".section")) : [];
    const dotsWrap  = document.getElementById("dots");

    if (container && sections.length && dotsWrap) {
      // Dots erzeugen
      sections.forEach((_, i) => {
        const d = document.createElement("div");
        d.className = "dot" + (i === 0 ? " active" : "");
        dotsWrap.appendChild(d);
      });
      const dots = Array.from(dotsWrap.children);

      // aktiven Dot setzen
      const gap = 8; // wie in CSS
      const sectionW = () => sections[0].clientWidth + gap;

      container.addEventListener("scroll", () => {
        const idx = Math.round(container.scrollLeft / sectionW());
        dots.forEach((d, i) => d.classList.toggle("active", i === idx));
      }, {passive:true});

      // einfaches Momentum (inertia)
      let isDown=false, startX=0, startLeft=0, v=0, raf;
      const onMove = (e) => {
        if (!isDown) return;
        const x = (e.touches ? e.touches[0].pageX : e.pageX);
        const walk = (x - startX) * 1.2;
        const prev = container.scrollLeft;
        container.scrollLeft = startLeft - walk;
        v = container.scrollLeft - prev;
      };
      const stop = () => {
        if (!isDown) return;
        isDown=false;
        cancelAnimationFrame(raf);
        const momentum = () => {
          if (Math.abs(v) < 0.5) return;
          container.scrollLeft += v;
          v *= 0.95;
          raf = requestAnimationFrame(momentum);
        };
        momentum();
      };
      container.addEventListener("mousedown",(e)=>{isDown=true;startX=e.pageX;startLeft=container.scrollLeft;v=0;cancelAnimationFrame(raf);});
      container.addEventListener("mousemove",onMove);
      container.addEventListener("mouseup",stop);
      container.addEventListener("mouseleave",stop);
      container.addEventListener("touchstart",(e)=>{isDown=true;startX=e.touches[0].pageX;startLeft=container.scrollLeft;v=0;cancelAnimationFrame(raf);},{passive:true});
      container.addEventListener("touchmove",onMove,{passive:false});
      container.addEventListener("touchend",stop);
    }
  }
});
