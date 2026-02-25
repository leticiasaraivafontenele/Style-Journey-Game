import { useState } from "react";
import { Button } from "flowbite-react";
import { LogoImagePng, WordBackgroundImage } from "../../assets";
import MapDiv from "./componentes/MapDiv";

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
      style={{ backgroundImage: `url(${WordBackgroundImage})`, backgroundSize: 'cover' }} 
    >
      <img 
        src={LogoImagePng} 
        alt="logo" 
        className={`object-cover transition-all duration-700 ease-in-out ${
          showMap 
            ? 'fixed top-4 right-4 w-70 h-70 z-50' 
            : 'w-120 h-120'
        }`}
      />
      <div className={`transition-opacity duration-500 ${showMap ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <Button 
          onClick={handlePlayClick}
          className="bg-orange-500 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded"
        >
          Jogar
        </Button>
      </div>
      <MapDiv showMap={showMap} handleMapCloseClick={handleMapCloseClick} />


    </div>
  )
}