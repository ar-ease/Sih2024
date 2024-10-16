import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const [theme, setTheme] = useState("light");

  // On component mount, check the saved theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      document.documentElement.classList.add("light");
    }
  }, []);

  // Function to toggle the theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all ${
          theme === "dark" ? "hidden" : "block"
        }`}
      />
      <Moon
        className={`h-[1.2rem] w-[1.2rem] transition-all ${
          theme === "light" ? "hidden" : "block"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
