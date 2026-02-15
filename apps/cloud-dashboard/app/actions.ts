'use server';

export async function triggerSimulation() {
  const secret = process.env.AGENT_SECRET_TOKEN;
  if (!secret) {
    console.error("Action Failed: Missing Secret");
    return { success: false };
  }

  // HARDCODED FIX: Point directly to your Production API
  // This prevents Vercel from guessing the wrong internal IP
  const baseUrl = 'https://cerberus-rust.vercel.app'; 

  try {
    console.log(`Triggering Simulation at ${baseUrl}...`); // Debug Log
    
    const res = await fetch(`${baseUrl}/api/incident`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-agent-secret': secret 
      },
      body: JSON.stringify({
        machineId: 'SIMULATION_NODE',
        fileName: 'wannacry_payload.exe',
        entropyScore: 7.992,
        hexDump: '4d5a90000300000004000000ffff0000b8000000000000004000000000000000',
        status: 'ENFORCE',
        timestamp: Date.now()
      }),
      cache: 'no-store' // Critical: Prevent caching
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      return { success: false };
    }

    return { success: true };
  } catch (e) {
    console.error("Simulation Fetch Error:", e);
    return { success: false };
  }
}
