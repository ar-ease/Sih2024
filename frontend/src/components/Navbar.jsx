import React from "react";
import { Link } from "react-router-dom";

import { ModeToggle } from "./ModeToggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoMdMenu } from "react-icons/io";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "@headlessui/react";

const Navbar = () => {
  return (
    <div className="fixed z-10 w-full shadow-md bg-clip-padding">
      <div
        className="p-3 sticky top-0  font-sans flex justify-around
     items-center  bg-opacity-50  backdrop-blur-md "
      >
        <div>
          <Link
            to="/"
            className=" self-center whitespace-nowrap  text-sm sm:text-xl font-semibold  font-mono"
          >
            PROTECTIVE
          </Link>
        </div>
        <div className="flex gap-2">
          <form>
            <Input
              type="text"
              placeholder="Search..."
              rightIcon={AiOutlineSearch}
              className="hidden lg:inline"
            />
          </form>

          <Button variant="outline" size="icon">
            <AiOutlineSearch
              className={`h-[1.2rem] w-[1.2rem] transition-all `}
            />
          </Button>
        </div>
        <div className="hidden gap-5 items-center font-medium lg:flex">
          <Link
            to="/"
            className="hover:text-violet-400 active:text-violet-500  focus:text-violet-600"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-violet-400 active:text-violet-500  focus:text-violet-600"
          >
            About
          </Link>
          <Link
            to="/Features"
            className="hover:text-violet-400 active:text-violet-500 focus:text-violet-600"
          >
            Features
          </Link>
          <Link
            to="/emergency"
            className="text-white bg-red-500 rounded-md border-2 border-red-600 hover:text-violet-300 active:boder-balck focus:border-black dark:focus:border-white px-1
            "
          >
            Emergency
          </Link>
        </div>
        <div className="flex gap-4">
          <ModeToggle />
          <Button className="border bg-black text-white dark:bg-white dark:text-black px-3 rounded-md">
            SignIn
          </Button>
        </div>

        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger>
              <IoMdMenu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4 w-[180px] md:w-[300px]">
              <SheetClose asChild>
                <Link to="/">Home</Link>
              </SheetClose>
              <Separator />
              <SheetClose asChild>
                <Link to="/about">About</Link>
              </SheetClose>
              <Separator />
              <SheetClose asChild>
                <Link to="/features">Features</Link>
              </SheetClose>

              <Separator />

              <SheetClose asChild>
                <Link to="/emergency">Emergency</Link>
              </SheetClose>
              <Separator />

              <ModeToggle />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
