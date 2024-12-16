"use client"
import { useAppContext } from "@/context";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
   const { state } = useAppContext();
  const [outputImage, setOutputImage] = useState<string | null>(null);
  const [imagePrompt, setImagePrompt] = useState<string | null>(null);
  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmited(true);
    if (!navigator.onLine) {
      alert("No internet connection. Try later.");
      return;
    }
    setOutputImage("");
    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: imagePrompt, state: state }),
      });

      const data = await response.json();

      if (response.ok) {
        setOutputImage(data.url);
        setIsSubmited(false);
      } else {
        alert(data.error || "An unexpected error occurred. Please try again.");
        setIsSubmited(false);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      alert(
        "Failed to fetch image. Please check your connection and try again."
      );
    }
  };

  return (
    <div className="w-5/6 py-6">
      <div className="mx-auto flex flex-col justify-center items-center gap-9">
        {outputImage ? (
          <>
            <h1 className="text-2xl mt-6">Your Generated Image</h1>
            <div className="bg-indigo-300 ">
              <Image
                src={outputImage}
                alt=""
                width={1920}
                height={1080}
                className="object-cover h-[600px] w-[961px] rounded-lg"
              />
            </div>
          </>
        ) : (
          <div className="text-2xl text-center mt-60">
            Enter your prompt and hit generate!
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex gap-6 justify-center items-center"
        >
          {/* PROMPT INPUT */}
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Eter your prompt"
              onChange={(e) => setImagePrompt(e.target.value)}
              className="sm:w-[450px] md:w-[600px] xl:w-[850px] bg-gray-950 border border-gray-700 outline-gray-700 rounded-md py-2 px-4"
            />
          </div>
          <button
            disabled={isSubmited}
            className={`${
              isSubmited ? "bg-gray-500" : "bg-teal-500 hover:bg-teal-600"
            } w-fit py-1.5 px-4 rounded-md text-white transition-all ease-linear duration-150`}
          >
            {isSubmited ? "Generating..." : "Generate"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
