"use client";
import { favoriteListSelector } from "@/store/favorite/favoriteSelector";
import {
  addToFavorite,
  removeFromFavorite,
  resetList,
} from "@/store/favorite/favoriteSlice";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function check(list, id) {
  for (let val of list) {
    if (val._id === id) {
      return true;
    }
  }
  return false;
}

export function favoriteListHook(id) {
  const dispatch = useDispatch();
  const list = useSelector(favoriteListSelector);

  const [isInList, setIsInList] = useState(false);
  useEffect(() => {
    if (id) {
      let is = check(list, id);
      console.log(isInList);
      setIsInList(is);
    }
  }, []);
  function add(blog) {
    dispatch(addToFavorite(blog));
    setIsInList((prev) => !prev);
  }
  function remove(id) {
    dispatch(removeFromFavorite(id));
    setIsInList((prev) => !prev);
  }

  function resetListU() {
    dispatch(resetList());
  }
  return {
    list,
    isInList,
    add,
    remove,
    resetListU,
  };
}
