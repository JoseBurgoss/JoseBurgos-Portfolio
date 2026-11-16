import { movements, movementNumber } from '../i18n/movements.mjs';

/**
 * Agrupa las secciones (`##`) de cada caso en tres de los cuatro movimientos
 * (Problema · Decisiones · [Pantallas = galería] · Lo que sigue) y pone un rótulo mono con su número.
 * Con 5 secciones se usan 2 al principio y 2 al final; con menos, 1 y 1; el resto va a «Decisiones».
 */
export default function rehypeMovements() {
  return (tree, file) => {
    const path = String(file.path ?? file.history?.[0] ?? '');
    const lang = /[\/]en[\/][^\/]+\.mdx$/.test(path) ? 'en' : 'es';
    const isH2 = (n) => n.type === 'element' && n.tagName === 'h2';
    const sections = [];
    for (const node of tree.children) {
      if (isH2(node) || sections.length === 0) sections.push([node]);
      else sections[sections.length - 1].push(node);
    }
    if (sections.length === 0) return;
    const n = sections.length;
    const k = n >= 5 ? 2 : 1;
    const kindOf = (i) => (i < k ? 'problem' : i >= n - k ? 'next' : 'decisions');
    const out = [];
    let current = null;
    sections.forEach((nodes, i) => {
      const kind = kindOf(i);
      if (!current || current.kind !== kind) {
        const kicker = {
          type: 'element',
          tagName: 'p',
          properties: { className: ['mono', 'mov__kicker'] },
          children: [{ type: 'text', value: `${movementNumber[kind]} · ${movements[lang][kind]}` }],
        };
        const el = { type: 'element', tagName: 'div', properties: { className: ['mov'], id: kind, 'data-mov': kind }, children: [kicker] };
        current = { kind, el };
        out.push(el);
      }
      current.el.children.push(...nodes);
    });
    tree.children = out;
  };
}
