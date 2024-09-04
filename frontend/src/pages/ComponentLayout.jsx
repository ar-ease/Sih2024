import React from "react";
import Header from "../components/Header";
import TestCard from "../components/TestCard";
import Navbar from "@/components/Navbar";

export default function ComponentLayout() {
  return (
    <div>
      <Navbar />
      <div className="pt-24 pl-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <TestCard key={index} />
        ))}
      </div>
    </div>
  );
}
