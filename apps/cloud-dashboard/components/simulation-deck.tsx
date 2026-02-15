'use client';
import { triggerSimulation } from "@/app/actions";

export default function SimulationDeck() {
  const handleClick = async () => { await triggerSimulation(); };

  return (
    <button 
      onClick={handleClick}
      // CHANGE: opacity-100 (visible), bg-red-600 (red color), cursor-pointer (show mouse)
      className="absolute bottom-0 right-0 w-8 h-8 opacity-100 bg-red-600 z-50 cursor-pointer border-2 border-white hover:bg-red-500"
      aria-label="Fail Safe"
    >
      ☠️
    </button>
  );
}
