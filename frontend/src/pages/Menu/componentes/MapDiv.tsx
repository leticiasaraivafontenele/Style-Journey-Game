import { PiXLogoFill } from "react-icons/pi";
import { paperImage } from "../../../assets";

interface ModalMapProps {
  showMap: boolean;
  handleMapCloseClick?: () => void;
  children?: React.ReactNode;
  darkenBackground?: boolean;
}

export default function ModalMap({ showMap, handleMapCloseClick, children, darkenBackground }: ModalMapProps) {
  if (!showMap) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 50 }}
    >
      <div
        className={`absolute inset-0  ${darkenBackground ? 'bg-black/50' : 'bg-transparent'}`}
        onClick={handleMapCloseClick}
      />
      <div className="relative w-240 h-180 overflow-hidden">
        <img
          src={paperImage}
          alt="mapa"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-180 rotate-90 object-cover"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120"
          style={{ zIndex: 10 }}
        >
          {children}
        </div>
        <PiXLogoFill
          className="absolute bottom-4 right-4 text-red-800 text-4xl cursor-pointer hover:text-red-600 transition-colors duration-200"
          style={{ zIndex: 20 }}
          onClick={handleMapCloseClick}
        />
      </div>
    </div>
  );
}