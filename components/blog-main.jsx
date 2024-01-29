"use client";
import Image from "next/image";
import { abhayaLibre } from "@/font/font";
export default function BlogMain({ blog }) {
  const { photo, title, body, _id } = blog;
  return (
    <div className={`${abhayaLibre.className}`}>
      <h1
        className={`${abhayaLibre.className} text-center  text-[min(5vw,100px)] `}
      >
        {title}
      </h1>
      <Image
        className="w-full bg-slate-800"
        src={photo}
        width={1000}
        height={800}
        // onLoadingComplete={(image) => image.classList.remove("bg-slate-800")}
      />
      <p className="text-xl pt-3">{body}</p>
    </div>
  );
}
