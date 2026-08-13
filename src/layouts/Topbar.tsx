import { useState, useRef, useEffect } from "react";
import { Search, Bell, LogOut, Settings as SettingsIcon, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthContext";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="h-16 shrink-0 border-b border-gray-200 bg-white flex items-center gap-3 px-4 sm:px-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden w-9 h-9 shrink-0 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600"
        aria-label="Open menu"
      >
        <Menu size={19} />
      </button>

      <div className="flex-1 min-w-0 max-w-md">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search tasks or projects..."
            className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none flex-1 min-w-0"
          />
        </div>
      </div>

      <button className="relative w-9 h-9 shrink-0 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors">
        <Bell size={17} />
        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500" />
      </button>

      <div className="relative shrink-0" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="flex items-center gap-2.5 pl-1 sm:pl-2 pr-1 py-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="text-right leading-tight hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-[11px] text-gray-400 uppercase tracking-wide">{user?.role}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-900 text-white text-xs font-semibold flex items-center justify-center shrink-0">
            {user ? initials(user.name) : ""}
          </div>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
            <div className="sm:hidden px-3 py-2 border-b border-gray-100 mb-1">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-[11px] text-gray-400 uppercase tracking-wide">{user?.role}</p>
            </div>
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/settings");
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <SettingsIcon size={14} /> Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut size={14} /> Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
