import { initReveal } from './reveal';

/** Tema, idioma recordado, reloj de Maracaibo y barra de lectura. Todo con try/catch y sin depender del almacenamiento. */
const root = document.documentElement;
const THEME_KEY = 'jb-theme';
const LANG_KEY = 'jb-lang';

const effectiveTheme = (): 'day' | 'night' => {
  const set = root.getAttribute('data-theme');
  if (set === 'day' || set === 'night') return set;
  return matchMedia('(prefers-color-scheme: light)').matches ? 'day' : 'night';
};

function paintThemeColor(): void {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = effectiveTheme() === 'day' ? '#f6f4eb' : '#080c16';
}

function initTheme(): void {
  const btn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  const label = () => {
    if (!btn) return;
    btn.setAttribute('aria-label', effectiveTheme() === 'night' ? btn.dataset.toDay ?? '' : btn.dataset.toNight ?? '');
  };
  label();
  paintThemeColor();
  btn?.addEventListener('click', () => {
    const next = effectiveTheme() === 'night' ? 'day' : 'night';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(THEME_KEY, next); } catch { /* sin almacenamiento: vale solo para esta visita */ }
    label();
    paintThemeColor();
  });
  // Sin elección guardada, seguir al sistema si cambia mientras la página está abierta.
  matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
    let stored: string | null = null;
    try { stored = localStorage.getItem(THEME_KEY); } catch { /* ignorar */ }
    if (stored === 'day' || stored === 'night') return;
    label();
    paintThemeColor();
  });
}

function initLang(): void {
  document.querySelector<HTMLAnchorElement>('[data-lang-switch]')?.addEventListener('click', (e) => {
    const target = (e.currentTarget as HTMLElement).dataset.lang;
    if (target !== 'es' && target !== 'en') return;
    try { localStorage.setItem(LANG_KEY, target); } catch { /* ignorar */ }
  });
}

function initClock(): void {
  const el = document.querySelector<HTMLElement>('[data-clock]');
  if (!el) return;
  const fmt = new Intl.DateTimeFormat(root.lang === 'es' ? 'es-VE' : 'en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Caracas' });
  const tick = () => { el.textContent = fmt.format(new Date()); };
  tick();
  window.setInterval(tick, 15000);
}

function initProgress(): void {
  if (!document.querySelector('.progress')) return;
  let queued = false;
  const update = () => {
    queued = false;
    const h = root.scrollHeight - innerHeight;
    root.style.setProperty('--p', h > 0 ? Math.min(1, scrollY / h).toFixed(4) : '0');
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

initTheme();
initLang();
initClock();
initProgress();
initReveal();
