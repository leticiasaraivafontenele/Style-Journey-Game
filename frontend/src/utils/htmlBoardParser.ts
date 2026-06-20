import type { ItemCode } from './boardParser';
import { decodePhaseHtml } from './selectorChecker';

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
  /** Position of this element within querySelectorAll('*') on the phase HTML */
  htmlIndex: number;
  itemCode: ItemCode;
}

export interface BoardContainer {
  /** Position of this container element within querySelectorAll('*') */
  htmlIndex: number;
  tag: string;
  items: BoardPotionItem[];
}

export interface BoardLayout {
  /** One entry per container found in the phase HTML, in document order */
  containers: BoardContainer[];
}

/**
 * Parses the phase HTML into a structured board layout.
 *
 * @param phaseHtml - Raw HTML string from the phase definition (with /n, /tab tokens).
 * @param containerSelector - CSS selector for the container/shelf elements
 *   (e.g. 'prateleira, mesa'). Comes from the phase object so it is never hardcoded.
 * @param itemTag - Tag name of the individual board items inside each container
 *   (e.g. 'poção'). Comes from the phase object for the same reason.
 *
 * Every element in the result carries its `htmlIndex` — its position in the flat
 * list produced by querySelectorAll('*'). This matches the indices returned by
 * `getSelectedElementIndices`, so a highlighted-indices Set can be applied
 * directly to visual board elements.
 */
export function parseBoardFromHtml(
  phaseHtml: string,
  containerSelector: string,
  itemTag: string,
): BoardLayout {
  const root = document.createElement('div');
  root.innerHTML = decodePhaseHtml(phaseHtml);

  const allElements = Array.from(root.querySelectorAll('*'));

  const containers: BoardContainer[] = Array.from(
    root.querySelectorAll(containerSelector),
  ).map(el => ({
    htmlIndex: allElements.indexOf(el),
    tag: el.tagName.toLowerCase(),
    items: Array.from(el.querySelectorAll(itemTag)).map(p => ({
      htmlIndex: allElements.indexOf(p),
      itemCode: classesToItemCode(Array.from(p.classList)),
    })),
  }));

  return { containers };
}
