// Dynamische Icon-Interaktion für Desktop
const container = document.querySelector('.contact-icons');
const icons = Array.from(container.querySelectorAll('a'));

container.addEventListener('mousemove', e => {
  const rect = container.getBoundingClientRect();

  icons.forEach(icon => {
    const iconRect = icon.getBoundingClientRect();
    const iconCenter = iconRect.left + iconRect.width / 2;
    const distance = Math.abs(e.clientX - iconCenter);
    const proximity = Math.max(0, 1 - distance / 280); // Reichweite des Effekts
    const scale = 0.7 + proximity * 0.8; // 0.7–1.5
    icon.style.setProperty('--scale', scale.toFixed(2));
  });
});

// sanfter Reset beim Verlassen
container.addEventListener('mouseleave', () => {
  icons.forEach(icon => icon.style.setProperty('--scale', 1));
});
