"use client";

import { useAppContext } from "@/context";
import { autoImageDownoad } from "@/lib/actions/handleBuffer";
import { useEffect, useState } from "react";


const AutoDownloadPage = () => {
  const { state, setState } = useAppContext();

  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null); 

  const handleToggle = () => {
    if (!state.prompt.trim()) {
      alert("Please enter a prompt before starting auto-run.");
      return;
    }

    if (isRunning) {
      // Stop the auto-run
      if (intervalId !== null) {
        clearInterval(intervalId); 
      }
      setIsRunning(false);
      setIntervalId(null);
      console.log("Auto-run stopped");
    } else {
      // Start the auto-run
      const id = setInterval(() => {
        console.log("Function is running at 1-minute intervals");
        autoImageDownoad(state);
      }, 20000); // 1 minute = 60000ms

      setIntervalId(id as unknown as number);
      setIsRunning(true);
      console.log("Auto-run started");
    }
  };

  useEffect(() => {
    // Clean up the interval on component unmount
    return () => {
      if (intervalId !== null) clearInterval(intervalId);
    };
  }, [intervalId]);


  return (
    <div className="w-full min-h-96 flex justify-center items-center">
      <div className="w-full flex flex-col gap-4 ml-32">
        <input
          type="text"
          placeholder="Enter your prompt"
          value={state.prompt || ""}
          onChange={(e) => setState({ ...state, prompt: e.target.value })}
          className="w-4/5 bg-gray-950 border border-gray-700 outline-gray-700 rounded-md py-4 px-7"
        />
        <button
          onClick={handleToggle}
          className="w-fit bg-teal-500 hover:bg-teal-600 py-2 px-10 rounded-md text-white transition-all ease-linear duration-150"
        >
          {isRunning ? "Stop Auto" : "Auto Run"}
        </button>
      </div>
    </div>
  );
};

export default AutoDownloadPage;
