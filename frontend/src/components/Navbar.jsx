import React from "react";
import { Link, NavLink } from "react-router-dom";

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
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
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
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-500"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/Features"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-500"
            }
          >
            Features
          </NavLink>
          <NavLink
            to="/emergency"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-red-500 rounded-md border-2 border-red-600 px-2"
                : "text-white bg-red-400 rounded-md border-2 border-red-500 hover:font-bold px-2 "
            }
          >
            Emergency
          </NavLink>
        </div>
        <div className="flex gap-4">
          <ModeToggle />
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={currentUser.profilePicture} />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <span className="">@{currentUser.username}</span>
                </DropdownMenuLabel>

                <DropdownMenuItem>
                  <span className="trunate">{currentUser.email}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Link to={"/dashboard?tab=profile"}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/sign-in">
              <Button className="border bg-black text-white dark:bg-white dark:text-black px-3 rounded-md">
                SignIn
              </Button>
            </Link>
          )}
        </div>

        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger>
              <IoMdMenu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4 w-[180px] md:w-[300px]">
              <SheetClose asChild>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-blue-500 font-bold" : "text-gray-500"
                  }
                >
                  Home
                </NavLink>
              </SheetClose>
              <Separator />
              <SheetClose asChild>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-blue-500 font-bold" : "text-gray-500"
                  }
                >
                  About
                </NavLink>
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
