"use client";
import { abhayaLibre } from "@/font/font";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { SpinnerButton } from "./ui/spinner-button";
const defaultValue = {
  name: "",
  photo: "",
  email: "",
};
export default function LogIn({ users }) {
  const [selectedUser, setUser] = useState(defaultValue);
  const [loading, setLoading] = useState();
  const { status } = useSession();

  function handleChange(e) {
    setUser(users[e]);
  }
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email: selectedUser.email,
      redirect: false,
      callbackUrl: "/",
    });
    setLoading(false);
  }
  useEffect(() => {
    if (status == "authenticated") {
      redirect("/");
    }

    setUser(users[0]);
  }, [status]);

  return (
    <div className={`${abhayaLibre.className} w-full py-7 `}>
      {/** User List To Login**/}
      <div className="w-full flex justify-center mb-2">
        <RadioGroup
          className="grid md:grid-cols-4 gap-x-2"
          onValueChange={handleChange}
          defaultValue={0}
        >
          {users.map((user, idx) => (
            <div key={idx} className="flex flex-col space-y-1">
              <UserCard key={user.name} user={user} />
              <RadioGroupItem value={idx} />
            </div>
          ))}
        </RadioGroup>
      </div>
      {/* Selected User */}
      <div className="w-full flex justify-center border-t-2 py-1">
        <UserCard user={selectedUser} />
      </div>
      {/* Login Button */}
      <div className="flex justify-center">
        <SpinnerButton
          isLoading={loading}
          onClick={handleLogin}
          name={`Login As ${selectedUser.name}`}
          className="text-2xl py-4"
        />
      </div>
    </div>
  );
}

function UserCard({ user }) {
  const { name, photo, email } = user;
  return (
    <div className="">
      <Image className=" h-36 rounded" src={photo} width={300} height={200} />
      <h1 className="text-lg">{name}</h1>
      <h1>{email}</h1>
    </div>
  );
}
