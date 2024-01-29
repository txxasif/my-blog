import LogIn from "@/components/login";
import { getAllUsers } from "@/model/user.model";

export default async function Page() {
  const users = await getAllUsers();
  console.log(users);
  return <LogIn users={users} />;
}
