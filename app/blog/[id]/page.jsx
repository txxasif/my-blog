"use client";
import BlogMain from "@/components/blog-main";
import AddReview from "@/components/create/addReview";
import AllReview from "@/components/create/allReview";
import EditBlog from "@/components/edit-blog";
import { MarkAsFavorite } from "@/components/mark-favorite";
import { getBlogDetailsHelper } from "@/helper/endpoints";
import { getBlogDetails } from "@/model/blog.model";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const { status, data } = useSession();
  const { data: blog, isLoading } = useQuery({
    queryKey: [`${params.id}`],
    queryFn: async () => await getBlogDetailsHelper(params.id),
  });
  if (isLoading) return <h1>Loading</h1>;
  const { userDetails } = blog;
  const canEdit =
    status === "authenticated"
      ? userDetails.email === data.user.email
        ? true
        : false
      : false;
  console.log(canEdit);
  return (
    <main className="container py-5">
      {canEdit ? <EditBlog blog={blog} /> : <MarkAsFavorite blog={blog} />}
      <BlogMain blog={blog} />
      <AddReview id={params.id.toString()} />
      <AllReview id={params.id.toString()} />
    </main>
  );
}
