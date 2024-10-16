import { Button } from "@/components/ui/button";

import React from "react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-blue-400 justify-center items-center rounded-tl-3xl rounded-br-3xl  text-center   ">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl font-semibold	">
          Learn more about self defence
        </h2>
        <p>Checkout these Bit academy for for quick learnings</p>
        <Button className="rounded-tl-xl rounded-br-xl mt-2">
          <a
            href="https://www.bitcollege.in"
            target="_black"
            rel="noopener noreference"
          >
            Learn More
          </a>
        </Button>
      </div>

      <div className="p-7 flex-1">
        {" "}
        <img src="https://spuwac.in/images/banner-self-defence.jpg" />
      </div>
    </div>
  );
}
