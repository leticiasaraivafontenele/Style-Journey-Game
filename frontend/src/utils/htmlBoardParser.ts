import type { ItemCode } from './boardParser';

function decodePhaseHtml(raw: string): string {
  return raw.replace(/\/n/g, '\n').replace(/\/tab/g, '  ');
}

function classesToItemCode(classList: string[]): ItemCode {
  const hasAzul     = classList.includes('azul');
  const hasVerde    = classList.includes('verde');
  const hasEtiqueta = classList.includes('etiqueta');

  if (hasAzul  && hasEtiqueta) return 'bi';
  if (hasVerde && hasEtiqueta) return 'gi';
  if (hasEtiqueta)             return 'ri';
  if (hasAzul)                 return 'b';
  if (hasVerde)                return 'g';
  return 'r';
}

export interface BoardPotionItem {
  /** Index of this element within querySelectorAll('*') on the phase HTML container */
  htmlIndex: number;
  itemCode: ItemCode;
}

export interface BoardContainer {
  /** Index of this container element within querySelectorAll('*') */
  htmlIndex: number;
  tag: string;
  items: BoardPotionItem[];
}

export interface BoardLayout {
  /** One entry per shelf/table container found in the phase HTML, in document order */
  containers: BoardContainer[];
}

/**
 * Parses the phase HTML into a structured board layout.
 *
 * Every element in the result carries its `htmlIndex` — its position in the
 * flat list produced by `container.querySelectorAll('*')`. This index is the
 * same one used by `getSelectedElementIndices` in selectorChecker, so a
 * highlighted-indices set can be applied directly to visual board elements.
 */
export function parseBoardFromHtml(phaseHtml: string): BoardLayout {
  const html = decodePhaseHtml(phaseHtml);
  const root = document.createElement('div');
  root.innerHTML = html;

  // Flat list of every element — used to derive stable numeric indices
  const allElements = Array.from(root.querySelectorAll('*'));

  const containerEls = Array.from(root.querySelectorAll('prateleira, mesa'));

  const containers: BoardContainer[] = containerEls.map(el => {
    const items: BoardPotionItem[] = Array.from(el.querySelectorAll('poção')).map(p => ({
      htmlIndex: allElements.indexOf(p),
      itemCode: classesToItemCode(Array.from(p.classList)),
    }));

    return {
      htmlIndex: allElements.indexOf(el),
      tag: el.tagName.toLowerCase(),
      items,
    };
  });

  return { containers };
}
