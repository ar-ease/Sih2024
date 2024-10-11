import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, LoaderCircle } from "lucide-react";

import { useState } from "react";
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
import {
  getStorage,
  getDownloadURL,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUpoloadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      } else {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploadProgress(progress.toFixed(0));
          },
          (error) => {
            setImageUploadError("unable to upload image");
            setImageUploadProgress(null);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUploadProgress(null);
              setImageUploadError(null);
              setFormData({ ...formData, image: downloadURL });
              console.log(downloadURL);
            });
          },
        );
      }
    } catch (error) {
      setImageUploadError("unable to upload image");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
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
              <Input
                id="picture"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div className="mt-6 pl-6">
              <Button
                type="submit"
                className="px-16 bg-blue-500 hover:bg-blue-700"
                onClick={handleUploadImage}
                disabled={imageUpoloadProgress}
              >
                {imageUpoloadProgress ? (
                  <div className="w-9 h-9">
                    <CircularProgressbar
                      value={imageUpoloadProgress}
                      text={`${imageUpoloadProgress || 0}%`}
                    />
                  </div>
                ) : (
                  "Upload"
                )}
              </Button>
            </div>{" "}
          </div>{" "}
          {imageUploadError && (
            <div className="pt-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{imageUploadError}</AlertDescription>
              </Alert>
            </div>
          )}
          {formData.image && (
            <img
              src={formData.image}
              alt="uploaded"
              className="pl-32 w-fit h-72"
            />
          )}
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
