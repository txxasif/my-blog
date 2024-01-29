"use client";
import { getAllReviews } from "@/model/comment.model";
import { CommentCard } from "../comment-card";
import { useQuery } from "@tanstack/react-query";
import { getCommentsHelper } from "@/helper/endpoints";
import { useSession } from "next-auth/react";

export default function AllReview({ id }) {
  const { data, status } = useSession();
  console.log(status);
  const { data: comments, isLoading } = useQuery({
    queryKey: [`comments/${id}`],
    queryFn: async () => await getCommentsHelper(id),
  });
  if (isLoading) return <h1>Loading</h1>;
  return (
    <div>
      {comments.map((comment, idx) => (
        <CommentCard
          key={idx}
          comment={comment}
          status={status}
          user={data?.user}
        />
      ))}
    </div>
  );
}
