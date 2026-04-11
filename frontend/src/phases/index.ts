import { module1Phases } from "./module1";
import { module2Phases } from "./module2";

export interface IPhase {
  id: number;
  name: string;
  description: string;
  board: string;
  before: string;
  after: string;
}

export interface IModulePhases {
  moduleId: number;
  phases: IPhase[];
}

export const allModulePhases: IModulePhases[] = [
  { moduleId: 1, phases: module1Phases },
  { moduleId: 2, phases: module2Phases },
];
