import { useParams } from 'react-router-dom';
import { module1Phases } from '../../../phases/module1';
import { LuConstruction } from 'react-icons/lu';
import PhaseBase from '../../../components/phases/PhaseBase';
import { menuBackgroundImage, module1PhaseImage, paperImage } from '../../../assets';
import { modules } from '../../../components/MapBackground';
import TerminalSimulator from '../../../components/TerminalSimulator';

export default function Module1PhasePage() {
  const { id } = useParams<{ id: string }>();

  const phase = module1Phases.find(p => p.id === Number(id));

  if (!phase) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ backgroundImage: `url(${menuBackgroundImage})`, backgroundSize: 'cover' }} 
      >
        <p className="text-4xl font-bold">Fase não encontrada.</p>
        <LuConstruction size={200} className="text-red-500" />
      </div>
    );
  }

  return (
    <PhaseBase
      backgroundImage={module1PhaseImage}
      paperImage={paperImage}
      phase={phase}
      moduleName={modules[0].title}
    >
      <div className='w-90'>
        <TerminalSimulator
          title='html'
          beforeString={phase.html}
        />
      </div>
    </PhaseBase>
  );
}
