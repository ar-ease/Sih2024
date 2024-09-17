import React from "react";
import { useSelector } from "react-redux";

export default function themeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(10,16,34)] min-h-screen">
        {children}
      </div>
    </div>
  );
}
