import type { ReactNode } from "react";
import { Compass } from "lucide-react";

export default function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
            <Compass size={18} className="text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900">Timon</span>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-7">
          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500 mt-1 mb-6">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
