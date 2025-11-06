/* ==========================================================
   ABOUT – Dynamische Kontakt-Icons
   – Nachbarn ~66% kleiner (Skalen via CSS-Variablen)
   – Kein Font Awesome: wir benutzen DEINE SVGs aus <img src="">
   – Safari-freundlich (transform + filter nur auf IMG)
   ========================================================== */

(function(){
  const row = document.querySelector('.contact-row');
  if(!row) return;

  const items = Array.from(row.querySelectorAll('a'));
  if(items.length === 0) return;

  let activeIndex = Math.floor(items.length / 2); // Start: mittig „aktiv“

  // Helper: Klassen für Zustand setzen
  function applyStates(center){
    items.forEach((a, i) => {
      a.classList.remove('is-active','is-near','is-far');
      if(i === center){
        a.classList.add('is-active');
      }else if (Math.abs(i - center) === 1){
        a.classList.add('is-near');
      }else{
        a.classList.add('is-far');
      }
    });
  }

  applyStates(activeIndex);

  // Desktop: Maus bewegt sich über die Leiste -> Index bestimmen
  function handlePointerMove(e){
    const rect = row.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const slot = rect.width / items.length;
    let idx = Math.floor(x / slot);
    idx = Math.max(0, Math.min(items.length - 1, idx));
    if(idx !== activeIndex){
      activeIndex = idx;
      applyStates(activeIndex);
    }
  }

  // Touch: aktives Icon auf das berührte setzen
  function handleTouch(e){
    if(!e.touches || e.touches.length === 0) return;
    const t = e.touches[0];
    const rect = row.getBoundingClientRect();
    const x = t.clientX - rect.left;
    const slot = rect.width / items.length;
    let idx = Math.floor(x / slot);
    idx = Math.max(0, Math.min(items.length - 1, idx));
    if(idx !== activeIndex){
      activeIndex = idx;
      applyStates(activeIndex);
    }
  }

  row.addEventListener('mousemove', handlePointerMove);
  row.addEventListener('touchstart', handleTouch, {passive:true});
  row.addEventListener('touchmove', handleTouch,  {passive:true});
})();
