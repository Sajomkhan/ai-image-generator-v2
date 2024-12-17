"use client";
import { useAppContext } from "@/context";
import Image from "next/image";

const ImageDownload = () => {
  const { state } = useAppContext();

  return (
    <div className="flex flex-col gap-10 ">
      {state.imageUrls.map((img: string, index: number) => (
        <div key={index} className="w-full h-[750px] relative">
          <Image src={img} alt="" fill className="object-cover rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export default ImageDownload;
