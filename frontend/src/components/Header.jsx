import React from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  const path = useLocation().pathname;
  return (
    <div>
      <Navbar className="border-b-2">
        <Link
          to="/"
          className="self-center whitespace-nowrap bg-opacity-30 shadow-lg  text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-black via-slate-600 to-black rounded-lg text-white border-4 border-slate-400">
            PROTECTIVE
          </span>
        </Link>
        <form>
          <TextInput
            type="text"
            placeholder="Search krle bhai..."
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline"
          />
        </form>
        <Button className="w-12 h=10 lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>

        <div className=" flex gap-2 md:order-2 ">
          <Button className="  w-12 h-10 hidden sm:inline" color="gray" pill>
            <FaMoon />
          </Button>
          <Link to="/sign-in">
            <Button
              className="  bg-gradient-to-r from-black via-slate-600 to-black rounded-lg text-white border-4 border-slate-40"
              color="gray"
            >
              SignIn
            </Button>
          </Link>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>

          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </Navbar.Link>

          <Navbar.Link active={path === "/Features"} as={"div"}>
            <Link to="/Features">Features</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
