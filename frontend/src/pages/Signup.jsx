import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, LoaderCircle } from "lucide-react";
import axios from "axios";
import OAuth from "@/components/OAuth";

export default function SignUp() {
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

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await axios.post("/api/auth/signup", formData);
      const data = res.data;

      setLoading(false);
      if (data.success === false) {
        setErrorMessage(data.message);
      } else {
        navigate("/sign-in");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "An error occurred during sign up"
        );
      } else if (error.request) {
        setErrorMessage("No response received from server. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      console.error("Sign up error:", error);
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
            This is a project for women's safety where we are making a community
            where you can learn how to protect yourself. Please sign up with
            your credentials.
          </p>
        </div>
        <div className="w-96 mx-auto">
          <form className="flex flex-col gap-5 pt-10" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Username"
              id="username"
              className=""
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              id="email"
              className=""
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              id="password"
              className=""
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              className=""
              onChange={handleChange}
              required
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
            <OAuth />
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
