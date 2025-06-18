
import { runChat } from "@/lib/runchat";

export async function POST(req) {
  try {
    const  prompt  = 'Give me 3 short, helpful, and realistic feedback suggestions that a user might give for any digital product (like a website or app). Use simple, casual language and separate each suggestion using ||. and make sure every time diffrent message suggested'

    

    const output = await runChat(prompt);

    return Response.json({ output });
  } catch (err) {
    console.error("Gemini Error:", err);
    return Response.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
