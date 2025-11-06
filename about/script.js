(function(){
  const row = document.querySelector('.contact-row');
  if(!row) return;

  const items = Array.from(row.querySelectorAll('a'));
  if(items.length === 0) return;

  let activeIndex = Math.floor(items.length / 2);

  function applyStates(center){
    items.forEach((a, i) => {
      a.classList.remove('is-active','is-near','is-next','is-far');
      const d = Math.abs(i - center);
      if (d === 0)      a.classList.add('is-active');
      else if (d === 1) a.classList.add('is-near');
      else if (d === 2) a.classList.add('is-next');
      else              a.classList.add('is-far');
    });
  }

  applyStates(activeIndex);

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
