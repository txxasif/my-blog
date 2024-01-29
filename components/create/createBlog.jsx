import { addBlog } from "@/model/blog.model";
import { getAllUsers2 } from "@/model/user.model";

export default async function CreateBlog() {
  const users = await getAllUsers2();

  return (
    <div>
      <form action={addBlog} className="text-black">
        <select name="userId">
          {users.map((user, idx) => (
            <option key={idx} value={user._id.toJSON()}>
              {user.email}
            </option>
          ))}
        </select>
        <input type="text" name="title" placeholder="title" />
        <textarea type="text" name="body" placeholder="body" />
        <input type="text" name="photo" placeholder="photo" />
        <button className="text-white" type="submit">
          Sum
        </button>
      </form>
    </div>
  );
}
