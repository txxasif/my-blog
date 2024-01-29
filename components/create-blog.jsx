"use client";
import { Button } from "@/components/ui/button";
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
import { CreateIcon } from "@/icons/icon";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadPhoto } from "@/helper/upload-photo";
import { createBlog } from "@/helper/endpoints";
import { SpinnerButton } from "./ui/spinner-button";
const initialValue = {
  title: "",
  body: "",
  photo: "",
};
export function CreateUserBlog({ user }) {
  const { _id: id } = user;
  const queryClient = useQueryClient();
  const [form, setForm] = useState(initialValue);
  const [isOpen, setOpen] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    console.log({ name, value, type, files });
    setForm((prevValues) => ({
      ...prevValues,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
  }

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async () => {
      if (form.title == "" || form.body == "") {
        return;
      }
      const data = {
        ...form,
        userId: id,
      };

      const result = await uploadPhoto(data.photo);
      data["photo"] = result;
      const response = await createBlog(data);
      return true;
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: () => {
      alert("went wrong");
    },
  });

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <CreateIcon
          onClick={() => {
            setOpen(true);
          }}
          className="cursor-pointer w-10 h-10"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write What's on Your Mind!</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              required
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
              required
              onChange={handleChange}
              type="text"
              name="body"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Photo
            </Label>
            <Input
              required
              onChange={handleChange}
              name="photo"
              type="file"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <SpinnerButton
            isLoading={isPending}
            onClick={mutate}
            name={"Upload"}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
