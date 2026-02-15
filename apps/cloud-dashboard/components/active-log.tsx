'use client';
import { useEffect, useState, useRef } from 'react';

export default function ActiveLog({ alert }: { alert: any }) {
  const [logs, setLogs] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const msg = alert 
        ? `>>> CRITICAL_ENTROPY_DETECTED: [TERMINATING_PID]` 
        : `RSA_VAULT::INTEGRITY_CHECK_PASS`;
      
      // FIX: Removed the backslash so the variable actually prints
      setLogs(prev => [...prev.slice(-12), `[${new Date().toLocaleTimeString()}] ${msg}`]);
    }, 900);
    return () => clearInterval(interval);
  }, [alert]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);

  return (
    <div className="flex-1 border border-[#00FF41]/30 bg-black/80 p-3 font-mono text-[10px] overflow-hidden flex flex-col">
      {/* NEW: The Title Header */}
      <div className="text-[10px] mb-2 font-bold opacity-60 border-b border-[#00FF41]/20 pb-1">
        CORE_LOG
      </div>

      <div className="space-y-1.5 flex-1 overflow-y-auto scrollbar-hide">
        {logs.map((log, i) => (
          <div key={i} className={log.includes("CRITICAL") ? "text-[#FF003C] animate-pulse font-bold" : "text-[#00FF41]/60"}>
            {log}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
