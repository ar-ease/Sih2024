import { Card } from "flowbite-react";

export function TestCard() {
  return (
    <div className="p-5 ">
      <Card className="max-w-sm ">
        <a href="#">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so
            far, in reverse chronological order.asd
          </p>
        </a>
      </Card>
    </div>
  );
}
