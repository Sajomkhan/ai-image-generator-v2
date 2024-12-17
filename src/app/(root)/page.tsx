"use client";
import { useAppContext } from "@/context";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
  const { state, setState } = useAppContext();
  const [imagePrompt, setImagePrompt] = useState<string | null>(null);
  const [isSubmited, setIsSubmited] = useState<boolean>(false);

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
        body: JSON.stringify({ prompt: imagePrompt, state: state }),
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
    <div className="mx-auto flex flex-col justify-center items-center gap-9">
      {state.imageUrls.length > 0 ? (
        <>
          <h1 className="text-xl mt-6">Your Generated Image</h1>
          <div className="w-full flex flex-wrap gap-6 justify-center items-center">
            {/* DISPLAY IMAGES */}
            {state.imageUrls.map((img: string, index: number) => (
              <div
                key={index}
                className="flex flex-col gap-2 items-center bg-indigo-300 p-4 rounded-lg"
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
                {/* Download Button */}
                <a
                  onClick={() => window.open(img, "_blank")}
                  download={`generated-image-${index + 1}.jpeg`}
                  className="bg-teal-500 text-white py-1 px-4 rounded-md hover:bg-teal-600 transition-all ease-linear cursor-pointer"
                >
                  Download
                </a>
              </div>
            ))}
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
            placeholder="Enter your prompt"
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
  );
};

export default Home;

// =========================================================================
// "use client";
// import { useAppContext } from "@/context";
// import Image from "next/image";
// import { useState } from "react";

// const Home = () => {
//   const { state } = useAppContext();
//   const [outputImage, setOutputImage] = useState([]);
//   const [imagePrompt, setImagePrompt] = useState<string | null>(null);
//   const [isSubmited, setIsSubmited] = useState<boolean>(false);

//   console.log(outputImage);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setIsSubmited(true);
//     if (!navigator.onLine) {
//       alert("No internet connection. Try later.");
//       return;
//     }
//     setOutputImage([]);
//     try {
//       const response = await fetch("/api/image", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt: imagePrompt, state: state }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setOutputImage(data);
//         setIsSubmited(false);
//       } else {
//         alert(data.error || "An unexpected error occurred. Please try again.");
//         setIsSubmited(false);
//       }
//     } catch (error) {
//       console.error("Error fetching image:", error);
//       alert(
//         "Failed to fetch image. Please check your connection and try again."
//       );
//     }
//   };

//   return (
//     <div className="w-5/6 py-6">
//       <div className="mx-auto flex flex-col justify-center items-center gap-9">
//         {outputImage ? (
//           <>
//             <h1 className="text-xl mt-6">Your Generated Image</h1>
//             <div className="w-full flex flex-wrap gap-6 justify-center items-center">
//               {outputImage.map((img, index) => (
//                 <div key={index} className="bg-indigo-300 ">
//                   <Image
//                     src={img}
//                     alt=""
//                     width={state.size.width / 4}
//                     height={state.size.height / 4}
//                     className={`object-cover h-[${state.size.width / 4}px] w-[${
//                       state.size.width / 4
//                     }px] rounded-lg`}
//                   />
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <div className="text-2xl text-center mt-60">
//             Enter your prompt and hit generate!
//           </div>
//         )}
//         <form
//           onSubmit={handleSubmit}
//           className="flex gap-6 justify-center items-center"
//         >
//           {/* PROMPT INPUT */}
//           <div className="flex flex-col gap-1">
//             <input
//               type="text"
//               placeholder="Enter your promp"
//               onChange={(e) => setImagePrompt(e.target.value)}
//               className="sm:w-[450px] md:w-[600px] xl:w-[850px] bg-gray-950 border border-gray-700 outline-gray-700 rounded-md py-2 px-4"
//             />
//           </div>
//           <button
//             disabled={isSubmited}
//             className={`${
//               isSubmited ? "bg-gray-500" : "bg-teal-500 hover:bg-teal-600"
//             } w-fit py-1.5 px-4 rounded-md text-white transition-all ease-linear duration-150`}
//           >
//             {isSubmited ? "Generating..." : "Generate"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Home;
// =========================================================================
// "use client"
// import { useAppContext } from "@/context";
// import Image from "next/image";
// import { useState } from "react";

// const Home = () => {
//    const { state } = useAppContext();
//   const [outputImage, setOutputImage] = useState<string | null>(null);
//   const [imagePrompt, setImagePrompt] = useState<string | null>(null);
//   const [isSubmited, setIsSubmited] = useState<boolean>(false);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     setIsSubmited(true);
//     if (!navigator.onLine) {
//       alert("No internet connection. Try later.");
//       return;
//     }
//     setOutputImage("");
//     try {
//       const response = await fetch("/api/image", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ prompt: imagePrompt, state: state }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setOutputImage(data.url);
//         setIsSubmited(false);
//       } else {
//         alert(data.error || "An unexpected error occurred. Please try again.");
//         setIsSubmited(false);
//       }
//     } catch (error) {
//       console.error("Error fetching image:", error);
//       alert(
//         "Failed to fetch image. Please check your connection and try again."
//       );
//     }
//   };

//   return (
//     <div className="w-5/6 py-6">
//       <div className="mx-auto flex flex-col justify-center items-center gap-9">
//         {outputImage ? (
//           <>
//             <h1 className="text-2xl mt-6">Your Generated Image</h1>
//             <div className="bg-indigo-300 ">
//               <Image
//                 src={outputImage}
//                 alt=""
//                 width={1920}
//                 height={1080}
//                 className="object-cover h-[600px] w-[961px] rounded-lg"
//               />
//             </div>
//           </>
//         ) : (
//           <div className="text-2xl text-center mt-60">
//             Enter your prompt and hit generate!
//           </div>
//         )}
//         <form
//           onSubmit={handleSubmit}
//           className="flex gap-6 justify-center items-center"
//         >
//           {/* PROMPT INPUT */}
//           <div className="flex flex-col gap-1">
//             <input
//               type="text"
//               placeholder="Eter your prompt"
//               onChange={(e) => setImagePrompt(e.target.value)}
//               className="sm:w-[450px] md:w-[600px] xl:w-[850px] bg-gray-950 border border-gray-700 outline-gray-700 rounded-md py-2 px-4"
//             />
//           </div>
//           <button
//             disabled={isSubmited}
//             className={`${
//               isSubmited ? "bg-gray-500" : "bg-teal-500 hover:bg-teal-600"
//             } w-fit py-1.5 px-4 rounded-md text-white transition-all ease-linear duration-150`}
//           >
//             {isSubmited ? "Generating..." : "Generate"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Home;
