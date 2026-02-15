export default function Seismograph({ score }: { score: number }) {
  const height = Math.min((score / 8) * 100, 100);

  return (
    <div className="flex-1 border border-[#00FF41]/20 p-4 bg-black/60 relative">
      <div className="text-[10px] mb-4 font-bold text-[#00FF41]/80">ENTROPY_SIGNATURE</div>
      <div className="h-32 bg-[#00FF41]/5 border-b border-[#00FF41]/20 relative flex items-end overflow-hidden">
        <div className="w-full bg-[#00FF41] transition-all duration-300 shadow-[0_0_20px_#00FF41]" style={{ height: `${height}%` }} />
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20 pointer-events-none" />
      </div>
      <div className="absolute top-4 right-4 text-xl font-mono font-bold">
        {score.toFixed(4)} <span className="text-[10px] opacity-50">BITS</span>
      </div>
    </div>
  );
}