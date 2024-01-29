import { getAllBlog } from "@/model/blog.model";
import Image from "next/image";

function BlogCard({ blog }) {
  const { title, photo, body, userId } = blog;
  return (
    <div className="border w-fit">
      <h1>{title}</h1>
      <h1>{body}</h1>
      <p>{userId.toJSON()}</p>
      <Image src={photo} width={200} height={200} />
    </div>
  );
}

export default async function AllBlogs() {
  const blogs = await getAllBlog();
  if (blogs.length == 0) return <h1>No Blogs</h1>;
  return (
    <div className="flex ">
      {blogs.map((blog, idx) => (
        <BlogCard key={idx} blog={blog} />
      ))}
    </div>
  );
}
