"use client";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "@/components/blogCard";
import { getAllBlogHelper } from "@/helper/endpoints";
export default function Home({ searchParams }) {
  const page = searchParams.page || 1;
  console.log(page);
  const { data: blogs } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => await getAllBlogHelper(page),
    initialData: [],
  });
  return (
    <main className="container py-10">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {blogs.map((blog, idx) => (
          <BlogCard key={idx} blog={blog} />
        ))}
      </div>
    </main>
  );
}
