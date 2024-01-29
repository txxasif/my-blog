"use server";

import Comment from "./comment.schema";
import connectDB from "./db";
import User from "./user.schema";
import { revalidatePath } from "next/cache";

export async function addReview(data) {
  await connectDB();
  const userId = data.get("userId");
  const blogId = data.get("blogId");
  const body = data.get("body");
  const { name, email, photo } = await User.findOne({ _id: userId }).select(
    "name email photo"
  );
  const newComment = new Comment({ blogId, body, email, photo, name });
  await newComment.save();
  revalidatePath(`/blog/${blogId}`);
}
export async function getAllReviews(blogId) {
  const result = await Comment.find({ blogId: blogId });
  return result;
}
