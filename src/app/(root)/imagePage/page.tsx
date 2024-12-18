"use client";
import { useAppContext } from "@/context";
import Image from "next/image";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";

const ImagePage = () => {
  const { state } = useAppContext();
  console.log(state);

  return (
    <div className="flex flex-col gap-10 ">
      <Link href={"/"} className="self-end p-2 bg-gray-900 rounded-md cursor-pointer"><IoMdClose size={24}/></Link>
      {state.imageUrls.map((img: string, index: number) => (
        <div key={index} className="w-full h-[700px] relative ">
          <Image src={img} alt="" fill className="object-cover rounded-lg overflow-auto" />
        </div>
      ))}
    </div>
  );
};

export default ImagePage;

// "use client";
// import { useAppContext } from "@/context";
// import Image from "next/image";
// import Link from "next/link";
// import { IoMdClose } from "react-icons/io";

// const ImagePage = () => {
//   const { state } = useAppContext();
//   console.log(state);

//   return (
//     <div className="flex flex-col gap-10 ">
//       <Link href={"/"} className="self-end p-2 bg-gray-900 rounded-md cursor-pointer"><IoMdClose size={24}/></Link>
//       {state.imageUrls.map((img: string, index: number) => (
//         <div key={index} className="w-full h-[700px] relative ">
//           <Image src={img} alt="" fill className="object-cover rounded-lg overflow-auto" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ImagePage;


// "use client";
// import { useAppContext } from "@/context";
// import Image from "next/image";

// const ImagePage = () => {
//   const { state } = useAppContext();
//   console.log(state);

//   const width = Math.floor(state.size.width/2)
//   const height = Math.floor(state.size.height/2)
  

//   return (
//     <div className="flex flex-col gap-10 ">
//       {state.imageUrls.map((img: string, index: number) => (
//         <div key={index} className={`w-[${width}px] h-[${height}px] relative`}>
//           <Image src={img} alt="" fill className="object-cover rounded-lg overflow-auto" />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ImagePage;
