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
  const [initialized, setInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle Inbound Telemetry
  useEffect(() => { 
    if (pusherData) {
      setAlert(pusherData);
    }
  }, [pusherData]);
  
  // Audio & Alert Management
  useEffect(() => {
    if (alert) {
      if (audioRef.current && initialized) { 
        audioRef.current.currentTime = 0; 
        audioRef.current.volume = 1.0;
        audioRef.current.play().catch(e => console.error("Audio block:", e)); 
      }
      // Alert stays active for 6 seconds before system reset
      const timer = setTimeout(() => setAlert(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [alert, initialized]);

  return (
    <main className={`relative h-screen w-screen overflow-hidden p-6 transition-colors duration-1000 ${alert ? 'bg-red-950/40' : 'bg-black'}`}>
      {/* 1. INITIALIZATION OVERLAY (The Autoplay Fix) */}
      {!initialized && (
        <div className="absolute inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center backdrop-blur-md">
          <div className="border border-[#00FF41]/40 p-10 bg-black flex flex-col items-center gap-6 shadow-[0_0_50px_rgba(0,255,65,0.1)]">
            <div className="text-[#00FF41] font-mono text-xl tracking-[0.3em] animate-pulse">SYSTEM_LOCKED</div>
            <button 
              onClick={() => setInitialized(true)}
              className="bg-[#00FF41] text-black font-black px-10 py-4 hover:bg-white transition-colors uppercase tracking-widest text-sm"
            >
              Initialize Cerberus Mesh
            </button>
            <div className="text-[10px] text-[#00FF41]/40 font-mono">ESTABLISHING_KERNEL_UPLINK_BOM1</div>
          </div>
        </div>
      )}

      {/* BACKGROUND ELEMENTS */}
      <div className="scanner-line" />
      <audio ref={audioRef} src="/alerts.mp3" preload="auto" />

      {/* TOP STATUS BAR */}
      <div className="flex justify-between font-mono text-[10px] text-[#00FF41]/60 mb-4 border-b border-[#00FF41]/20 pb-2 uppercase tracking-tighter z-10 relative">
        <div className="flex gap-4">
          <span>PROJECT: CERBERUS_IMMUNE_SYS</span>
          <span className="text-white/20">|</span>
          <span>ENGINE: SHANNON_ENTROPY_V2.5</span>
        </div>
        <div className="flex gap-4">
          <span>UPLINK: ACTIVE_BOM1</span>
          <span className="text-white/20">|</span>
          <span className={alert ? "text-[#FF003C] animate-pulse font-bold" : "text-[#00FF41]"}>
            {alert ? "STATUS: THREAT_MITIGATION_ACTIVE" : "STATUS: SYSTEM_STABLE"}
          </span>
        </div>
      </div>

      {/* TACTICAL GRID LAYOUT */}
      <div className="grid grid-cols-12 grid-rows-6 gap-6 h-[88vh] relative z-10">
        
        {/* LEFT: Forensic Kill Cam */}
        <div className="col-span-3 row-span-4">
          <KillCam alert={alert} />
        </div>

        {/* CENTER: Entropy Mesh Visualization */}
        <div className="col-span-6 row-span-5">
          <BioGrid active={!!alert} />
        </div>

        {/* RIGHT: Real-time Stats & Logs */}
        <div className="col-span-3 row-span-5 flex flex-col gap-6">
          <Seismograph score={alert?.entropyScore || 3.42} />
          <ActiveLog alert={alert} />
          
          {/* Edge Agent Status Card */}
          <div className="border border-[#00FF41]/20 p-4 bg-black/60 backdrop-blur flex items-center justify-between">
            <div className="font-mono">
              <div className="text-[10px] text-white/40 uppercase">Edge_Protocol</div>
              <div className="text-sm font-bold text-[#00FF41]">GUILLOTINE_READY</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#00FF41] animate-ping" />
          </div>
        </div>

        {/* BOTTOM: Simulation Trigger */}
        <div className="col-span-3 row-span-2 relative self-end">
           <SimulationDeck />
           <div className="text-[9px] text-[#00FF41]/40 mt-4 font-mono leading-tight uppercase">
             Nodes_Monitored: 400<br/>
             Enforcement: Kernel_Level<br/>
             Latency: 8ms [BOM1-ap2]
           </div>
        </div>

        {/* BOTTOM MARQUEE: Operational Ticker */}
        <div className="col-span-9 row-span-1 border-t border-[#00FF41]/20 flex items-center bg-black/40 overflow-hidden self-end h-12">
           <div className="text-[10px] font-mono whitespace-nowrap w-full text-[#00FF41]/80 animate-[marquee_30s_linear_infinite]">
              {'>>>'} SCANNING KERNEL MEMORY... {'>>>'} VERIFYING FILE INTEGRITY... {'>>>'} SHANNON SCORE MONITORING ACTIVE... {'>>>'} RSA_SIGNATURE_VERIFIED... {'>>>'} NO PATHOGENS DETECTED... {'>>>'} CERBERUS STANDING BY...
           </div>
        </div>
      </div>
    </main>
  );
}
