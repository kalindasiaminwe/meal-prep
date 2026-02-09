// app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: 'MongoDB connected successfully!' });
  } catch (err) {
    return NextResponse.json({ message: 'Error connecting to MongoDB', error: err }, { status: 500 });
  }
}
