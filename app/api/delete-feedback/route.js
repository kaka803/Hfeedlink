import { connectDb } from "@/lib/db";
import { Feedback } from "@/model/feedback";

export async function DELETE(req) {
  await connectDb();
  const { id } = await req.json();

  if (!id) return new Response("Missing ID", { status: 400 });

  try {
    await Feedback.findByIdAndDelete(id);
    return new Response("Feedback deleted", { status: 200 });
  } catch (error) {
    return new Response("Error deleting feedback", { status: 500 });
  }
}
