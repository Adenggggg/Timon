import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  count?: number;
  iconColorClass?: string;
}

export default function NavItem({ icon: Icon, label, to, count = 0, iconColorClass = "text-gray-500" }: NavItemProps) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }) =>
        `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
          isActive ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={17} className={isActive ? "text-white" : iconColorClass} />
          <span className="flex-1 text-left">{label}</span>
          {count > 0 && (
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                isActive ? "bg-white/20" : "bg-gray-200 text-gray-600"
              }`}
            >
              {count}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}
