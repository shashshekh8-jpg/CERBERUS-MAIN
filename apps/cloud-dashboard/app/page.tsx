'use client';
import { useRouter } from 'next/navigation';

export default function Landing() {
  const router = useRouter();

  const initializeLink = async () => {
    // 1. Audio Context Unlock (Crucial for auto-playing siren later)
    const audio = new Audio('/alerts.mp3');
    audio.play().catch(() => {}); 
    audio.pause();
    
    // 2. Serverless Warm-Up (Wakes up the API before the demo starts)
    try { fetch('/api/incident', { method: 'OPTIONS' }).catch(() => {});
    } catch (e) {}
    
    router.push('/dashboard');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-6 bg-[url('/grid.svg')] bg-cover">
      <h1 className="text-6xl font-black tracking-tighter animate-pulse text-[#00FF41]">CERBERUS</h1>
      <button onClick={initializeLink} className="px-10 py-4 border border-[#00FF41] hover:bg-[#00FF41] hover:text-black text-xl tracking-widest transition-all">
        INITIALIZE LINK
      </button>
    </div>
  );
}