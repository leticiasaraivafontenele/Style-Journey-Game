import { module1Phases } from "./module1";
import { module2Phases } from "./module2";

export interface IPhase {
  id: number;
  name: string;
  property: string;
  description: string;
  instructions: string;
  before?: string;
  after?: string;
  solution: string;
}

export type Phase = IPhase;

export interface IModulePhases {
  moduleId: number;
  phases: IPhase[];
}

export const allModulePhases: IModulePhases[] = [
  { moduleId: 1, phases: module1Phases },
  { moduleId: 2, phases: module2Phases },
];
