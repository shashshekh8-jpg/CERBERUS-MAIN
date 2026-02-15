'use client';
import { useEffect, useRef, useState } from 'react';
import BioGrid from '@/components/bio-grid';
import KillCam from '@/components/kill-cam';
import Seismograph from '@/components/seismograph';
import SimulationDeck from '@/components/simulation-deck';
import ActiveLog from '@/components/active-log';
import { usePusher } from '@/hooks/use-pusher';

export default function Dashboard() {
  const pusherData = usePusher('critical-alert', 'threat-detected');
  const [alert, setAlert] = useState<any>(null);
  const [history, setHistory] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const refreshHistory = async () => {
    const res = await fetch('/api/simulation/history');
    const data = await res.json();
    setHistory(data);
  };

  useEffect(() => { if (initialized) refreshHistory(); }, [initialized]);

  useEffect(() => { 
    if (pusherData) {
      setAlert(pusherData);
      if (audioRef.current && initialized) { 
        audioRef.current.currentTime = 0; 
        audioRef.current.play(); 
      }
      setTimeout(() => setAlert(null), 6000);
    }
  }, [pusherData, initialized]);

  return (
    <main className={`relative h-screen w-screen p-6 transition-colors duration-1000 ${alert ? 'bg-red-950/40' : 'bg-black'}`}>
      {!initialized && (
        <div className="absolute inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center backdrop-blur-md">
          <button onClick={() => setInitialized(true)} className="bg-[#00FF41] text-black px-10 py-4 font-black">
            Initialize Cerberus Mesh
          </button>
        </div>
      )}
      <audio ref={audioRef} src="/alerts.mp3" preload="auto" />
      <div className="scanner-line" />
      <div className="grid grid-cols-12 grid-rows-6 gap-6 h-[88vh] relative z-10">
        <div className="col-span-3 row-span-4"><KillCam alert={alert} /></div>
        <div className="col-span-6 row-span-5"><BioGrid active={!!alert} /></div>
        <div className="col-span-3 row-span-5 flex flex-col gap-6">
          <Seismograph history={history} />
          <ActiveLog alert={alert} />
        </div>
        <div className="col-span-3 row-span-2 self-end">
          <SimulationDeck onRefresh={refreshHistory} />
        </div>
      </div>
    </main>
  );
}