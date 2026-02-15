import { calculateShannonEntropy } from '@/lib/entropy';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.arrayBuffer();
    const entropy = calculateShannonEntropy(new Uint8Array(data));
    return NextResponse.json({ entropy });
  } catch (e) {
    return NextResponse.json({ error: 'Analysis Failed' }, { status: 500 });
  }
}