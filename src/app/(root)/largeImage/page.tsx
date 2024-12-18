"use client";
import { useAppContext } from "@/context";
import Image from "next/image";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const LargeImage = () => {
  const { state, setState } = useAppContext();
  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  console.log(state);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!imagePrompt?.trim()) {
    //   alert("Please enter a valid prompt.");
    //   return;
    // }

    setIsSubmited(true);
    if (!navigator.onLine) {
      alert("No internet connection. Try later.");
      setIsSubmited(false);
      return;
    }

    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: state.prompt, state: state }),
      });

      const data = await response.json();

      if (response.ok) {
        setState({ ...state, imageUrls: data });
      } else {
        alert(data.error || "An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      alert(
        "Failed to fetch image. Please check your connection and try again."
      );
    } finally {
      setIsSubmited(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 ">
      <Link href={"/"} className="self-end p-2 bg-gray-900 rounded-md cursor-pointer"><IoMdClose size={24}/></Link>
            {/* PROMPT INPUT FORM */}
            <form
        onSubmit={handleSubmit}
        className="w-full flex gap-6 justify-center items-center"
      >
        <div className="w-full flex flex-col gap-1">
          <input
            type="text"
            placeholder="Enter your prompt"
            value={state.prompt}
            // onChange={(e) => setImagePrompt(e.target.value)}
            onChange={(e) => setState({ ...state, prompt: e.target.value })}
            className="w-full bg-gray-950 border border-gray-700 outline-gray-700 rounded-md py-2 px-4"
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
      {state.imageUrls.map((img: string, index: number) => (
        <div key={index} className="w-full h-[700px] relative ">
          <Image src={img} alt="" fill className="object-cover rounded-lg overflow-auto" />
        </div>
      ))}
    </div>
  );
};

export default LargeImage;