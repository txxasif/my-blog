"use client";

import { caveat } from "@/font/font";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { CreateIcon, LogOut, ProfileIcon } from "@/icons/icon";
import { CreateUserBlog } from "./create-blog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { favoriteListHook } from "@/hooks/favorite-hook";

export default function Header() {
  const { resetListU } = favoriteListHook();
  const { data, status } = useSession();
  async function logOut() {
    resetListU();
    await signOut();
  }

  return (
    <div className="container flex justify-between items-center pt-5">
      <Link href={"/"} className={`${caveat.className} text-[min(20vw,30px)]`}>
        Entertainment Blog
      </Link>
      <div>
        {status === "authenticated" ? (
          <div className="flex space-x-1">
            <CreateUserBlog user={data.user} />
            <Link href={"/profile"}>
              <AvatarProfile
                className="cursor-pointer"
                photo={data.user.photo}
              />
            </Link>

            <LogOut onClick={logOut} className="cursor-pointer w-10 h-10" />
          </div>
        ) : (
          <>
            <Link className={`${caveat.className} text-2xl`} href={"/login"}>
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

function AvatarProfile({ photo, ...props }) {
  return (
    <Avatar {...props}>
      <AvatarImage src={photo} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
