import { connectDb } from "@/lib/db";
import { Feedback } from "@/model/feedback";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectDb();

  try {
    const { id } = await req.json(); 

    if (!id) {
      return NextResponse.json({ message: 'Missing ID' }, { status: 400 });
    }

    // ✅ Find feedbacks by id and sort by latest first
    const feedback = await Feedback.find({ id }).sort({ createdAt: -1 });

    return NextResponse.json({ message: 'done', feedback });
  } catch (error) {
    console.error('Error while fetching feedback:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
