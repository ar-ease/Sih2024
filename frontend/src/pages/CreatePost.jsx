import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  return (
    <>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Create Post</h1>

        <form className="flex flex-col gap-4 ">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <div className=" flex-1 max-w-sm">
              <Input type="text" placeholder="Title" />
            </div>
            <div>
              {" "}
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a catagory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex ">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" accept="image/*" />
            </div>
            <div className="mt-6 pl-6">
              <Button
                type="submit"
                className="px-11 bg-blue-500 hover:bg-blue-700"
              >
                Upload image
              </Button>
            </div>
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              placeholder="write something..."
              className="h-72"
              required
            />
            <div className="pt-14 flex justify-center p-20">
              <Button type="submit" className="">
                Create Post
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
