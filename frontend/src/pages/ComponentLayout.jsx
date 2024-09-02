import React from "react";
import Header from "../components/Header";
import { TestCard } from "../components/TestCard";

export default function ComponentLayout() {
  return (
    <div>
      <Header />
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
