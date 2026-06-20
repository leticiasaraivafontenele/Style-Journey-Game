import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePhase } from '../../../hooks/usePhase';
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
import type { ItemCode } from '../../../utils/boardParser';
import { checkSelector, getSelectedElementIndices } from '../../../utils/selectorChecker';
import { parseBoardFromHtml, type BoardContainer } from '../../../utils/htmlBoardParser';
import TerminalSimulator from '../../../components/TerminalSimulator';

const itemImageMap: Record<ItemCode, string> = {
  r: potionRedImage,
  b: potionBlueImage,
  g: potionGreenImage,
  ri: potionRedTagImage,
  bi: potionBlueTagImage,
  gi: potionGreenTagImage,
};

// Full class strings so Tailwind doesn't purge them
const ringColorClass: Record<'blue' | 'green' | 'red', string> = {
  blue:  'ring-2 ring-blue-400 shadow-blue-400 shadow-xl/50',
  green: 'ring-2 ring-green-500 shadow-green-500 shadow-xl/50',
  red:   'ring-2 ring-red-500 shadow-red-500 shadow-xl/50',
};

interface BoardContainerViewProps {
  shelf: BoardContainer;
  highlightIndices: Set<number>;
  ringColor: 'blue' | 'green' | 'red';
}

function BoardContainerView({ shelf, highlightIndices, ringColor }: BoardContainerViewProps) {
  const shelfHighlighted = highlightIndices.has(shelf.htmlIndex);
  const ring = ringColorClass[ringColor];

  return (
    <div
      className={`h-30 w-full flex items-end gap-2 px-2 rounded-sm transition-all duration-300 ${
        shelfHighlighted ? ring : ''
      }`}
    >
      {shelf.items.map(item => {
        const itemHighlighted = highlightIndices.has(item.htmlIndex);
        return (
          <img
            key={item.htmlIndex}
            src={itemImageMap[item.itemCode]}
            alt={item.itemCode}
            className={`h-full object-contain rounded-sm transition-all duration-300 ${
              itemHighlighted ? ring : ''
            }`}
          />
        );
      })}
    </div>
  );
}

export default function Module1PhasePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { checkPhaseCompleted } = usePhase();

  const phase = module1Phases.find(p => p.id === Number(id));

  const [highlightIndices, setHighlightIndices] = useState<Set<number>>(
    () => new Set(phase ? getSelectedElementIndices(phase.html, phase.solution) : [])
  );
  const [ringColor, setRingColor] = useState<'blue' | 'green' | 'red'>('blue');
  const [isCheckingPhase, setIsCheckingPhase] = useState(true);
  const [initialInputValue, setInitialInputValue] = useState('');
  const [isAlreadyCompleted, setIsAlreadyCompleted] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsCheckingPhase(true);
    setInitialInputValue('');
    setIsAlreadyCompleted(false);
    setRingColor('blue');
    checkPhaseCompleted(Number(id)).then(({ completed, levelCompleted }) => {
      if (completed && levelCompleted?.userSolution) {
        setInitialInputValue(levelCompleted.userSolution);
        setIsAlreadyCompleted(true);
        setRingColor('green');
      }
      setIsCheckingPhase(false);
    });
  }, [id, checkPhaseCompleted]);

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

  if (isCheckingPhase) {
    return (
      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ backgroundImage: `url(${menuBackgroundImage})`, backgroundSize: 'cover' }}
      >
        <div className="w-10 h-10 border-4 border-amber-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const boardLayout = parseBoardFromHtml(phase.html, phase.containerSelector, phase.itemTag);

  const handleEnviar = (userSelector: string): boolean => {
    const result = checkSelector(phase.html, phase.solution, userSelector);
    return result.correct;
  };

  const handleInputChange = (value: string) => {
    if (value.trim() === '') {
      setHighlightIndices(new Set(getSelectedElementIndices(phase.html, phase.solution)));
      setRingColor('blue');
    }
  };

  const handleNextPhase = () => {
    const currentIndex = module1Phases.findIndex(p => p.id === Number(id));
    const nextPhase = module1Phases[currentIndex + 1];
    if (nextPhase) {
      navigate(`/phase/module1/${nextPhase.id}`);
      return;
    } 
    
    navigate('/map');
  };

  const handleSubmit = (userSelector: string, correct: boolean) => {
    if (correct) {
      setHighlightIndices(new Set(getSelectedElementIndices(phase.html, phase.solution)));
      setRingColor('green');
      return;
    } 

    setHighlightIndices(new Set(getSelectedElementIndices(phase.html, userSelector)));
    setRingColor('red');
    
  };

  return (
    <PhaseBase
      key={phase.id}
      backgroundImage={module1PhaseImage}
      paperImage={paperImage}
      phase={phase}
      moduleName={modules[0].title}
      onInputChange={handleInputChange}
      onEnviar={handleEnviar}
      onSubmit={handleSubmit}
      onNextPhase={handleNextPhase}
      initialInputValue={initialInputValue}
      initiallyCorrect={isAlreadyCompleted}
    >
      <div className='h-[65vh] mt-3 ml-20 flex flex-col justify-between w-[60%]'>
        {boardLayout.containers.map(shelf => (
          <BoardContainerView
            key={shelf.htmlIndex}
            shelf={shelf}
            highlightIndices={highlightIndices}
            ringColor={ringColor}
          />
        ))}
      </div>

      <div className='absolute bottom-6 right-6 w-72'>
        <TerminalSimulator
          title='html'
          beforeString={phase.html}
        />
      </div>
    </PhaseBase>
  );
}
