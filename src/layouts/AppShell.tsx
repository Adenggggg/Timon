import { Outlet, NavLink } from "react-router-dom";
import { Compass, Target, Inbox, MessageSquare, FolderKanban, Settings as SettingsIcon } from "lucide-react";
import NavItem from "./NavItem";
import Topbar from "./Topbar";
import { emails, messages, projects } from "@/data/mockData";

export default function AppShell() {
  const unreadEmail = emails.filter((e) => e.unread).length;
  const unreadMsg = messages.filter((m) => m.unread).length;
  const openTasks = projects.flatMap((p) => p.tasks).filter((t) => !t.done).length;

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col text-gray-900">
      <div className="h-1 w-full bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 shrink-0" />

      <div className="flex flex-1 min-h-0">
        <aside className="w-56 shrink-0 border-r border-gray-200 bg-white p-4 flex flex-col gap-1">
          <div className="flex items-center gap-2 px-2 mb-6">
            <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
              <Compass size={15} className="text-white" />
            </div>
            <span className="font-semibold">Timon</span>
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
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <Topbar />
          <main className="flex-1 p-8 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
