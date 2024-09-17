import React from "react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto md:pr-56 p-3 w-full">
      <h1 className="text-center my-7"> Profile </h1>
      <form className="flex flex-col">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full ">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full border-8 border-[#7148bc]"
          />
        </div>
        <Input
          className="mt-6"
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
        />
        <Input
          className="mt-3"
          type="text"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
        />
        <Input
          className="mt-3"
          type="password"
          placeholder="password"
          id="password"
          defaultValue=""
        />
        <Button className="mt-3">Edit</Button>
      </form>
      <div className="text-red-400 flex justify-between mt-2">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign out</span>
      </div>
    </div>
  );
}
