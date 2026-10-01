import { useNavigate } from 'react-router-dom';
import { baseGrayImage, baseGreenImage, baseOrangeImage, mapModule1Image, mapModule2Image, stickImage } from '../assets';
import { mapStrings } from '../strings/pt-br/map';
import { allModulePhases, type Phase } from '../phases';
import { useAuth } from '../contexts/AuthContext';
import StarRating, { qualityToRating } from './StarRating';
import { getAvatarImageById } from '../utils/avatarHelper';
import { useLevel } from '../hooks/useLevel';

export interface IModules {
  image: string;
  title: string;
}
export const modules : IModules[] = [
  { image: mapModule1Image, title: mapStrings.module1Title },
  //{ image: mapModule2Image, title: mapStrings.module2Title },
];

const DISC_PATH: Array<{ top: string; left: string }> = [
  { top: '6.5%', left: '50%' },
  { top: '13%', left: '45%' },
  { top: '19.5%', left: '47%' },
  { top: '26%', left: '54%' },
  { top: '32.5%', left: '54%' },
  { top: '39%', left: '54%' },
  { top: '45.5%', left: '48%' },
  { top: '52%', left: '46%' },
  { top: '58.5%', left: '48%' },
  { top: '65%', left: '53%' },
  { top: '71.5%', left: '55%' },
  { top: '78%', left: '55%' },
  { top: '84.5%', left: '47%' },
  { top: '91%', left: '44%' },
  { top: '97.5%', left: '44%' },
];

function getDiscPosition(index: number) {
  return DISC_PATH[index % DISC_PATH.length];
}

function HorizontalStick({ title }: { title: string }) {
  return (
    <div
      className="flex items-center justify-center w-full"
      style={{
        zIndex: 50,
        backgroundImage: `url(${stickImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '70px',
      }}
    >
      {title && (
        <span className="text-black font-start font-bold text-3xl">
          {title}
        </span>
      )}
    </div>
  );
}

function checkLevelStatus(phaseId: number): {discImage: string, color: string, canAccess: boolean, showStars: boolean, showAvatar: boolean} {
  const {level} = useAuth();
  
  if(level >= phaseId) {
    return { discImage: baseGreenImage, color: 'text-lime-700', canAccess: true, showStars: true, showAvatar: false };
  }
  if(level + 1 === phaseId) {
    return { discImage: baseOrangeImage, color: 'text-orange-600', canAccess: true, showStars: false, showAvatar: true };
  }
  return { discImage: baseGrayImage, color: 'text-gray-600', canAccess: false, showStars: false, showAvatar: false };
}

function PhaseDisc({ phase, index, moduleId, quality }: { phase: Phase; index: number; moduleId: number; quality: number | null }) {

  const navigate = useNavigate();
  const position = getDiscPosition(index);

  const {avatarId} = useAuth();
  const avatarImage = getAvatarImageById(avatarId);


  const {discImage, color, canAccess, showStars, showAvatar} = checkLevelStatus(phase.id);
  return (
    <button
      className="absolute flex flex-col items-center cursor-pointer bg-transparent border-none p-0"
      style={{
        top: position.top,
        left: position.left,
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
      }}
      title={phase.name}
      onClick={() => navigate(`/phase/module${moduleId}/${phase.id}`)}
      disabled={!canAccess}
    >
      {showAvatar && avatarImage && (
        <img
          src={avatarImage}
          className='absolute z-5 w-27 bottom-20 hover:opacity-60 transition-opacity'   
        /> 
      )}
      <img
        src={discImage}
        alt={phase.name}
        className="w-30 h-30 drop-shadow-lg"
      />
      {showStars && <StarRating className='absolute -bottom-1' rating={qualityToRating(quality)}/>}
      <span className={`absolute bottom-13 text-2xl font-bold font-start ${color} drop-shadow text-center`}>
        {phase.id}
      </span>
    </button>
  );
}

export default function MapBackground() {
  const { levels } = useLevel();
  const qualityByLevel = new Map<number, number | null>(
    levels.map(l => [l.level, l.quality ?? null])
  );

  return (
    <div className="w-full bg-lime-500">
      {modules.map((module, index) => {
        const moduleData = allModulePhases.find(m => m.moduleId === index + 1);
        const phases = moduleData?.phases ?? [];

        return (
          <div key={index} className="w-full">
            <HorizontalStick title={module.title} />
            <div className="relative w-full">
              <img
                src={module.image}
                alt={`${mapStrings.moduleImageAltPrefix} ${index + 1}`}
                style={{ display: 'block', width: '100%' }}
              />
              {phases.map((phase, phaseIndex) => (
                <PhaseDisc
                  key={phase.id}
                  phase={phase}
                  index={phaseIndex}
                  moduleId={index + 1}
                  quality={qualityByLevel.get(phase.id) ?? null}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
