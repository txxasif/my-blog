import LogIn from "@/components/login";
import { getAllUsers } from "@/model/user.model";

export default async function Page() {
  const users = await getAllUsers();
  console.log(users);
  return (
    <main className="">
      <h1 className="text-center">
        <span className="text-2xl text-red-700">*</span>
        Login using <span className="font-bold text-2xl">Next-Auth</span> with
        mock users.
        <span className="text-2xl text-red-700">*</span>
      </h1>
      <LogIn users={users} />
    </main>
  );
}
