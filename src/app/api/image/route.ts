import { State } from "@/context";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt, state }: { prompt: string, state:State } = await request.json();

    console.log("Received prompt:", prompt); // This should now log the correct value
    console.log(state); 

    const randomSeed = Math.floor(Math.random() * 100000000) + 1;
    const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt
    )}?seed=${randomSeed}&width=${state.size.width}&height=${state.size.height}&nologo=True&filetype=png`;

    return NextResponse.json({ url: imageURL });
  } catch (error) {
    console.error("Error generating image URL:", error);
    return NextResponse.json(
      { error: "Failed to generate image URL." },
      { status: 500 }
    );
  }
}


