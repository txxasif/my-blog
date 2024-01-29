"use client";
import FavoriteBlogCard from "@/components/favorite-blog-card";
import { favoriteListSelector } from "@/store/favorite/favoriteSelector";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Page() {
  const { data, status } = useSession();
  const list = useSelector(favoriteListSelector);
  console.log(list);
  useEffect(() => {
    redirect("/login");
  }, [status]);
  return (
    <main className="container py-10">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {list.map((blog, idx) => (
          <FavoriteBlogCard key={idx} blog={blog} />
        ))}
      </div>
    </main>
  );
}
