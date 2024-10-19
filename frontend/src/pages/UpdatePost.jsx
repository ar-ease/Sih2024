import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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

export default function UpdatePost() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { postId } = useParams();

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState(null); // Initialize as null
  const [publishError, setPublishError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/post/getposts?postId=${postId}`);
        if (response.status !== 200) {
          setPublishError(
            response.data.message || "An error occurred while fetching."
          );
          return;
        }
        setPublishError(null);
        setFormData(response.data.posts[0]);
      } catch (error) {
        console.log(error);
        setPublishError("An error occurred while fetching the post.");
      }
    };
    fetchPost();
  }, [postId]); // Ensure useEffect depends on postId

  const handleUploadImage = async () => {
    setImageUploadError(null);
    setImageUploadProgress(null);

    if (!file) {
      setImageUploadError("Please select an image");
      return;
    }

    try {
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
          setImageUploadError("Unable to upload image");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData((prevFormData) => ({
              ...prevFormData,
              image: downloadURL,
            }));
          });
        }
      );
    } catch (error) {
      setImageUploadError("Unable to upload image");
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title) {
      setPublishError("Make sure to fill the title.");
      return;
    }
    if (!formData.content) {
      setPublishError("Make sure to fill the content.");
      return;
    }

    try {
      const response = await axios.put(
        `/api/post/updatePost/${formData._id}/${currentUser._id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status !== 200) {
        setPublishError(
          response.data.message || "An error occurred while updating the post."
        );
        return;
      }

      setPublishError(null);
      navigate(`/post/${response.data.slug}`);
    } catch (error) {
      console.log("Error during submission:", error);
      if (error.response && error.response.data.message) {
        setPublishError(error.response.data.message);
      } else {
        setPublishError("Something went wrong. Please try again later.");
      }
    }
  };

  if (!formData) {
    return (
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>
        <p>Loading...</p>{" "}
        {/* You can replace this with a spinner if you prefer */}
      </div>
    );
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen mt-28">
      <h1 className="text-center text-3xl my-7 font-semibold">Update Post</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <div className="flex-1 max-w-sm">
            <Input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue>
                  {formData.category || "Uncategorized"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="uncategorized">Uncategorized</SelectItem>
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

        <div className="flex">
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
              type="button"
              className="px-16 bg-blue-500 hover:bg-blue-700"
              onClick={handleUploadImage}
              disabled={!!imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="w-9 h-9">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload"
              )}
            </Button>
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

        {formData.image && (
          <div className="flex justify-center">
            <img
              src={formData.image}
              alt="uploaded"
              className="mx-auto w-fit h-72"
            />
          </div>
        )}

        <div>
          <ReactQuill
            theme="snow"
            value={formData.content}
            placeholder="Write something..."
            className="h-72"
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
          <div className="flex justify-center p-20">
            <div>
              <Button type="submit">Update Post</Button>
              {publishError && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{publishError}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
