import { baseGrayImage, mapModule1Image, mapModule2Image, stickImage } from '../assets';
import { mapStrings } from '../strings/pt-br/map';
import { allModulePhases, type Phase } from '../phases/phases';

const mapImages = [
  { image: mapModule1Image, title: mapStrings.module1Title },
  { image: mapModule2Image, title: mapStrings.module2Title },
];

const DISC_PATH: Array<{ top: string; left: string }> = [
  { top: '6.5%', left: '50%' },
  { top: '13%', left: '45%' },
  { top: '19.5%', left: '46%' },
  { top: '26%', left: '54%' },
  { top: '32.5%', left: '54%' },
  { top: '39%', left: '54%' },
  { top: '45.5%', left: '50%' },
  { top: '52%', left: '46%' },
  { top: '58.5%', left: '47%' },
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
        <span className="text-black font-cinzel font-bold text-3xl">
          {title}
        </span>
      )}
    </div>
  );
}

function PhaseDisc({ phase, index }: { phase: Phase; index: number }) {
  const position = getDiscPosition(index);
  return (
    <div
      className="absolute flex flex-col items-center cursor-pointer"
      style={{
        top: position.top,
        left: position.left,
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
      }}
      title={phase.name}
    >
      <img
        src={baseGrayImage}
        alt={phase.name}
        className="w-20 h-20 drop-shadow-lg"
      />
      <span className="text-xs font-bold font-cinzel text-white drop-shadow text-center max-w-20 leading-tight">
        {phase.name}
      </span>
    </div>
  );
}

export default function MapBackground() {
  return (
    <div className="w-full">
      {mapImages.map((mapImage, index) => {
        const moduleData = allModulePhases.find(m => m.moduleId === index + 1);
        const phases = moduleData?.phases ?? [];

        return (
          <div key={index} className="w-full">
            <HorizontalStick title={mapImage.title} />
            <div className="relative w-full">
              <img
                src={mapImage.image}
                alt={`${mapStrings.moduleImageAltPrefix} ${index + 1}`}
                style={{ display: 'block', width: '100%' }}
              />
              {phases.map((phase, phaseIndex) => (
                <PhaseDisc key={phase.id} phase={phase} index={phaseIndex} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
