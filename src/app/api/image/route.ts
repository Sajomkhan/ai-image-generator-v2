import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt }: { prompt: string } = await request.json();

    console.log("Received prompt:", prompt); // This should now log the correct value

    const randomSeed = Math.floor(Math.random() * 100000000) + 1;
    const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt
    )}?seed=${randomSeed}&width=1920&height=1200&nologo=True&filetype=png`;

    return NextResponse.json({ url: imageURL });
  } catch (error) {
    console.error("Error generating image URL:", error);
    return NextResponse.json(
      { error: "Failed to generate image URL." },
      { status: 500 }
    );
  }
}


