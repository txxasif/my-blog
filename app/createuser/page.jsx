import AddUser from "@/components/create/addUser";
import AllUser from "@/components/create/allUser";

export default async function Page() {
  return (
    <main>
      <AddUser />
      <AllUser />
    </main>
  );
}
