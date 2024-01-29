import { addReview } from "@/model/comment.model";
import { getAllUsers, getAllUsers2 } from "@/model/user.model";
import { Textarea } from "../ui/textarea";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SpinnerButton } from "../ui/spinner-button";
import Image from "next/image";
import { addCommentHelper } from "@/helper/endpoints";
export default function AddReview({ id }) {
  const { status, data } = useSession();
  const queryClient = useQueryClient();
  const [body, setBody] = useState("");
  const [user, setUser] = useState(null);
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async () => {
      if (!user) {
        alert("Please login");
      }
      const data = {
        blogId: id,
        body,
        name: user.name,
        photo: user.photo,
        email: user.email,
      };
      const response = await addCommentHelper(data);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`comments/${id}`]);
    },
    onError: () => {
      alert("went wrong");
    },
  });
  useEffect(() => {
    if (status == "authenticated") {
      setUser(data.user);
    }
  }, [status]);

  return (
    <div>
      <Textarea
        className="w-[min(30vw,300px)]"
        onChange={(e) => setBody(e.target.value)}
      />
      <SpinnerButton
        isLoading={isPending}
        name={"Add Comment"}
        onClick={mutate}
      />
    </div>
  );
}
