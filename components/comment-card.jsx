import { abhayaLibre } from "@/font/font";
import { dateToString, dateToTimeString } from "@/helper/date-to-str";
import { EmailSvg } from "@/icons/icon";
import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCommentHelper } from "@/helper/endpoints";
import { SpinnerButton } from "./ui/spinner-button";
import { DeleteComment } from "./delete-comment";
export function CommentCard({ comment, status, user }) {
  const { name, email, photo, body, createdAt, _id, blogId } = comment;
  const date = dateToString(createdAt);
  const time = dateToTimeString(createdAt);
  const EditAble =
    status === "authenticated" ? (user.email === email ? true : false) : false;
  const [isEditing, setEditing] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: async () => {
      await updateCommentHelper(_id, { body: updatedComment });
      return true;
    },
    onSuccess: () => {
      setEditing(false);
      queryClient.invalidateQueries([`comments/${blogId}`]);
    },
    onError: () => {
      alert("went wrong");
    },
  });
  useEffect(() => {
    setUpdatedComment(body);
  }, []);
  return (
    <div className={`border space-y-3 p-3 ${abhayaLibre.className}`}>
      <div className="flex space-x-3">
        <Image className="rounded-full" src={photo} width={80} height={60} />
        <div className="">
          <h2 className="text-orange-600">{name}</h2>
          <div className="flex space-x-1 items-center opacity-70">
            <EmailSvg className="w-4 h-4" />
            <h1>{email}</h1>
          </div>
          <p className="opacity-70">{`${date} (${time})`}</p>
        </div>
      </div>
      {isEditing ? (
        <Textarea
          className=" md:w-[min(40vw)]"
          value={updatedComment}
          onChange={(e) => {
            setUpdatedComment(e.target.value);
          }}
        />
      ) : (
        <h1>{body}</h1>
      )}
      {EditAble && !isEditing ? (
        <>
          <Button onClick={() => setEditing(true)}>Edit</Button>{" "}
          <DeleteComment id={_id} />
        </>
      ) : null}
      {EditAble && isEditing ? (
        <>
          <SpinnerButton
            onClick={mutate}
            isLoading={isPending}
            name={"Update"}
          />
        </>
      ) : null}
    </div>
  );
}
