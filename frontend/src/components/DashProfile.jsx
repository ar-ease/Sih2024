import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, AlertCircle, BadgeCheck } from "lucide-react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DeleteAccount from "./DeleteAccount";
import { useNavigate } from "react-router-dom";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  signoutSuccess,
} from "../redux/user/userSlice.js";
import axios from "axios";
import { app } from "../firebase";
import { set } from "date-fns";
import { Link } from "react-router-dom";

export default function DashProfile() {
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateError, setUpdateError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const dispatch = useDispatch();
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Unable to upload image (File must be less than 2MB)",
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData((prev) => ({ ...prev, profilePicture: downloadURL }));
          setImageFileUploadProgress(null);
          setImageFileUploading(false);
        });
      },
    );
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateError(null);
    setUpdateUserSuccess(null);

    if (Object.keys(formData).length === 0) {
      setUpdateError("No data to update");
      return;
    }

    if (imageFileUploading) {
      return;
    }

    try {
      dispatch(updateStart());
      const res = await axios.put(
        `/api/user/update/${currentUser._id}`,
        formData,
      );

      console.log("res is", res);
      if (res.statusText !== "OK") {
        dispatch(updateFailure(res?.data?.message));
        setUpdateError(res.data.message);
      }
      dispatch(updateSuccess(res.data));
      setUpdateUserSuccess("User updated successfully");
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateError(error.message);
    }
  };

  const handleSignout = async () => {
    try {
      const res = await axios.post("/api/user/signout");

      if (res.statusText !== "OK") {
        console.log(res.data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="max-w-lg mx-auto md:pr-56 p-3 w-full">
      <h1 className="text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current?.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={
              imageFileUrl ||
              currentUser?.profilePicture ||
              "/path/to/fallback-image.png"
            }
            alt="user"
            className={`rounded-full w-full h-full border-8 border-[#ece2ff] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-50"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{imageFileUploadError}</AlertDescription>
          </Alert>
        )}
        <Input
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <Input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />

        <Button type="submit" disabled={loading || imageFileUploadProgress}>
          Update
        </Button>

        {currentUser.isAdmin && (
          <Button variant="outline" onClick={() => navigate("/create-post")}>
            Create Post
          </Button>
        )}
      </form>

      <div className=" flex justify-between mt-2">
        <DeleteAccount />
        <span onClick={handleSignout} className="cursor-pointer text-red-500 ">
          Sign out
        </span>
      </div>

      {updateUserSuccess && (
        <Alert className="mt-5">
          <BadgeCheck color="#00c76a" className="h-4 w-4" />
          <AlertTitle>
            <div className="text-green-500">Success</div>
          </AlertTitle>
          <AlertDescription>{updateUserSuccess}</AlertDescription>
        </Alert>
      )}

      {updateError && (
        <Alert variant="destructive" className="mt-5">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{updateError}</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert variant="destructive" className="mt-5">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
