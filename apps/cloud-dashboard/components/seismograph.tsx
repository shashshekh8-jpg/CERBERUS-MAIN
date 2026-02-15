export default function Seismograph({ history }: { history: any[] }) {
  const points = history.length > 1 
    ? history.map((d, i) => `\${(i / (history.length - 1)) * 100},\${100 - (d.entropy / 8) * 100}`).join(' ')
    : "0,100 100,100";

  return (
    <div className="flex-1 border border-[#00FF41]/20 p-4 bg-black/60 relative">
      <div className="text-[10px] mb-2 font-bold opacity-60">ENTROPY_SIGNATURE</div>
      <div className="h-32 border-b border-[#00FF41]/20">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <polyline fill="none" stroke="#00FF41" strokeWidth="1" points={points} className="transition-all duration-500" />
        </svg>
      </div>
    </div>
  );
}