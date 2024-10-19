import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, LoaderCircle } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "@/redux/user/userSlice";
import OAuth from "@/components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill in all fields.."));
    }

    try {
      dispatch(signInStart());
      const res = await axios.post("/api/auth/signin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      } else {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        dispatch(signInFailure(error.response.data.message)); // Server-side error
      } else {
        dispatch(signInFailure("An error occurred. Please try again.")); // General error
      }
    }
  };

  return (
    <div className="min-h-screen pt-32">
      <div className="flex p-3 max-w-3xl mx-auto flex-col">
        <div className="flex-1">
          <Link to="/" className="font-bold font-mono text-xl">
            PROTECTIVE BY SAFE-T(ech)
          </Link>
          <p className="text-sm mt-5">
            You can sign up to your email and password to access your account
          </p>
        </div>
        <div className="mx-auto w-96">
          <form className="flex flex-col gap-5 pt-10" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="a@gmail.com"
              id="email"
              className=""
              onChange={handleChange}
            />
            <Input
              type="password"
              placeholder="********"
              id="password"
              className=""
              onChange={handleChange}
            />

            <Button className="h-10" type="submit" disabled={loading}>
              {loading ? (
                <div className="animate-spin">
                  <LoaderCircle />
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Do not have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign up
            </Link>
          </div>
          {errorMessage && (
            <div className="pt-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
