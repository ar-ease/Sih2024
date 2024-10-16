import { Users } from "lucide-react";
import { FileCheck } from "lucide-react";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { signoutSuccess } from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { ChevronRight, SettingsIcon, UserIcon, MenuIcon } from "lucide-react";
import { useSelector } from "react-redux";

export default function DashSidebar() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setActiveTab(tabFromUrl || "");
  }, [location.search]);

  const NavItem = ({ icon, label, to = "#", tabValue, onClick }) => (
    <Button
      variant="ghost"
      className="w-full justify-start"
      asChild
      onClick={onClick}
    >
      <NavLink
        to={to}
        className={`flex items-center ${
          activeTab === tabValue
            ? " font-bold bg-slate-200 dark:text-white dark:bg-slate-800"
            : ""
        }`}
      >
        {icon}
        {!isCollapsed && <span className="ml-2">{label}</span>}
      </NavLink>
    </Button>
  );
  const handleSignout = async () => {
    console.log("hii");
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

  const SidebarContent = ({ handleSignout }) => (
    <div
      className={`flex h-full flex-col ${isCollapsed ? "items-center" : ""}`}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <h2 className="text-lg font-semibold">My App</h2>}
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronRight
            className={`h-4 w-4 transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </Button> */}
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <nav className="flex-1 space-y-2 p-4">
          <NavItem
            icon={<UserIcon className="h-4 w-4" />}
            label={
              <>
                Profile
                {currentUser.isAdmin === true ? (
                  <span className="ml-10 bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded">
                    Admin
                  </span>
                ) : (
                  <span className="ml-10 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded">
                    User
                  </span>
                )}
              </>
            }
            to="/dashboard?tab=profile"
            tabValue="profile"
          />

          {currentUser.isAdmin && (
            <>
              <NavItem
                icon={<FileCheck className="h-4 w-4" />}
                label="Posts"
                to="/dashboard?tab=posts"
                tabValue="posts"
              />

              <NavItem
                icon={<Users className="h-4 w-4" />}
                label="Users"
                to="/dashboard?tab=users"
                tabValue="users"
              />
            </>
          )}

          <NavItem
            icon={<SettingsIcon className="h-4 w-4" />}
            label="Sign Out"
            to="/dashboard?tab=sign-out"
            tabValue="sign-out"
            onClick={handleSignout}
          />
        </nav>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden h-screen   ${
          isCollapsed ? "w-16" : "md:w-64  w-full"
        } flex-col border-r transition-all duration-300 sm:flex`}
      >
        <SidebarContent handleSignout={handleSignout} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="sm:hidden">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent handleSignout={handleSignout} />
        </SheetContent>
      </Sheet>
    </>
  );
}
