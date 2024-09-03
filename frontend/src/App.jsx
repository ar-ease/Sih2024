import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/about";
import Signin from "./pages/signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import Features from "./pages/Features";
import ComponentLayout from "./pages/ComponentLayout";
import Emergency from "./pages/Emergency";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <ComponentLayout />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/features" element={<Features />} />
            <Route path="/emergency" element={<Emergency />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
