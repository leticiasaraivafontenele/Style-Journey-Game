import { PiXLogoFill } from "react-icons/pi";
import { MapImage } from "../../../assets";

interface MapDivProps {
  showMap: boolean;
  handleMapCloseClick?: () => void;
}
export default function MapDiv({ showMap, handleMapCloseClick }: MapDivProps) {
  return(
    <div 
      className={`fixed top-0 left-0 h-full w-[50%] transition-transform duration-700 ease-in-out ${
        showMap ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ zIndex: 40 }}
    >
      <PiXLogoFill className="absolute bottom-20 right-15 text-red-800 text-4xl cursor-pointer hover:text-red-600 transition-colors duration-200" onClick={handleMapCloseClick} />
      <img 
        src={MapImage} 
        alt="mapa" 
        className="w-200 h-200 object-cover"
      />
    </div>
  )
}