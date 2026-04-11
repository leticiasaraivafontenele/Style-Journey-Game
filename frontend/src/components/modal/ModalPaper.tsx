import { PiXLogoFill, PiArrowLeftBold } from "react-icons/pi";
import { paperImage } from "../../assets";
import { TiArrowBackOutline } from "react-icons/ti";
import { modalPaperStrings } from "../../strings/pt-br/components";

interface ModalPaperProps {
  showMap: boolean;
  handleMapCloseClick?: () => void;
  children?: React.ReactNode;
  darkenBackground?: boolean;
  goBackTo?: () => void;
}

export default function ModalPaper({ showMap, handleMapCloseClick, children, darkenBackground, goBackTo }: ModalPaperProps) {
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
          alt={modalPaperStrings.paperAlt}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-180 rotate-90 object-cover"
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-180 h-130"
          style={{ zIndex: 10 }}
        >
          {children}
        </div>
        {goBackTo && (
          <TiArrowBackOutline
            className="absolute bottom-20 left-15 text-amber-900 text-4xl cursor-pointer hover:text-amber-700 transition-colors duration-200"
            style={{ zIndex: 20 }}
            onClick={goBackTo}
          />
        )}
        <PiXLogoFill
          className="absolute bottom-20 right-15 text-red-800 text-4xl cursor-pointer hover:text-red-600 transition-colors duration-200"
          style={{ zIndex: 20 }}
          onClick={handleMapCloseClick}
        />
      </div>
    </div>
  );
}