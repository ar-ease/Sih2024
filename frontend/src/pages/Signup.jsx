import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

export default function Signup() {
  return (
    <div className="min-h-screen ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col">
        <div className="flex-1">
          <Link to="/" className="  font-bold  font-mono text-xl  ">
            PROTECTIVE
          </Link>
          <p className="text-sm mt-5">
            This is a project for women safety.where we are making a community
            where you can learn how to proyect yourself.Please sign up with your
            credentials
          </p>
        </div>
        <div className="">
          <form className="flex flex-col gap-5 pt-10">
            <Input
              type="text"
              placeholder="username"
              className="border-b-2 border-black"
            />
            <Input
              type="email"
              placeholder="Email"
              className="border-b-2 border-black"
            />
            <Input
              type="password"
              placeholder="Password"
              className="border-b-2 border-black"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              className="border-b-2 border-black"
            />
            <Button className="k  h-10 ">Signup</Button>
          </form>
          <div className="flex gap-2">
            <span>Already have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Signin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
