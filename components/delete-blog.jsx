"use client";
import { Button } from "@/components/ui/button";
import { DeleteIcon } from "@/icons/icon";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SpinnerButton } from "./ui/spinner-button";
import { redirect } from "next/navigation";
import { deleteBlogHelper } from "@/helper/endpoints";
import { useEffect } from "react";

export function DeleteBlog({ id }) {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: async () => {
      await deleteBlogHelper(id);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: () => {
      alert("went wrong");
    },
  });
  useEffect(() => {
    if (isSuccess) {
      redirect("/");
    }
  }, [isSuccess]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DeleteIcon className="cursor-pointer w-10 h-8" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are You Sure?</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <SpinnerButton
            isLoading={isPending}
            onClick={mutate}
            name={"Delete"}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
