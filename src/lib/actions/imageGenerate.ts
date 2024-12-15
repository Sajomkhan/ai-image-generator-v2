"use server";
export const generateImage = async (prompt: string) => {
  function generateRandomNumber(): number {
    return Math.floor(Math.random() * 100000000) + 1;
  }

  try {
    const randomSeed = generateRandomNumber();
    const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt
    )}?seed=${randomSeed}&width=512&height=512&nologo=True`;

    await fetch(imageURL);
  } catch (error) {
    console.log("Error:", error);
    return null; // Or throw the error if you want to propagate it
  }
};
