'use client';
import { useRouter } from 'next/navigation';

export default function Landing() {
  const router = useRouter();
  const initializeLink = async () => {
    const audio = new Audio('/alerts.mp3');
    audio.play().catch(() => {});
    audio.pause();
    fetch('/api/incident', { method: 'OPTIONS' }).catch(() => {});
    router.push('/dashboard');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-6 bg-black">
      <h1 className="text-6xl font-black text-[#00FF41] animate-pulse">CERBERUS</h1>
      <button 
        onClick={initializeLink} 
        className="px-10 py-4 border border-[#00FF41] hover:bg-[#00FF41] hover:text-black text-xl tracking-widest transition-all"
      >
        INITIALIZE LINK
      </button>
    </div>
  );
}