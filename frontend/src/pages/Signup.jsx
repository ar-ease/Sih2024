import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, LoaderCircle } from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return setErrorMessage("Please fill all the fields");
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      setTimeout(() => {
        setLoading(false);
        if (data.success === false) {
          setErrorMessage(data.message);
        } else if (res.ok) {
          navigate("/sign-in");
        }
      }, 1500);
    } catch (error) {
      // Even in case of an error, wait for 3 seconds before updating the state
      setTimeout(() => {
        setLoading(false);
        setErrorMessage(error.message);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex p-3 max-w-3xl mx-auto flex-col">
        <div className="flex-1">
          <Link to="/" className="font-bold font-mono text-xl">
            PROTECTIVE
          </Link>
          <p className="text-sm mt-5">
            This is a project for women's safety where we are making a community
            where you can learn how to protect yourself. Please sign up with
            your credentials.
          </p>
        </div>
        <div className="">
          <form className="flex flex-col gap-5 pt-10" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Username"
              id="username"
              className="border-b-2 border-black"
              onChange={handleChange}
            />
            <Input
              type="email"
              placeholder="Email"
              id="email"
              className="border-b-2 border-black"
              onChange={handleChange}
            />
            <Input
              type="password"
              placeholder="Password"
              id="password"
              className="border-b-2 border-black"
              onChange={handleChange}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              className="border-b-2 border-black"
              onChange={handleChange}
            />
            <Button className="h-10" type="submit" disabled={loading}>
              {loading ? (
                <div className="animate-spin">
                  <LoaderCircle />
                </div>
              ) : (
                "Sign up"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign in
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
