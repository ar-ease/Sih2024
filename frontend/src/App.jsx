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
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import Features from "./pages/Features";
import ComponentLayout from "./layouts/ComponentLayout";
import Emergency from "./pages/Emergency";
import FooterComponent from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";

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

            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            <Route element={<OnlyAdminPrivateRoute />}>
              <Route path="/create-post" element={<CreatePost />} />
            </Route>
            <Route path="/features" element={<Features />} />
            <Route path="/emergency" element={<Emergency />} />
          </Routes>
          <FooterComponent />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
