/**
 * Aparición discreta al hacer scroll. Solo actúa si el <head> marcó `js-reveal`
 * (JS disponible y sin preferencia de movimiento reducido). Cada bloque aparece una vez.
 */
export function initReveal(): void {
  const root = document.documentElement;
  if (!root.classList.contains('js-reveal')) return;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
  root.classList.add('reveal-ready');
}
