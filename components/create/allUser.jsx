import { getAllUsers } from "@/model/user.model";
import Image from "next/image";
function UserCard({ user }) {
  const { name, email, photo } = user;
  return (
    <div className="border p-2 rounded-sm w-fit">
      <h1>{name}</h1>
      <h1>{email}</h1>
      <Image
        className="w-32 h-32"
        sizes="(max-width: 39px)"
        src={photo}
        width={40}
        height={40}
      />
    </div>
  );
}

export default async function AllUser() {
  const user = await getAllUsers();

  return (
    <div className="flex">
      {user.map((user, idx) => (
        <UserCard key={idx} user={user} />
      ))}
    </div>
  );
}
