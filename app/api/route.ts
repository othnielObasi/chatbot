import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request, res: NextResponse) {
  const body = await req.json();

  // Construct the messages array by combining the initial assistant message with the user messages from the body
  const messages = [
    { role: "assistant", content: "Hi, this is ChatterBot! How can I help you today?" },
    ...body.messages
  ];

  // Capture the response from the OpenAI API in the 'data' variable
  const data = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  // Log the data returned from the API
  console.log("Data returned from API:", data);

  const theResponse = data.choices[0].message;

  // Log the message content from the response
  console.log("OpenAI replied...", theResponse.content);

  return NextResponse.json({ output: theResponse }, { status: 200 });
}
