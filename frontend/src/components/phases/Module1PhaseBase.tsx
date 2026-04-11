import type { ReactNode } from 'react';
import { menuBackgroundImage, paperImage } from '../../assets';
import type { IPhase } from '../../phases';
import PhaseBase from './PhaseBase';
import { modules } from '../MapBackground';

interface Module1PhaseBaseProps {
  phase: IPhase;
  children?: ReactNode;
}

export default function Module1PhaseBase({ phase, children }: Module1PhaseBaseProps) {
  return (
    <PhaseBase
      backgroundImage={menuBackgroundImage}
      paperImage={paperImage}
      phase={phase}
      moduleName={modules[0].title}
    >
      {children}
    </PhaseBase>
  );
}
