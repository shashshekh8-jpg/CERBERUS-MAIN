import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function BioGrid({ active }: { active: boolean }) {
  const [curing, setCuring] = useState(false);

  useEffect(() => {
    if (!active) {
       setCuring(true);
       const t = setTimeout(() => setCuring(false), 2000);
       return () => clearTimeout(t);
    }
  }, [active]);

  return (
    <div className="relative h-full border border-[#00FF41]/30 rounded-sm flex items-center justify-center overflow-hidden bg-black/90 shadow-[inset_0_0_50px_rgba(0,255,65,0.05)]">
      {/* Visual background noise for "data" feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none font-mono text-[8px] break-all leading-none text-[#00FF41]">
        {Array(2000).fill(0).map(() => Math.random().toString(16).substring(2)).join('')}
      </div>
      
      <div className="absolute top-4 left-6 flex flex-col gap-1 z-10">
        <div className="text-xl font-black tracking-tighter text-[#00FF41]">HOLOGRAPHIC_ENTROPY_MESH</div>
        <div className="text-[10px] font-mono text-[#00FF41]/60">MONITORING_NODES: [001-400]</div>
      </div>

      <div className={cn(
        "grid grid-cols-[repeat(20,minmax(0,1fr))] gap-3 p-12 transition-all duration-700", 
        active && "scale-95 opacity-80 blur-[1px]"
      )}>
        {Array.from({ length: 400 }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "w-1 h-1 rounded-full transition-all duration-500 relative",
              active 
                ? "bg-[#FF003C] shadow-[0_0_12px_#FF003C] scale-150" 
                : curing 
                  ? "bg-white shadow-[0_0_20px_white] scale-150 duration-1000" 
                  : "bg-[#00FF41]/20"
            )} 
          >
             {/* Subtle "neural" connection lines every few nodes */}
             {i % 13 === 0 && !active && (
               <div className="absolute top-0 left-0 w-10 h-[1px] bg-[#00FF41]/10 rotate-45 origin-left" />
             )}
          </div>
        ))}
      </div>

      {/* Threshold Marker */}
      <div className="absolute bottom-6 left-6 border border-[#00FF41]/30 bg-black/80 p-3 backdrop-blur">
        <div className="text-[9px] text-white/40 uppercase">Entropy_Threshold</div>
        <div className={cn("text-2xl font-black font-mono", active ? "text-[#FF003C] animate-pulse" : "text-[#00FF41]")}>
          {active ? "7.992 bits" : "4.500 bits"}
        </div>
      </div>
    </div>
  );
}
