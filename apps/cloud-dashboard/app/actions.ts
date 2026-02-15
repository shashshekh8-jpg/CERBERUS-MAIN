'use server';

export async function triggerSimulation() {
  const baseUrl = 'https://cerberus-rust.vercel.app';
  await fetch(`${baseUrl}/api/incident`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'x-agent-secret': process.env.AGENT_SECRET_TOKEN! 
    },
    body: JSON.stringify({ 
      fileName: 'wannacry_payload.exe', 
      entropyScore: 7.992, 
      status: 'ENFORCE', 
      timestamp: Date.now() 
    })
  });
  return { success: true };
}