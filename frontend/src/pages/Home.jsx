import React from "react";
import Header from "../components/Header";
import { TestCard } from "../components/TestCard";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="pt-28">
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
