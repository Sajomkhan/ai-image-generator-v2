import { State } from "@/context";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import fetch from "node-fetch"; // Ensure you have `node-fetch` installed

export async function POST(request: NextRequest) {
  try {
    const { prompt, state }: { prompt: string; state: State } =
      await request.json();

    const imagesArray: string[] = [];
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    for (let i = 0; i < state.numberOfImage; i++) {
      const randomSeed = Math.floor(Math.random() * 100000000) + 1;
      const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(
        prompt
      )}?seed=${randomSeed}&width=${state.size.width}&height=${
        state.size.height
      }&nologo=True&filetype=jpeg`;

      try {
        // Fetch the image from the external service
        const response = await fetch(imageURL);

        if (!response.ok) {
          console.error(`Failed to fetch image from ${imageURL}`);
          continue;
        }

        // Use arrayBuffer instead of buffer
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Save the image to the upload directory
        const fileName = `generated-image-${Date.now()}-${i + 1}.jpeg`;
        const filePath = path.join(uploadDir, fileName);
        fs.writeFileSync(filePath, buffer);

        // Add the server-hosted image URL to the response array
        imagesArray.push(`/uploads/${fileName}`);
      } catch (err) {
        console.error(`Error saving image ${i + 1}:`, err);
      }
    }

    console.log(imagesArray);

    return NextResponse.json(imagesArray);
  } catch (error) {
    console.error("Error generating image URL:", error);
    return NextResponse.json(
      { error: "Failed to generate image URL." },
      { status: 500 }
    );
  }
}
