import { useParams, useNavigate } from 'react-router-dom';
import { module1Phases } from '../../../phases/module1';
import Module1PhaseBase from '../../../components/phases/Module1PhaseBase';
import { LuConstruction } from 'react-icons/lu';
import PhaseBase from '../../../components/phases/PhaseBase';
import { menuBackgroundImage, paperImage } from '../../../assets';
import { modules } from '../../../components/MapBackground';

export default function Module1PhasePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const phase = module1Phases.find(p => p.id === Number(id));

  if (!phase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-bold">Fase não encontrada.</p>
        <LuConstruction className="ml-2 text-2xl text-gray-500" />
      </div>
    );
  }

  return (
    <PhaseBase
      backgroundImage={menuBackgroundImage}
      paperImage={paperImage}
      phase={phase}
      moduleName={modules[0].title}
    >
      <div className='h-30 w-30 bg-black'>
        TERMINAL
      </div>
    </PhaseBase>
  );
}
