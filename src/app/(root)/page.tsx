"use client";
import { useAppContext } from "@/context";
import Image from "next/image";
import { useState } from "react";
import { State } from "../../context/index";
import { handleBuffer, handleBufferAllImage } from "../../lib/actions/handleBuffer";
import { FiDownload } from "react-icons/fi";

const Home = () => {
  const { state, setState } = useAppContext();
  const [isSubmited, setIsSubmited] = useState<boolean>(false);

  console.log(state);
  const data = localStorage.getItem("appState");
  if (data) {
    console.log(JSON.parse(data));
  }

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
        setState({ ...state, imageUrls: [...data, ...state.imageUrls] });
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

  const handelDelete = (indexToDelete: number) => {
    setState((prevState: State) => ({
      ...prevState,
      imageUrls: prevState.imageUrls.filter(
        (_, index) => index !== indexToDelete
      ),
    }));
  };

  return (
    <div className="flex flex-col justify-center items-center gap-9">
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
      {state.imageUrls.length > 0 ? (
        <>
          <h1 className="text-xl mt-3">Your Generated Image</h1>
          <button
            onClick={() => handleBufferAllImage(state.imageUrls)}
            className="xl:mr-32 self-end px-4 py-1 cursor-pointer rounded-md border hover:bg-teal-500/20 transition-all ease-in-out"
          >
            All Dwonload
          </button>
          <section className="w-full flex flex-wrap gap-6 justify-center items-center">
            {/* DISPLAY IMAGES */}
            {state.imageUrls.map((img: string, index: number) => (
              <div key={index} className="group relative">
                <a
                  className="flex flex-col gap-2 items-center rounded-lg cursor-pointer"
                  onClick={() => window.open(img, "_blank")}
                  download={`generated-image-${index + 1}.jpeg`}
                >
                  <Image
                    src={img}
                    alt={`Generated image ${index + 1}`}
                    width={state.size.width / 4}
                    height={state.size.height / 4}
                    className={`object-cover rounded-lg h-[${
                      state.size.width / 4
                    }px] w-[${state.size.width / 4}px]`}
                  />
                </a>
                {/* Download Image */}
                <div
                  onClick={() => handleBuffer(img)}
                  className="absolute bottom-3 right-1 hidden group-hover:flex  px-3 py-2 z-10 border rounded-md hover:text-teal-600"
                >
                  <FiDownload />
                </div>
                {/* Delete Button */}
                <button
                  onClick={() => handelDelete(index)}
                  className="absolute top-1 right-1 hidden group-hover:flex text-red-600 px-2 text-3xl z-10 border rounded-md"
                >
                  &times;
                </button>
              </div>
            ))}
          </section>
        </>
      ) : (
        <div className="text-2xl text-center mt-60">
          Enter your prompt and hit generate!
        </div>
      )}
    </div>
  );
};

export default Home;
