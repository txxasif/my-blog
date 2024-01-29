import { DeleteIcon } from "@/icons/icon";
import { DeleteBlog } from "./delete-blog";
import { UpdateBlog } from "./update-blog";

export default function EditBlog({ blog }) {
  const { _id } = blog;
  return (
    <div className="flex justify-end">
      <DeleteBlog id={_id} />
      <UpdateBlog blog={blog} />
    </div>
  );
}
