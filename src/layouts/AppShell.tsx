import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Compass, Target, Inbox, MessageSquare, FolderKanban, Settings as SettingsIcon, X } from "lucide-react";
import NavItem from "./NavItem";
import Topbar from "./Topbar";
import { emails, messages, projects } from "@/data/mockData";

export default function AppShell() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  const unreadEmail = emails.filter((e) => e.unread).length;
  const unreadMsg = messages.filter((m) => m.unread).length;
  const openTasks = projects.flatMap((p) => p.tasks).filter((t) => !t.done).length;

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between px-2 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
            <Compass size={15} className="text-white" />
          </div>
          <span className="font-semibold">Timon</span>
        </div>
        <button
          onClick={() => setMobileNavOpen(false)}
          className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500"
          aria-label="Close menu"
        >
          <X size={17} />
        </button>
      </div>

      <NavItem icon={Target} label="Focus" to="/" iconColorClass="text-violet-500" />
      <NavItem icon={Inbox} label="Inbox" to="/inbox" count={unreadEmail} iconColorClass="text-blue-500" />
      <NavItem icon={MessageSquare} label="Messages" to="/messages" count={unreadMsg} iconColorClass="text-emerald-500" />
      <NavItem icon={FolderKanban} label="Projects" to="/projects" count={openTasks} iconColorClass="text-amber-500" />

      <div className="flex-1" />

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isActive ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"
          }`
        }
      >
        <SettingsIcon size={17} />
        <span>Settings</span>
      </NavLink>
    </>
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col text-gray-900">
      <div className="h-1 w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 shrink-0" />

      <div className="flex flex-1 min-h-0 relative">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex w-56 shrink-0 border-r border-gray-200 bg-white p-4 flex-col gap-1">
          {sidebarContent}
        </aside>

        {/* Mobile drawer + overlay */}
        {mobileNavOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/30 z-20"
            onClick={() => setMobileNavOpen(false)}
          />
        )}
        <aside
          className={`lg:hidden fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 p-4 flex flex-col gap-1 z-30 transform transition-transform duration-200 ${
            mobileNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarContent}
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <Topbar onMenuClick={() => setMobileNavOpen(true)} />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
