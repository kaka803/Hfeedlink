// import { auth, clerkClient } from '@clerk/nextjs/server';
import { auth, clerkClient } from '@clerk/nextjs/server';

export async function POST(req) {
  const { allowFeedback, id } = await req.json();

  const userId = id
   
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // await clerkClient.users.updateUserMetadata(userId, {
    //   publicMetadata: {
    //     allowFeedback,
    //   },
    // });
    const client = await clerkClient()
    client.users.updateUser(userId, {
      publicMetadata: {
        allowFeedback,
      },
    })

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
    });
    
  } catch (error) {
    console.error("Metadata update error", error);
    return new Response("Failed to update", { status: 500 });
  }
}
