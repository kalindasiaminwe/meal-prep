import { connectDB } from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: 'MongoDB connected successfully!' });
  } catch (err) {
    return NextResponse.json({ message: 'Error connecting to MongoDB', error: err }, { status: 500 });
  }
}
