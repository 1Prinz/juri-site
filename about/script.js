// ===== Video -> Final-Screen einblenden =====
const video = document.getElementById('heroVideo');
const final = document.getElementById('final');
const skip  = document.getElementById('skip');

function revealFinal(){
  if (!final.classList.contains('is-visible')) {
    final.classList.add('is-visible');
    try { video.pause(); } catch {}
  }
}
if (video) {
  video.addEventListener('timeupdate', () => {
    if (video.duration && video.currentTime / video.duration > 0.85) revealFinal();
  });
  video.addEventListener('ended', revealFinal);
}
if (skip) skip.addEventListener('click', revealFinal);

// ===== Icon-Scale als Skala um das aktive Icon =====
const belt = document.getElementById('contactBelt');
if (belt) {
  const links = Array.from(belt.querySelectorAll('a'));

  // zentrale Skalierungslogik
  const setScales = (activeIdx) => {
    links.forEach((a, i) => {
      const d = Math.abs(i - activeIdx);
      let scale = 1.00, tier = 3;

      if (d === 0) { scale = 2.00; tier = 0; }   // 200 %
      else if (d === 1) { scale = 1.15; tier = 1; } // 115 %
      else if (d === 2) { scale = 1.03; tier = 2; } // 103 %
      else { scale = 1.00; tier = 3; }              // 100 %

      a.style.transform = `translateZ(0) scale(${scale})`;
      a.dataset.tier = String(tier);
    });
  };

  // flüssig während Bewegung: finde das nächstgelegene Icon
  const nearestIndexFromEvent = (evt) => {
    const x = evt.clientX ?? (evt.touches && evt.touches[0]?.clientX);
    if (x == null) return null;
    const boxes = links.map(el => el.getBoundingClientRect());
    let best = 0, bestDist = Infinity;
    boxes.forEach((b, idx) => {
      const cx = b.left + b.width / 2;
      const dist = Math.abs(cx - x);
      if (dist < bestDist) { bestDist = dist; best = idx; }
    });
    return best;
  };

  // Maus / Touch bewegen -> aktiv neu bestimmen
  const onMove = (evt) => {
    const idx = nearestIndexFromEvent(evt);
    if (idx != null) setScales(idx);
  };
  belt.addEventListener('mousemove', onMove);
  belt.addEventListener('touchmove', onMove, { passive: true });

  // Fokussprung (Keyboard) berücksichtigen
  links.forEach((a, idx) => {
    a.addEventListener('focus', () => setScales(idx));
    a.addEventListener('mouseenter', () => setScales(idx));
  });

  // Raus -> zurück auf neutral
  const reset = () => {
    links.forEach(a => { a.style.transform = 'translateZ(0) scale(1)'; a.dataset.tier = '3'; });
  };
  belt.addEventListener('mouseleave', reset);
  belt.addEventListener('touchend', reset);
}
