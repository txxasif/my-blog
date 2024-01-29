"use server";
import { revalidatePath } from "next/cache";
import connectDB from "./db";
import User from "./user.schema";
export async function addUser(user) {
  //https://i.ibb.co/4R0z9Hm/alex-suprun-ZHv-M3-XIOHo-E-unsplash.jpg
  const name = user.get("name");
  const photo = user.get("photo");
  const email = user.get("email");
  await connectDB();
  const userNew = new User({ name: name, email: email, photo: photo });
  await userNew.save();
  revalidatePath("/createuser");
}
export async function getAllUsers() {
  await connectDB();
  const result = await User.find({});

  return result;
}

export async function getAllUsers2() {
  await connectDB();
  const result = await User.find({}).select("email _id");

  return result;
}
