import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Link } from "react-router-dom";
import { FaBeer } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

export default function TestCard() {
  return (
    <>
      <div className="flex  gap-2">
        <Link to="/signup">
          <Button variant="destructive">Click me</Button>
        </Link>
        <div className="">
          <Button variant="outline" size="icon">
            <AiOutlineSearch
              className={`h-[1.2rem] w-[1.2rem] transition-all `}
            />
          </Button>
        </div>
      </div>

      <Calendar />
    </>
  );
}
