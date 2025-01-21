"use server";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

// =============== All Iamge Buffer Handle ===================//
export const handleBufferAllImage = async (arrayOfImageURL) => {
  const uploadDir = path.join(process.cwd(), "public/uploads");

  // Ensure the upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  let index = 0;

  for (const imageURL of arrayOfImageURL) {
    try {
      // Convert the image data to an array buffer
      const response = await fetch(imageURL); // Assuming imageURL is a valid URL
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Save the image to the upload directory
      const fileName = `${index}-${Date.now()}.jpg`;
      const filePath = path.join(uploadDir, fileName);

      fs.writeFileSync(filePath, buffer);
      index++;
      console.log(`Image saved: ${fileName}`);
    } catch (error) {
      console.error(`Failed to process image: ${imageURL}`, error);
    }
  }
};

// =============== Single Iamge Buffer Handle ===================//
export const handleBuffer = async (imageURL) => {
  const uploadDir = path.join(process.cwd(), "public/uploads");

  // Ensure the upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  try {
    // Convert the image data to an array buffer
    const response = await fetch(imageURL); // Assuming imageURL is a valid URL
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save the image to the upload directory
    const fileName = `${Date.now()}.jpg`;
    const filePath = path.join(uploadDir, fileName);

    fs.writeFileSync(filePath, buffer);

    console.log(`Image saved: ${fileName}`);
  } catch (error) {
    console.error(`Failed to process image: ${imageURL}`, error);
  }
};

// =============== Auto Image Download ===================//

export const autoImageDownoad = async (state) => {
  
  const uploadDir = path.join(process.cwd(), "public/uploads");  
  const randomSeed = Math.floor(Math.random() * 100000000) + 1;
  
  // Ensure the upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    state.prompt
  )}?model=${state.currentModel}&seed=${randomSeed}&width=${state.size.width}&height=${
    state.size.height
  }&nologo=True&filetype=jpeg`;

  try {
    // Fetch the image from the external service
    const response = await fetch(imageURL);

    if (!response.ok) {
      console.error(`Failed to fetch image from ${imageURL}`);
    }

    // Use arrayBuffer instead of buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Save the image to the upload directory
    const fileName = `${Date.now()}.jpeg`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);
  } catch (err) {
    console.error(`Error saving image :`, err);
  }
};
