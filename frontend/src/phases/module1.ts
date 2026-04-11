import type { IPhase } from '.';

export interface IModule1Phase extends IPhase {
  /**
   * HTML structure of the board using fantasy tags (poção, prateleira, mesa…)
   * with /n and /tab as formatting tokens.
   *
   * This serves two purposes:
   *  1. Displayed to the user as a code reference so they can read the structure.
   *  2. Used internally to evaluate CSS selectors via querySelectorAll – both the
   *     solution selector and the user's selector are run against this HTML, and
   *     the resulting element sets are compared to determine correctness.
   *
   * Because verification compares selected elements (not strings), any semantically
   * equivalent selector is accepted as a correct answer.
   */
  html: string;
}

// Shared board layout used by phases 1–4:
//   top shelf (prateleira #alta):  1 red poção  + 1 blue poção
//   middle shelf (prateleira):     1 blue poção
//   table (mesa):                  1 red poção
const BASE_HTML = `<div class="escritório">/n/tab<prateleira id="alta">/n/tab/tab<poção></poção>/n/tab/tab<poção class="azul"></poção>/n/tab</prateleira>/n/tab<prateleira>/n/tab/tab<poção class="azul"></poção>/n/tab</prateleira>/n/tab<mesa>/n/tab/tab<poção></poção>/n/tab</mesa>/n</div>`;

// t = top shelf, m = middle shelf, d = bottom/table
// r = red poção,  b = blue poção
const BASE_BOARD = 'trbmbdr';

export const module1Phases: IModule1Phase[] = [
  {
    id: 1,
    property: 'Seletor de Tipo',
    name: 'Seletor de Tag',
    description:
      'Um ##seletor de tipo## (ou seletor de tag) seleciona todos os elementos de um determinado nome de tag./nPor exemplo, escrever ##poção## seleciona todos os elementos <poção> presentes no documento, independentemente de onde estejam.',
    instructions: 'Selecione todas as tags ##<poção>##.',
    board: BASE_BOARD,
    after: '{ /n/tabcolor: red; /n }',
    html: BASE_HTML,
    solution: 'poção',
  },
  {
    id: 2,
    property: 'Seletor de Classe',
    name: 'Seletor de Classe',
    description:
      'Um ##seletor de classe## seleciona todos os elementos que possuem um determinado valor no atributo class./nPara usar, coloque um ponto (##.##) antes do nome da classe./nPor exemplo, ##.azul## seleciona todos os elementos que possuem class="azul".',
    instructions: 'Selecione apenas as ##<poção>## com a classe ##azul##.',
    board: BASE_BOARD,
    after: '{ /n/tabcolor: blue; /n }',
    html: BASE_HTML,
    solution: '.azul',
  },
  {
    id: 3,
    property: 'Seletor de ID',
    name: 'Seletor de ID',
    description:
      'Um ##seletor de ID## seleciona o elemento que possui um determinado valor no atributo id./nPara usar, coloque um sustenido (###) antes do nome do ID./nPor exemplo, ###alta## seleciona o elemento com id="alta"./nIDs são únicos: cada ID deve aparecer apenas uma vez por página.',
    instructions: 'Selecione a ##<prateleira>## com o id ##alta##.',
    board: BASE_BOARD,
    after: '{ /n/tabborder: 2px solid gold; /n }',
    html: BASE_HTML,
    solution: '#alta',
  },
  {
    id: 4,
    property: 'Seletor Descendente',
    name: 'Seletor Descendente',
    description:
      'Um ##seletor descendente## seleciona elementos que estão dentro de outro elemento, em qualquer nível de profundidade./nPara usar, separe dois seletores com um espaço: ##A B## seleciona todos os ##B## que estão dentro de algum ##A##./nPor exemplo, ###alta poção## seleciona apenas as <poção> que estão dentro do elemento com id="alta".',
    instructions:
      'Selecione apenas as ##<poção>## que estão dentro da ##<prateleira>## com id ##alta##.',
    board: BASE_BOARD,
    after: '{ /n/tabcolor: gold; /n }',
    html: BASE_HTML,
    solution: '#alta poção',
  },
];
