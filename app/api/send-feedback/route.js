import { connectDb } from "@/lib/db";
import { Feedback } from "@/model/feedback";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    await connectDb();

    const { feedback, id } = await req.json();
    console.log("feedback", feedback);

    // Validation
    if (!feedback || !id) {
      return new Response("Missing feedback or user ID", { status: 400 });
    }

    // Get the user's full backend user object
    const client = await clerkClient()
    const user = await client.users.getUser(id);

    const publicMetadata = user?.publicMetadata || {};
    console.log("Metadata:", publicMetadata);

    // Check if feedback is allowed
    if (publicMetadata.allowFeedback === true) {
      const newFeedback = new Feedback({
        feedback,
        id,
      });

      await newFeedback.save();

      return Response.json({ message: "Feedback received" }, { status: 200 });
    } else {
      console.log('feedback note saved')
      return Response.json({message: 'feedback not allowed'});
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
