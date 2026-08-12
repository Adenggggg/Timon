import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/AuthContext";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Settings</h1>

      <div className="rounded-xl border border-gray-200 bg-white p-6 mb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Account</p>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Name</span>
            <span className="text-gray-900 font-medium">{user?.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Email</span>
            <span className="text-gray-900 font-medium">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Role</span>
            <span className="text-gray-900 font-medium">{user?.role}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium px-4 py-2.5 hover:bg-red-50 transition-colors"
      >
        <LogOut size={15} /> Log out
      </button>
    </div>
  );
}
