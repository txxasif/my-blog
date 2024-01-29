"use client";

import { favoriteListHook } from "@/hooks/favorite-hook";
import { BookmarkFillIcon, BookmarkIcon } from "@/icons/icon";
import { useSelector, useDispatch } from "react-redux";
export function MarkAsFavorite({ blog }) {
  const { _id } = blog;
  const { isInList, add, remove } = favoriteListHook(_id);
  function addBlog() {
    add(blog);
  }
  function removeBlog() {
    remove(_id);
  }
  return (
    <div className="w-full flex justify-end">
      {isInList ? (
        <BookmarkFillIcon
          onClick={removeBlog}
          className="cursor-pointer w-10 h-10"
        />
      ) : (
        <BookmarkIcon onClick={addBlog} className="cursor-pointer w-10 h-10" />
      )}
    </div>
  );
}
