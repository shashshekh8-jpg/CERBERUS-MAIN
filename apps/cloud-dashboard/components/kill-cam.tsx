export default function KillCam({ alert }: { alert: any }) {
  return (
    <div className="h-full border border-[#00FF41]/30 bg-black/95 p-6 relative flex flex-col overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.1)]">
      {/* HEADER */}
      <div className="text-xs font-bold text-[#00FF41] border-b border-[#00FF41]/20 pb-3 mb-4 flex justify-between items-center z-20 relative">
        <span className="tracking-[0.2em] uppercase">Forensic_Memory_Dump</span>
        <span className="text-[10px] opacity-60 font-mono">NODE_ID: 0x4F1</span>
      </div>

      {alert ? (
        <div className="flex-1 relative font-mono flex flex-col">
          {/* 1. THE DATA LAYER (Hex Dump) */}
          <div className="absolute inset-0 overflow-hidden opacity-60 z-0">
            <div className="text-[10px] leading-[1.1rem] text-[#FF003C] break-all animate-[slideDown_5s_linear_infinite]">
              {Array(10).fill(alert.hexDump).map((chunk, i) => (
                <span key={i}>{chunk} </span>
              ))}
            </div>
          </div>
          
          {/* 2. THE OVERLAY LAYER (The Stamp) - SIZE REDUCED */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            {/* CHANGES:
               - border-[6px] -> border-4
               - text-5xl -> text-3xl (Much smaller text)
               - px-10 py-5 -> px-6 py-3 (Smaller box)
               - shadow-[0_0_50px...] -> shadow-[0_0_30px...] (Less bloom)
            */}
            <div className="border-4 border-[#FF003C] text-[#FF003C] text-3xl font-black rotate-[-12deg] px-6 py-3 bg-black/20 shadow-[0_0_30px_#FF003C] tracking-tighter mix-blend-screen backdrop-contrast-125 leading-none">
              THREAT
              <br />
              PURGED
            </div>
            {/* Sub-text reduced size and spacing */}
            <div className="mt-2 text-[#FF003C] font-mono text-[9px] tracking-widest bg-black/50 px-2 py-0.5 font-bold uppercase mix-blend-screen border border-[#FF003C]/50">
              Kernel_Guillotine_Executed
            </div>
          </div>

          {/* 3. METADATA LAYER */}
          <div className="mt-auto p-3 bg-black/80 border-t border-[#FF003C]/30 z-20 relative backdrop-blur-sm">
            <div className="text-[9px] text-[#FF003C]/70 mb-1 uppercase">Suspect_File_Identified:</div>
            <div className="text-sm text-white font-bold mb-2 break-all leading-tight">{alert.fileName}</div>
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-[#FF003C]/50">ACTION TAKEN:</span>
              <span className="text-[#FF003C] animate-pulse">PROCESS_TERMINATED</span>
            </div>
          </div>
        </div>
      ) : (
        /* IDLE STATE */
        <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-6 z-10">
          <div className="relative">
             <div className="w-20 h-20 border-2 border-[#00FF41] rounded-full animate-ping opacity-30" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-[#00FF41] rounded-full border-t-transparent animate-spin" />
             </div>
          </div>
          <div className="text-xs tracking-[0.4em] font-bold text-[#00FF41] uppercase">Scanning_VMem</div>
        </div>
      )}
    </div>
  );
}
