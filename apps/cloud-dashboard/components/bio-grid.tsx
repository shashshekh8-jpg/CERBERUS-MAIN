'use client';
import { cn } from "../lib/utils";
import { useEffect, useState } from "react";

export default function BioGrid({ active }: { active: boolean }) {
  const [curing, setCuring] = useState(false);

  useEffect(() => {
    if (!active) {
       setCuring(true); 
       setTimeout(() => setCuring(false), 2000);
    }
  }, [active]);

  return (
    <div className="relative h-full border border-[#00FF41]/30 flex items-center justify-center overflow-hidden bg-black/40">
      
      {/* Top Left Title - Slightly larger for readability */}
      <div className="absolute top-4 left-4 text-xs font-bold tracking-widest text-[#00FF41]/80 z-20">
        HOLOGRAPHIC_ENTROPY_MESH
      </div>

      {/* UPDATED: Bottom Right Status Indicator 
         - Changed text-[10px] to text-xl (Much bigger)
         - Added tracking-widest (Wider spacing)
      */}
      <div className={cn(
        "absolute bottom-4 right-4 text-xl font-mono font-black tracking-widest z-20 transition-colors duration-300", 
        active ? "text-[#FF003C]" : "text-[#00FF41]"
      )}>
        {active ? "DETECTED: 7.992 BITS" : "BASELINE: 3.500 BITS"}
      </div>

      {/* The Grid Mesh */}
      <div className={cn("grid grid-cols-20 gap-3 p-12 transition-all duration-700 z-10", active && "scale-95 blur-[1px]")}>
        {Array.from({ length: 400 }).map((_, i) => (
          <div key={i} className={cn(
            "w-1 h-1 rounded-full transition-all duration-500",
            active ? "bg-[#FF003C] scale-150 shadow-[0_0_12px_#FF003C]" : 
            curing ? "bg-white scale-150 shadow-[0_0_20px_white]" : 
            "bg-[#00FF41]/20"
          )} />
        ))}
      </div>
    </div>
  );
}
