import { abhayaLibre } from "@/font/font";
import { dateToString } from "@/helper/date-to-str";
import Image from "next/image";
import Link from "next/link";
import { SpinnerButton } from "./ui/spinner-button";
import { favoriteListHook } from "@/hooks/favorite-hook";
import { resolve } from "styled-jsx/css";
import { useState } from "react";
export default function FavoriteBlogCard({ blog }) {
  const { photo, createdAt, title, _id, userDetails } = blog;
  const { name, photo: userPhoto } = userDetails;
  const [isLoading, setLoading] = useState(false);
  const postedDate = dateToString(createdAt);
  const { remove } = favoriteListHook({ _id });
  async function removeBlog() {
    setLoading(true);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 200);
    });
    remove(_id);
    setLoading(false);
  }
  return (
    <div className="relative w-fit">
      <div className="flex items-center space-x-2 px-1">
        <Image
          className="rounded-full w-10 h-10"
          src={userPhoto}
          width={100}
          height={100}
        />

        <div>
          <p className="text-orange-600">{name}</p>
          <p>{postedDate}</p>
        </div>
      </div>
      <Link
        href={`/blog/${_id.toString()}`}
        className={`${abhayaLibre.className}`}
      >
        <Image src={photo} width={500} height={350} />

        <h1 className="text-2xl ">{title}</h1>
      </Link>
      <SpinnerButton
        className="absolute top-1 right-1 text-2xl"
        name={"Remove"}
        isLoading={isLoading}
        onClick={removeBlog}
      />
    </div>
  );
}
