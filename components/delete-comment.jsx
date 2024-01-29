"use client";
import { Button } from "@/components/ui/button";
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
import { deleteCommentHelper } from "@/helper/endpoints";
import { useState } from "react";
export function DeleteComment({ id }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: async () => {
      await deleteCommentHelper(id);
      return true;
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries([`comments/${id}`]);
    },
    onError: () => {
      alert("went wrong");
    },
  });

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="bg-red-700">
          Delete
        </Button>
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
