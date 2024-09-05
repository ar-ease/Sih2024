import React from "react";
import Header from "../components/Header";
import TestCard from "../components/TestCard";
import Navbar from "@/components/Navbar";
import Signup from "./Signup";

export default function ComponentLayout() {
  return (
    <div>
      <Navbar />
      <div className="pt-28 pl-20">
        <Signup />
      </div>
    </div>
  );
}
