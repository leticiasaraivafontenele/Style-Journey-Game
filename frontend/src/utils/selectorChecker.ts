/**
 * Decodes phase HTML tokens into real characters for DOM parsing.
 * /n → newline, /tab → two spaces (for innerHTML parsing)
 */
function decodePhaseHtml(raw: string): string {
  return raw
    .replace(/\/n/g, '\n')
    .replace(/\/tab/g, '  ');
}

export interface SelectorCheckResult {
  /** Whether the user's selector selects exactly the same elements as the solution */
  correct: boolean;
  /** Number of elements selected by the user's selector */
  selectedCount: number;
  /** Number of elements selected by the solution selector */
  expectedCount: number;
  /** Set when the user's selector has invalid syntax */
  error?: string;
}

/**
 * Checks whether a user-provided CSS selector selects the exact same elements
 * as the solution selector, evaluated against the phase's HTML structure.
 *
 * This works by building an in-memory DOM from the phase HTML and running
 * querySelectorAll with both selectors, then comparing the resulting element sets.
 * This means any selector that targets the same elements is accepted as correct,
 * regardless of whether it matches the solution string exactly.
 *
 * @param phaseHtml - The HTML string from the phase definition (with /n and /tab tokens)
 * @param solutionSelector - The canonical correct CSS selector defined in the phase
 * @param userSelector - The CSS selector typed by the user
 */
export function checkSelector(
  phaseHtml: string,
  solutionSelector: string,
  userSelector: string
): SelectorCheckResult {
  const html = decodePhaseHtml(phaseHtml);

  const container = document.createElement('div');
  container.innerHTML = html;

  let solutionElements: Element[];
  try {
    solutionElements = Array.from(container.querySelectorAll(solutionSelector));
  } catch {
    return { correct: false, selectedCount: 0, expectedCount: 0 };
  }

  const expectedCount = solutionElements.length;

  if (!userSelector.trim()) {
    return { correct: false, selectedCount: 0, expectedCount };
  }

  let userElements: Element[];
  try {
    userElements = Array.from(container.querySelectorAll(userSelector));
  } catch {
    return {
      correct: false,
      selectedCount: 0,
      expectedCount,
      error: 'Seletor inválido. Verifique a sintaxe.',
    };
  }

  if (solutionElements.length !== userElements.length) {
    return {
      correct: false,
      selectedCount: userElements.length,
      expectedCount,
    };
  }

  const correct = solutionElements.every(el => userElements.includes(el));

  return {
    correct,
    selectedCount: userElements.length,
    expectedCount,
  };
}

/**
 * Returns the indices (0-based, in querySelectorAll('*') order) of exactly the
 * elements selected by `selector` against the phase HTML.
 *
 * These indices match the `htmlIndex` values in the BoardLayout produced by
 * `parseBoardFromHtml`, so the result can be passed directly to the board as a
 * Set<number> for visual highlighting.
 *
 * Returns an empty array when the selector is invalid or empty.
 */
export function getSelectedElementIndices(
  phaseHtml: string,
  selector: string,
): number[] {
  if (!selector.trim()) return [];

  const html = decodePhaseHtml(phaseHtml);
  const container = document.createElement('div');
  container.innerHTML = html;

  const allElements = Array.from(container.querySelectorAll('*'));

  let selected: Element[];
  try {
    selected = Array.from(container.querySelectorAll(selector));
  } catch {
    return [];
  }

  return allElements
    .map((el, index) => ({ el, index }))
    .filter(({ el }) => selected.includes(el))
    .map(({ index }) => index);
}
