import { State } from "@/context";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt, state }: { prompt: string; state: State } =
      await request.json();

    // console.log("Received prompt:", prompt); // This should now log the correct value
    // console.log(state);

    const imagesArray: string[] = [];

    for (let i = 0; i < state.numberOfImage; i++) {
      const randomSeed = Math.floor(Math.random() * 100000000) + 1;
      const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(
        prompt
      )}?model=${state.currentModel}&seed=${randomSeed}&width=${state.size.width}&height=${
        state.size.height
      }&nologo=True&filetype=jpeg`;

      imagesArray.push(imageURL);
      console.log(imageURL);
    }
    // console.log(imagesArray);
    

    return NextResponse.json(imagesArray);
  } catch (error) {
    console.error("Error generating image URL:", error);
    return NextResponse.json(
      { error: "Failed to generate image URL." },
      { status: 500 }
    );
  }
}

