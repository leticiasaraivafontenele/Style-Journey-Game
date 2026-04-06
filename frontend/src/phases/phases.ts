export interface Phase {
  id: number;
  name: string;
  description: string;
  board: string;
  before: string;
  after: string;
}

export interface ModulePhases {
  moduleId: number;
  phases: Phase[];
}

export const module1Phases: Phase[] = [
  {
    id: 1,
    name: "Seletores de Tipo",
    description: "Aprenda a selecionar elementos HTML pelo nome da tag.",
    board: "Selecione todos os parágrafos e deixe o texto vermelho.",
    before: "p { }",
    after: "p { color: red; }",
  },
  {
    id: 2,
    name: "Seletores de Classe",
    description: "Use classes CSS para estilizar grupos de elementos.",
    board: "Selecione os elementos com a classe .destaque e aplique negrito.",
    before: ".destaque { }",
    after: ".destaque { font-weight: bold; }",
  },
  {
    id: 3,
    name: "Seletores de ID",
    description: "Selecione um elemento único pelo seu ID.",
    board: "Selecione o elemento com id #titulo e aumente o tamanho da fonte.",
    before: "#titulo { }",
    after: "#titulo { font-size: 2rem; }",
  },
    {
    id: 4,
    name: "Seletores de Tipo",
    description: "Aprenda a selecionar elementos HTML pelo nome da tag.",
    board: "Selecione todos os parágrafos e deixe o texto vermelho.",
    before: "p { }",
    after: "p { color: red; }",
  },
  {
    id: 5,
    name: "Seletores de Classe",
    description: "Use classes CSS para estilizar grupos de elementos.",
    board: "Selecione os elementos com a classe .destaque e aplique negrito.",
    before: ".destaque { }",
    after: ".destaque { font-weight: bold; }",
  },
  {
    id: 6,
    name: "Seletores de ID",
    description: "Selecione um elemento único pelo seu ID.",
    board: "Selecione o elemento com id #titulo e aumente o tamanho da fonte.",
    before: "#titulo { }",
    after: "#titulo { font-size: 2rem; }",
  },
    {
    id: 7,
    name: "Seletores de Tipo",
    description: "Aprenda a selecionar elementos HTML pelo nome da tag.",
    board: "Selecione todos os parágrafos e deixe o texto vermelho.",
    before: "p { }",
    after: "p { color: red; }",
  },
  {
    id: 8,
    name: "Seletores de Classe",
    description: "Use classes CSS para estilizar grupos de elementos.",
    board: "Selecione os elementos com a classe .destaque e aplique negrito.",
    before: ".destaque { }",
    after: ".destaque { font-weight: bold; }",
  },
  {
    id: 9,
    name: "Seletores de ID",
    description: "Selecione um elemento único pelo seu ID.",
    board: "Selecione o elemento com id #titulo e aumente o tamanho da fonte.",
    before: "#titulo { }",
    after: "#titulo { font-size: 2rem; }",
  },
      {
    id: 10,
    name: "Seletores de Tipo",
    description: "Aprenda a selecionar elementos HTML pelo nome da tag.",
    board: "Selecione todos os parágrafos e deixe o texto vermelho.",
    before: "p { }",
    after: "p { color: red; }",
  },
  {
    id:11,
    name: "Seletores de Classe",
    description: "Use classes CSS para estilizar grupos de elementos.",
    board: "Selecione os elementos com a classe .destaque e aplique negrito.",
    before: ".destaque { }",
    after: ".destaque { font-weight: bold; }",
  },
  {
    id: 12,
    name: "Seletores de ID",
    description: "Selecione um elemento único pelo seu ID.",
    board: "Selecione o elemento com id #titulo e aumente o tamanho da fonte.",
    before: "#titulo { }",
    after: "#titulo { font-size: 2rem; }",
  },
    {
    id: 13,
    name: "Seletores de Tipo",
    description: "Aprenda a selecionar elementos HTML pelo nome da tag.",
    board: "Selecione todos os parágrafos e deixe o texto vermelho.",
    before: "p { }",
    after: "p { color: red; }",
  },
  {
    id: 14,
    name: "Seletores de Classe",
    description: "Use classes CSS para estilizar grupos de elementos.",
    board: "Selecione os elementos com a classe .destaque e aplique negrito.",
    before: ".destaque { }",
    after: ".destaque { font-weight: bold; }",
  },
  {
    id: 15,
    name: "Seletores de ID",
    description: "Selecione um elemento único pelo seu ID.",
    board: "Selecione o elemento com id #titulo e aumente o tamanho da fonte.",
    before: "#titulo { }",
    after: "#titulo { font-size: 2rem; }",
  },
];

export const module2Phases: Phase[] = [];

export const allModulePhases: ModulePhases[] = [
  { moduleId: 1, phases: module1Phases },
  { moduleId: 2, phases: module2Phases },
];
