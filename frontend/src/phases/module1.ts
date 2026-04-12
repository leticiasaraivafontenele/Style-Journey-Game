import type { IPhase } from '.';

export interface IModule1Phase extends IPhase {
  /**
   * HTML structure of the board using fantasy tags, with /n and /tab tokens.
   *
   * Serves two purposes:
   *  1. Displayed to the user as a code reference (read-only terminal).
   *  2. Evaluated via querySelectorAll to verify CSS selectors — both the
   *     solution and the user's input are run against this DOM, and the
   *     resulting element sets are compared. Any semantically equivalent
   *     selector is therefore accepted.
   */
  html: string;
  /**
   * CSS selector that identifies the container/shelf elements in the board.
   * Used by parseBoardFromHtml to know which elements act as rows.
   * Example: 'prateleira, mesa'
   */
  containerSelector: string;
  /**
   * Tag name of the individual item elements inside each container.
   * Used by parseBoardFromHtml to find board items and map their classes
   * to visual ItemCodes.
   * Example: 'poção'
   */
  itemTag: string;
}

// ─── Shared constants for module 1's game world ───────────────────────────────
// All phases in this module use the same fantasy HTML vocabulary.
// Change these here if the game world changes.

const BASE_HTML = `<div class="escritório">/n/tab<prateleira id="alta">/n/tab/tab<poção></poção>/n/tab/tab<poção class="azul"></poção>/n/tab</prateleira>/n/tab<prateleira>/n/tab/tab<poção class="azul"></poção>/n/tab</prateleira>/n/tab<mesa>/n/tab/tab<poção></poção>/n/tab</mesa>/n</div>`;
const CONTAINER_SELECTOR = 'prateleira, mesa';
const ITEM_TAG = 'poção';

// ─── Phase definitions ────────────────────────────────────────────────────────

export const module1Phases: IModule1Phase[] = [
  {
    id: 1,
    property: 'Seletor de Tipo',
    name: 'Seletor de Tag',
    description:
      'Um ##seletor de tipo## (ou seletor de tag) seleciona todos os elementos de um determinado nome de tag./nPor exemplo, escrever ##poção## seleciona todos os elementos <poção> presentes no documento, independentemente de onde estejam.',
    instructions: 'Selecione todas as tags ##<poção>##.',
    after: '{ /n/tabseu-estilo: aqui; /n }',
    html: BASE_HTML,
    containerSelector: CONTAINER_SELECTOR,
    itemTag: ITEM_TAG,
    solution: 'poção',
  },
  {
    id: 2,
    property: 'Seletor de Classe',
    name: 'Seletor de Classe',
    description:
      'Um ##seletor de classe## seleciona todos os elementos que possuem um determinado valor no atributo class./nPara usar, coloque um ponto (##.##) antes do nome da classe./nPor exemplo, ##.azul## seleciona todos os elementos que possuem class="azul".',
    instructions: 'Selecione apenas as ##<poção>## com a classe ##azul##.',
    after: '{ /n/tabseu-estilo: aqui; /n }',
    html: BASE_HTML,
    containerSelector: CONTAINER_SELECTOR,
    itemTag: ITEM_TAG,
    solution: '.azul',
  },
  // {
  //   id: 3,
  //   property: 'Seletor de ID',
  //   name: 'Seletor de ID',
  //   description:
  //     'Um ##seletor de ID## seleciona o elemento que possui um determinado valor no atributo id./nPara usar, coloque um sustenido (###) antes do nome do ID./nPor exemplo, ###alta## seleciona o elemento com id="alta"./nIDs são únicos: cada ID deve aparecer apenas uma vez por página.',
  //   instructions: 'Selecione a ##<prateleira>## com o id ##alta##.',
  //   after: '{ /n/tabborder: 2px solid gold; /n }',
  //   html: BASE_HTML,
  //   containerSelector: CONTAINER_SELECTOR,
  //   itemTag: ITEM_TAG,
  //   solution: '#alta',
  // },
  // {
  //   id: 4,
  //   property: 'Seletor Descendente',
  //   name: 'Seletor Descendente',
  //   description:
  //     'Um ##seletor descendente## seleciona elementos que estão dentro de outro elemento, em qualquer nível de profundidade./nPara usar, separe dois seletores com um espaço: ##A B## seleciona todos os ##B## que estão dentro de algum ##A##./nPor exemplo, ###alta poção## seleciona apenas as <poção> que estão dentro do elemento com id="alta".',
  //   instructions:
  //     'Selecione apenas as ##<poção>## que estão dentro da ##<prateleira>## com id ##alta##.',
  //   after: '{ /n/tabcolor: gold; /n }',
  //   html: BASE_HTML,
  //   containerSelector: CONTAINER_SELECTOR,
  //   itemTag: ITEM_TAG,
  //   solution: '#alta poção',
  // },
];
