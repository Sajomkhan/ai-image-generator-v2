"use client";
import Link from "next/link";
import { useAppContext } from "@/context";
import { useState } from "react";

const Sidebar = () => {
  const { state, setState } = useAppContext();
  const [size, setSize]= useState({width: state.size.width, height: state.size.height})
  const [imageQty, setImageQty] = useState(state.numberOfImage)

  function handleSetRatio(data: string) {
    // SIZE WILL AUTO CHANGE AS PER RATIO
    if(data === "16:9"){
      setState({...state, imageRatio: data, size:{width: 1744, height: 981}})
    } else if (data === "1:1"){
      setState({...state, imageRatio: data, size:{width: 1088, height: 1088}})
    } else if (data === "2:3"){
      setState({...state, imageRatio: data, size:{width: 1088, height: 1620}})
    } else {
      setState({...state, imageRatio: data, size:{width: 1744, height: 1088}})
    }
  }

  function handleApplySizeAndRatio () {
    setState({...state, size:{width: size.width, height: size.height}, numberOfImage: imageQty})
  }

  return (
    <div className="w-1/6 min-h-dvh bg-gray-900 border-r-4 border-gray-600">
      <div className="w-full flex flex-col gap-6 pl-4 py-6">
        <Link className="block text-teal-500 text-2xl font-bold" href="/">
          AI Generator
        </Link>
        <div className="px-4 h-0.5 w-5/6 bg-gray-600"></div>

        {/* ---------- CONTAINER DIV----------- */}
        <div className="flex flex-col gap-8">

          {/* ---------RATIO SETTING----------- */}
          <div className="flex flex-col gap-2">
            <div>Aspect Ratio:</div>
            <div className="flex gap-2 text-sm">
              <div
                className={`bg-black py-1 px-2 rounded-md cursor-pointer ${
                  state.imageRatio == "16:9" ? "border" : ""
                }`}
                onClick={() => handleSetRatio("16:9")}
              >
                16:9
              </div>
              <div
                className={`bg-black py-1 px-2 rounded-md cursor-pointer ${
                  state.imageRatio == "1:1" ? "border" : ""
                }`}
                onClick={() => handleSetRatio("1:1")}
              >
                1:1
              </div>
              <div
                className={`bg-black py-1 px-2 rounded-md cursor-pointer ${
                  state.imageRatio == "2:3" ? "border" : ""
                }`}
                onClick={() => handleSetRatio("2:3")}
              >
                2:3
              </div>
              <div
                className={`bg-black py-1 px-2 rounded-md cursor-pointer ${
                  state.imageRatio == "Max" ? "border" : ""
                }`}
                onClick={() => handleSetRatio("Max")}
              >
                Max
              </div>
            </div>
          </div>

          {/* ---------SIZE SETTING----------- */}
          <div className="flex flex-col gap-2">
            <div>Image Size:</div>
            <div className="flex flex-col gap-1 text-sm">
              {/* WIDTH */}
              <div className="flex gap-2 items-center">
                <label htmlFor="width">Width:</label>
                <input
                  className="w-14 bg-black py-1 px-2 rounded-md"
                  type="text"
                  name="width"
                  value={state.size.width}
                  onChange={(e)=>setSize({...size, width:e.target.value})}
                />
              </div>
              {/* HEIGHT */}
              <div className="flex gap-2 items-center">
                <label htmlFor="height">Height:</label>
                <input
                  className="w-14 bg-black py-1 px-2 rounded-md"
                  type="text"
                  name="height"
                  value={state.size.height}
                  onChange={(e)=>setSize({...size, height:e.target.value})}
                />
              </div>
            </div>
          </div>
          {/* ---------NUMBER OF IMAGE----------- */}
          <div className="flex flex-col gap-2">
            <label htmlFor="numberOfImage">Number of Image:</label>
            <input
              className="w-14 bg-black py-1 px-2 rounded-md"
              type="text"
              name="numberOfImage"
              value={imageQty}
              onChange={(e)=>setImageQty(e.target.value)}
            />
          </div>
          <button onClick={handleApplySizeAndRatio} className="bg-teal-600 cursor-pointer hover:bg-teal-700 max-w-fit px-3 py-1 rounded-md transition-all duration-150 ease-linear">Apply</button>
        </div>
        <div>{state.imageRatio}</div>
        <div>{state.size.width}</div>
        <div>{state.size.height}</div>
        <div>{state.numberOfImage}</div>
      </div>
    </div>
  );
};

export default Sidebar;
