'use client';

export default function SimulationDeck({ onRefresh }: { onRefresh: () => void }) {
  const train = async () => { 
    await fetch('/api/simulation/train', { method: 'POST' });
    onRefresh(); 
  };
  
  const attack = async () => { 
    await fetch('/api/simulation/attack', { method: 'POST' }); 
  };

  return (
    <div className="flex gap-4 p-4 border border-[#00FF41]/20 bg-black/60 backdrop-blur">
      <button onClick={train} className="flex-1 p-2 border border-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-all">
        TRAIN NORMAL
      </button>
      <button onClick={attack} className="flex-1 p-2 border border-[#FF003C] text-[#FF003C] hover:bg-[#FF003C] hover:text-white transition-all">
        INJECT PATHOGEN
      </button>
    </div>
  );
}