import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const entropy = Math.random() * (3.8 - 3.2) + 3.2;
    await sql`
      INSERT INTO file_history (timestamp, file_path, entropy_score, is_anomaly)
      VALUES (${Date.now()}, 'simulation_node_1', ${entropy}, FALSE);
    `;
    return NextResponse.json({ success: true, entropy, status: "LEARNING" });
  } catch (e) {
    return NextResponse.json({ error: 'DB_WRITE_FAILED' }, { status: 500 });
  }
}