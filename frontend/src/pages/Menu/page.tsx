import { Button } from "flowbite-react";
import { LogoImagePng, WordBackgroundImage } from "../../assets";

export default function MenuPage() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundImage: `url(${WordBackgroundImage})`, backgroundSize: 'cover' }} 
    >
      <img src={LogoImagePng} alt="logo" className="w-120 h-120 object-cover" />
      <div>
        <Button className="bg-orange-500 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded">Jogar</Button>
      </div>
    </div>
  )
}