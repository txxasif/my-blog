import { getBlogDetails } from "@/model/blog.model";

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  console.log("hit");
  const id = params.id;
  console.log(id);
  const result = await getBlogDetails(id);
  return NextResponse.json({ result });
}
