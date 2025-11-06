/* Dynamischer Größen-/Glow-Gürtel
   Regeln:
   - zentrales Icon (Distanz 0):   Scale 2.00, starker Glow
   - direkte Nachbarn ±1:          Scale 1.15, mittlerer Glow
   - Nachbarn der Nachbarn ±2:     Scale 1.03, leichter Glow
   - Rest:                         Scale 1.00, kein Glow
*/

(function(){
  const belt = document.getElementById('belt');
  if(!belt) return;
  const items = Array.from(belt.querySelectorAll('a'));

  // Basis zurücksetzen
  function reset(){
    for(const a of items){
      a.style.transform = 'translateZ(0) scale(1)';
      a.removeAttribute('data-role');
      const img = a.querySelector('img');
      if(img){
        img.style.filter = 'none';
        img.style.webkitFilter = 'none';
      }
    }
  }

  // Glow-Helfer
  function setGlow(a, level){
    const img = a.querySelector('img');
    if(!img) return;
    if(level === 0){
      img.style.filter =
        'drop-shadow(0 0 16px rgba(255,255,255,.55)) drop-shadow(0 0 28px rgba(255,255,255,.35))';
      img.style.webkitFilter = img.style.filter;
      a.setAttribute('data-role','center');
    } else if(level === 1){
      img.style.filter = 'drop-shadow(0 0 10px rgba(255,255,255,.38))';
      img.style.webkitFilter = img.style.filter;
      a.setAttribute('data-role','near');
    } else if(level === 2){
      img.style.filter = 'drop-shadow(0 0 4px rgba(255,255,255,.15))';
      img.style.webkitFilter = img.style.filter;
      a.setAttribute('data-role','far');
    }
  }

  function applyIndex(centerIdx){
    reset();
    items.forEach((a, i)=>{
      const d = Math.abs(i - centerIdx);
      if(d === 0){
        a.style.transform = 'translateZ(0) scale(2.0)';
        setGlow(a, 0);
      }else if(d === 1){
        a.style.transform = 'translateZ(0) scale(1.15)';
        setGlow(a, 1);
      }else if(d === 2){
        a.style.transform = 'translateZ(0) scale(1.03)';
        setGlow(a, 2);
      }
    });
  }

  // Ermittele das „nächste“ Icon zur Mausposition (x)
  function nearestIndex(clientX){
    const rect = belt.getBoundingClientRect();
    let best = 0;
    let bestDist = Infinity;
    items.forEach((a, i)=>{
      const r = a.getBoundingClientRect();
      const cx = (r.left + r.right) / 2;
      const dist = Math.abs(clientX - cx);
      if(dist < bestDist){ bestDist = dist; best = i; }
    });
    return best;
  }

  // Events
  belt.addEventListener('mousemove', (e)=>{
    const idx = nearestIndex(e.clientX);
    applyIndex(idx);
  });
  belt.addEventListener('mouseleave', reset);

  // Startzustand: kein Glow/Scale – clean
  reset();
})();
