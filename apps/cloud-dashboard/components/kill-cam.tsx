export default function KillCam({ alert }: { alert: any }) {
  return (
    <div className="h-full border border-[#00FF41]/30 bg-black/95 p-6 relative flex flex-col overflow-hidden">
      <div className="text-xs font-bold border-b border-[#00FF41]/20 pb-3 mb-4">Forensic_Memory_Dump</div>
      {alert ? (
        <div className="font-mono text-[10px] text-[#FF003C]">
          <div className="break-all opacity-60 mb-10">{alert.hexDump}</div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="border-4 border-[#FF003C] text-3xl font-black rotate-[-12deg] px-6 py-3 bg-black/20 shadow-[0_0_30px_#FF003C]">
              THREAT PURGED
            </div>
          </div>
          <div className="mt-auto text-[8px] uppercase tracking-tighter opacity-80">
            Source: {alert.fileName} | Action: ENFORCE_KILL
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center opacity-20">
          <div className="w-12 h-12 border-2 border-[#00FF41] rounded-full border-t-transparent animate-spin" />
          <div className="text-[10px] mt-4 tracking-widest uppercase">Scanning_VMem</div>
        </div>
      )}
    </div>
  );
}