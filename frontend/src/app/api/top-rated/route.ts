// src/app/api/top-rated/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://video-api-homepage.onrender.com/api/videosFromDB/top-rated');
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching top-rated videos:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
