import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import DashPost from "@/components/DashPost";
import DashUsers from "@/components/DashUsers";
import DashCommments from "@/components/DashCommments";
import DashboaedComp from "@/components/DashboardComp";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    console.log(tabFromUrl);
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-64">
        <DashSidebar />
      </div>
      {tab === "profile" && <DashProfile />}

      {tab === "posts" && (
        <div className="w-full">
          <DashPost />
        </div>
      )}

      {tab === "users" && (
        <div className="w-full">
          <DashUsers />
        </div>
      )}
      {tab === "comments" && (
        <div className="w-full">
          <DashCommments />
        </div>
      )}
      {tab === "dash" && (
        <div className="w-full">
          <DashboaedComp />
        </div>
      )}
    </div>
  );
}
