const burger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
function toggleMenu(force){
  const open = (typeof force === 'boolean') ? force : !menu.classList.contains('active');
  burger.classList.toggle('active', open);
  menu.classList.toggle('active', open);
  menu.setAttribute('aria-hidden', String(!open));
}
burger.addEventListener('click', ()=> toggleMenu());
document.querySelectorAll('.menu-link, .socials a').forEach(a=>{
  a.addEventListener('click', ()=> toggleMenu(false));
});
document.addEventListener('keydown', e=>{
  if(e.key==='Escape' && menu.classList.contains('active')) toggleMenu(false);
});
