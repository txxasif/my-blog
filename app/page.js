"use client";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "@/components/blogCard";
import { getAllBlogHelper } from "@/helper/endpoints";
import { Pagination } from "@/components/pagination";
import { useEffect } from "react";
export default function Home({ searchParams }) {
  const page = searchParams.page || 1;
  console.log(page);
  const { data, isLoading } = useQuery({
    queryKey: ["blogs", `page-${page}`],
    queryFn: async () => await getAllBlogHelper(page),
    initialData: { blogs: [], totalPages: 0 },
  });
  if (isLoading) return <h1>Loa</h1>;

  return (
    <main className="container pt-10">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.blogs.map((blog, idx) => (
          <BlogCard key={idx} blog={blog} />
        ))}
      </div>
      <div className="w-full flex justify-center py-5">
        {data.totalPages ? (
          <Pagination page={Number(page)} totalPages={data.totalPages} />
        ) : null}
      </div>
    </main>
  );
}
