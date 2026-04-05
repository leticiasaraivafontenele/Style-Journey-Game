import { mapModule1Image, mapModule2Image, stickImage } from '../assets';
import { mapStrings } from '../strings/pt-br/map';

const mapImages = [
  { image: mapModule1Image, title: mapStrings.module1Title },
  { image: mapModule2Image, title: mapStrings.module2Title },
];

function HorizontalStick({title}:{title: string}) {
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

export default function MapBackground() {
  return (
    <div className="w-full">
      {mapImages.map((mapImage, index) => (
        <div key={index} className="w-full">
          <HorizontalStick title={mapImage.title} />
          <img
            src={mapImage.image}
            alt={`${mapStrings.moduleImageAltPrefix} ${index + 1}`}
            style={{ display: 'block', width: '100%' }}
          />
        </div>
      ))}
    </div>
  );
}
