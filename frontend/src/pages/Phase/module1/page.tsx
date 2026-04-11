import { useParams } from 'react-router-dom';
import { module1Phases } from '../../../phases/module1';
import { LuConstruction } from 'react-icons/lu';
import PhaseBase from '../../../components/phases/PhaseBase';
import {
  menuBackgroundImage,
  module1PhaseImage,
  paperImage,
  potionRedImage,
  potionBlueImage,
  potionGreenImage,
  potionRedTagImage,
  potionBlueTagImage,
  potionGreenTagImage,
} from '../../../assets';
import { modules } from '../../../components/MapBackground';
import { parseBoardString, type ItemCode } from '../../../utils/boardParser';

const itemImageMap: Record<ItemCode, string> = {
  r: potionRedImage,
  b: potionBlueImage,
  g: potionGreenImage,
  ri: potionRedTagImage,
  bi: potionBlueTagImage,
  gi: potionGreenTagImage,
};

function ShelfItems({ items }: { items: ItemCode[] }) {
  return (
    <div className="flex items-end gap-2 h-full px-2">
      {items.map((code, index) => (
        <img
          key={index}
          src={itemImageMap[code]}
          alt={code}
          className="h-full object-contain"
        />
      ))}
    </div>
  );
}

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

  const boardFloors = parseBoardString(phase.board);

  return (
    <PhaseBase
      backgroundImage={module1PhaseImage}
      paperImage={paperImage}
      phase={phase}
      moduleName={modules[0].title}
    >
      <div className='h-[65vh] mt-3 ml-20 flex flex-col justify-between w-[60%]'>
        <div id='shelf-high' className='h-30 w-full'>
          <ShelfItems items={boardFloors.t} />
        </div>
        <div id='shelf-medium' className='h-30 w-full'>
          <ShelfItems items={boardFloors.m} />
        </div>
        <div id='table' className='h-30 w-full'>
          <ShelfItems items={boardFloors.d} />
        </div>
      </div>
    </PhaseBase>
  );
}
