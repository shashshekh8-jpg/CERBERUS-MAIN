import { NextResponse } from 'next/server';
import Pusher from 'pusher';

export async function POST(req: Request) {
  const auth = req.headers.get('x-agent-secret');
  if (auth !== process.env.AGENT_SECRET_TOKEN) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
  }

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.PUSHER_CLUSTER || 'ap2',
    useTLS: true,
  });
  const payload = await req.json();
  await pusher.trigger('critical-alert', 'threat-detected', payload);
  return NextResponse.json({ success: true });
}