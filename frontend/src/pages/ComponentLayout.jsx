import React from "react";
import Header from "../components/Header";
import TestCard from "../components/TestCard";
import Navbar from "@/components/Navbar";

export default function ComponentLayout() {
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <TestCard />
        <TestCard />
        <TestCard />
        <TestCard />
        <TestCard />
        <TestCard />
        <TestCard />
        <TestCard />
        <TestCard />
        <TestCard />
      </div>
    </div>
  );
}
