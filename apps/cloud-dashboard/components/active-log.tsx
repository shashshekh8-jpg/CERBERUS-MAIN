'use client';
import { useEffect, useState, useRef } from 'react';

const MOCK_LOGS = [
  "KERNEL::SYSCALL_HOOK_DEPLOYED",
  "ENTROPY_ANALYSIS::SCANNING_VOL_01",
  "RSA_VAULT::INTEGRITY_CHECK_PASS",
  "DIFFIE_HELLMAN::KEY_ROTATION_SYNC",
  "SHANNON_CORE::THRESHOLD_SET_7.8",
  "GUILLOTINE::KERNEL_PRIVILEGE_LEVEL_0",
  "MEMORY_MAP::IDENTIFYING_ANOMALIES",
  "EDGE_UPLINK::BOM1_SECURE"
];

export default function ActiveLog({ alert }: { alert: any }) {
  const [logs, setLogs] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = alert 
        ? `>>> CRITICAL_ENTROPY_DETECTED: ${alert.entropyScore.toFixed(4)} [TERMINATING_PID]`
        : MOCK_LOGS[Math.floor(Math.random() * MOCK_LOGS.length)];
      
      setLogs(prev => [...prev.slice(-12), `[${new Date().toLocaleTimeString()}] ${newLog}`]);
    }, 900); 

    return () => clearInterval(interval);
  }, [alert]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="flex-1 border border-[#00FF41]/30 bg-black/80 p-3 font-mono text-[10px] uppercase overflow-hidden flex flex-col relative shadow-inner">
      <div className="absolute top-0 right-0 bg-[#00FF41]/80 text-black px-3 py-0.5 font-bold text-[9px] z-10">CORE_LOG</div>
      <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-hide pt-4">
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
