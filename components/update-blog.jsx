"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditIcon } from "@/icons/icon";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadPhoto } from "@/helper/upload-photo";
import { createBlog, updateBlogHelper } from "@/helper/endpoints";
import { SpinnerButton } from "./ui/spinner-button";
const initialValue = {
  title: "",
  body: "",
};
export function UpdateBlog({ blog }) {
  const { title, body, _id } = blog;
  const queryClient = useQueryClient();
  const [form, setForm] = useState(initialValue);
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log({ name, value });
    setForm((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  useEffect(() => {
    setForm({
      title,
      body,
    });
  }, []);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async () => {
      if (form.title == "" || form.body == "") {
        return;
      }

      const response = await updateBlogHelper(_id, form);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`${_id}`]);
    },
    onError: () => {
      alert("went wrong");
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <EditIcon className="cursor-pointer w-10 h-8" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Your Blog!</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              required
              value={form.title}
              onChange={handleChange}
              type="text"
              name="title"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Body
            </Label>
            <Textarea
              value={form.body}
              required
              onChange={handleChange}
              type="text"
              name="body"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <SpinnerButton
            isLoading={isPending}
            onClick={mutate}
            name={"Update"}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
