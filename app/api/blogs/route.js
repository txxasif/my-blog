import { getAllBlog } from "@/model/blog.model";
import { NextResponse } from "next/server";
export async function GET() {
  const result = await getAllBlog();
  return NextResponse.json({ result });
}
