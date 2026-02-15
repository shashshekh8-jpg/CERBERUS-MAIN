import { NextResponse } from 'next/server';
import Pusher from 'pusher';

export async function POST(req: Request) {
  try {
    const auth = req.headers.get('x-agent-secret');
    if (auth !== process.env.AGENT_SECRET_TOKEN) {
      return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
    }

    const pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID!,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
      secret: process.env.PUSHER_SECRET!,
      // HARDCODED NUCLEAR FIX: Direct value.
      cluster: 'ap2',
      useTLS: true,
    });

    const payload = await req.json();

    try {
        await pusher.trigger('critical-alert', 'threat-detected', payload);
    } catch (pusherError) {
        console.error("Pusher Dispatch Error:", pusherError);
    }
    
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
