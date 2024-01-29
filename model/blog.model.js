"use server";

import mongoose from "mongoose";
import Blog from "./blog.schema";
import connectDB from "./db";
import { revalidatePath } from "next/cache";
export async function addBlog(user) {
  await connectDB();
  const userId = user.get("userId");
  const title = user.get("title");
  const body = user.get("body");
  const photo = user.get("photo");
  console.log(userId, title, body, photo);
  const newBlog = new Blog({ userId, title, body, photo });
  await newBlog.save();
  revalidatePath("/createblog");
}
export async function getAllBlog() {
  await connectDB();
  ///  const blogs = await Blog.find({}).select("title photo createdAt userId");

  const blogs = await Blog.aggregate([
    {
      $match: {},
    },
    {
      $lookup: {
        from: "users",
        as: "userDetails",
        localField: "userId",
        foreignField: "_id",
      },
    },
    {
      $unwind: "$userDetails",
    },
  ]);
  return blogs;
}
export async function getBlogDetails(id) {
  await connectDB();
  //const blog = await Blog.findOne({ _id: id });
  const nId = new mongoose.Types.ObjectId(id);
  const blog = await Blog.aggregate([
    {
      $match: { _id: nId },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails",
    },
  ]);
  return blog[0];
}
