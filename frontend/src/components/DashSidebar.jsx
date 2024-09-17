import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  ChevronRight,
  HomeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  UserIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";

export default function DashSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setActiveTab(tabFromUrl || "");
  }, [location.search]);

  const NavItem = ({ icon, label, to = "#", tabValue }) => (
    <Button variant="ghost" className="w-full justify-start" asChild>
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

  const SidebarContent = () => (
    <div
      className={`flex h-full flex-col ${isCollapsed ? "items-center" : ""}`}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && <h2 className="text-lg font-semibold">My App</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronRight
            className={`h-4 w-4 transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <nav className="flex-1 space-y-2 p-4">
          <NavItem
            icon={<UserIcon className="h-4 w-4" />}
            label="Profile"
            to="/dashboard?tab=profile"
            tabValue="profile"
          />
          <NavItem
            icon={<SettingsIcon className="h-4 w-4" />}
            label="Sign Out"
            to="/dashboard?tab=sign-out"
            tabValue="sign-out"
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
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="sm:hidden">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
