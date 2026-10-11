const avatar = document.querySelector('.avatar-art');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const resetEyes = () => {
  avatar.style.setProperty('--eye-x', '0px');
  avatar.style.setProperty('--eye-y', '0px');
};
// Keep movement inside the original eye whites; no camera or face tracking.
window.addEventListener('pointermove', event => {
  if (event.pointerType === 'touch' || reducedMotion.matches) return;
  const box = avatar.getBoundingClientRect();
  if (box.bottom < 0 || box.top > innerHeight) return;
  const clamp = value => Math.max(-1, Math.min(1, value));
  const x = clamp((event.clientX - box.left - box.width / 2) / (innerWidth * .35));
  const y = clamp((event.clientY - box.top - box.height * .384) / (innerHeight * .4));
  avatar.style.setProperty('--eye-x', `${x * 22}px`);
  avatar.style.setProperty('--eye-y', `${y * 10}px`);
}, { passive: true });
document.documentElement.addEventListener('pointerleave', resetEyes);
window.addEventListener('blur', resetEyes);
reducedMotion.addEventListener('change', resetEyes);
