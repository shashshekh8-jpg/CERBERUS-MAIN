'use client';
import { cn } from "@/lib/utils";
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
    <div className="relative h-full border border-[#00FF41]/30 flex items-center justify-center overflow-hidden">
      <div className={cn("grid grid-cols-20 gap-3 p-12 transition-all duration-700", active && "scale-95 blur-[1px]")}>
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