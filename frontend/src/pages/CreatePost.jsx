import { useNavigate } from "react-router-dom";
import axios from "axios";
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
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imageUpoloadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
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
            });
          }
        );
      }
    } catch (error) {
      setImageUploadError("unable to upload image");
      setImageUploadProgress(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log formData to ensure it has the right values
    if (!formData.title) {
      setPublishError("Make sure to fill the title.");
      return;
    }
    if (!formData.content) {
      setPublishError("Make sure to fill the content.");
      return;
    }
    try {
      const response = await axios.post("/api/post/create", formData, {
        headers: { "Content-Type": "application/json" },
      });

      const data = response.data;
      // Check response status code
      if (response.statusText !== "Created") {
        setPublishError(data.message || "An error occurred while publishing.");
        return;
      }
      if (response.statusText === "Created") {
        // Clear error if everything is successful

        console.log("data", data);
        console.log("data.slug", data.slug);
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      console.log("Error during submission:", error);
      console.log("Error response:", error?.response?.data?.message);
      if (error.response) {
        setPublishError(error?.response?.data?.message);
        return;
      }

      setPublishError("Something went wrong. Please try again later.");
    }
  };
  return (
    <>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Create Post</h1>

        <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <div className=" flex-1 max-w-sm">
              <Input
                type="text"
                placeholder="Title"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div>
              {" "}
              <Select
                value={formData.category || "uncategorized"} // Set the value, default to "uncategorized" if empty
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue>
                    {formData.category ? formData.category : "Uncategorized"}{" "}
                    {/* Show "Uncategorized" when no value */}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="uncategorized">Uncategorized</SelectItem>{" "}
                    {/* Option for Uncategorized */}
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
            </div>{" "}
            <div className="mt-6 pl-6">
              {" "}
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
              <div>
                {" "}
                {imageUploadError && (
                  <div className="pt-4">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{imageUploadError}</AlertDescription>
                    </Alert>
                  </div>
                )}
              </div>
            </div>
          </div>
          {formData.image && (
            <div className="flex justify-center">
              <img
                src={formData.image}
                alt="uploaded"
                className="mx-auto    w-fit h-72"
              />
            </div>
          )}
          <div className="">
            <ReactQuill
              theme="snow"
              placeholder="write something..."
              className="h-72"
              required
              onChange={(value) => setFormData({ ...formData, content: value })}
            />
            <div className=" flex justify-center p-20">
              <div>
                <div className="pl-14">
                  {" "}
                  <Button type="submit" className="">
                    Create Post
                  </Button>
                </div>
                {publishError && (
                  <div className="mt-4 mr-0">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error message</AlertTitle>
                      <AlertDescription>{publishError}</AlertDescription>
                    </Alert>
                  </div>
                )}{" "}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
