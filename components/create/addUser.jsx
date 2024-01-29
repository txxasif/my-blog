import connectDB from "@/model/db";
import { addUser } from "@/model/user.model";

export default async function AddUser() {
  return (
    <div>
      <form action={addUser}>
        <input
          type="text"
          name="name"
          className="border text-black"
          placeholder="name"
        />
        <input
          type="text"
          name="email"
          className="border text-black"
          placeholder="email"
        />
        <input
          type="text"
          name="photo"
          className="border text-black"
          placeholder="photo"
        />
        <button className="border" type="submit">
          Add User
        </button>
      </form>
    </div>
  );
}
