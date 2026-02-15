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
      setLogs(prev => [...prev.slice(-12), `[${new Date().toLocaleTimeString()}] \${msg}`]);
    }, 900);
    return () => clearInterval(interval);
  }, [alert]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [logs]);

  return (
    <div className="flex-1 border border-[#00FF41]/30 bg-black/80 p-3 font-mono text-[10px] overflow-hidden">
      <div className="space-y-1.5">
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