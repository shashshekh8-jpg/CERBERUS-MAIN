import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT entropy_score as entropy, timestamp FROM file_history 
      ORDER BY timestamp ASC LIMIT 50;
    `;
    return NextResponse.json(rows);
  } catch (e) {
    return NextResponse.json([], { status: 500 });
  }
}
