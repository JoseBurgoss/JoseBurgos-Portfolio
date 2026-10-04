import { useEffect, useState } from 'react';

type Props = { label: string; closeLabel: string };

export default function MobileNav({ label, closeLabel }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('js-nav');
    return () => document.documentElement.classList.remove('js-nav');
  }, []);

  useEffect(() => {
    const nav = document.getElementById('site-nav');
    if (!nav) return;
    nav.dataset.open = String(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClick = (e: Event) => {
      if ((e.target as HTMLElement).closest('a')) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    nav.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      nav.removeEventListener('click', onClick);
    };
  }, [open]);

  return (
    <button
      type="button"
      className="nav-toggle"
      aria-expanded={open}
      aria-controls="site-nav"
      onClick={() => setOpen((o) => !o)}
    >
      {open ? closeLabel : label}
    </button>
  );
}
