import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, LoaderCircle } from "lucide-react";
import axios from "axios";

export default function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill all the fields");
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await axios.post("/api/auth/signin", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;
      console.log(data);

      setTimeout(() => {
        setLoading(false);
        if (data.success === false) {
          setErrorMessage(data.message);
        } else {
          navigate("/");
        }
      }, 600);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setErrorMessage(
            error.response.data.message || "An error occurred during sign in"
          );
        } else if (error.request) {
          // The request was made but no response was received
          setErrorMessage(
            "No response received from server. Please try again."
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          setErrorMessage("An error occurred. Please try again.");
        }
        console.error("Sign in error:", error);
      }, 600);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex p-3 max-w-3xl mx-auto flex-col">
        <div className="flex-1">
          <Link to="/" className="font-bold font-mono text-xl">
            PROTECTIVE BY SAFE-T(ech)
          </Link>
          <p className="text-sm mt-5">
            You can sign up to your email and password to access your account
          </p>
        </div>
        <div className="">
          <form className="flex flex-col gap-5 pt-10" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="a@gmail.com"
              id="email"
              className="border-b-2 border-black"
              onChange={handleChange}
            />
            <Input
              type="password"
              placeholder="********"
              id="password"
              className="border-b-2 border-black"
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
