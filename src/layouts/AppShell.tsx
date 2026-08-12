import { Outlet } from "react-router-dom";
import { Target, Inbox, MessageSquare, FolderKanban } from "lucide-react";
import NavItem from "./NavItem";
import { emails, messages, projects } from "@/data/mockData";

export default function AppShell() {
  const unreadEmail = emails.filter((e) => e.unread).length;
  const unreadMsg = messages.filter((m) => m.unread).length;
  const openTasks = projects.flatMap((p) => p.tasks).filter((t) => !t.done).length;

  return (
    <div className="min-h-screen w-full bg-gray-50 flex text-gray-900">
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white p-4 flex flex-col gap-1">
        <div className="flex items-center gap-2 px-2 mb-6">
          <div className="w-7 h-7 rounded-lg bg-gray-900 flex items-center justify-center">
            <Target size={15} className="text-white" />
          </div>
          <span className="font-semibold">Timon</span>
        </div>
        <NavItem icon={Target} label="Focus" to="/" />
        <NavItem icon={Inbox} label="Inbox" to="/inbox" count={unreadEmail} />
        <NavItem icon={MessageSquare} label="Messages" to="/messages" count={unreadMsg} />
        <NavItem icon={FolderKanban} label="Projects" to="/projects" count={openTasks} />
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
