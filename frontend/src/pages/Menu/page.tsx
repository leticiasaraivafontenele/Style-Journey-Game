import { useState } from "react";
import { Button } from "flowbite-react";
import ModalPaper from "../../components/modal/ModalPaper";
import AuthForms from "../../components/forms/AuthForms";
import { menuStrings } from "../../strings/pt-br/menu";
import { logoOutlineImage, menuBackgroundImage } from "../../assets";

export default function MenuPage() {
  const [showMap, setShowMap] = useState(false);

  const handlePlayClick = () => {
    setShowMap(true);
  };
  const handleMapCloseClick = () => {
    setShowMap(false);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ backgroundImage: `url(${menuBackgroundImage})`, backgroundSize: 'cover' }} 
    >
      <img 
        src={logoOutlineImage} 
        alt={menuStrings.logoAlt} 
        className={`object-cover transition-all duration-1000 ease-in-out ${
          showMap 
            ? 'hidden' 
            : 'w-150 h-150'
        }`}
      />
      <div className={`absolute bottom-2/8 transition-opacity duration-200 ${showMap ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Button 
          onClick={handlePlayClick}
          className="bg-yellow-600 hover:bg-yellow-900 text-white text-xl font-bold py-2 px-4 rounded transition-colors duration-200 cursor-pointer font-start"
        >
          {menuStrings.playButton}
        </Button>
      </div>
      <ModalPaper showMap={showMap} handleMapCloseClick={handleMapCloseClick}>
        <AuthForms />
      </ModalPaper>
    </div>
  )
}