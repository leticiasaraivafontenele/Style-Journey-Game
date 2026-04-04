import { mapModule1Image, mapModule2Image } from '../assets';

const mapImages = [
  { image: mapModule1Image, title: 'Módulo 1 - Seletores' },
  { image: mapModule2Image, title: 'Módulo 2 - Cores e Tipografia' }
];

function HorizontalStick({title}:{title: string}) {
  return (
    <div className="w-full flex justify-center items-center h-30 bg-amber-900">
      <h2 className="text-white font-cinzel font-bold text-5xl">
        {title}
      </h2>
    </div>
  );
}

export default function MapBackground() {
  return (
    <div className="w-full">
      {mapImages.map((mapImage, index) => (
        <div key={index} className="w-full">
          <HorizontalStick title={mapImage.title} />
          <img
            src={mapImage.image}
            alt={`mapa módulo ${index + 1}`}
            style={{ display: 'block', width: '100%' }}
          />
        </div>
      ))}
    </div>
  );
}
